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

import com.arangodb.ArangoDatabase
import com.arangodb.entity.{CollectionType, EdgeDefinition}
import com.arangodb.model.{CollectionCreateOptions, HashIndexOptions}

import scala.collection.JavaConverters._

object ArangoInit {

  def initialize(db: ArangoDatabase, dropIfExists: Boolean): Unit = {
    if (db.exists()) {
      if (dropIfExists) db.drop()
      else throw new IllegalArgumentException(s"Arango Database ${db.name()} already exists")
    }
    db.create()
    db.createCollection("progress")
    db.createCollection("progressOf", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("execution")
    db.createCollection("executes", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("operation")
    db.createCollection("follows", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("readsFrom", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("writesTo", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("dataSource")
    db.collection("dataSource").ensureHashIndex(Seq("uri").asJava, new HashIndexOptions().unique(true))
    val edgeDefs = Seq(
      new EdgeDefinition().collection("progressOf").from("progress").to("execution"),
      new EdgeDefinition().collection("executes").from("execution").to("operation"),
      new EdgeDefinition().collection("follows").from("operation").to("operation"),
      new EdgeDefinition().collection("readsFrom").from("operation").to("dataSource"),
      new EdgeDefinition().collection("writesTo").from("operation").to("dataSource")
    ).asJava
    db.createGraph("lineage", edgeDefs)
  }

}
