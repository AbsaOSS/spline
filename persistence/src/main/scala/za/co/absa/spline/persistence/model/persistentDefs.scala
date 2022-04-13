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

package za.co.absa.spline.persistence.model

import com.arangodb.entity.CollectionType
import com.arangodb.entity.arangosearch._
import com.arangodb.entity.arangosearch.analyzer.{NormAnalyzer, NormAnalyzerProperties, SearchAnalyzer, SearchAnalyzerCase}
import com.arangodb.model.arangosearch.ArangoSearchCreateOptions
import com.arangodb.model.{IndexOptions, PersistentIndexOptions}
import za.co.absa.commons.reflect.ReflectionUtils
import za.co.absa.spline.persistence.model
import za.co.absa.spline.persistence.model.SearchAnalyzerDef.NormSearchAnalyzer

case class IndexDef(fields: Seq[String], options: IndexOptions[_ <: IndexOptions[_]])

sealed trait GraphElementDef

sealed trait CollectionDef {
  def name: String
  def collectionType: CollectionType
  def indexDefs: Seq[IndexDef] = Nil
  def numShards: Int = 1
  def shardKeys: Seq[String] = Seq("_key")
  def replFactor: Int = 1
  def initData: Seq[AnyRef] = Nil
}

sealed abstract class EdgeDef(override val name: String, val froms: Seq[NodeDef], val tos: Seq[NodeDef])
  extends GraphElementDef {
  this: CollectionDef =>
  override def collectionType = CollectionType.EDGES
}

sealed abstract class Edge11Def(name: String, val from: NodeDef, val to: NodeDef, val belongsTo: Option[CollectionDef])
  extends EdgeDef(name, Seq(from), Seq(to)) {
  this: CollectionDef =>

  def this(name: String, from: NodeDef, to: NodeDef, belongTo: CollectionDef) = this(name, from, to, Option(belongTo))

  // todo: think about making keys strong typed
  def edge(fromKey: Any, toKey: Any): Edge = {
    assert(belongsTo.isEmpty, s"'belongsTo' is defined for '$name', but no aggregate ID is provided")
    Edge(s"${from.name}/$fromKey", s"${to.name}/$toKey", None, None, None)
  }

  def edge(fromKey: Any, toKey: Any, belongsToKey: ArangoDocument.Key): Edge = {
    assert(belongsTo.nonEmpty, s"`belongsTo` is undefined for '$name', but aggregate ID is provided")
    Edge(s"${from.name}/$fromKey", s"${to.name}/$toKey", belongsTo.map(p => s"${p.name}/$belongsToKey"), None, None)
  }

  def edge(fromKey: Any, toKey: Any, belongsToKey: ArangoDocument.Key, index: Int): Edge = {
    assert(belongsTo.nonEmpty, s"`belongsTo` is undefined for '$name', but aggregate ID is provided")
    Edge(s"${from.name}/$fromKey", s"${to.name}/$toKey", belongsTo.map(p => s"${p.name}/$belongsToKey"), Some(index), None)
  }
}

sealed abstract class Edge12Def(name: String, val from: NodeDef, val to1: NodeDef, val to2: NodeDef, val belongsTo: Option[CollectionDef])
  extends EdgeDef(name, Seq(from), Seq(to1, to2)) {
  this: CollectionDef =>

  def this(name: String, from: NodeDef, to1: NodeDef, to2: NodeDef, belongsTo: CollectionDef) = this(name, from, to1, to2, Option(belongsTo))

  protected def edgeTo1(fromKey: Any, toKey: Any, belongsToKey: ArangoDocument.Key, index: Option[Int] = None, path: Option[Edge.FromPath] = None): Edge =
    Edge(s"${from.name}/$fromKey", s"${to1.name}/$toKey", belongsTo.map(p => s"${p.name}/$belongsToKey"), index, path)

  protected def edgeTo2(fromKey: Any, toKey: Any, belongsToKey: ArangoDocument.Key, index: Option[Int] = None, path: Option[Edge.FromPath] = None): Edge =
    Edge(s"${from.name}/$fromKey", s"${to2.name}/$toKey", belongsTo.map(p => s"${p.name}/$belongsToKey"), index, path)
}

sealed trait EdgeToAttrOrExprOps {
  this: Edge12Def =>

