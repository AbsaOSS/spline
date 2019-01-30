package za.co.absa.spline.persistence

import java.net.URI

import com.arangodb.ArangoDatabase
import com.arangodb.entity.{CollectionType, EdgeDefinition}
import com.arangodb.model.{CollectionCreateOptions, HashIndexOptions}

import scala.collection.JavaConverters._

object ArangoInit {

  def initialize(db: ArangoDatabase): Unit = {
    db.createCollection("progress")
    db.createCollection("progressOf", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("execution")
    db.createCollection("executes", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("app")
    db.createCollection("implements", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("operation")
    db.createCollection("follows", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("readsFrom", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("writesTo", new CollectionCreateOptions().`type`(CollectionType.EDGES))
    db.createCollection("dataSource")
    db.collection("dataSource").ensureHashIndex(Seq("uri").asJava, new HashIndexOptions().unique(true))
    val edgeDefs = Seq(
      new EdgeDefinition().collection("progressOf").from("progress").to("execution"),
      new EdgeDefinition().collection("executes").from("execution").to("app"),
      new EdgeDefinition().collection("implements").from("app").to("operation"),
      new EdgeDefinition().collection("follows").from("operation").to("operation"),
      new EdgeDefinition().collection("readsFrom").from("operation").to("dataSource"),
      new EdgeDefinition().collection("writesTo").from("operation").to("dataSource")
    ).asJava
    db.createGraph("lineage", edgeDefs)
  }

}
