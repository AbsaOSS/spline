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

import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model.{Attribute, DataLineage, MetaDataset, Schema}
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op.{OperationProps, Projection}

class ReferenceConsolidatorSpec extends FlatSpec with Matchers {

  "Apply method" should "filter out unused references" in {
    val attributeType = Simple("type", false)

    val attributes = Seq(
      Attribute(randomUUID, "a", attributeType),
      Attribute(randomUUID, "b", attributeType),
      Attribute(randomUUID, "c", attributeType),
      Attribute(randomUUID, "d", attributeType)
    )

    val datasets = Seq(
      MetaDataset(randomUUID, Schema(Seq(attributes(0).id, attributes(1).id))),
      MetaDataset(randomUUID, Schema(Seq(attributes(1).id))),
      MetaDataset(randomUUID, Schema(Seq(attributes(0).id))),
      MetaDataset(randomUUID, Schema(Seq(attributes(2).id, attributes(3).id)))
    )

    val operations =Seq(
      Projection(
        OperationProps(
          randomUUID,
          "node2",
          Seq(datasets(1).id),
          datasets(2).id),
        Seq.empty),
      Projection(
        OperationProps(
          randomUUID,
          "node1",
          Seq(datasets(0).id),
          datasets(1).id),
        Seq.empty)
    )

    val lineage = DataLineage(
      randomUUID,
      "appId",
      "appName",
      1L,
      operations,
      datasets,
      attributes
    )

    val expectedLineage = lineage.copy(datasets = Seq(datasets(0), datasets(1), datasets(2)), attributes = Seq(attributes(0), attributes(1)))

    val result = ReferenceConsolidator.apply(lineage)

    result shouldEqual expectedLineage
  }

}
