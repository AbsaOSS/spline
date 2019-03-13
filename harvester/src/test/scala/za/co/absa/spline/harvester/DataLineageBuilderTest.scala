/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.harvester

import org.apache.hadoop.conf.Configuration
import org.apache.spark.SparkContext
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.types.{StringType, StructField, StructType}
import org.apache.spark.sql.{DataFrame, Row}
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.when
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FunSuite, Matchers}
import za.co.absa.spline.fixture.SparkFixture
import za.co.absa.spline.sparkadapterapi.{WriteCommandParser, WriteCommandParserFactory}


class DataLineageBuilderTest extends FunSuite with Matchers with SparkFixture {

  import DataLineageBuilderTest._

  test("spline-124") {
    val someData1 = Seq(Row("foo", "bar"))
    val someData2 = Seq(Row("baz", "qux"))
    val someData3 = Seq(Row("quux", "corge"))

    val someSchema = List(StructField("name", StringType))

    val df1 = spark.createDataFrame(spark.sparkContext.parallelize(someData1), StructType(someSchema))
    val df2 = spark.createDataFrame(spark.sparkContext.parallelize(someData2), StructType(someSchema))
    val df3 = spark.createDataFrame(spark.sparkContext.parallelize(someData3), StructType(someSchema))

    val tripleUnionDF = df1 union df2 union df3

    val lineageBuilder = lineageBuilderFor(tripleUnionDF)
    val lineage = lineageBuilder.buildLineage()

    lineage.getOrElse(fail).operations should have size 4 // 3 LogicalRDD + 1 Union
  }
}


object DataLineageBuilderTest extends MockitoSugar {

  private def lineageBuilderFor(df: DataFrame)(implicit sparkContext: SparkContext): DataLineageBuilder = {
    val plan = df.queryExecution.analyzed
    val mockWriteCommandParser = mock[WriteCommandParser[LogicalPlan]]
    val mockJdbcCommandParser = mock[WriteCommandParser[LogicalPlan]]

    val factory = mock[WriteCommandParserFactory]

    when(mockWriteCommandParser asWriteCommandIfPossible any()) thenReturn None
    when(mockJdbcCommandParser asWriteCommandIfPossible any()) thenReturn None

    when(factory writeParser()) thenReturn mockWriteCommandParser
    when(factory saveAsTableParser(any())) thenReturn mockWriteCommandParser
    when(factory jdbcParser()) thenReturn mockJdbcCommandParser

    new DataLineageBuilder(plan, None, sparkContext)(mock[Configuration], factory)
  }
}
