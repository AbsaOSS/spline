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

import java.util.concurrent.ExecutionException

import com.arangodb.async.ArangoDatabaseAsync
import com.arangodb.entity.{EdgeDefinition, IndexType}
import com.arangodb.model._
import org.apache.commons.io.FilenameUtils
import org.springframework.core.io.support.PathMatchingResourcePatternResolver
import za.co.absa.commons.lang.ARM
import za.co.absa.commons.reflect.ReflectionUtils
import za.co.absa.spline.persistence.OnDBExistsAction.{Drop, Skip}
import za.co.absa.spline.persistence.model.{CollectionDef, GraphDef, ViewDef}

import scala.collection.JavaConverters._
import scala.compat.java8.FutureConverters._
import scala.concurrent.Future
import scala.io.Source
import scala.util.{Failure, Success, Try}

trait ArangoInit {

  /**
   * @return `true` if actual initialization was performed.
   */
  def initialize(connectionURL: ArangoConnectionURL, onExistsAction: OnDBExistsAction): Future[Boolean]
  def upgrade(connectionURL: ArangoConnectionURL): Future[Unit]
}

object ArangoInit extends ArangoInit {

  import scala.concurrent.ExecutionContext.Implicits._

  def initialize(connectionURL: ArangoConnectionURL, onExistsAction: OnDBExistsAction): Future[Boolean] =
    execute(connectionURL) { db =>
      db.exists.toScala.flatMap { exists =>
        if (exists && onExistsAction == Skip)
          Future.successful(false)
        else for {
          _ <- deleteDbIfRequested(db, onExistsAction == Drop)
          _ <- db.create().toScala
          _ <- createCollections(db)
          _ <- createAQLUserFunctions(db)
          _ <- createIndices(db)
          _ <- createGraphs(db)
          _ <- createViews(db)
        } yield true
      }
    }

  override def upgrade(connectionURL: ArangoConnectionURL): Future[Unit] = execute(connectionURL) { db =>
    workAroundArangoAsyncBug(db)

    for {
      _ <- deleteAQLUserFunctions(db)
      _ <- createAQLUserFunctions(db)
      _ <- deleteIndices(db)
      _ <- createIndices(db)
      _ <- deleteViews(db)
      _ <- createViews(db)
      // fixme: Current version of Arango driver doesn't seem to support graph deletion. Try after https://github.com/AbsaOSS/spline/issues/396
      // _ <- deleteGraphs(db)
      // _ <- createGraphs(db)
    } yield Unit
  }

  def workAroundArangoAsyncBug(db: ArangoDatabaseAsync): Unit = {
    try {
      db.getInfo.get
    } catch {
      // The first call sometime fails with a CCE due to a bug in ArangoDB Java Driver
      // see: https://github.com/arangodb/arangodb-java-driver-async/issues/21
      case ee: ExecutionException if ee.getCause.isInstanceOf[ClassCastException] =>
        db.getInfo.get
    }
  }


  private def execute[A](connectionURL: ArangoConnectionURL)(fn: ArangoDatabaseAsync => Future[A]): Future[A] = {
    val arangoFacade = new ArangoDatabaseFacade(connectionURL)

    (Try(fn(arangoFacade.db)) match {
      case Failure(e) => Future.failed(e)
      case Success(v) => v
    }) andThen {
      case _ => arangoFacade.destroy()
    }
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

  private def deleteIndices(db: ArangoDatabaseAsync): Future[_] = {
    for {
      cols <- db.getCollections.toScala.map(_.asScala.filter(!_.getIsSystem))
      allIndices <- Future.reduce(cols.map(col => db.collection(col.getName).getIndexes.toScala.map(_.asScala)))(_ ++ _)
      userIndices = allIndices.filter(idx => idx.getType != IndexType.primary && idx.getType != IndexType.edge)
      _ <- Future.traverse(userIndices)(idx => db.deleteIndex(idx.getId).toScala)
    } yield Unit
  }

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
        case opts: HashIndexOptions => dbCol.ensureHashIndex(fields, opts)
        case opts: SkiplistIndexOptions => dbCol.ensureSkiplistIndex(fields, opts)
      }).toScala
    })

  private def deleteAQLUserFunctions(db: ArangoDatabaseAsync) =
    for {
      fns <- db.getAqlFunctions(new AqlFunctionGetOptions).toScala.map(_.asScala)
      _ <- Future.traverse(fns)(fn => db.deleteAqlFunction(fn.getName, new AqlFunctionDeleteOptions).toScala)
    } yield Unit

  private def createAQLUserFunctions(db: ArangoDatabaseAsync) = Future.sequence(
    new PathMatchingResourcePatternResolver(getClass.getClassLoader)
      .getResources("classpath:AQLFunctions/*.js").toSeq
      .map(res => {
        val functionName = s"SPLINE::${FilenameUtils.removeExtension(res.getFilename).toUpperCase}"
        val functionBody = ARM.using(Source.fromURL(res.getURL))(_.getLines.mkString)
        db.createAqlFunction(functionName, functionBody, new AqlFunctionCreateOptions()).toScala
      }))

  private def deleteViews(db: ArangoDatabaseAsync) = {
      Future.traverse(ReflectionUtils.objectsOf[ViewDef]) { viewDef => {
        val view = db.view(viewDef.name)

        view.exists().toScala.flatMap { exists =>
          if (exists)
            view.drop().toScala
          else
            Future.successful[Unit]()
        }
      }
    }
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
