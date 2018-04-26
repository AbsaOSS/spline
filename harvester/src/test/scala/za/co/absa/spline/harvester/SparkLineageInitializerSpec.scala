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

package za.co.absa.spline.harvester

import org.apache.commons.configuration.{BaseConfiguration, Configuration}
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.util.QueryExecutionListener
import org.scalatest.Matchers._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{BeforeAndAfterEach, FunSpec, Matchers}
import za.co.absa.spline.harvester.SparkLineageInitializer._
import za.co.absa.spline.harvester.SparkLineageInitializerSpec._
import za.co.absa.spline.harvester.conf.DefaultSplineConfigurer.ConfProperty._
import za.co.absa.spline.harvester.conf.SplineConfigurer.SplineMode._
import za.co.absa.spline.harvester.conf.{DefaultSplineConfigurer, LineageDispatcher}
import za.co.absa.spline.harvester.listener.SplineQueryExecutionListener
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter, PersistenceFactory}

object SparkLineageInitializerSpec {

  class MockReadWritePersistenceFactory(conf: Configuration) extends PersistenceFactory(conf) with MockitoSugar {
    override val createDataLineageWriter: DataLineageWriter = mock[DataLineageWriter]
    override val createDataLineageReader: Option[DataLineageReader] = Some(mock[DataLineageReader])
  }

  class MockWriteOnlyPersistenceFactory(conf: Configuration) extends PersistenceFactory(conf) with MockitoSugar {
    override val createDataLineageWriter: DataLineageWriter = mock[DataLineageWriter]
    override val createDataLineageReader: Option[DataLineageReader] = None
  }

  class MockFailingPersistenceFactory(conf: Configuration) extends PersistenceFactory(conf) with MockitoSugar {
    override val createDataLineageWriter: DataLineageWriter = sys.error("boom!")
    override val createDataLineageReader: Option[DataLineageReader] = sys.error("bam!")
  }

  private[this] def sparkQueryExecutionListenerClasses: Seq[Class[_ <: QueryExecutionListener]] = {
    val session = createSession
    (session.listenerManager.getClass.getDeclaredFields collectFirst {
      case f if f.getName endsWith "listeners" =>
        f setAccessible true
        (f get session.listenerManager).asInstanceOf[Seq[QueryExecutionListener]].map(_.getClass)
    }).get
  }

  private def assertSplineIsEnabled() = sparkQueryExecutionListenerClasses should contain(classOf[SplineQueryExecutionListener])

  private def assertSplineIsDisabled() = sparkQueryExecutionListenerClasses should not contain classOf[SplineQueryExecutionListener]

  def createSession: SparkSession = {
    val builder = SparkSession.builder
    builder.master("local")
    builder.getOrCreate
  }
}

class SparkLineageInitializerSpec extends FunSpec with BeforeAndAfterEach with Matchers {
  private val configuration = new BaseConfiguration
  configuration.setProperty("spark.master", "local")
  configuration.setProperty(LineageDispatcher.kafkaServersProperty, "example.com:9092")

  override protected def afterEach(): Unit = createSession.stop

  describe("defaultConfiguration") {
    it("should look through the multiple sources for the configuration properties") {
      val sparkSession = createSession
      sparkSession.sparkContext.hadoopConfiguration.set("key.defined.everywhere", "value from Hadoop configuration")

      // Used for this test only. Otherwise it is better to avoid using system properties as they affect other tests as well.
      val systemProperties = System.getProperties
      systemProperties.setProperty("key.defined.everywhere", "value from JVM args")
      systemProperties.setProperty("key.defined.in_JVM_and_spline.properties", "value from JVM args")

      sparkSession.defaultSplineConfiguration getString "key.defined.everywhere" shouldEqual "value from Hadoop configuration"
      sparkSession.defaultSplineConfiguration getString "key.defined.in_JVM_and_spline.properties" shouldEqual "value from JVM args"
      sparkSession.defaultSplineConfiguration getString "key.defined.in_spline.properties_only" shouldEqual "value from spline.properties"
      sparkSession.defaultSplineConfiguration getString "key.undefined" shouldBe null
    }
  }

  describe("enableLineageTracking()") {
    it("should not allow double initialization") {
      intercept[IllegalStateException] {
        val session = createSession
        session
          .enableLineageTracking(createConfigurer(session)) // 1st is fine
          .enableLineageTracking(createConfigurer(session)) // 2nd should fail
      }
    }

    it("should return the spark session back to the caller") {
      val session = createSession
      session.enableLineageTracking(createConfigurer(session)) shouldBe session
    }

    describe("modes") {

      it("should disable Spline and proceed, when is in BEST_EFFORT (default) mode") {
        configuration.setProperty(MODE, BEST_EFFORT.toString)
        val sparkSession = createSession
        sparkSession.enableLineageTracking(createFailingConfigurer(sparkSession))
        assertSplineIsDisabled()
      }

      it("should disable Spline and proceed, when is in DEFAULT mode") {
        configuration.clearProperty(MODE) // default mode is BEST_EFFORT
        val sparkSession = createSession
        sparkSession.enableLineageTracking(createFailingConfigurer(sparkSession))
        assertSplineIsDisabled()
      }

      it("should abort application, when is in REQUIRED mode") {
        intercept[Exception] {
          configuration.setProperty(MODE, REQUIRED.toString)
          val session = createSession
          session.enableLineageTracking(createFailingConfigurer(session))
        }
      }

      it("should have no effect, when is in DISABLED mode") {
        configuration.setProperty(MODE, DISABLED.toString)
        val sparkSession = createSession
        sparkSession.enableLineageTracking(createFailingConfigurer(sparkSession))
        assertSplineIsDisabled()
      }

      def createFailingConfigurer(sparkSession: SparkSession) = {
        new DefaultSplineConfigurer(configuration, sparkSession) {
          override lazy val lineageDispatcher: LineageDispatcher =  { throw new RuntimeException("Testing exception - please ignore.")}
        }
      }

    }
  }

  def createConfigurer(sparkSession: SparkSession) = {
    new DefaultSplineConfigurer(configuration, sparkSession)
  }

}
