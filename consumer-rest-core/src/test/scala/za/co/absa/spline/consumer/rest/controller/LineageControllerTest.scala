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
package za.co.absa.spline.consumer.rest.controller

import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.when
import org.scalatest.concurrent.ScalaFutures
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{AsyncFunSuite, Matchers}
import org.springframework.web.client.HttpClientErrorException
import za.co.absa.spline.consumer.service.model.{Lineage, LineageOverview, Transition}
import za.co.absa.spline.consumer.service.repo.LineageRepository

import scala.concurrent.{ExecutionContext, Future}

class LineageControllerTest extends AsyncFunSuite with MockitoSugar with Matchers {

/*
  val validNodes = Array[LineageNode](
    LineageNode(
      "00a6df71-baf9-442c-9bcb-0c92b4a9de15",
      "hdfs://hdpafrpilot/bigdatahdfs/datalake/raw/mowa/tmp/conformance-output/standardized-mowa_messageextractfields_mu-1-2018-12-14-1",
      "DataSource",
      None
    ),
    LineageNode(
      "276ef192-1932-468f-a463-421af2529efa",
      "Dynamic Conformance - --dataset-name (mowa_messageextractfields_mu) - 2018-12-14 - 1",
      "Execution",
      Some("f592f69a-105a-4a7f-b9a5-77125cc586ba")
    ),
    LineageNode(
      "cbc2620f-f060-4569-9480-c4dcf150f2c0",
      "hdfs://hdpafrpilot/tmp/nonsplittable-to-parquet-abce2feb-aa09-40cd-bb9a-dde0643817de",
      "DataSource",
      None
    ),
    LineageNode(
      "3846a4a2-ba15-4854-a67d-aa98546529a1",
      "Standardisation mowa_messageextractfields_mu 1 2018-12-14 1",
      "Execution",
      Some("00a6df71-baf9-442c-9bcb-0c92b4a9de15")
    ),
    LineageNode(
      "4b354811-9aac-4e9f-8b66-7f391d09a474",
      "hdfs://hdpafrpilot/bigdatahdfs/datalake/raw/mowa/messageextractfields/MU/2018/12/14/v1/_INFO",
      "DataSource",
      None
    ),
    LineageNode(
      "ceacb6c0-1990-42e2-93b0-d2ed20b092c4",
      "hdfs://hdpafrpilot/bigdatahdfs/datalake/raw/mowa/messageextractfields/MU/2018/12/14/v1/part-00000.gz",
      "DataSource",
      None
    ),
    LineageNode(
      "f19a6106-45e3-4021-8f3c-8d1990fbb01d",
      "hdfs://hdpafrpilot/bigdatahdfs/datalake/raw/mowa/messageextractfields/MU/2018/12/14/v1/_SUCCESS",
      "DataSource",
      None
    ),
    LineageNode(
      "418df994-ba8e-47ac-adbe-2e179fdf2aca",
      "Standardisation mowa_messageextractfields_mu 1 2018-12-14 1",
      "Execution",
      Some("cbc2620f-f060-4569-9480-c4dcf150f2c0")
    ),
    LineageNode(
      "f592f69a-105a-4a7f-b9a5-77125cc586ba",
      "hdfs://hdpafrpilot/bigdatahdfs/datalake/publish/mowa/MESSAGEEXTRACTFIELDS/country_cd=MU/enceladus_info_date=2018-12-14/enceladus_info_version=1",
      "DataSource",
      None
    )
  )

  val validEdges = Array[Transition](
    Transition("00a6df71-baf9-442c-9bcb-0c92b4a9de15", "276ef192-1932-468f-a463-421af2529efa"),
    Transition("276ef192-1932-468f-a463-421af2529efa", "f592f69a-105a-4a7f-b9a5-77125cc586ba"),
    Transition("cbc2620f-f060-4569-9480-c4dcf150f2c0", "3846a4a2-ba15-4854-a67d-aa98546529a1"),
    Transition("3846a4a2-ba15-4854-a67d-aa98546529a1", "00a6df71-baf9-442c-9bcb-0c92b4a9de15"),
    Transition("4b354811-9aac-4e9f-8b66-7f391d09a474", "418df994-ba8e-47ac-adbe-2e179fdf2aca"),
    Transition("ceacb6c0-1990-42e2-93b0-d2ed20b092c4", "418df994-ba8e-47ac-adbe-2e179fdf2aca"),
    Transition("f19a6106-45e3-4021-8f3c-8d1990fbb01d", "418df994-ba8e-47ac-adbe-2e179fdf2aca"),
    Transition("418df994-ba8e-47ac-adbe-2e179fdf2aca", "cbc2620f-f060-4569-9480-c4dcf150f2c0")
  )

  val validLineage = new LineageOverview(Map.empty, new Lineage(validNodes, validEdges))

  val invalidNodes = Array[LineageNode](
    LineageNode(
      "00a6df71-baf9-442c-9bcb-0c92b4a9de15",
      "hdfs://hdpafrpilot/bigdatahdfs/datalake/raw/mowa/tmp/conformance-output/standardized-mowa_messageextractfields_mu-1-2018-12-14-1",
      "DataSource",
      None
    ),
    LineageNode(
      "276ef192-1932-468f-a463-421af2529efa",
      "Dynamic Conformance - --dataset-name (mowa_messageextractfields_mu) - 2018-12-14 - 1",
      "Execution",
      Some("f592f69a-105a-4a7f-b9a5-77125cc586ba")
    ),
    LineageNode(
      "83f9c7e6-5d11-403b-8231-e7710463fc31",
      "hdfs://hdpafrdev/bigdatahdfs/datalake/raw/sper/clientratings/2018/11/18/v1/clientratings.json.gz",
      "DataSource",
      None
    ),
    LineageNode(
      "9992e73a-c166-46c9-9c02-1951e58d3bc0",
      "hdfs://hdpafrdev/bigdatahdfs/datalake/raw/sper/clientratings/2018/11/18/v1/_INFO",
      "DataSource",
      None
    ),
    LineageNode(
      "84032ff2-7759-4e91-a8bc-cd87d95b45f2",
      "hdfs://hdpafrdev/bigdatahdfs/datalake/raw/sper/clientratings/2018/11/18/v1/_clientratings.control",
      "DataSource",
      None
    ),
    LineageNode(
      "766f15d4-cd27-4a59-8867-56395d18e133",
      "Standardisation SpearClientRatings 8 2018-11-18 1",
      "Execution",
      Some("7340e725-a64e-41ce-a8fb-e7e56f44483a")
    ),
    LineageNode(
      "83f9c7e6-5d11-403b-8231-e7710463fc31",
      "hdfs://hdpafrdev/bigdatahdfs/datalake/raw/sper/clientratings/2018/11/18/v1/clientratings.json.gz",
      "DataSource",
      None
    ),
    LineageNode(
      "84032ff2-7759-4e91-a8bc-cd87d95b45f2",
      "hdfs://hdpafrdev/bigdatahdfs/datalake/raw/sper/clientratings/2018/11/18/v1/_clientratings.control",
      "DataSource",
      None
    ),
    LineageNode(
      "9992e73a-c166-46c9-9c02-1951e58d3bc0",
      "hdfs://hdpafrdev/bigdatahdfs/datalake/raw/sper/clientratings/2018/11/18/v1/_INFO",
      "DataSource",
      None
    ),
    LineageNode(
      "a4f0e962-fe97-411a-ac5b-11ab0b0524d3",
      "Standardisation SpearClientRatings 8 2018-11-18 1",
      "DataSource",
      Some("334ca40b-58c2-45fa-b427-579b590af381")
    ),
    LineageNode(
      "f592f69a-105a-4a7f-b9a5-77125cc586ba",
      "hdfs://hdpafrpilot/bigdatahdfs/datalake/publish/mowa/MESSAGEEXTRACTFIELDS/country_cd=MU/enceladus_info_date=2018-12-14/enceladus_info_version=1",
      "DataSource",
      None
    )
  )

  val invalidEdges = Array[Transition](
    Transition("00a6df71-baf9-442c-9bcb-0c92b4a9de15", "276ef192-1932-468f-a463-421af2529efa"),
    Transition("276ef192-1932-468f-a463-421af2529efa", "f592f69a-105a-4a7f-b9a5-77125cc586ba"),
    Transition("83f9c7e6-5d11-403b-8231-e7710463fc31", "766f15d4-cd27-4a59-8867-56395d18e133"),
    Transition("9992e73a-c166-46c9-9c02-1951e58d3bc0", "766f15d4-cd27-4a59-8867-56395d18e133"),
    Transition("84032ff2-7759-4e91-a8bc-cd87d95b45f2", "766f15d4-cd27-4a59-8867-56395d18e133"),
    Transition("766f15d4-cd27-4a59-8867-56395d18e133", "7340e725-a64e-41ce-a8fb-e7e56f44483a"),
    Transition("83f9c7e6-5d11-403b-8231-e7710463fc31", "a4f0e962-fe97-411a-ac5b-11ab0b0524d3"),
    Transition("84032ff2-7759-4e91-a8bc-cd87d95b45f2", "a4f0e962-fe97-411a-ac5b-11ab0b0524d3"),
    Transition("9992e73a-c166-46c9-9c02-1951e58d3bc0", "a4f0e962-fe97-411a-ac5b-11ab0b0524d3"),
    Transition("a4f0e962-fe97-411a-ac5b-11ab0b0524d3", "334ca40b-58c2-45fa-b427-579b590af381")
  )

  val invalidLineage = new LineageOverview(Map.empty, new Lineage(invalidNodes, invalidEdges))


  test("test valid lineage") {
    implicit val executionContext = ExecutionContext.Implicits.global
    val lineageRepoMock = mock[LineageRepository]
    val lineageController = new LineageController(lineageRepoMock)

    when(lineageRepoMock.findByApplicationIdAndPath(any(), any(), any())(any())).thenReturn(Future.successful(validLineage))

    val res = lineageController.lineage("dataSourceUri", "appId")


    for (lineage <- res) yield {
      lineage shouldEqual validLineage
    }
  }

  test("test invalid lineage (null returned)") {
    implicit val executionContext = ExecutionContext.Implicits.global
    val lineageRepoMock = mock[LineageRepository]
    val lineageController = new LineageController(lineageRepoMock)

    when(lineageRepoMock.findByApplicationIdAndPath(any(), any(), any())(any())).thenReturn(Future.successful(null))

    val res = lineageController.lineage("dataSourceUri", "appId")

    ScalaFutures.whenReady(res.failed) { e =>
      e.getMessage shouldEqual "404 NOT_FOUND"
      e shouldBe a[HttpClientErrorException]
    }

  }

  test("test invalid lineage (incomplete graph)") {
    implicit val executionContext = ExecutionContext.Implicits.global
    val lineageRepoMock = mock[LineageRepository]
    val lineageController = new LineageController(lineageRepoMock)

    when(lineageRepoMock.findByApplicationIdAndPath(any(), any(), any())(any())).thenReturn(Future.successful(invalidLineage))

    val res = lineageController.lineage("dataSourceUri", "appId")

    ScalaFutures.whenReady(res.failed) { e =>
      e.getMessage shouldEqual "400 BAD_REQUEST"
      e shouldBe a[HttpClientErrorException]
    }

  }

*/
}
