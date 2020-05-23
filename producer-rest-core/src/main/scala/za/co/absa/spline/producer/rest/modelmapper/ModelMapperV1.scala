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

package za.co.absa.spline.producer.rest.modelmapper

import za.co.absa.spline.producer.model.v1_1._
import za.co.absa.spline.producer.model.{ExecutionEvent => ExecutionEventV1, ExecutionPlan => ExecutionPlanV1, Operations => OperationsV1}

object ModelMapperV1 extends ModelMapper {

  import za.co.absa.commons.lang.OptionImplicits._

  override type P = ExecutionPlanV1
  override type E = ExecutionEventV1

  override def fromDTO(plan1: ExecutionPlanV1): ExecutionPlan = {

    val OperationsV1(wop1, rops1, dops1) = plan1.operations

    val wop = WriteOperation(
      wop1.outputSource,
      wop1.append,
      wop1.id,
      wop1.childIds,
      wop1.params,
      wop1.extra
    )

    val schemaByOpIds = (for {
      rop1 <- rops1
      schema1 <- rop1.schema
      schema2 <- convertSchema(schema1).asOption
    } yield rop1.id -> schema2).toMap

    val rops = rops1.map(rop1 => ReadOperation(
      inputSources = rop1.inputSources,
      id = rop1.id,
      params = rop1.params,
      extra = rop1.extra
    ))

    val dops = dops1.map(dop1 => DataOperation(
      id = dop1.id,
      childIds = dop1.childIds,
      params = dop1.params,
      extra = dop1.extra
    ))

    val maybeAttributes = Some(Attributes(
      operationSchemaMapping = schemaByOpIds,
      // Fixme in SPLINE-677
      attributeExpressionMapping = Map.empty,
      attrDefs = Nil,
      exprDefs = Nil,
    ))

    ExecutionPlan(
      id = plan1.id,
      operations = Operations(
        write = wop,
        reads = rops,
        other = dops
      ),
      attributes = maybeAttributes,
      systemInfo = NameAndVersion(plan1.systemInfo.name, plan1.systemInfo.version),
      agentInfo = plan1.agentInfo.map(ai => NameAndVersion(ai.name, ai.version)),
      extraInfo = plan1.extraInfo
    )
  }

  override def fromDTO(event: ExecutionEventV1): ExecutionEvent = ExecutionEvent(
    planId = event.planId,
    timestamp = event.timestamp,
    error = event.error,
    extra = event.extra
  )

  private def convertSchema(schema1: Any): Array[Attribute.Id] = {
    // Fixme in SPLINE-677
    schema1.asInstanceOf[Seq[String]].toArray
  }
}
