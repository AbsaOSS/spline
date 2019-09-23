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

package za.co.absa.spline.test.fixture

import org.apache.spark.sql.SparkSession
import za.co.absa.spline.common.TempDirectory

trait SparkFixture {

  val warehouseDir: String = TempDirectory("SparkFixture", "UnitTest", pathOnly = true).deleteOnExit().path.toString.stripSuffix("/")

  private val sessionBuilder: SparkSession.Builder =
    SparkSession.builder
      .master("local[*]")
      .config("spark.ui.enabled", "false")
      .config("spark.sql.warehouse.dir", warehouseDir)

  def withNewSparkSession[T](testBody: SparkSession => T): T = {
    withCustomSparkSession(identity)(testBody)
  }

  def withCustomSparkSession[T](builderCustomizer: SparkSession.Builder => SparkSession.Builder)(testBody: SparkSession => T): T = {
    testBody(builderCustomizer(sessionBuilder).getOrCreate.newSession)
  }

  def withRestartingSparkContext[T](testBody: => T): T = {
    SparkSession.getDefaultSession.foreach(_.close())
    try
      testBody
    finally
      SparkSession.getDefaultSession.foreach(_.close())
  }
}
