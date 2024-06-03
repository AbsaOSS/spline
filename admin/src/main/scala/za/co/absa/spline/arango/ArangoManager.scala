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
import com.typesafe.scalalogging.StrictLogging
import za.co.absa.commons.reflect.EnumerationMacros.sealedInstancesOf
import za.co.absa.commons.version.impl.SemVer20Impl.SemanticVersion
import za.co.absa.spline.arango.OnDBExistsAction.{Drop, Skip}
import za.co.absa.spline.arango.foxx.{FoxxManager, FoxxSourceResolver}
import za.co.absa.spline.persistence.migration.Migrator
import za.co.absa.spline.persistence.model.{CollectionDef, GraphDef, SearchAnalyzerDef, SearchViewDef}
import za.co.absa.spline.persistence.{DatabaseVersionManager, DryRunnable}

import java.time.{Clock, ZonedDateTime}
import scala.collection.immutable._
import scala.concurrent.duration.Duration
import scala.concurrent.{ExecutionContext, Future}
import scala.jdk.CollectionConverters._
import scala.jdk.FutureConverters._

trait ArangoManager {

  /**
   * @return `true` if actual initialization was performed.
   */
  def createDatabase(onExistsAction: OnDBExistsAction, options: DatabaseCreateOptions): Future[Boolean]

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
  val dryRun: Boolean
)
  (implicit val ex: ExecutionContext)
  extends ArangoManager
    with DryRunnable
    with StrictLogging {

  import ArangoManagerImpl._

  def createDatabase(onExistsAction: OnDBExistsAction, options: DatabaseCreateOptions): Future[Boolean] = {
    logger.debug("Initialize database")
    db.exists.asScala.flatMap { exists =>
      if (exists && onExistsAction == Skip) {
        logger.debug("Database already exists - skipping initialization")
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
    logger.debug("Upgrade database")
    dbVersionManager.currentVersion
      .flatMap(currentVersion => {
        logger.info(s"Current database version: ${currentVersion.asString}")
        logger.info(s"Target database version: ${appDBVersion.asString}")
        if (currentVersion == appDBVersion) Future.successful {
          logger.info(s"The database is up-to-date")
        } else if (currentVersion > appDBVersion) Future.failed {
          new RuntimeException("Database downgrade is not supported")
        } else for {
          _ <- deleteFoxxServices()
          _ <- migrator.migrate(currentVersion, appDBVersion)
          _ <- createFoxxServices()
        } yield ()
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
        }).map(_ => ()))
    }
  }

  private def checkDBAccess() = {
    db.exists.asScala
  }

  private def reinstallFoxxServices() = {
    for {
      _ <- deleteFoxxServices()
      _ <- createFoxxServices()
    } yield ()
  }

  override def prune(retentionPeriod: Duration): Future[Unit] = {
    logger.debug(s"Prune data older than $retentionPeriod")
    dataRetentionManager.pruneBefore(clock.millis - retentionPeriod.toMillis)
  }

  override def prune(dateTime: ZonedDateTime): Future[Unit] = {
    logger.debug(s"Prune data before $dateTime")
    dataRetentionManager.pruneBefore(dateTime.toInstant.toEpochMilli)
  }

  private def deleteDbIfRequested(dropIfExists: Boolean) = {
    for {
      exists <- db.exists.asScala
      _ <- if (exists && !dropIfExists)
        throw new IllegalArgumentException(s"Arango Database ${db.name} already exists")
      else if (exists && dropIfExists) {
        logger.info(s"Drop database: ${db.name}")
        unlessDryRunAsync(db.drop().asScala)
      }
      else Future.successful(())
    } yield ()
  }

  private def createDb() = {
    logger.info(s"Create database: ${db.name}")
    unlessDryRunAsync(db.create().asScala)
  }

  private def createCollections(options: DatabaseCreateOptions) = {
    logger.debug(s"Create collections")
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
            _ <- unlessDryRunAsync(db.createCollection(colDef.name, collectionOptions).asScala)
            _ <- unlessDryRunAsync(db.collection(colDef.name).insertDocuments(colDef.initData.asJava).asScala)
          } yield ()
        })
  }

  private def createGraphs() = {
    logger.debug(s"Create graphs")
    Future.sequence(
      for (graphDef <- sealedInstancesOf[GraphDef]) yield {
        val edgeDefs = graphDef.edgeDefs.map(e =>
          (new EdgeDefinition)
            .collection(e.name)
            .from(e.froms.map(_.name): _*)
            .to(e.tos.map(_.name): _*))
        unlessDryRunAsync(db.createGraph(graphDef.name, edgeDefs.asJava).asScala)
      })
  }

  private def deleteIndices() = {
    logger.info(s"Drop indices")
    for {
      colEntities <- db.getCollections.asScala.map(_.asScala.filter(!_.getIsSystem))
      eventualIndices = colEntities.map(ce => db.collection(ce.getName).getIndexes.asScala.map(_.asScala.map(ce.getName -> _)))
      allIndices <- Future.reduceLeft(Iterable(eventualIndices.toSeq: _*))(_ ++ _)
      userIndices = allIndices.filter { case (_, idx) => idx.getType != IndexType.primary && idx.getType != IndexType.edge }
      _ <- Future.traverse(userIndices) { case (colName, idx) =>
        logger.debug(s"Drop ${idx.getType} index: $colName.${idx.getName}")
        unlessDryRunAsync(db.deleteIndex(idx.getId).asScala)
      }
    } yield ()
  }

  private def createIndices() = {
    logger.info(s"Create indices")
    Future.sequence(
      for {
        colDef <- sealedInstancesOf[CollectionDef]
        idxDef <- colDef.indexDefs ++ colDef.commonIndexDefs
      } yield {
        val idxOpts = idxDef.options
        logger.debug(s"Ensure ${idxOpts.indexType} index: ${colDef.name} [${idxDef.fields.mkString(",")}]")
        val dbCol = db.collection(colDef.name)
        val fields = idxDef.fields.asJava
        unlessDryRunAsync {
          (idxOpts match {
            case opts: GeoIndexOptions => dbCol.ensureGeoIndex(fields, opts)
            case opts: InvertedIndexOptions => dbCol.ensureInvertedIndex(opts)
            case opts: PersistentIndexOptions => dbCol.ensurePersistentIndex(fields, opts)
            case opts: TtlIndexOptions => dbCol.ensureTtlIndex(fields, opts)
            case opts: ZKDIndexOptions => dbCol.ensureZKDIndex(fields, opts)
          }).asScala
        }
      })
  }

  private def createFoxxServices(): Future[Unit] = {
    logger.debug(s"Lookup Foxx services to install")
    val serviceDefs = FoxxSourceResolver.lookupSources(FoxxSourcesLocation)
    logger.debug(s"Found Foxx services: ${serviceDefs.map(_._1) mkString ", "}")
    Future.traverse(serviceDefs.toSeq) {
      case (name, content) =>
        val srvMount = s"/$name"
        logger.info(s"Install Foxx service: $srvMount")
        foxxManager.install(srvMount, content)
    }.map(_ => ())
  }

  private def deleteFoxxServices(): Future[Unit] = {
    logger.debug(s"Delete Foxx services")
    foxxManager.list().flatMap(srvDefs =>
      Future.sequence(for {
        srvDef <- srvDefs
        srvMount = srvDef("mount").toString
        if !srvMount.startsWith("/_")
      } yield {
        logger.info(s"Uninstall Foxx service: $srvMount")
        foxxManager.uninstall(srvMount)
      }
      ).map(_ => ())
    )
  }

  private def deleteSearchViews() = {
    logger.debug(s"Delete search views")
    for {
      viewEntities <- db.getViews.asScala.map(_.asScala)
      views = viewEntities.map(ve => db.view(ve.getName))
      _ <- Future.traverse(views) { view =>
        logger.info(s"Delete search view: ${view.name}")
        unlessDryRunAsync(view.drop().asScala)
      }
    } yield ()
  }

  private def createSearchViews() = {
    logger.debug(s"Create search views")
    Future.traverse(sealedInstancesOf[SearchViewDef]) { viewDef =>
      logger.info(s"Create search view: ${viewDef.name}")
      unlessDryRunAsync(db.createArangoSearch(viewDef.name, viewDef.properties).asScala)
    }
  }

  private def deleteSearchAnalyzers() = {
    logger.debug(s"Delete search analyzers")
    for {
      analyzers <- db.getSearchAnalyzers.asScala.map(_.asScala)
      userAnalyzers = analyzers.filter(_.getName.startsWith(s"${db.name}::"))
      _ <- Future.traverse(userAnalyzers)(ua => {
        logger.info(s"Delete search analyzer: ${ua.getName}")
        unlessDryRunAsync(db.deleteSearchAnalyzer(ua.getName).asScala)
      })
    } yield ()
  }

  private def createSearchAnalyzers() = {
    logger.debug(s"Create search analyzers")
    Future.traverse(sealedInstancesOf[SearchAnalyzerDef]) { ad =>
      logger.info(s"Create search analyzer: ${ad.name}")
      unlessDryRunAsync(db.createSearchAnalyzer(ad.analyzer).asScala)
    }
  }
}

object ArangoManagerImpl {
  private val FoxxSourcesLocation = "classpath:foxx"
}
