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

package za.co.absa.spline.core

import org.apache.spark.sql.SparkSession
import org.scalatest.{BeforeAndAfterEach, FlatSpec, Matchers}
import za.co.absa.spline.core.SparkLineageInitializer._
import za.co.absa.spline.core.conf.DefaultSplineConfigurer._

class SparkLineageInitializerSpec extends FlatSpec with BeforeAndAfterEach with Matchers {

  private val jvmProps = System.getProperties

  jvmProps.setProperty("spark.master", "local")
  jvmProps.setProperty(persistenceFactoryKey, classOf[MockPersistenceWriterFactory].getName)

  override protected def afterEach(): Unit = SparkSession.builder.getOrCreate.stop

  "enableLineageTracking()" should "not allow double initialization" in intercept[IllegalStateException] {
    SparkSession.builder.getOrCreate
      .enableLineageTracking() // 1st is fine
      .enableLineageTracking() // 2nd should fail
  }

  it should "return the spark session back to the caller" in {
    val session = SparkSession.builder.getOrCreate
    session.enableLineageTracking() shouldBe session
  }

  "defaultConfiguration" should "look through the multiple sources for the configuration properties" in {
    val sparkSession = SparkSession.builder.getOrCreate
    sparkSession.sparkContext.hadoopConfiguration.set("key.defined.everywhere", "value from Hadoop configuration")

    jvmProps.setProperty("key.defined.everywhere", "value from JVM args")
    jvmProps.setProperty("key.defined.in_JVM_and_spline.properties", "value from JVM args")

    sparkSession.defaultSplineConfiguration getString "key.defined.everywhere" shouldEqual "value from Hadoop configuration"
    sparkSession.defaultSplineConfiguration getString "key.defined.in_JVM_and_spline.properties" shouldEqual "value from JVM args"
    sparkSession.defaultSplineConfiguration getString "key.defined.in_spline.properties_only" shouldEqual "value from spline.properties"
    sparkSession.defaultSplineConfiguration getString "key.undefined" shouldBe null
  }

}