  def edgeToAttr(from: Any, to: Any, belongsToKey: ArangoDocument.Key, path: Edge.FromPath): Edge = edgeTo1(from, to, belongsToKey, None, Some(path))
  def edgeToAttr(from: Any, to: Any, belongsToKey: ArangoDocument.Key, index: Int): Edge = edgeTo1(from, to, belongsToKey, Some(index), None)

  def edgeToExpr(from: Any, to: Any, belongsToKey: ArangoDocument.Key, path: Edge.FromPath): Edge = edgeTo2(from, to, belongsToKey, None, Some(path))
  def edgeToExpr(from: Any, to: Any, belongsToKey: ArangoDocument.Key, index: Int): Edge = edgeTo2(from, to, belongsToKey, Some(index), None)
}

sealed abstract class NodeDef(override val name: String)
  extends GraphElementDef {
  this: CollectionDef =>
  override def collectionType = CollectionType.DOCUMENT
}

sealed abstract class GraphDef(val name: String, val edgeDefs: EdgeDef*) {
  require(edgeDefs.nonEmpty)
}

sealed abstract class SearchViewDef(val name: String, val properties: ArangoSearchCreateOptions)

sealed trait SearchAnalyzerDef {
  this: SearchAnalyzer =>
  def analyzer: SearchAnalyzer = this
  def name: String = getName
}

object GraphDef {
  // A place to define named graphs.
  // Example:
  //   object MyGraphDef extends GraphDef("myGraph", EdgeDef.Foo, EdgeDef.Bar, ...)
}

object EdgeDef {

  import za.co.absa.spline.persistence.model.NodeDef._

  object Follows extends Edge11Def("follows", Operation, Operation, ExecutionPlan) with CollectionDef {
    override def indexDefs: Seq[IndexDef] = Seq(
      IndexDef(Seq("_belongsTo"), new PersistentIndexOptions),
    )
  }

  object WritesTo extends Edge11Def("writesTo", Operation, DataSource, ExecutionPlan) with CollectionDef

  object ReadsFrom extends Edge11Def("readsFrom", Operation, DataSource, ExecutionPlan) with CollectionDef

  object Executes extends Edge11Def("executes", ExecutionPlan, Operation, ExecutionPlan) with CollectionDef

  object Depends extends Edge11Def("depends", ExecutionPlan, DataSource, ExecutionPlan) with CollectionDef

  object Affects extends Edge11Def("affects", ExecutionPlan, DataSource, ExecutionPlan) with CollectionDef

  object ProgressOf extends Edge11Def("progressOf", Progress, ExecutionPlan, None) with CollectionDef

  object Emits extends Edge11Def("emits", Operation, Schema, ExecutionPlan) with CollectionDef

  object Produces extends Edge11Def("produces", Operation, Attribute, ExecutionPlan) with CollectionDef

  object ConsistsOf extends Edge11Def("consistsOf", Schema, Attribute, ExecutionPlan) with CollectionDef

  object ComputedBy extends Edge11Def("computedBy", Attribute, Expression, ExecutionPlan) with CollectionDef

  object DerivesFrom extends Edge11Def("derivesFrom", Attribute, Attribute, ExecutionPlan) with CollectionDef

  object Takes extends Edge12Def("takes", Expression, Attribute, Expression, ExecutionPlan) with EdgeToAttrOrExprOps with CollectionDef

  object Uses extends Edge12Def("uses", Operation, Attribute, Expression, ExecutionPlan) with EdgeToAttrOrExprOps with CollectionDef

}

object NodeDef {

  object DataSource extends NodeDef("dataSource") with CollectionDef {

    override def shardKeys: Seq[String] = Seq("uri")

    override def indexDefs: Seq[IndexDef] = Seq(
      IndexDef(Seq("_created"), new PersistentIndexOptions),
      IndexDef(Seq("uri"), (new PersistentIndexOptions).unique(true)),
      IndexDef(Seq("name"), new PersistentIndexOptions),
    )
  }

  object ExecutionPlan extends NodeDef("executionPlan") with CollectionDef {
    def id(key: ArangoDocument.Key): ArangoDocument.Id = s"$name/$key"

  }

  object Operation extends NodeDef("operation") with CollectionDef {
    override def indexDefs: Seq[IndexDef] = Seq(
      IndexDef(Seq("_belongsTo"), new PersistentIndexOptions),
      IndexDef(Seq("type"), new PersistentIndexOptions),
      IndexDef(Seq("outputSource"), new PersistentIndexOptions().sparse(true)),
      IndexDef(Seq("append"), new PersistentIndexOptions().sparse(true))
    )
  }

