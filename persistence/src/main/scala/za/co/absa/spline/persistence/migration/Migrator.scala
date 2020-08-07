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

class Migrator(db: ArangoDatabaseAsync)(implicit ec: ExecutionContext) extends Logging {
  private val scriptRepo = new MigrationScriptRepository(MigrationScriptLoader.loadAll(ScriptsLocation))

  val targetVersion: SemanticVersion = scriptRepo.getTargetVersionClosestTo(semver"${SplineBuildInfo.Version}")

  // fixme: refactoring: avoid calling public from inside. Review dependencies
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
        val migrationChain = scriptRepo.findMigrationChain(currentVersion, targetVersion)
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

  private def getDBVersion(status: model.DBVersion.Status.Type) = db
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
        .addQuery(UpdateQuery(DBVersion,
          s"${UpdateQuery.DocWildcard}.status == '${Status.Current}'", Map("status" -> Status.Upgraded.toString)))
        .addQuery(UpdateQuery(DBVersion,
          s"${UpdateQuery.DocWildcard}.status == '${Status.Preparing}'", Map("status" -> Status.Current.toString)))
        .buildTx
        .execute(db)
    } yield ()
  }
}

object Migrator {
  private val BaselineVersion = semver"0.4.0"
  private val ScriptsLocation = "classpath:migration-scripts"
}
