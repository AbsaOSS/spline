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
  import ExecutionPlansControllerTest._

  behavior of "ExecutionPlansControllerTest"

  "execPlan" should "return an execPlan in a form of a LineageDetailed object" in {
    val mockedEpRepo = mock[ExecutionPlanRepository]
    when(mockedEpRepo.findById(eqTo(ep1id))(any())).thenReturn(Future.successful(testingLineageDetailed1))

    val epController = new ExecutionPlansController(mockedEpRepo, null)
    epController.execPlan(ep1id).futureValue shouldBe testingLineageDetailed1
  }

  "execPlans" should "return paginated execPlans in a form of LineageDetailed objects" in {
    val aTime = 123456789L
    val mockedEpRepo = mock[ExecutionPlanRepository]
    when(mockedEpRepo.find(eqTo(aTime), eqTo(PageRequest(1, 5)), eqTo(SortRequest("_created", "desc")))(any())).thenReturn(
      Future.successful((Seq(testingLineageDetailed1, testingLineageDetailed2, testingLineageDetailed3, testingLineageDetailed4), 4L))
    )

    val epController = new ExecutionPlansController(mockedEpRepo, null)

    // Sadly a less readable comparison, because PageableExecutionPlansResponse.items is an Array
    val response = epController.execPlans(aTime, 1, 5).futureValue
    response shouldBe a[PageableExecutionPlansResponse]
    (response.totalCount, response.pageNum, response.pageSize) shouldBe (4, 1, 5)
    response.items should contain theSameElementsInOrderAs Seq(testingLineageDetailed1, testingLineageDetailed2, testingLineageDetailed3, testingLineageDetailed4)
  }
}

object ExecutionPlansControllerTest {
  def testLineageDetailed(uuid: UUID = UUID.randomUUID()) = LineageDetailed(
    ExecutionPlanInfo(uuid, None, Map.empty, Map.empty, Map.empty, Array.empty, null),
    LineageDetailedGraph(Array(Operation("op1", "Read", None, Map.empty)), Array.empty)
  )

  val ep1id = UUID.randomUUID()
  val testingLineageDetailed1 = testLineageDetailed(ep1id)
  val testingLineageDetailed2 = testLineageDetailed()
  val testingLineageDetailed3 = testLineageDetailed()
  val testingLineageDetailed4 = testLineageDetailed()

}
