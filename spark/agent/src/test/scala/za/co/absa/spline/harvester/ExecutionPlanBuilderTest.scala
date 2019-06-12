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
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.types.{StringType, StructField, StructType}
import org.apache.spark.sql.{DataFrame, Row}
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.when
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FunSuite, Matchers}
import za.co.absa.spline.sparkadapterapi.{WriteCommandParserFactory, WriteCommandParserNew}
import za.co.absa.spline.test.fixture.SparkFixture


class ExecutionPlanBuilderTest extends FunSuite with Matchers with SparkFixture {

  import ExecutionPlanBuilderTest._

  test("spline-124") {
    withNewSparkSession(spark => {
      val someData1 = Seq(Row("foo", "bar"))
      val someData2 = Seq(Row("baz", "qux"))
      val someData3 = Seq(Row("quux", "corge"))

      val someSchema = List(StructField("name", StringType))

      val df1 = spark.createDataFrame(spark.sparkContext.parallelize(someData1), StructType(someSchema))
      val df2 = spark.createDataFrame(spark.sparkContext.parallelize(someData2), StructType(someSchema))
      val df3 = spark.createDataFrame(spark.sparkContext.parallelize(someData3), StructType(someSchema))

      val tripleUnionDF = df1 union df2 union df3

      val executionPlanBuilder = executionPlanFor(tripleUnionDF)
      val executionPlan = executionPlanBuilder.buildExecutionPlan()

      executionPlan.getOrElse(fail).operations.other should have size 4 // 3 LogicalRDD + 1 Union
    })
  }
}

object ExecutionPlanBuilderTest extends MockitoSugar {

  private def executionPlanFor(df: DataFrame): ExecutionPlanBuilder = {
    val plan = df.queryExecution.analyzed
    val mockWriteCommandParser = mock[WriteCommandParserNew[LogicalPlan]]
    val mockJdbcCommandParser = mock[WriteCommandParserNew[LogicalPlan]]

    val factory = mock[WriteCommandParserFactory]

    when(mockWriteCommandParser.execute(any())(any())) thenReturn None
    when(mockJdbcCommandParser.execute(any())(any())) thenReturn None

    when(factory.createParsers(any())) thenReturn Seq(mockWriteCommandParser, mockJdbcCommandParser)

    new ExecutionPlanBuilder(plan, None, df.sparkSession.sparkContext)(mock[Configuration], factory)
  }
}
