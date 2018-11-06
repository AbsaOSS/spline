/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.linker.control


import java.util.UUID
import java.util.UUID.randomUUID

import org.apache.spark
import org.mockito.ArgumentMatchers.{eq => ≡, _}
import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{AsyncFlatSpec, Matchers}
import za.co.absa.spline.model._
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op.{OperationProps, BatchRead}
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}

import scala.concurrent.Future

class BatchDataLineageLinkerSpec extends AsyncFlatSpec with Matchers with MockitoSugar {

  "Apply method" should "resolve lineage of known input sources and link them by assigning corresponding dataset IDs" in {
    val dataLineageReader = mock[DataLineageReader]
    val dataType = Simple("int", nullable = true)

    val referencedDsID = UUID.fromString("11111111-1111-1111-1111-111111111111")


    val inputLineage = {
      val attributes = Seq(
        Attribute(randomUUID, "1", dataType.id),
        Attribute(randomUUID, "2", dataType.id),
        Attribute(randomUUID, "3", dataType.id)
      )
      val dataset = MetaDataset(randomUUID, Schema(attributes.map(_.id)))
      val operation1 = BatchRead(OperationProps(randomUUID, "read", Seq.empty, dataset.id), "parquet", Seq(MetaDataSource("some/path_known", Nil)))
      val operation2 = BatchRead(OperationProps(randomUUID, "read", Seq.empty, dataset.id), "parquet", Seq(MetaDataSource("some/path_unknown", Nil)))

      DataLineage("appId2", "appName2", 2L, spark.SPARK_VERSION, Seq(operation1, operation2), Seq(dataset), attributes, Seq(dataType))
    }

    (when(dataLineageReader.findLatestDatasetIdsByPath(any())(any()))
      thenReturn
      Future.successful(new CloseableIterable[UUID](Iterator.empty, ())))

    (when(dataLineageReader.findLatestDatasetIdsByPath(≡("some/path_known"))(any()))
      thenReturn
      Future.successful(new CloseableIterable[UUID](Iterator(referencedDsID), ())))

    val expectedResult = {
      inputLineage.copy(
        operations = inputLineage.operations.map({
          case BatchRead(props, sourceType, sources) if sources.exists(_.path == "some/path_known") =>
            BatchRead(
              props.copy(inputs = Seq(referencedDsID)),
              sourceType,
              sources.map(_.copy(datasetsIds = Seq(referencedDsID))))
          case op => op
        }))
    }

    for (result <- new BatchDataLineageLinker(dataLineageReader)(inputLineage))
      yield result shouldEqual expectedResult
  }
}
