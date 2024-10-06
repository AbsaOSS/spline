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

package za.co.absa.spline.consumer.service.repo

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model.ExpressionGraph
import za.co.absa.spline.consumer.service.model.Operation.Id
import za.co.absa.spline.persistence.FoxxRouter

import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExpressionRepositoryImpl @Autowired()(foxxRouter: FoxxRouter) extends ExpressionRepository {

  override def expressionGraphUsedByOperation(operationId: Id)(implicit ec: ExecutionContext): Future[ExpressionGraph] = {
    foxxRouter.get[ExpressionGraph](s"/spline/operations/$operationId/expressions/_graph")
  }
}