  object Progress extends NodeDef("progress") with CollectionDef {
    override def indexDefs: Seq[IndexDef] = Seq(
      IndexDef(Seq("timestamp"), new PersistentIndexOptions),
      IndexDef(Seq("durationNs"), new PersistentIndexOptions),
      IndexDef(Seq("_created"), new PersistentIndexOptions),
      IndexDef(Seq("extra.appId"), new PersistentIndexOptions().sparse(true)),
      IndexDef(Seq("execPlanDetails.executionPlanKey"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.frameworkName"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.applicationName"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.dataSourceUri"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.dataSourceName"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.dataSourceType"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.append"), new PersistentIndexOptions))
  }

  object Schema extends NodeDef("schema") with CollectionDef

  object Attribute extends NodeDef("attribute") with CollectionDef

  object Expression extends NodeDef("expression") with CollectionDef

}

object CollectionDef {

  val forName: String => CollectionDef =
    ReflectionUtils.objectsOf[CollectionDef].map(d => d.name -> d).toMap

  object DBVersion extends CollectionDef {
    override def collectionType = CollectionType.DOCUMENT

    override def name: String = "dbVersion"
  }

  object Counter extends CollectionDef {
    override def collectionType = CollectionType.DOCUMENT

    override def name: String = "counter"

    override def initData: Seq[AnyRef] = Seq(model.Counter("tx", 0))
  }

}

object SearchViewDef {

  object ProgressSearchView extends SearchViewDef(
    s"${NodeDef.Progress.name}_view",
    (new ArangoSearchCreateOptions)
      .link(CollectionLink.on(NodeDef.Progress.name)
        .fields(
          FieldLink.on("_created"),
          FieldLink.on("timestamp"),
          FieldLink.on("extra").fields(
            FieldLink.on("appId").analyzers(NormSearchAnalyzer.name, AnalyzerType.identity.name)
          ),
          FieldLink.on("execPlanDetails").fields(
            FieldLink.on("append"),
            FieldLink.on("applicationName").analyzers(NormSearchAnalyzer.name),
            FieldLink.on("frameworkName").analyzers(NormSearchAnalyzer.name),
            FieldLink.on("dataSourceUri").analyzers(NormSearchAnalyzer.name, AnalyzerType.identity.name),
            FieldLink.on("dataSourceType").analyzers(NormSearchAnalyzer.name),
          ),
          FieldLink.on("labels")
            .includeAllFields(true).analyzers(NormSearchAnalyzer.name, AnalyzerType.identity.name),
        )
      ))

  object DataSourceSearchView extends SearchViewDef(
    s"${NodeDef.DataSource.name}_view",
    (new ArangoSearchCreateOptions)
      .link(CollectionLink.on(NodeDef.DataSource.name)
        .fields(
          FieldLink.on("_created"),
          FieldLink.on("uri"),
          FieldLink.on("name").analyzers(NormSearchAnalyzer.name, AnalyzerType.identity.name),
          FieldLink.on("lastWriteDetails")
            .storeValues(StoreValuesType.ID)
            .fields(
              FieldLink.on("timestamp"),
              FieldLink.on("durationNs"),
              FieldLink.on("extra").fields(
                FieldLink.on("appId").analyzers(NormSearchAnalyzer.name, AnalyzerType.identity.name)
              ),
              FieldLink.on("labels")
                .includeAllFields(true).analyzers(NormSearchAnalyzer.name, AnalyzerType.identity.name),
              FieldLink.on("execPlanDetails").fields(
                FieldLink.on("append"),
                FieldLink.on("applicationName").analyzers(NormSearchAnalyzer.name),
                FieldLink.on("frameworkName").analyzers(NormSearchAnalyzer.name),
                FieldLink.on("dataSourceType").analyzers(NormSearchAnalyzer.name),
              )
            )
        )
      )
  )
}

object SearchAnalyzerDef {
  object NormSearchAnalyzer extends NormAnalyzer with SearchAnalyzerDef {
    setName("norm_en")
    setProperties(new NormAnalyzerProperties {
      setAnalyzerCase(SearchAnalyzerCase.lower)
      setAccent(false)
      setLocale("en.utf-8")
    })
  }
}
