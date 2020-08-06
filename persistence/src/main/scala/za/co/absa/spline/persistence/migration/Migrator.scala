/*
 * Copyright 2020 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package za.co.absa.spline.persistence.migration

import com.arangodb.async.ArangoDatabaseAsync
import org.slf4s.Logging
import org.springframework.core.io.support.PathMatchingResourcePatternResolver
import scalax.collection.Graph
import scalax.collection.GraphPredef._
import scalax.collection.edge.Implicits.edge2WDiEdgeAssoc
import scalax.collection.edge.WDiEdge
import za.co.absa.commons.lang.ARM
import za.co.absa.commons.version.Version
import za.co.absa.commons.version.Version.VersionStringInterpolator
import za.co.absa.commons.version.impl.SemVer20Impl.SemanticVersion
import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.persistence.ArangoImplicits.ArangoDatabaseAsyncScalaWrapper
import za.co.absa.spline.persistence.migration.Migrator._
import za.co.absa.spline.persistence.model
import za.co.absa.spline.persistence.model.DBVersion.Status
import za.co.absa.spline.persistence.model.NodeDef.DBVersion
import za.co.absa.spline.persistence.tx._

import scala.compat.java8.FutureConverters.CompletionStageOps
import scala.compat.java8.StreamConverters._
import scala.concurrent.{ExecutionContext, Future}
import scala.io.Source
import scala.util.matching.Regex

class Migrator(db: ArangoDatabaseAsync)(implicit ec: ExecutionContext) extends Logging {
  private val migrationScripts = loadMigrationScripts(MigrationScriptsLocation)

  val targetVersion: SemanticVersion = findClosestTargetVersion(CoreAppVersion, migrationScripts)

  // fixme: avoid calling public from inside. refactor dependencies
  def initializeDbVersionCollection(currentVersion: SemanticVersion): Future[SemanticVersion] = {
    val dbVersion = model.DBVersion(currentVersion.asString, model.DBVersion.Status.Current)
    for {
      exists <- db.collection(DBVersion.name).exists.toScala
      _ <-
        if (exists) Future.successful({})
        else db.createCollection(DBVersion.name).toScala
      _ <- db.collection(DBVersion.name)
        .insertDocument(dbVersion)
        .toScala
    } yield currentVersion
  }

  def migrate(): Future[Unit] = {
    val eventualMigrationChain =
      for {
        dbVersionExists <- db.collection(DBVersion.name).exists.toScala
        currentVersion <-
          if (!dbVersionExists) initializeDbVersionCollection(BaselineVersion)
          else getDBVersion(Status.Current).map(_.getOrElse(sys.error("'current' DB version not found")))
        maybePreparingVersion <- getDBVersion(Status.Preparing)
      } yield {
        log.info(s"Current database version: ${currentVersion.asString}")
        log.info(s"Target database version: ${targetVersion.asString}")
        maybePreparingVersion.foreach(prepVersion =>
          sys.error("" +
            s"Incomplete upgrade to version: ${prepVersion.asString} detected." +
            " The previous DB upgrade has probably failed" +
            " or another application is performing it at the moment." +
            " The database might be left in an inconsistent state." +
            " Please restore the database backup before proceeding," +
            " or wait until the ongoing upgrade has finished.")
        )
        val migrationChain = findMigrationChain(currentVersion, targetVersion, migrationScripts)
        if (migrationChain.isEmpty)
          log.info(s"The database is up-to-date")
        else {
          log.info(s"The database is ${migrationChain.length} versions behind. Migration will be performed.")
          log.debug(s"Migration scripts to apply: $migrationChain")
        }
        migrationChain
      }

    eventualMigrationChain.flatMap(migrationChain =>
      migrationChain.foldLeft(Future.successful({})) {
        case (prevMigrationEvidence, scr) => prevMigrationEvidence.flatMap(_ => {
          log.debug(s"Applying script: $scr")
          executeMigration(scr.script, scr.verTo)
        })
      }
    )
  }

  private def getDBVersion(status: String) = db
    .queryAs[String](
      s"""
         |FOR v IN ${DBVersion.name}
         |    FILTER v.status == '$status'
         |    RETURN v.version""".stripMargin)
    .map(_
      .streamRemaining.toScala
      .headOption
      .map(Version.asSemVer))

  private def executeMigration(script: String, version: SemanticVersion): Future[Unit] = {
    log.info(s"Upgrading to version: ${version.asString}")
    log.trace(s"Applying script: \n$script")

    import com.arangodb.internal.InternalArangoDatabaseImplicits._

    for {
      _ <- db.collection(DBVersion.name).insertDocument(model.DBVersion(version.asString, Status.Preparing)).toScala
      _ <- db.adminExecute(script)
      _ <- new TxBuilder()
        .addQuery(UpdateQuery(DBVersion, s"${UpdateQuery.DocWildcard}.status == '${Status.Current}'", Map("status" -> Status.Upgraded)))
        .addQuery(UpdateQuery(DBVersion, s"${UpdateQuery.DocWildcard}.status == '${Status.Preparing}'", Map("status" -> Status.Current)))
        .buildTx
        .execute(db)
    } yield ()
  }
}

object Migrator {
  private val MigrationScriptsLocation = "classpath:migration-scripts"
  private val SemVerRegexp: Regex = ("" +
    "(?:0|[1-9]\\d*)\\." +
    "(?:0|[1-9]\\d*)\\." +
    "(?:0|[1-9]\\d*)" +
    "(?:-(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?" +
    "(?:\\+[0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*)?").r
  private val MigrationScriptNameRegexp = s"($SemVerRegexp)-($SemVerRegexp).js".r

  private val BaselineVersion = semver"0.4.0"

  val CoreAppVersion: SemanticVersion = Version.asSemVer(SplineBuildInfo.Version).core

  private[migration] case class MigrationScript(verFrom: SemanticVersion, verTo: SemanticVersion, script: String) {
    override def toString: String = MigrationScript.asString(this)
  }

  object MigrationScript {
    val FileNamePattern = "*-*.js"

    private def asString(script: MigrationScript): String =
      FileNamePattern
        .replaceFirst("\\*", script.verFrom.asString)
        .replaceFirst("\\*", script.verTo.asString)
  }

  private[migration] def loadMigrationScripts(location: String): Seq[MigrationScript] = {
    new PathMatchingResourcePatternResolver(getClass.getClassLoader)
      .getResources(s"$location/${MigrationScript.FileNamePattern}").toSeq
      .map(res => {
        val MigrationScriptNameRegexp(verFrom, verTo) = res.getFilename
        val scriptBody = ARM.using(Source.fromURL(res.getURL))(_.getLines.mkString)
        MigrationScript(
          Version.asSemVer(verFrom),
          Version.asSemVer(verTo),
          scriptBody)
      })
  }

  private[migration] def findMigrationChain(verFrom: SemanticVersion, verTo: SemanticVersion, allScripts: Seq[MigrationScript]): Seq[MigrationScript] = {
    try {
      val scriptByVersionPair = allScripts.groupBy(scr => (scr.verFrom, scr.verTo)).mapValues(_.head)
      val edges: Seq[WDiEdge[SemanticVersion]] = allScripts.map(scr => scr.verFrom ~> scr.verTo % 1)
      val graph = Graph(edges: _*)
      val vFrom = graph.get(verFrom)
      val vTo = graph.get(verTo)
      val path = (vFrom shortestPathTo vTo).get
      path.edges.map(e => scriptByVersionPair((e.from, e.to))).toSeq
    } catch {
      case _: NoSuchElementException =>
        sys.error(s"Cannot find migration scripts from version ${verFrom.asString} to ${verTo.asString}")
    }
  }

  private[migration] def findClosestTargetVersion(targetVersion: SemanticVersion, allScripts: Seq[MigrationScript]): SemanticVersion = {
    allScripts.map(_.verTo).filter(_ <= targetVersion).max
  }
}
