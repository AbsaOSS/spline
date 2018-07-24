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

package za.co.absa.spline

import org.apache.spark.sql.Column
import org.apache.spark.sql.types.IntegerType
import org.scalatest._
import za.co.absa.spline.common.ByteUnits._
import za.co.absa.spline.fixture.{SparkFixture, SplineFixture}

class LineageToBSONSerializationSpec
  extends FlatSpec
    with Matchers
    with SparkFixture
    with SplineFixture {

  import spark.implicits._

  it should "serialize small lineage" in {
    import org.apache.spark.sql.functions._

    val smallLineage =
      Seq((1, 2), (3, 4)).toDF().agg(concat(sum('_1), min('_2)) as "forty_two").lineage

    smallLineage.operations.length shouldBe 3
    smallLineage should haveEveryComponentSizeInBSONLessThan(2.kb)
  }

  it should "serialize big lineage" in {
    import org.apache.spark.sql.functions.{col, lit, when, size => arraySize}

    val columnNames = 0 until 2000 map "c".+

    def aComplexExpression(colName: String): Column = {
      val c = col(colName)
      val sz =
        arraySize(
          when(c.isNull, Array.empty[Int])
            otherwise (
            when(c.isNotNull && c.cast(IntegerType).isNull, Array.empty[Int])
              otherwise Array.empty[Int]))

      (when(sz === 0 && c.isNotNull, c cast IntegerType)
        otherwise (
        when(sz === 0, lit(null) cast IntegerType)
          otherwise 0)) as colName
    }

    val bigLineage = spark
      .createDataFrame(Seq.empty[Tuple1[Int]])
      .select((List.empty[Column] /: columnNames) ((cs, c) => (lit(0) as c) :: cs): _*)
      .select(columnNames map aComplexExpression: _*)
      .lineage

    bigLineage should haveEveryComponentSizeInBSONLessThan(16.mb)
  }
}
