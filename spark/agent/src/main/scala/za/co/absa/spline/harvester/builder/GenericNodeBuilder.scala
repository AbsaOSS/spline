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

package za.co.absa.spline.harvester.builder

import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import za.co.absa.spline.harvester.ComponentCreatorFactory
import za.co.absa.spline.harvester.ModelConstants.OperationParams
import za.co.absa.spline.producer.rest.model.DataOperation

class GenericNodeBuilder
(val operation: LogicalPlan)
  (implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder {
  override protected type R = DataOperation

  override def build(): DataOperation = DataOperation(
    id = id,
    childIds = childIds,
    schema = Some(outputSchema),
    params = componentCreatorFactory.operationParamsConverter.convert(operation)
      + (OperationParams.Name -> operation.nodeName)
  )
}
