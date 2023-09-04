/*
 * Copyright 2022 ABSA Group Limited
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

package za.co.absa.spline.arango

import com.arangodb.async.ArangoDatabaseAsync
import com.arangodb.entity.{EdgeDefinition, IndexType}
import com.arangodb.model.Implicits.IndexOptionsOps
import com.arangodb.model._
import org.slf4s.Logging
import za.co.absa.commons.reflect.EnumerationMacros.sealedInstancesOf
import za.co.absa.commons.version.impl.SemVer20Impl.SemanticVersion
import za.co.absa.spline.arango.OnDBExistsAction.{Drop, Skip}
import za.co.absa.spline.arango.foxx.{FoxxManager, FoxxSourceResolver}
import za.co.absa.spline.persistence.migration.Migrator
import za.co.absa.spline.persistence.model.{CollectionDef, GraphDef, SearchAnalyzerDef, SearchViewDef}
import za.co.absa.spline.persistence.{DatabaseVersionManager, DryRunnable}

import java.time.{Clock, ZonedDateTime}
import scala.collection.JavaConverters._
import scala.collection.immutable._
import scala.compat.java8.FutureConverters._
import scala.concurrent.duration.Duration
import scala.concurrent.{ExecutionContext, Future}

trait ArangoManager {

  /**
   * @return `true` if actual initialization was performed.
   */
  def initialize(onExistsAction: OnDBExistsAction, options: DatabaseCreateOptions): Future[Boolean]
  def upgrade(): Future[Unit]
  def execute(actions: AuxiliaryDBAction*): Future[Unit]
  def prune(retentionPeriod: Duration): Future[Unit]
  def prune(thresholdDate: ZonedDateTime): Future[Unit]

}

