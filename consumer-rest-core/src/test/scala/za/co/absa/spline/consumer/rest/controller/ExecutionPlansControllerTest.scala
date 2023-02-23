/*
 * Copyright 2022 ABSA Group Limited
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
package za.co.absa.spline.consumer.rest.controller

import org.mockito.ArgumentMatchers.{any, eq => eqTo}
import org.mockito.Mockito.when
import org.scalatest.concurrent.ScalaFutures
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.ExecutionPlanRepository

import java.util.UUID
import scala.concurrent.Future

class ExecutionPlansControllerTest extends org.scalatest.flatspec.AnyFlatSpec with Matchers with MockitoSugar with ScalaFutures {

  behavior of "ExecutionPlansController"

  it should "return an execPlan in a form of a LineageDetailed object from execPlan(id)" in {
    val ep1id = UUID.randomUUID()
    val lineageDetailed1 = mock[LineageDetailed]
    val mockedEpRepo = mock[ExecutionPlanRepository]
    when(mockedEpRepo.findById(eqTo(ep1id))(any())).thenReturn(Future.successful(lineageDetailed1))

    val epController = new ExecutionPlansController(mockedEpRepo, null)
    epController.execPlan(ep1id).futureValue shouldBe lineageDetailed1
  }

  it should "return paginated execPlans in a form of LineageDetailed objects from execPlans(...)" in {
    val executionPlanInfo1 = mock[ExecutionPlanInfo]
    val executionPlanInfo2 = mock[ExecutionPlanInfo]
    val executionPlanInfo3 = mock[ExecutionPlanInfo]
    val executionPlanInfo4 = mock[ExecutionPlanInfo]

    val aTime = 123456789L
    val mockedEpRepo = mock[ExecutionPlanRepository]
    when(mockedEpRepo.find(eqTo(aTime), eqTo(PageRequest(1, 5)), eqTo(SortRequest("_created", "desc")))(any())).thenReturn(
      Future.successful((Seq(executionPlanInfo1, executionPlanInfo2, executionPlanInfo3, executionPlanInfo4), 4L))
    )

    val epController = new ExecutionPlansController(mockedEpRepo, null)

    val response = epController.execPlans(aTime, 1, 5).futureValue
    response shouldBe a[PageableExecutionPlansResponse]
    (response.totalCount, response.pageNum, response.pageSize) shouldBe (4, 1, 5)
    response.items should contain theSameElementsInOrderAs Seq(executionPlanInfo1, executionPlanInfo2, executionPlanInfo3, executionPlanInfo4)
  }
}
