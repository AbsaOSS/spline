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
import com.arangodb.entity.arangosearch.{CollectionLink, FieldLink}
import com.arangodb.model.PersistentIndexOptions
import com.arangodb.model.arangosearch.ArangoSearchPropertiesOptions


case class IndexDef(fields: Seq[String], options: AnyRef)

sealed trait GraphElementDef

sealed trait CollectionDef {
  def name: String
  def collectionType: CollectionType
  def indexDefs: Seq[IndexDef] = Nil
}

sealed abstract class EdgeDef(override val name: String, val froms: Seq[NodeDef], val tos: Seq[NodeDef])
  extends GraphElementDef {
  this: CollectionDef =>
  override def collectionType = CollectionType.EDGES
}

sealed abstract class Edge11Def(name: String, val from: NodeDef, val to: NodeDef)
  extends EdgeDef(name, Seq(from), Seq(to)) {
  this: CollectionDef =>
  // todo: think about making keys strong typed
  def edge(fromKey: Any, toKey: Any): Edge =
    Edge(s"${from.name}/$fromKey", s"${to.name}/$toKey", None, None)

  def edge(fromKey: Any, toKey: Any, index: Int): Edge =
    Edge(s"${from.name}/$fromKey", s"${to.name}/$toKey", Some(index), None)
}

sealed abstract class Edge12Def(name: String, val from: NodeDef, val to1: NodeDef, val to2: NodeDef)
  extends EdgeDef(name, Seq(from), Seq(to1, to2)) {
  this: CollectionDef =>

  protected def edgeTo1(fromKey: Any, toKey: Any, index: Option[Int] = None, path: Option[String] = None): Edge =
    Edge(s"${from.name}/$fromKey", s"${to1.name}/$toKey", index, path)

  protected def edgeTo2(fromKey: Any, toKey: Any, index: Option[Int] = None, path: Option[String] = None): Edge =
    Edge(s"${from.name}/$fromKey", s"${to2.name}/$toKey", index, path)
}

sealed trait EdgeToAttrOrExprOps {
  this: Edge12Def =>

  def edgeToAttr(from: Any, to: Any, path: String): Edge = edgeTo1(from, to, None, Some(path))
  def edgeToAttr(from: Any, to: Any, index: Int): Edge = edgeTo1(from, to, Some(index), None)

  def edgeToExpr(from: Any, to: Any, path: String): Edge = edgeTo2(from, to, None, Some(path))
  def edgeToExpr(from: Any, to: Any, index: Int): Edge = edgeTo2(from, to, Some(index), None)
}

sealed abstract class NodeDef(override val name: String)
  extends GraphElementDef {
  this: CollectionDef =>
  override def collectionType = CollectionType.DOCUMENT
}

sealed abstract class GraphDef(val name: String, val edgeDefs: EdgeDef*) {
  require(edgeDefs.nonEmpty)
}

sealed abstract class ViewDef(val name: String, val properties: ArangoSearchPropertiesOptions)

object GraphDef {

  import za.co.absa.spline.persistence.model.EdgeDef._

  object OverviewGraphDef extends GraphDef("overviewGraph", ProgressOf, Depends, Affects)

  object OperationsGraphDef extends GraphDef("operationsGraph", Executes, Follows, ReadsFrom, WritesTo)

  object SchemasGraphDef extends GraphDef("schemasGraph", Emits, ConsistsOf)

  object AttributesGraphDef extends GraphDef("attributesGraph", Produces, DerivesFrom)

  object ExpressionsGraphDef extends GraphDef("expressionsGraph", ComputedBy, Takes)

}

object EdgeDef {

  import za.co.absa.spline.persistence.model.NodeDef._

  object Follows extends Edge11Def("follows", Operation, Operation) with CollectionDef

  object WritesTo extends Edge11Def("writesTo", Operation, DataSource) with CollectionDef

  object ReadsFrom extends Edge11Def("readsFrom", Operation, DataSource) with CollectionDef

  object Executes extends Edge11Def("executes", ExecutionPlan, Operation) with CollectionDef

  object Depends extends Edge11Def("depends", ExecutionPlan, DataSource) with CollectionDef

  object Affects extends Edge11Def("affects", ExecutionPlan, DataSource) with CollectionDef

  object ProgressOf extends Edge11Def("progressOf", Progress, ExecutionPlan) with CollectionDef

  object Emits extends Edge11Def("emits", Operation, Schema) with CollectionDef

  object Produces extends Edge11Def("produces", Operation, Attribute) with CollectionDef

  object ConsistsOf extends Edge11Def("consistsOf", Schema, Attribute) with CollectionDef

  object ComputedBy extends Edge11Def("computedBy", Attribute, Expression) with CollectionDef

  object DerivesFrom extends Edge11Def("derivesFrom", Attribute, Attribute) with CollectionDef

  object Takes extends Edge12Def("takes", Expression, Attribute, Expression) with EdgeToAttrOrExprOps with CollectionDef

  object Uses extends Edge12Def("uses", Operation, Attribute, Expression) with EdgeToAttrOrExprOps with CollectionDef

}

object NodeDef {

  object DataSource extends NodeDef("dataSource") with CollectionDef {
    override def indexDefs: Seq[IndexDef] = Seq(
      IndexDef(Seq("uri"), (new PersistentIndexOptions).unique(true)))
  }

  object ExecutionPlan extends NodeDef("executionPlan") with CollectionDef

  object Operation extends NodeDef("operation") with CollectionDef {
    override def indexDefs: Seq[IndexDef] = Seq(
      IndexDef(Seq("type"), new PersistentIndexOptions),
      IndexDef(Seq("outputSource"), new PersistentIndexOptions().sparse(true)),
      IndexDef(Seq("append"), new PersistentIndexOptions().sparse(true))
    )
  }

  object Progress extends NodeDef("progress") with CollectionDef {
    override def indexDefs: Seq[IndexDef] = Seq(
      IndexDef(Seq("timestamp"), new PersistentIndexOptions),
      IndexDef(Seq("_created"), new PersistentIndexOptions),
      IndexDef(Seq("extra.appId"), new PersistentIndexOptions().sparse(true)),
      IndexDef(Seq("execPlanDetails.executionPlanId"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.frameworkName"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.applicationName"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.dataSourceUri"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.dataSourceType"), new PersistentIndexOptions),
      IndexDef(Seq("execPlanDetails.append"), new PersistentIndexOptions))
  }

  object Schema extends NodeDef("schema") with CollectionDef

  object Attribute extends NodeDef("attribute") with CollectionDef

  object Expression extends NodeDef("expression") with CollectionDef

}

object CollectionDef {

  object DBVersion extends CollectionDef {
    override def collectionType = CollectionType.DOCUMENT

    override def name: String = "dbVersion"
  }

}

object ViewDef {

  object AttributeSearchView extends ViewDef("attributeSearchView",
    (new ArangoSearchPropertiesOptions)
      .link(CollectionLink.on(NodeDef.Attribute.name)
        .analyzers("text_en", "identity")
        .fields(FieldLink.on("name"))))

}
