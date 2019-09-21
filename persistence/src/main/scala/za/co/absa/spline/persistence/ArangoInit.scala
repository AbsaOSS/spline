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

import com.arangodb.ArangoDatabaseAsync
import com.arangodb.entity.{CollectionType, EdgeDefinition, GraphEntity}
import com.arangodb.model.{AqlFunctionCreateOptions, CollectionCreateOptions, HashIndexOptions}
import org.apache.commons.io.FilenameUtils
import org.springframework.core.io.support.PathMatchingResourcePatternResolver
import za.co.absa.spline.common.ARM

import scala.collection.JavaConverters._
import scala.compat.java8.FutureConverters._
import scala.concurrent.Future
import scala.io.Source
import scala.util.{Failure, Success, Try}

trait ArangoInit {
  def initialize(connectionURL: ArangoConnectionURL, dropIfExists: Boolean): Future[GraphEntity]
}

object ArangoInit extends ArangoInit {

  import scala.concurrent.ExecutionContext.Implicits._

  def initialize(connectionURL: ArangoConnectionURL, dropIfExists: Boolean): Future[GraphEntity] = {
    val arangoFacade = new ArangoDatabaseFacade(connectionURL)
    import arangoFacade.db

    val createGraphDbAttempt = Try(
      for {
        exists <- db.exists.toScala
        _ <-
          if (exists && !dropIfExists) throw new IllegalArgumentException(s"Arango Database ${db.name()} already exists")
          else if (exists && dropIfExists) db.drop().toScala
          else Future.successful(Unit)
        graphDb <- createGraphDb(db)
      } yield graphDb)

    val eventualGraphDb = createGraphDbAttempt match {
      case Failure(e) => Future.failed(e)
      case Success(graphDbFuture) => graphDbFuture
    }

    eventualGraphDb.andThen({
      case _ => arangoFacade.destroy()
    })
  }

  private def createGraphDb(db: ArangoDatabaseAsync): Future[GraphEntity] = for {
    _ <- db.create().toScala
    _ <- createAQLUserFunctions(db)
    _ <- db.createCollection("progress").toScala
    _ <- db.createCollection("progressOf", new CollectionCreateOptions().`type`(CollectionType.EDGES)).toScala
    _ <- db.createCollection("execution").toScala
    _ <- db.createCollection("executes", new CollectionCreateOptions().`type`(CollectionType.EDGES)).toScala
    _ <- db.createCollection("operation").toScala
    _ <- db.createCollection("follows", new CollectionCreateOptions().`type`(CollectionType.EDGES)).toScala
    _ <- db.createCollection("readsFrom", new CollectionCreateOptions().`type`(CollectionType.EDGES)).toScala
    _ <- db.createCollection("writesTo", new CollectionCreateOptions().`type`(CollectionType.EDGES)).toScala
    _ <- db.createCollection("dataSource").toScala
    _ <- db.collection("dataSource").ensureHashIndex(Seq("uri").asJava, new HashIndexOptions().unique(true)).toScala
    edgeDefs = Seq(
      new EdgeDefinition().collection("progressOf").from("progress").to("execution"),
      new EdgeDefinition().collection("executes").from("execution").to("operation"),
      new EdgeDefinition().collection("follows").from("operation").to("operation"),
      new EdgeDefinition().collection("readsFrom").from("operation").to("dataSource"),
      new EdgeDefinition().collection("writesTo").from("operation").to("dataSource")
    ).asJava
    graph <- db.createGraph("lineage", edgeDefs).toScala
  } yield graph

  private def createAQLUserFunctions(db: ArangoDatabaseAsync) = {
    val futures = new PathMatchingResourcePatternResolver(getClass.getClassLoader)
      .getResources("classpath:AQLFunctions/*.js")
      .map(res => {
        val functionName = s"SPLINE::${FilenameUtils.removeExtension(res.getFilename).toUpperCase}"
        val functionBody = ARM.using(Source.fromURL(res.getURL))(_.getLines.mkString)
        db.createAqlFunction(functionName, functionBody, new AqlFunctionCreateOptions())
          .toScala
          .map(_ => Unit)
      })
    Future.reduce(futures)((_, _) => Unit)
  }


}
