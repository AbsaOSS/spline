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

package za.co.absa.spline.fixture

import org.apache.log4j.{Level, Logger}
import org.apache.spark.SparkContext
import org.apache.spark.sql.{SQLContext, SparkSession}
import org.scalatest._

trait AbstractSparkFixture {
  this: Suite =>

  AbstractSparkFixture.touch()

  protected val spark: SparkSession = SparkSession.builder.getOrCreate
  protected implicit lazy val sparkContext: SparkContext = spark.sparkContext
  protected implicit lazy val sqlContext: SQLContext = spark.sqlContext

  def withNewSession[T >: AnyRef](testBody: SparkSession => T): T = {
    testBody(spark.newSession)
  }
}

trait SparkFixture extends AbstractSparkFixture with TestSuiteMixin {
  this: TestSuite =>
}

trait AsyncSparkFixture extends AbstractSparkFixture with AsyncTestSuiteMixin {
  this: AsyncTestSuite =>
}

object AbstractSparkFixture {
  /** force the object to be loaded by the class loader */
  private def touch(): Unit = {}

  System.getProperties.setProperty("spark.master", "local[*]")
  Logger.getLogger("org.apache.spark").setLevel(Level.WARN)
  Logger.getLogger("org.apache.hadoop").setLevel(Level.WARN)
}