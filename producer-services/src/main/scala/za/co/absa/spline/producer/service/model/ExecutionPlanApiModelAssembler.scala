/*
 * Copyright 2025 ABSA Group Limited
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

package za.co.absa.spline.producer.service.model

import za.co.absa.commons.lang.OptionImplicits.TraversableWrapper
import za.co.absa.spline.persistence.{model => pm}
import za.co.absa.spline.producer.model.{v1_1 => am}

import java.util.UUID

object ExecutionPlanApiModelAssembler {
  def toApiModel(eppm: ExecutionPlanPersistentModel): am.ExecutionPlan = {

    val opsById: Map[String, pm.Operation] =
      eppm.operations.map(op => op._id -> op).toMap

    val childrenKeysByOpKey: Map[String, Seq[String]] =
      eppm.follows
        .groupBy(_._to)
        .mapValues(_.map(_._from))

    val writeOpModel: pm.Write =
      opsById(eppm.executes._to).asInstanceOf[pm.Write]

    val readOpModels: Seq[pm.Read] = eppm.operations
      .filter(_.`type` == pm.Operation.OpType.Read)
      .map(_.asInstanceOf[pm.Read])

    val dataOpModels: Seq[pm.Transformation] = eppm.operations
      .filter(_.`type` == pm.Operation.OpType.Transformation)
      .map(_.asInstanceOf[pm.Transformation])

    val attrKeysByOpKey: Map[String, Seq[String]] = eppm.schemas.map(???).toMap

    am.ExecutionPlan(
      id = UUID.fromString(eppm.executionPlan._key),
      name = eppm.executionPlan.name,
      discriminator = eppm.executionPlan.discriminator,

      operations = am.Operations(
        write = am.WriteOperation(
          id = writeOpModel._key,
          name = writeOpModel.name,
          childIds = childrenKeysByOpKey(writeOpModel._key),
          outputSource = writeOpModel.outputSource,
          append = writeOpModel.append,
          params = writeOpModel.params,
          extra = writeOpModel.extra
        ),
        reads = readOpModels.map(rop => am.ReadOperation(
          id = rop._key,
          name = rop.name,
          inputSources = rop.inputSources,
          output = attrKeysByOpKey(rop._key).asOption,
          params = rop.params,
          extra = rop.extra
        )),
        other = dataOpModels.map(dop => am.DataOperation(
          id = dop._key,
          name = dop.name,
          childIds = childrenKeysByOpKey(dop._key),
          output = attrKeysByOpKey(dop._key).asOption,
          params = dop.params,
          extra = dop.extra
        )),
      ),

      attributes = eppm.attributes.map(attr => am.Attribute(
        id = attr._key,
        name = attr.name,
        dataType = attr.dataType,
        childRefs = ???,
        extra = attr.extra
      )),

      expressions = eppm.expressions.asOption.map(exprs => {
        val (
          funcExprModels: Seq[pm.FunctionalExpression],
          litExprModels: Seq[pm.LiteralExpression]
          ) = exprs.partition(_.isInstanceOf[pm.FunctionalExpression])

        am.Expressions(
          functions = funcExprModels.map(fe => am.FunctionalExpression(
            id = fe._key,
            name = fe.name,
            childRefs = ???,
            dataType = fe.dataType,
            params = fe.params,
            extra = fe.extra
          )),
          constants = litExprModels.map(le => am.Literal(
            id = le._key,
            value = le.value,
            dataType = le.dataType,
            extra = le.extra
          ))
        )
      }),

      systemInfo = am.NameAndVersion(
        name = eppm.executionPlan.systemInfo("name").toString,
        version = eppm.executionPlan.systemInfo("version").toString
      ),

      agentInfo = eppm.executionPlan.agentInfo.asOption.map(ai => am.NameAndVersion(
        name = ai("name").toString,
        version = ai("version").toString
      )),

      extraInfo = eppm.executionPlan.extra
    )
  }
}
