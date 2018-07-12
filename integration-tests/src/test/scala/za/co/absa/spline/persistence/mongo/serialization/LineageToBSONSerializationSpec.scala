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

package za.co.absa.spline.persistence.mongo.serialization

import org.scalatest._
import za.co.absa.spline.common.ByteUnits._
import za.co.absa.spline.fixture.SparkAndSplineFixture

class LineageToBSONSerializationSpec extends FlatSpec with Matchers with SparkAndSplineFixture {

  import spark.implicits._

  it should "serialize small lineage" in {
    import org.apache.spark.sql.functions._

    val smallLineage =
      Seq((1, 2), (3, 4)).toDF().agg(concat(sum('_1), min('_2)) as "forty_two").lineage

    smallLineage.operations.length shouldBe 3
    smallLineage.asBSON.length should be < 5.kb
  }
}