class ArangoManagerImpl(
  db: ArangoDatabaseAsync,
  dbVersionManager: DatabaseVersionManager,
  dataRetentionManager: DataRetentionManager,
  migrator: Migrator,
  foxxManager: FoxxManager,
  clock: Clock,
  appDBVersion: SemanticVersion,
  val dryRun: Boolean)
  (implicit val ex: ExecutionContext)
  extends ArangoManager
    with DryRunnable
    with Logging {

  import ArangoManagerImpl._

  def initialize(onExistsAction: OnDBExistsAction, options: DatabaseCreateOptions): Future[Boolean] = {
    log.debug("Initialize database")
    db.exists.toScala.flatMap { exists =>
      if (exists && onExistsAction == Skip) {
        log.debug("Database already exists - skipping initialization")
        Future.successful(false)
      } else for {
        _ <- deleteDbIfRequested(onExistsAction == Drop)
        _ <- createDb()
        _ <- createCollections(options)
        _ <- createFoxxServices()
        _ <- createIndices()
        _ <- createGraphs()
        _ <- createSearchAnalyzers()
        _ <- createSearchViews()
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
          case AuxiliaryDBAction.CheckDBAccess => checkDBAccess()
          case AuxiliaryDBAction.FoxxReinstall => reinstallFoxxServices()
          case AuxiliaryDBAction.IndicesDelete => deleteIndices()
          case AuxiliaryDBAction.IndicesCreate => createIndices()
          case AuxiliaryDBAction.SearchViewsDelete => deleteSearchViews()
          case AuxiliaryDBAction.SearchViewsCreate => createSearchViews()
          case AuxiliaryDBAction.SearchAnalyzerDelete => deleteSearchAnalyzers()
          case AuxiliaryDBAction.SearchAnalyzerCreate => createSearchAnalyzers()
        }).map(_ => {}))
    }
  }

  private def checkDBAccess() = {
    db.exists.toScala
  }

  private def reinstallFoxxServices() = {
    for {
      _ <- deleteFoxxServices()
      _ <- createFoxxServices()
    } yield {}
  }

  override def prune(retentionPeriod: Duration): Future[Unit] = {
    log.debug(s"Prune data older than $retentionPeriod")
    dataRetentionManager.pruneBefore(clock.millis - retentionPeriod.toMillis)
  }

  override def prune(dateTime: ZonedDateTime): Future[Unit] = {
    log.debug(s"Prune data before $dateTime")
    dataRetentionManager.pruneBefore(dateTime.toInstant.toEpochMilli)
  }

  private def deleteDbIfRequested(dropIfExists: Boolean) = {
    for {
      exists <- db.exists.toScala
      _ <- if (exists && !dropIfExists)
        throw new IllegalArgumentException(s"Arango Database ${db.dbName} already exists")
      else if (exists && dropIfExists) {
        log.info(s"Drop database: ${db.dbName}")
        unlessDryRunAsync(db.drop().toScala)
      }
      else Future.successful({})
    } yield {}
  }

  private def createDb() = {
    log.info(s"Create database: ${db.dbName}")
    unlessDryRunAsync(db.create().toScala)
  }

  private def createCollections(options: DatabaseCreateOptions) = {
    log.debug(s"Create collections")
    Future.sequence(
      for (colDef <- sealedInstancesOf[CollectionDef])
        yield {
          val shardNum = options.numShards.get(colDef).orElse(options.numShardsDefault).getOrElse(colDef.numShards)
          val shardKeys = options.shardKeys.get(colDef).orElse(options.shardKeysDefault).getOrElse(colDef.shardKeys)
          val replFactor = options.replFactor.get(colDef).orElse(options.replFactorDefault).getOrElse(colDef.replFactor)
          val collectionOptions = new CollectionCreateOptions()
            .`type`(colDef.collectionType)
            .numberOfShards(shardNum)
            .shardKeys(shardKeys: _*)
            .replicationFactor(replFactor)
            .waitForSync(options.waitForSync)
          for {
            _ <- unlessDryRunAsync(db.createCollection(colDef.name, collectionOptions).toScala)
            _ <- unlessDryRunAsync(db.collection(colDef.name).insertDocuments(colDef.initData.asJava).toScala)
          } yield ()
        })
  }

  private def createGraphs() = {
    log.debug(s"Create graphs")
    Future.sequence(
      for (graphDef <- sealedInstancesOf[GraphDef]) yield {
        val edgeDefs = graphDef.edgeDefs.map(e =>
          (new EdgeDefinition)
            .collection(e.name)
            .from(e.froms.map(_.name): _*)
            .to(e.tos.map(_.name): _*))
        unlessDryRunAsync(db.createGraph(graphDef.name, edgeDefs.asJava).toScala)
      })
  }

  private def deleteIndices() = {
    log.info(s"Drop indices")
    for {
      colEntities <- db.getCollections.toScala.map(_.asScala.filter(!_.getIsSystem))
      eventualIndices = colEntities.map(ce => db.collection(ce.getName).getIndexes.toScala.map(_.asScala.map(ce.getName -> _)))
      allIndices <- Future.reduceLeft(Iterable(eventualIndices.toSeq: _*))(_ ++ _)
      userIndices = allIndices.filter { case (_, idx) => idx.getType != IndexType.primary && idx.getType != IndexType.edge }
      _ <- Future.traverse(userIndices) { case (colName, idx) =>
        log.debug(s"Drop ${idx.getType} index: $colName.${idx.getName}")
        unlessDryRunAsync(db.deleteIndex(idx.getId).toScala)
      }
    } yield {}
  }

  private def createIndices() = {
    log.info(s"Create indices")
    Future.sequence(
      for {
        colDef <- sealedInstancesOf[CollectionDef]
        idxDef <- colDef.indexDefs ++ colDef.commonIndexDefs
      } yield {
        val idxOpts = idxDef.options
        log.debug(s"Ensure ${idxOpts.indexType} index: ${colDef.name} [${idxDef.fields.mkString(",")}]")
        val dbCol = db.collection(colDef.name)
        val fields = idxDef.fields.asJava
        unlessDryRunAsync {
          (idxOpts match {
            case opts: FulltextIndexOptions => dbCol.ensureFulltextIndex(fields, opts)
            case opts: GeoIndexOptions => dbCol.ensureGeoIndex(fields, opts)
            case opts: PersistentIndexOptions => dbCol.ensurePersistentIndex(fields, opts)
            case opts: TtlIndexOptions => dbCol.ensureTtlIndex(fields, opts)
          }).toScala
        }
      })
  }

  private def createFoxxServices(): Future[_] = {
    log.debug(s"Lookup Foxx services to install")
    val serviceDefs = FoxxSourceResolver.lookupSources(FoxxSourcesLocation)
    log.debug(s"Found Foxx services: ${serviceDefs.map(_._1) mkString ", "}")
    Future.traverse(serviceDefs.toSeq) {
      case (name, content) =>
        val srvMount = s"/$name"
        log.info(s"Install Foxx service: $srvMount")
        foxxManager.install(srvMount, content)
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

  private def deleteSearchViews() = {
    log.debug(s"Delete search views")
    for {
      viewEntities <- db.getViews.toScala.map(_.asScala)
      views = viewEntities.map(ve => db.view(ve.getName))
      _ <- Future.traverse(views) { view =>
        log.info(s"Delete search view: ${view.name}")
        unlessDryRunAsync(view.drop().toScala)
      }
    } yield {}
  }

  private def createSearchViews() = {
    log.debug(s"Create search views")
    Future.traverse(sealedInstancesOf[SearchViewDef]) { viewDef =>
      log.info(s"Create search view: ${viewDef.name}")
      unlessDryRunAsync(db.createArangoSearch(viewDef.name, viewDef.properties).toScala)
    }
  }

  private def deleteSearchAnalyzers() = {
    log.debug(s"Delete search analyzers")
    for {
      analyzers <- db.getSearchAnalyzers.toScala.map(_.asScala)
      userAnalyzers = analyzers.filter(_.getName.startsWith(s"${db.dbName}::"))
      _ <- Future.traverse(userAnalyzers)(ua => {
        log.info(s"Delete search analyzer: ${ua.getName}")
        unlessDryRunAsync(db.deleteSearchAnalyzer(ua.getName).toScala)
      })
    } yield {}
  }

  private def createSearchAnalyzers() = {
    log.debug(s"Create search analyzers")
    Future.traverse(sealedInstancesOf[SearchAnalyzerDef]) { ad =>
      log.info(s"Create search analyzer: ${ad.name}")
      unlessDryRunAsync(db.createSearchAnalyzer(ad.analyzer).toScala)
    }
  }
}

object ArangoManagerImpl {
  private val FoxxSourcesLocation = "classpath:foxx"
}
