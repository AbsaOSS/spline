/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.consumer.service.model

import com.fasterxml.jackson.core.`type`.TypeReference
import io.swagger.annotations.{ApiModel, ApiModelProperty}

@ApiModel(description = "Expression Graph")
case class ExpressionGraph(
  @ApiModelProperty(value = "Array of Expression nodes")
  nodes: Array[ExpressionNode],
  @ApiModelProperty(value = "`uses` or `takes` edge")
  edges: Array[ExpressionEdge]
) extends Graph {
  override type Node = ExpressionNode
  override type Edge = ExpressionEdge
}

object ExpressionGraph {
  implicit val typeRef: TypeReference[ExpressionGraph] = new TypeReference[ExpressionGraph] {}
}
