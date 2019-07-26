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
import org.springframework.core.io.Resource
import org.springframework.core.io.support.PathMatchingResourcePatternResolver

import scala.collection.JavaConverters._
import scala.compat.java8.FutureConverters._
import scala.concurrent.Future
import scala.io.Source

trait ArangoInit {
  def initialize(connectionURL: ArangoConnectionURL, dropIfExists: Boolean): Future[GraphEntity]
}

object ArangoInit extends ArangoInit {

  import scala.concurrent.ExecutionContext.Implicits._

  def initialize(connectionURL: ArangoConnectionURL, dropIfExists: Boolean): Future[GraphEntity] = {
    val arangoFacade = new ArangoDatabaseFacade(connectionURL)
    import arangoFacade.db
    db
      .exists()
      .toScala
      .flatMap(exists => {
        if (exists && !dropIfExists) throw new IllegalArgumentException(s"Arango Database ${db.name()} already exists")
        else if (exists && dropIfExists) db.drop().toScala.flatMap(_ => createDb(db))
        else createDb(db)
      })
      .andThen({ case _ => arangoFacade.destroy() })
  }

  private def createDb(db: ArangoDatabaseAsync): Future[GraphEntity] = for {
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
    val resolver = new PathMatchingResourcePatternResolver(getClass.getClassLoader)
    val files: Array[Resource] = resolver.getResources("classpath:AQLFunctions/*.js")
    files.foreach(file => {
      val functionName = s"SPLINE::${FilenameUtils.removeExtension(file.getFile.getName).toUpperCase}"
      val functionBody = Source.fromFile(file.getURI).getLines.mkString
      db.createAqlFunction(functionName, functionBody, new AqlFunctionCreateOptions()).toScala
    })
    Future.successful()
  }


}
