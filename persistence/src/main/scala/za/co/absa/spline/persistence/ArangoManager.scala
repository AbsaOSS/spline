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
import com.arangodb.entity.EdgeDefinition
import com.arangodb.model._
import org.apache.commons.io.FilenameUtils
import org.slf4s.Logging
import org.springframework.core.io.support.PathMatchingResourcePatternResolver
import za.co.absa.commons.lang.ARM
import za.co.absa.commons.reflect.ReflectionUtils
import za.co.absa.commons.version.impl.SemVer20Impl.SemanticVersion
import za.co.absa.spline.persistence.OnDBExistsAction.{Drop, Skip}
import za.co.absa.spline.persistence.migration.Migrator
import za.co.absa.spline.persistence.model.{CollectionDef, GraphDef, ViewDef}

import scala.collection.JavaConverters._
import scala.compat.java8.FutureConverters._
import scala.concurrent.{ExecutionContext, Future}
import scala.io.Source

trait ArangoManager {

  /**
   * @return `true` if actual initialization was performed.
   */
  def initialize(onExistsAction: OnDBExistsAction): Future[Boolean]
  def upgrade(): Future[Unit]
}

class ArangoManagerImpl(
  db: ArangoDatabaseAsync,
  dbVersionManager: DatabaseVersionManager,
  migrator: Migrator,
  appDBVersion: SemanticVersion)
  (implicit val ex: ExecutionContext)
  extends ArangoManager
    with Logging {

  import ArangoManagerImpl._
  import com.arangodb.internal.ArangoDatabaseImplicits._

  def initialize(onExistsAction: OnDBExistsAction): Future[Boolean] =
    db.exists.toScala.flatMap { exists =>
      if (exists && onExistsAction == Skip)
        Future.successful(false)
      else for {
        _ <- deleteDbIfRequested(db, onExistsAction == Drop)
        _ <- db.create().toScala
        _ <- createCollections(db)
        _ <- createAQLUserFunctions(db)
        _ <- createFoxxServices(db)
        _ <- createIndices(db)
        _ <- createGraphs(db)
        _ <- createViews(db)
        _ <- dbVersionManager.insertDbVersion(appDBVersion)
      } yield true
    }

  override def upgrade(): Future[Unit] = {
    for {
      currentVersion <- dbVersionManager.currentVersion
      migrationDone <- migrator.migrate(currentVersion, appDBVersion)
    } yield migrationDone
  }

  private def deleteDbIfRequested(db: ArangoDatabaseAsync, dropIfExists: Boolean) =
    for {
      exists <- db.exists.toScala
      _ <- if (exists && !dropIfExists) throw new IllegalArgumentException(s"Arango Database ${db.name()} already exists")
      else if (exists && dropIfExists) db.drop().toScala
      else Future.successful(Unit)
    } yield Unit

  private def createCollections(db: ArangoDatabaseAsync) = Future.sequence(
    for (colDef <- ReflectionUtils.objectsOf[CollectionDef])
      yield db.createCollection(colDef.name, new CollectionCreateOptions().`type`(colDef.collectionType)).toScala)

  private def createGraphs(db: ArangoDatabaseAsync) = Future.sequence(
    for (graphDef <- ReflectionUtils.objectsOf[GraphDef]) yield {
      val edgeDefs = graphDef.edgeDefs.map(e => new EdgeDefinition collection e.name from e.from.name to e.to.name)
      db.createGraph(graphDef.name, edgeDefs.asJava).toScala
    })

  private def createIndices(db: ArangoDatabaseAsync) = Future.sequence(
    for {
      colDef <- ReflectionUtils.objectsOf[CollectionDef]
      idxDef <- colDef.indexDefs
    } yield {
      val dbCol = db.collection(colDef.name)
      val fields = idxDef.fields.asJava
      (idxDef.options match {
        case opts: FulltextIndexOptions => dbCol.ensureFulltextIndex(fields, opts)
        case opts: GeoIndexOptions => dbCol.ensureGeoIndex(fields, opts)
        case opts: PersistentIndexOptions => dbCol.ensurePersistentIndex(fields, opts)
        case opts: TtlIndexOptions => dbCol.ensureTtlIndex(fields, opts)
      }).toScala
    })

  private def createAQLUserFunctions(db: ArangoDatabaseAsync) = Future.sequence(
    new PathMatchingResourcePatternResolver(getClass.getClassLoader)
      .getResources(s"$AQLFunctionsLocation/*.js").toSeq
      .map(res => {
        val functionName = s"$AQLFunctionsPrefix::${FilenameUtils.removeExtension(res.getFilename).toUpperCase}"
        val functionBody = ARM.using(Source.fromURL(res.getURL))(_.getLines.mkString)
        db.createAqlFunction(functionName, functionBody, new AqlFunctionCreateOptions()).toScala
      }))

  private def createFoxxServices(db: ArangoDatabaseAsync): Future[_] = {
    val mountPrefix = "/spline"
    // fixme: discover foxx services
    
    db.foxxRegister(
      mountPrefix,
      """
        |'use strict';
        |const {db, aql} = require('@arangodb');
        |const createRouter = require('@arangodb/foxx/router');
        |const joi = require('joi');
        |
        |const router = createRouter();
        |module.context.use(router);
        |router
        |    .get('/test', (req, res) => {res.send({answer: 42})})
        |    .response(['application/json'], 'Ultimate answer')
        |    .summary('Answer to the ultimate question of life, the universe, and everything')
        |    .description('Test service');
        |""".stripMargin)
  }

  private def createViews(db: ArangoDatabaseAsync) = {
    Future.traverse(ReflectionUtils.objectsOf[ViewDef]) { viewDef =>
      for {
        _ <- db.createArangoSearch(viewDef.name, null).toScala
        _ <- db.arangoSearch(viewDef.name).updateProperties(viewDef.properties).toScala
      } yield Unit
    }
  }
}

object ArangoManagerImpl {
  private val AQLFunctionsLocation = "classpath:AQLFunctions"
  private val AQLFunctionsPrefix = "SPLINE"
}
