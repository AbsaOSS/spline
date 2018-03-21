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

import org.apache.commons.configuration.Configuration
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.util.QueryExecutionListener
import org.scalatest.Matchers._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{BeforeAndAfterEach, FunSpec, Matchers}
import za.co.absa.spline.core.SparkLineageInitializer._
import za.co.absa.spline.core.SparkLineageInitializerSpec._
import za.co.absa.spline.core.batch.SplineQueryExecutionListener
import za.co.absa.spline.core.conf.DefaultSplineConfigurer.ConfProperty.{MODE, PERSISTENCE_FACTORY}
import za.co.absa.spline.core.conf.SplineConfigurer.SplineMode._
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
    val session = SparkSession.builder.getOrCreate
    (session.listenerManager.getClass.getDeclaredFields collectFirst {
      case f if f.getName endsWith "listeners" =>
        f setAccessible true
        (f get session.listenerManager).asInstanceOf[Seq[QueryExecutionListener]].map(_.getClass)
    }).get
  }

  private def assertSplineIsEnabled() = sparkQueryExecutionListenerClasses should contain(classOf[SplineQueryExecutionListener])

  private def assertSplineIsDisabled() = sparkQueryExecutionListenerClasses should not contain classOf[SplineQueryExecutionListener]
}

class SparkLineageInitializerSpec extends FunSpec with BeforeAndAfterEach with Matchers {
  private val jvmProps = System.getProperties
  jvmProps.setProperty("spark.master", "local")

  override protected def afterEach(): Unit = SparkSession.builder.getOrCreate.stop

  describe("defaultConfiguration") {
    it("should look through the multiple sources for the configuration properties") {
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

  describe("enableLineageTracking()") {
    it("should not allow double initialization") {
      intercept[IllegalStateException] {
        SparkSession.builder.getOrCreate
          .enableLineageTracking() // 1st is fine
          .enableLineageTracking() // 2nd should fail
      }
    }

    it("should return the spark session back to the caller") {
      jvmProps.setProperty(PERSISTENCE_FACTORY, classOf[MockReadWritePersistenceFactory].getName)
      val session = SparkSession.builder.getOrCreate
      session.enableLineageTracking() shouldBe session
    }

    describe("persistence support") {
      it("should support read/write persistence") {
        jvmProps.setProperty(PERSISTENCE_FACTORY, classOf[MockReadWritePersistenceFactory].getName)
        SparkSession.builder.getOrCreate.enableLineageTracking()
        assertSplineIsEnabled()
      }

      it("should support write-only persistence") {
        jvmProps.setProperty(PERSISTENCE_FACTORY, classOf[MockWriteOnlyPersistenceFactory].getName)
        SparkSession.builder.getOrCreate.enableLineageTracking()
        assertSplineIsEnabled()
      }
    }

    describe("modes") {

      it("should disable Spline and proceed, when is in BEST_EFFORT (default) mode") {
        jvmProps.setProperty(PERSISTENCE_FACTORY, classOf[MockFailingPersistenceFactory].getName)
        jvmProps.setProperty(MODE, BEST_EFFORT.toString)
        SparkSession.builder.getOrCreate.enableLineageTracking()
        assertSplineIsDisabled()
      }

      it("should disable Spline and proceed, when is in DEFAULT mode") {
        jvmProps.setProperty(PERSISTENCE_FACTORY, classOf[MockFailingPersistenceFactory].getName)
        jvmProps.remove(MODE) // default mode is BEST_EFFORT
        SparkSession.builder.getOrCreate.enableLineageTracking()
        assertSplineIsDisabled()
      }

      it("should abort application, when is in REQUIRED mode") {
        intercept[Exception] {
          jvmProps.setProperty(PERSISTENCE_FACTORY, classOf[MockFailingPersistenceFactory].getName)
          jvmProps.setProperty(MODE, REQUIRED.toString)
          SparkSession.builder.getOrCreate.enableLineageTracking()
        }
      }

      it("should have no effect, when is in DISABLED mode") {
        jvmProps.setProperty(PERSISTENCE_FACTORY, classOf[MockReadWritePersistenceFactory].getName)
        jvmProps.setProperty(MODE, DISABLED.toString)
        SparkSession.builder.getOrCreate.enableLineageTracking()
        assertSplineIsDisabled()
      }
    }
  }
}
