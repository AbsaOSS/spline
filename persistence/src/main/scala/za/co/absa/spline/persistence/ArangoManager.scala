/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.persistence

import com.arangodb.async.ArangoDatabaseAsync
import com.arangodb.entity.{EdgeDefinition, IndexType}
import com.arangodb.model.Implicits.IndexOptionsOps
import com.arangodb.model._
import org.apache.commons.io.FilenameUtils
import org.slf4s.Logging
import org.springframework.core.io.support.PathMatchingResourcePatternResolver
import za.co.absa.commons.lang.ARM
import za.co.absa.commons.reflect.EnumerationMacros.sealedInstancesOf
import za.co.absa.commons.version.impl.SemVer20Impl.SemanticVersion
import za.co.absa.spline.persistence.OnDBExistsAction.{Drop, Skip}
import za.co.absa.spline.persistence.foxx.{FoxxManager, FoxxSourceResolver}
import za.co.absa.spline.persistence.migration.Migrator
import za.co.absa.spline.persistence.model.{CollectionDef, GraphDef, SearchAnalyzerDef, SearchViewDef}

import scala.collection.JavaConverters._
import scala.collection.immutable._
import scala.compat.java8.FutureConverters._
import scala.concurrent.{ExecutionContext, Future}
import scala.io.Source

trait ArangoManager {

  /**
   * @return `true` if actual initialization was performed.
   */
  def initialize(onExistsAction: OnDBExistsAction): Future[Boolean]
  def upgrade(): Future[Unit]
  def execute(actions: AuxiliaryDBAction*): Future[Unit]
}

