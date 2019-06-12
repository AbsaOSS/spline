/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.model.op

import java.util.UUID

import za.co.absa.spline.model.expr.Expression
import za.co.absa.spline.model.{MetaDataSource, TypedMetaDataSource}

/**
  * The case class represents node properties that are common for all node types.
  *
  * @param id     An unique identifier of the operation
  * @param name   A operation name
  * @param inputs Input datasets' IDs
  * @param output Output dataset ID
  */
@Deprecated
case class OperationProps
(
  id: UUID,
  name: String,
  inputs: Seq[UUID],
  output: UUID
)

@Deprecated
trait ExpressionAware {
  def expressions: Seq[Expression]
}

/**
  * The trait represents one particular node within a lineage graph.
  */
@Deprecated
sealed trait Operation {
  /**
    * Common properties of all node types.
    */
  val mainProps: OperationProps
}

@Deprecated
object Operation {

  implicit class OperationMutator[T <: Operation](op: T) {
    /**
      * The method creates a copy of the operation with modified mainProps
      *
      * @param fn New main properties
      * @return A copy with new main properties
      */
    def updated(fn: OperationProps => OperationProps): T = (op.asInstanceOf[Operation] match {
      case op@Generic(mp, _) => throw new RuntimeException("To be deleted")
    }).asInstanceOf[T]
  }

}

/**
  * The case class represents any Spark operation for which a dedicated node type hasn't been created yet.
  *
  * @param mainProps Common node properties
  * @param rawString String representation of the node
  */
@Deprecated
case class Generic(mainProps: OperationProps, rawString: String) extends Operation