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
import com.arangodb.model.{HashIndexOptions, SkiplistIndexOptions}


case class IndexDef(fields: Seq[String], options: AnyRef)

sealed trait GraphElementDef

sealed trait CollectionDef {
  this: GraphElementDef =>
  def name: String
  def collectionType: CollectionType
  def indexDefs: Seq[IndexDef] = Nil
}

sealed abstract class EdgeDef(override val name: String, val from: NodeDef, val to: NodeDef) extends GraphElementDef {
  this: CollectionDef =>
  override val collectionType = CollectionType.EDGES

  def edge(fromKey: Any, toKey: Any) = Edge(s"${from.name}/$fromKey", s"${to.name}/$toKey")
}

sealed abstract class NodeDef(override val name: String) extends GraphElementDef {
  this: CollectionDef =>
  override val collectionType = CollectionType.DOCUMENT
}

sealed abstract class GraphDef(val name: String, val edgeDefs: EdgeDef*) {
  require(edgeDefs.nonEmpty)
}


object GraphDef {

  import za.co.absa.spline.persistence.model.EdgeDef._

  object LineageOverviewGraphDef extends GraphDef("overview", ProgressOf, Depends, Affects)

  object ExecutionPlanGraphDef extends GraphDef("execPlan", Executes, Follows, ReadsFrom, WritesTo)

}

object EdgeDef {

  import za.co.absa.spline.persistence.model.NodeDef._

  object Follows extends EdgeDef("follows", Operation, Operation) with CollectionDef

  object WritesTo extends EdgeDef("writesTo", Operation, DataSource) with CollectionDef

  object ReadsFrom extends EdgeDef("readsFrom", Operation, DataSource) with CollectionDef

  object Executes extends EdgeDef("executes", ExecutionPlan, Operation) with CollectionDef

  object Depends extends EdgeDef("depends", ExecutionPlan, DataSource) with CollectionDef

  object Affects extends EdgeDef("affects", ExecutionPlan, DataSource) with CollectionDef

  object ProgressOf extends EdgeDef("progressOf", Progress, ExecutionPlan) with CollectionDef

}

object NodeDef {

  object DataSource extends NodeDef("dataSource") with CollectionDef {
    override def indexDefs: Seq[IndexDef] = Seq(
      IndexDef(Seq("uri"), (new HashIndexOptions).unique(true)))
  }

  object ExecutionPlan extends NodeDef("executionPlan") with CollectionDef

  object Operation extends NodeDef("operation") with CollectionDef {
    override def indexDefs: Seq[IndexDef] = Seq(
      IndexDef(Seq("_type"), new HashIndexOptions),
      IndexDef(Seq("outputSource"), new HashIndexOptions().sparse(true)),
      IndexDef(Seq("append"), new HashIndexOptions().sparse(true))
    )
  }

  object Progress extends NodeDef("progress") with CollectionDef {
    override def indexDefs: Seq[IndexDef] = Seq(
      IndexDef(Seq("timestamp"), new SkiplistIndexOptions),
      IndexDef(Seq("_created"), new SkiplistIndexOptions),
      IndexDef(Seq("extra.appId"), new HashIndexOptions().sparse(true)))
  }

}
