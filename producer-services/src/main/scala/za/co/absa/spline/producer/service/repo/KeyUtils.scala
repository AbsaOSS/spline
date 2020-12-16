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

package za.co.absa.spline.producer.service.repo

import za.co.absa.spline.producer.model.v1_1._

import java.util.UUID


object KeyUtils {

  // todo: shake it

  @inline final def asCompositeKey(prefix: UUID, suffix: String) =
    s"$prefix:$suffix"

  @inline final def asExecutionEventKey(ee: ExecutionEvent): String =
    KeyUtils.asCompositeKey(ee.planId, java.lang.Long.toString(ee.timestamp, 36))

  @inline final def asOperationKey(opId: String, ep: ExecutionPlan): String =
    KeyUtils.asCompositeKey(ep.id, opId)

  @inline final def asOperationKey(op: OperationLike, ep: ExecutionPlan): String =
    KeyUtils.asOperationKey(op.id, ep)

  @inline final def asSchemaKey(op: OperationLike, ep: ExecutionPlan): String =
    KeyUtils.asOperationKey(op.id, ep)

  @inline final def asSchemaKey(opId: OperationLike.Id, ep: ExecutionPlan): String =
    KeyUtils.asOperationKey(opId, ep)

  @inline final def asAttributeKey(attr: Attribute, ep: ExecutionPlan): String =
    KeyUtils.asCompositeKey(ep.id, attr.id)

  @inline final def asAttributeKey(attrId: Attribute.Id, ep: ExecutionPlan): String =
    KeyUtils.asCompositeKey(ep.id, attrId)

  @inline final def asExpressionKey(exprId: ExpressionLike.Id, ep: ExecutionPlan): String =
    KeyUtils.asCompositeKey(ep.id, exprId)

  @inline final def asExpressionKey(expr: ExpressionLike, ep: ExecutionPlan): String =
    KeyUtils.asCompositeKey(ep.id, expr.id)
}