class ArangoManagerImpl(
  db: ArangoDatabaseAsync,
  dbVersionManager: DatabaseVersionManager,
  migrator: Migrator,
  foxxManager: FoxxManager,
  appDBVersion: SemanticVersion)
  (implicit val ex: ExecutionContext)
  extends ArangoManager
    with Logging {

  import ArangoManagerImpl._

  def initialize(onExistsAction: OnDBExistsAction): Future[Boolean] = {
    log.debug("Initialize database")
    db.exists.toScala.flatMap { exists =>
      if (exists && onExistsAction == Skip) {
        log.debug("Database already exists - skipping initialization")
        Future.successful(false)
      } else for {
        _ <- deleteDbIfRequested(db, onExistsAction == Drop)
        _ <- db.create().toScala
        _ <- createCollections(db)
        _ <- createAQLUserFunctions(db)
        _ <- createFoxxServices()
        _ <- createIndices(db)
        _ <- createGraphs(db)
        _ <- createSearchAnalyzers(db)
        _ <- createSearchViews(db)
        _ <- dbVersionManager.insertDbVersion(appDBVersion)
      } yield true
    }
  }

  override def upgrade(): Future[Unit] = {
    log.debug("Upgrade database")
    dbVersionManager.currentVersion
      .flatMap(currentVersion => {
        log.info(s"Current database version: ${currentVersion.asString}")
        log.info(s"Target database version: ${appDBVersion.asString}")
        if (currentVersion == appDBVersion) Future.successful {
          log.info(s"The database is up-to-date")
        } else if (currentVersion > appDBVersion) Future.failed {
          new RuntimeException("Database downgrade is not supported")
        } else for {
          _ <- deleteFoxxServices()
          _ <- migrator.migrate(currentVersion, appDBVersion)
          _ <- createFoxxServices()
        } yield {}
      })
  }

  override def execute(actions: AuxiliaryDBAction*): Future[Unit] = {
    actions.foldLeft(Future.successful(())) {
      case (prevFuture, nextAction) =>
        prevFuture.flatMap(_ => (nextAction match {
          case AuxiliaryDBAction.CheckDBAccess => checkDBAccess(db)
          case AuxiliaryDBAction.FoxxReinstall => reinstallFoxxServices()
          case AuxiliaryDBAction.IndicesDelete => deleteIndices(db)
          case AuxiliaryDBAction.IndicesCreate => createIndices(db)
          case AuxiliaryDBAction.SearchViewsDelete => deleteSearchViews(db)
          case AuxiliaryDBAction.SearchViewsCreate => createSearchViews(db)
          case AuxiliaryDBAction.SearchAnalyzerDelete => deleteSearchAnalyzers(db)
          case AuxiliaryDBAction.SearchAnalyzerCreate => createSearchAnalyzers(db)
        }).map(_ => {}))
    }
  }

  private def checkDBAccess(db: ArangoDatabaseAsync) = {
    db.exists.toScala
  }

  private def reinstallFoxxServices() = {
    for {
      _ <- deleteFoxxServices()
      _ <- createFoxxServices()
    } yield {}
  }

  private def deleteDbIfRequested(db: ArangoDatabaseAsync, dropIfExists: Boolean) = {
    for {
      exists <- db.exists.toScala
      _ <- if (exists && !dropIfExists)
        throw new IllegalArgumentException(s"Arango Database ${db.name()} already exists")
      else if (exists && dropIfExists) {
        log.info(s"Drop database: ${db.name}")
        db.drop().toScala
      }
      else Future.successful({})
    } yield {}
  }

  private def createCollections(db: ArangoDatabaseAsync) = {
    log.debug(s"Create collections")
    Future.sequence(
      for (colDef <- sealedInstancesOf[CollectionDef])
        yield {
          log.info(s"Create collection: ${colDef.name}")
          db.createCollection(colDef.name, new CollectionCreateOptions().`type`(colDef.collectionType)).toScala
        })
  }

  private def createGraphs(db: ArangoDatabaseAsync) = {
    log.debug(s"Create graphs")
    Future.sequence(
      for (graphDef <- sealedInstancesOf[GraphDef]) yield {
        val edgeDefs = graphDef.edgeDefs.map(e =>
          (new EdgeDefinition)
            .collection(e.name)
            .from(e.froms.map(_.name): _*)
            .to(e.tos.map(_.name): _*))
        db.createGraph(graphDef.name, edgeDefs.asJava).toScala
      })
  }

  private def deleteIndices(db: ArangoDatabaseAsync) = {
    log.info(s"Drop indices")
    for {
      colEntities <- db.getCollections.toScala.map(_.asScala.filter(!_.getIsSystem))
      eventualIndices = colEntities.map(ce => db.collection(ce.getName).getIndexes.toScala.map(_.asScala.map(ce.getName -> _)))
      allIndices <- Future.reduceLeft(Iterable(eventualIndices.toSeq: _*))(_ ++ _)
      userIndices = allIndices.filter{case (_, idx) => idx.getType != IndexType.primary && idx.getType != IndexType.edge}
      _ <- Future.traverse(userIndices) { case (colName, idx) =>
        log.debug(s"Drop ${idx.getType} index: $colName.${idx.getName}")
        db.deleteIndex(idx.getId).toScala
      }
    } yield {}
  }

  private def createIndices(db: ArangoDatabaseAsync) = {
    log.info(s"Create indices")
    Future.sequence(
      for {
        colDef <- sealedInstancesOf[CollectionDef]
        idxDef <- colDef.indexDefs
      } yield {
        val idxOpts = idxDef.options
        log.debug(s"Ensure ${idxOpts.indexType} index: ${colDef.name} [${idxDef.fields.mkString(",")}]")
        val dbCol = db.collection(colDef.name)
        val fields = idxDef.fields.asJava
        (idxOpts match {
          case opts: FulltextIndexOptions => dbCol.ensureFulltextIndex(fields, opts)
          case opts: GeoIndexOptions => dbCol.ensureGeoIndex(fields, opts)
          case opts: PersistentIndexOptions => dbCol.ensurePersistentIndex(fields, opts)
          case opts: TtlIndexOptions => dbCol.ensureTtlIndex(fields, opts)
        }).toScala
      })
  }

  private def createAQLUserFunctions(db: ArangoDatabaseAsync) = {
    log.debug(s"Lookup AQL functions to register")
    Future.sequence(
      new PathMatchingResourcePatternResolver(getClass.getClassLoader)
        .getResources(s"$AQLFunctionsLocation/*.js").toSeq
        .map(res => {
          val functionName = s"$AQLFunctionsPrefix::${FilenameUtils.removeExtension(res.getFilename).toUpperCase}"
          val functionBody = ARM.using(Source.fromURL(res.getURL))(_.getLines.mkString("\n"))
          log.info(s"Register AQL function: $functionName")
          log.trace(s"AQL function body: $functionBody")
          db.createAqlFunction(functionName, functionBody, new AqlFunctionCreateOptions()).toScala
        }))
  }

  private def createFoxxServices(): Future[_] = {
    log.debug(s"Lookup Foxx services to install")
    val serviceDefs = FoxxSourceResolver.lookupSources(FoxxSourcesLocation)
    log.debug(s"Found Foxx services: ${serviceDefs.map(_._1) mkString ", "}")
    Future.traverse(serviceDefs.toSeq) {
      case (name, assets) =>
        val srvMount = s"/$name"
        log.info(s"Install Foxx service: $srvMount")
        foxxManager.install(srvMount, assets)
    }
  }

  private def deleteFoxxServices(): Future[_] = {
    log.debug(s"Delete Foxx services")
    foxxManager.list().flatMap(srvDefs =>
      Future.sequence(for {
        srvDef <- srvDefs
        srvMount = srvDef("mount").toString
        if !srvMount.startsWith("/_")
      } yield {
        log.info(s"Uninstall Foxx service: $srvMount")
        foxxManager.uninstall(srvMount)
      }
      ).map(_ => {})
    )
  }

  private def deleteSearchViews(db: ArangoDatabaseAsync) = {
    log.debug(s"Delete search views")
    for {
      viewEntities <- db.getViews.toScala.map(_.asScala)
      views = viewEntities.map(ve => db.view(ve.getName))
      _ <- Future.traverse(views) { view =>
        log.info(s"Delete search view: ${view.name}")
        view.drop().toScala
      }
    } yield {}
  }

  private def createSearchViews(db: ArangoDatabaseAsync) = {
    log.debug(s"Create search views")
    Future.traverse(sealedInstancesOf[SearchViewDef]) { viewDef =>
      log.info(s"Create search view: ${viewDef.name}")
      db.createArangoSearch(viewDef.name, viewDef.properties).toScala
    }
  }

  private def deleteSearchAnalyzers(db: ArangoDatabaseAsync) = {
    log.debug(s"Delete search analyzers")
    for {
      analyzers <- db.getSearchAnalyzers.toScala.map(_.asScala)
      userAnalyzers = analyzers.filter(_.getName.startsWith(s"${db.name}::"))
      _ <- Future.traverse(userAnalyzers)(ua => {
        log.info(s"Delete search analyzer: ${ua.getName}")
        db.deleteSearchAnalyzer(ua.getName).toScala
      })
    } yield {}
  }

  private def createSearchAnalyzers(db: ArangoDatabaseAsync) = {
    log.debug(s"Create search analyzers")
    Future.traverse(sealedInstancesOf[SearchAnalyzerDef]) { ad =>
      log.info(s"Create search analyzer: ${ad.name}")
      db.createSearchAnalyzer(ad.analyzer).toScala
    }
  }
}

object ArangoManagerImpl {
  private val AQLFunctionsLocation = "classpath:AQLFunctions"
  private val AQLFunctionsPrefix = "SPLINE"
  private val FoxxSourcesLocation = "classpath:foxx"
}
