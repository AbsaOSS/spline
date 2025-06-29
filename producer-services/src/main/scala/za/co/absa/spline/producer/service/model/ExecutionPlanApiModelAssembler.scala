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

import org.apache.commons.lang3.StringUtils.substringAfter
import za.co.absa.commons.lang.OptionImplicits.TraversableWrapper
import za.co.absa.spline.persistence.{model => pm}
import za.co.absa.spline.producer.model.{v1_1 => am}

import java.util.UUID

object ExecutionPlanApiModelAssembler {
  def toApiModel(eppm: ExecutionPlanPersistentModel): am.ExecutionPlan = {
    val opsById: Map[pm.ArangoDocument.Id, pm.Operation] =
      eppm.operations.map(op => op._id -> op).toMap

    val writeOpModel: pm.Write =
      opsById(eppm.executes._to).asInstanceOf[pm.Write]

    val readOpModels: Seq[pm.Read] = eppm.operations
      .filter(_.`type` == pm.Operation.OpType.Read)
      .map(_.asInstanceOf[pm.Read])

    val dataOpModels: Seq[pm.Transformation] = eppm.operations
      .filter(_.`type` == pm.Operation.OpType.Transformation)
      .map(_.asInstanceOf[pm.Transformation])

    val childrenOpKeysByParentOpKey: Map[pm.ArangoDocument.Key, Seq[pm.ArangoDocument.Key]] =
      eppm.follows
        .map(e => substringAfter(e._from, "/") -> substringAfter(e._to, "/"))
        .groupBy(_._1)
        .mapValues(_.map(_._2))

    val attrKeysBySchemaKey: Map[pm.ArangoDocument.Key, Seq[pm.ArangoDocument.Key]] =
      eppm.consistsOf
        .map(e => substringAfter(e._from, "/") -> substringAfter(e._to, "/"))
        .groupBy(_._1)
        .mapValues(_.map(_._2))

    val outputAttrKeysByOpKey: Map[pm.ArangoDocument.Key, Seq[pm.ArangoDocument.Key]] =
      eppm.emits
        .map(e => {
          val opId = e._from
          val schemaKey = substringAfter(e._to, "/")
          val attrKeys = attrKeysBySchemaKey(schemaKey)
          substringAfter(opId, "/") -> attrKeys
        })
        .toMap

    // Assembling components of the API model ExecutionPlan

    val operations = am.Operations(
      write = am.WriteOperation(
        id = ExecutionPlanKeyConverter.toLocalKey(writeOpModel._key),
        name = writeOpModel.name,
        childIds = childrenOpKeysByParentOpKey(writeOpModel._key).map(ExecutionPlanKeyConverter.toLocalKey),
        outputSource = writeOpModel.outputSource,
        append = writeOpModel.append,
        params = writeOpModel.params,
        extra = writeOpModel.extra
      ),
      reads = readOpModels.map(rop => am.ReadOperation(
        id = ExecutionPlanKeyConverter.toLocalKey(rop._key),
        name = rop.name,
        inputSources = rop.inputSources,
        output = outputAttrKeysByOpKey.get(rop._key).map(_.map(ExecutionPlanKeyConverter.toLocalKey)),
        params = rop.params,
        extra = rop.extra
      )),
      other = dataOpModels.map(dop => am.DataOperation(
        id = ExecutionPlanKeyConverter.toLocalKey(dop._key),
        name = dop.name,
        childIds = childrenOpKeysByParentOpKey(dop._key).map(ExecutionPlanKeyConverter.toLocalKey),
        output = outputAttrKeysByOpKey.get(dop._key).map(_.map(ExecutionPlanKeyConverter.toLocalKey)),
        params = dop.params,
        extra = dop.extra
      )),
    )

    val attributes = eppm.attributes.map(attr => am.Attribute(
      id = attr._key,
      name = attr.name,
      dataType = attr.dataType,
      childRefs = ???,
      extra = attr.extra
    ))

    val maybeExpressions = eppm.expressions.asOption.map(exprs => {
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
    })

    // Assembling the final entity

    am.ExecutionPlan(
      id = UUID.fromString(eppm.executionPlan._key),
      name = eppm.executionPlan.name,
      discriminator = eppm.executionPlan.discriminator,
      operations = operations,
      attributes = attributes,
      expressions = maybeExpressions,
      systemInfo = am.NameAndVersion.fromMap(eppm.executionPlan.systemInfo),
      agentInfo = eppm.executionPlan.agentInfo.asOption.map(am.NameAndVersion.fromMap),
      extraInfo = eppm.executionPlan.extra
    )
  }
}
