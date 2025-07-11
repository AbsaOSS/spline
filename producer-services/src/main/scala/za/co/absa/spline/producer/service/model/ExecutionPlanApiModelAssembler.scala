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
import za.co.absa.spline.persistence.model.NodeDef
import za.co.absa.spline.persistence.{model => pm}
import za.co.absa.spline.producer.model.v1_1.AttrOrExprRef
import za.co.absa.spline.producer.model.v1_1.AttrOrExprRef.exprRef
import za.co.absa.spline.producer.model.{v1_1 => am}
import za.co.absa.spline.producer.service.model.ExecutionPlanKeyConverter.toLocalKey

import java.util.UUID

object ExecutionPlanApiModelAssembler {
  def toApiModel(eppm: ExecutionPlanPersistentModel): am.ExecutionPlan = {
    val writeOpModel: pm.Write = eppm.operations.collectFirst({ case wop: pm.Write => wop }).get
    val readOpModels: Seq[pm.Read] = eppm.operations.collect({ case rop: pm.Read => rop })
    val dataOpModels: Seq[pm.Transformation] = eppm.operations.collect({ case dop: pm.Transformation => dop })

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

    val exprKeyByAttrKeyItComputes: Map[pm.ArangoDocument.Key, pm.ArangoDocument.Key] =
      eppm.computedBy
        .map(e => substringAfter(e._from, "/") -> substringAfter(e._to, "/"))
        .toMap

    val exprChildRefsByParentExprKey: Map[pm.ArangoDocument.Key, Seq[AttrOrExprRef]] =
      eppm.takes
        .map(e => substringAfter(e._from, "/") -> {
          val Array(collectionName, objKey) = e._to.split("/", 2)
          collectionName match {
            case NodeDef.Expression.name => am.AttrOrExprRef.attrRef(toLocalKey(objKey))
            case NodeDef.Attribute.name => am.AttrOrExprRef.attrRef(toLocalKey(objKey))
          }
        })
        .groupBy(_._1)
        .mapValues(_.map(_._2))


    // Assembling components of the API model ExecutionPlan

    val operations = am.Operations(
      write = am.WriteOperation(
        id = toLocalKey(writeOpModel._key),
        name = writeOpModel.name,
        childIds = childrenOpKeysByParentOpKey(writeOpModel._key).map(toLocalKey),
        outputSource = writeOpModel.outputSource,
        append = writeOpModel.append,
        params = writeOpModel.params,
        extra = writeOpModel.extra
      ),
      reads = readOpModels.map(rop => am.ReadOperation(
        id = toLocalKey(rop._key),
        name = rop.name,
        inputSources = rop.inputSources,
        output = outputAttrKeysByOpKey.get(rop._key).map(_.map(toLocalKey)),
        params = rop.params,
        extra = rop.extra
      )),
      other = dataOpModels.map(dop => am.DataOperation(
        id = toLocalKey(dop._key),
        name = dop.name,
        childIds = childrenOpKeysByParentOpKey.getOrElse(dop._key, Nil).map(toLocalKey),
        output = outputAttrKeysByOpKey.get(dop._key).map(_.map(toLocalKey)),
        params = dop.params,
        extra = dop.extra
      )),
    )

    val attributes = eppm.attributes.map(attr => am.Attribute(
      id = toLocalKey(attr._key),
      name = attr.name,
      dataType = attr.dataType,
      childRefs = exprKeyByAttrKeyItComputes.get(attr._key)
        .map((toLocalKey _).andThen(exprRef).andThen(Seq(_)))
        .getOrElse(Nil),
      extra = attr.extra
    ))

    val maybeExpressions = eppm.expressions.asOption.map(exprs => {
      val (
        funcExprModels: Seq[pm.FunctionalExpression],
        litExprModels: Seq[pm.LiteralExpression]
        ) = exprs.partition(_.isInstanceOf[pm.FunctionalExpression])

      am.Expressions(
        functions = funcExprModels.map(fe => am.FunctionalExpression(
          id = toLocalKey(fe._key),
          name = fe.name,
          childRefs = exprChildRefsByParentExprKey.getOrElse(fe._key, Nil),
          dataType = fe.dataType,
          params = fe.params,
          extra = fe.extra
        )),
        constants = litExprModels.map(le => am.Literal(
          id = toLocalKey(le._key),
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
