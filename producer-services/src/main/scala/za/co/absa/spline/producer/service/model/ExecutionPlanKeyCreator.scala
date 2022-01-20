/*
 * Copyright 2021 ABSA Group Limited
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

import za.co.absa.spline.producer.model.v1_2._

class ExecutionPlanKeyCreator(ep: ExecutionPlan) extends AbstractNodeKeyCreator(ep.id) {

  def asOperationKey(opId: OperationLike.Id): String = asCompositeKey(opId)

  def asSchemaKey(opId: OperationLike.Id): String = asCompositeKey(opId)

  def asAttributeKey(attrId: Attribute.Id): String = asCompositeKey(attrId)

  def asExpressionKey(exprId: ExpressionLike.Id): String = asCompositeKey(exprId)
}
