/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.core.transformations


import java.util.UUID.randomUUID

import org.mockito.Matchers._
import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op.{MetaDataSource, OperationProps, Read, Write}
import za.co.absa.spline.model.{Attribute, DataLineage, MetaDataset, Schema}
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.concurrent.Future

class ForeignMetaDatasetInjectorSpec extends FlatSpec with Matchers with MockitoSugar {

  "Apply method" should "inject correct meta data set" in {
    val dataLineageReader = mock[DataLineageReader]
    val dataType = Simple("int", nullable = true)
    val path = "path"

    def getReferencedLineage = {
      val attributes = Seq(
        Attribute(randomUUID, "a", dataType),
        Attribute(randomUUID, "b", dataType),
        Attribute(randomUUID, "c", dataType),
        Attribute(randomUUID, "d", dataType)
      )
      val datasets = Seq(
        MetaDataset(randomUUID, Schema(Seq(attributes(2).id, attributes(3).id))),
        MetaDataset(randomUUID, Schema(Seq(attributes(0).id, attributes(1).id)))
      )
      val operations = Seq(
        Write(OperationProps(randomUUID, "save", Seq.empty, datasets(0).id), "parquet", path)
      )
      DataLineage(randomUUID, "appId1", "appName1", 1L, operations, datasets, attributes)
    }

    def getInputLineage = {
      val attributes = Seq(
        Attribute(randomUUID, "1", dataType),
        Attribute(randomUUID, "2", dataType),
        Attribute(randomUUID, "3", dataType)
      )
      val datasets = Seq(
        MetaDataset(randomUUID, Schema(attributes.map(_.id)))

      )
      val operations = Seq(
        Read(OperationProps(randomUUID, "read", Seq.empty, datasets.head.id), "parquet", Seq(MetaDataSource(path, None /*TODO for Marek !!!!!*/)))
      )
      DataLineage(randomUUID, "appId2", "appName2", 2L, operations, datasets, attributes)
    }

    val referencedLineage = getReferencedLineage
    when(dataLineageReader.loadLatest(any())) thenReturn Future.successful(Some(referencedLineage))
    val inputLineage = getInputLineage
    val expectedResult = inputLineage.copy(
      operations = Seq(inputLineage.rootOperation.updated(m => m.copy(inputs = Seq(referencedLineage.rootDataset.id)))),
      datasets = inputLineage.datasets :+ referencedLineage.rootDataset,
      attributes = inputLineage.attributes ++ Seq(referencedLineage.attributes(2), referencedLineage.attributes(3))
    )

    val sut = new ForeignMetaDatasetInjector(dataLineageReader)

    val result = sut(inputLineage)

    result shouldEqual expectedResult
  }
}
