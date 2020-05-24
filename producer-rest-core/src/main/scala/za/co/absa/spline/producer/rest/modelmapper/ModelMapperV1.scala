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
      wop1.id.toString,
      wop1.childIds.map(_.toString),
      wop1.params,
      wop1.extra
    )

    val schemaByOpIds = (for {
      op1 <- plan1.operations.all
      schema1 <- op1.schema
      schema2 <- convertSchema(schema1).asOption
    } yield op1.id.toString -> schema2).toMap

    val rops = rops1.map(rop1 => ReadOperation(
      inputSources = rop1.inputSources,
      id = rop1.id.toString,
      params = rop1.params,
      extra = rop1.extra
    ))

    val dops = dops1.map(dop1 => DataOperation(
      id = dop1.id.toString,
      childIds = dop1.childIds.map(_.toString),
      params = dop1.params,
      extra = dop1.extra
    ))

    val maybeSchemas = Some(Schemas(
      mapping = schemaByOpIds,
      attributes = Nil, // Fixme in SPLINE-677
      functions = Nil, // Fixme in SPLINE-677
      constants = Nil, // Fixme in SPLINE-677
    ))

    ExecutionPlan(
      id = plan1.id,
      operations = Operations(
        write = wop,
        reads = rops,
        other = dops
      ),
      schemas = maybeSchemas,
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

  private def convertSchema(schema1: Any): Array[ExpressionLike.Id] = {
    // Fixme in SPLINE-677
    schema1.asInstanceOf[Seq[String]].toArray
  }
}
