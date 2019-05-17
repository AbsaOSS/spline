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

package za.co.absa.spline.fixture.spline

import org.apache.commons.configuration.BaseConfiguration
import org.apache.spark.sql.SparkSession
import za.co.absa.spline.fixture.spline.SplineFixture.EMPTY_CONF
import za.co.absa.spline.harvester.LineageDispatcher
import za.co.absa.spline.harvester.SparkLineageInitializer._
import za.co.absa.spline.harvester.conf.DefaultSplineConfigurer

object SplineFixture {
  def EMPTY_CONF = new BaseConfiguration
}

trait SplineFixture {

  def withLineageTracking[T](session: SparkSession)(testBody: LineageCaptor.Getter => T): T = {
    val lineageCaptor = new LineageCaptor

    val testSplineConfigurer = new DefaultSplineConfigurer(EMPTY_CONF, session) {
      override lazy val lineageDispatcher: LineageDispatcher =
        new LineageCapturingDispatcher(lineageCaptor.setter)
    }

    session.enableLineageTracking(testSplineConfigurer)

    testBody(lineageCaptor.getter)
  }
}

