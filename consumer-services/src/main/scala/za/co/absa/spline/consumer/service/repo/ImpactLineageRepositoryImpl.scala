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

package za.co.absa.spline.consumer.service.repo

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model.ExecutionEventInfo.Id
import za.co.absa.spline.consumer.service.model.LineageOverview
import za.co.absa.spline.persistence.FoxxRouter

import scala.concurrent.{ExecutionContext, Future}

@Repository
class ImpactLineageRepositoryImpl @Autowired()(foxxRouter: FoxxRouter) extends LineageRepository with ImpactRepository {

  override def lineageOverviewForExecutionEvent(eventId: Id, maxDepth: Int)(implicit ec: ExecutionContext): Future[LineageOverview] = {
    foxxRouter.get[LineageOverview](s"/spline/consumer/execution-events/$eventId/lineage-overview/$maxDepth")
  }

  override def impactOverviewForExecutionEvent(eventId: Id, maxDepth: Int)(implicit ec: ExecutionContext): Future[LineageOverview] = {
    foxxRouter.get[LineageOverview](s"/spline/consumer/execution-events/$eventId/impact-overview/$maxDepth")
  }
}
