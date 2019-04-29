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

package za.co.absa.spline.core

import org.apache.commons.configuration.Configuration
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.internal.StaticSQLConf.QUERY_EXECUTION_LISTENERS
import org.apache.spark.sql.util.QueryExecutionListener
import org.apache.spark.{SparkConf, SparkContext}
import org.scalatest.Matchers._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{BeforeAndAfterEach, FunSpec, Matchers}
import za.co.absa.spline.core.SparkLineageInitializer._
import za.co.absa.spline.core.SparkLineageInitializerSpec._
import za.co.absa.spline.core.conf.DefaultSplineConfigurer.ConfProperty.{MODE, PERSISTENCE_FACTORY}
import za.co.absa.spline.core.conf.SplineConfigurer.SplineMode._
import za.co.absa.spline.core.harvester.QueryExecutionEventHandler
import za.co.absa.spline.core.listener.SplineQueryExecutionListener
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

  private[this] def sparkQueryExecutionListenerClasses(session: SparkSession): Seq[Class[_ <: QueryExecutionListener]] = {
    (session.listenerManager.getClass.getDeclaredFields collectFirst {
      case f if f.getName endsWith "listeners" =>
        f setAccessible true
        (f get session.listenerManager).asInstanceOf[Seq[QueryExecutionListener]].map(_.getClass)
    }).get
  }

  private def assertSplineIsEnabled(session: SparkSession = SparkSession.builder().getOrCreate()) =
    sparkQueryExecutionListenerClasses(session) should contain(classOf[SplineQueryExecutionListener])

  private def assertSplineIsDisabled(session: SparkSession = SparkSession.builder().getOrCreate()) =
    sparkQueryExecutionListenerClasses(session) should not contain classOf[SplineQueryExecutionListener]

  def numberOfRegisteredSplineListeners(session: SparkSession): Int =
    sparkQueryExecutionListenerClasses(session).count(_ == classOf[SplineQueryExecutionListener])

}

class SparkLineageInitializerSpec extends FunSpec with BeforeAndAfterEach with Matchers {
  private val jvmProps = System.getProperties
  jvmProps.setProperty("spark.master", "local")

  override protected def afterEach(): Unit = {
    jvmProps.remove(QUERY_EXECUTION_LISTENERS.key)
    jvmProps.remove(PERSISTENCE_FACTORY)
    jvmProps.remove(MODE)
    SparkSession.builder.getOrCreate.stop
  }

  describe("defaultConfiguration") {

    val keyDefinedEverywhere = "key.defined.everywhere"
    val keyDefinedInHadoopAndSpline = "key.defined.in_Hadoop_and_Spline"
    val keyDefinedInHadoopAndSpark = "key.defined.in_Hadoop_and_Spark"
    val keyDefinedInSparkAndSpline = "key.defined.in_Spark_and_Spline"
    val keyDefinedInJVMAndSpline = "key.defined.in_JVM_and_Spline"
    val keyDefinedInSplineOnly = "key.defined.in_Spline_only"

    val valueFromHadoop = "value from Hadoop configuration"
    val valueFromSpark = "value from Spark configuration"
    val valueFromJVM = "value from JVM args"
    val valueFromSpline = "value from spline.properties"

    it("should look through the multiple sources for the configuration properties") {
      val sparkSession = SparkSession.builder.getOrCreate
      val sparkConf = (classOf[SparkContext] getMethod "conf" invoke sparkSession.sparkContext).asInstanceOf[SparkConf]
      val hadoopConf = sparkSession.sparkContext.hadoopConfiguration

      for (key <- Some(keyDefinedEverywhere)) {
        jvmProps.setProperty(key, valueFromJVM)
        hadoopConf.set(key, valueFromHadoop)
        sparkConf.set(s"spark.$key", valueFromSpark)
        // skip setting spline prop as it's already hardcoded in spline.properties
      }

      for (key <- Some(keyDefinedInJVMAndSpline)) {
        jvmProps.setProperty(key, valueFromJVM)
        // skip setting spline prop as it's already hardcoded in spline.properties
      }

      for (key <- Some(keyDefinedInHadoopAndSpline)) {
        hadoopConf.set(key, valueFromHadoop)
        // skip setting spline prop as it's already hardcoded in spline.properties
      }

      for (key <- Some(keyDefinedInHadoopAndSpark)) {
        hadoopConf.set(key, valueFromHadoop)
        sparkConf.set(s"spark.$key", valueFromSpark)
      }

      for (key <- Some(keyDefinedInSparkAndSpline)) {
        sparkConf.set(s"spark.$key", valueFromSpark)
        // skip setting spline prop as it's already hardcoded in spline.properties
      }

      val splineConfiguration = sparkSession.defaultSplineConfiguration

      splineConfiguration getString keyDefinedEverywhere shouldEqual valueFromHadoop
      splineConfiguration getString keyDefinedInJVMAndSpline shouldEqual valueFromJVM
      splineConfiguration getString keyDefinedInHadoopAndSpline shouldEqual valueFromHadoop
      splineConfiguration getString keyDefinedInHadoopAndSpark shouldEqual valueFromHadoop
      splineConfiguration getString keyDefinedInSparkAndSpline shouldEqual valueFromSpark
      splineConfiguration getString keyDefinedInSplineOnly shouldEqual valueFromSpline
      splineConfiguration getString "key.undefined" shouldBe null
    }
  }

  describe("codeless initialization") {
    it("should not allow duplicate tracking when combining the methods") {
      jvmProps.setProperty(QUERY_EXECUTION_LISTENERS.key, classOf[SplineQueryExecutionListener].getName)
      jvmProps.setProperty(PERSISTENCE_FACTORY, classOf[MockWriteOnlyPersistenceFactory].getName)
      val session = SparkSession.builder.getOrCreate
      numberOfRegisteredSplineListeners(session) shouldBe 1
      session.enableLineageTracking()
      numberOfRegisteredSplineListeners(session) shouldBe 1
      val session2 = session.newSession()
      numberOfRegisteredSplineListeners(session) shouldBe 1
    }

    it("should not allow duplicate codeless tracking") {
      jvmProps.setProperty(PERSISTENCE_FACTORY, classOf[MockWriteOnlyPersistenceFactory].getName)
      val session = SparkSession.builder.getOrCreate
      SparkLineageInitializer
        .createEventHandler(session).getClass shouldBe classOf[Some[QueryExecutionEventHandler]]
      SparkLineageInitializer
        .createEventHandler(session) shouldBe None
    }
  }

  describe("enableLineageTracking()") {
    it("should not allow double initialization and tracking inheritance") {
      jvmProps.setProperty(PERSISTENCE_FACTORY, classOf[MockReadWritePersistenceFactory].getName)
      val session = SparkSession.builder.getOrCreate
      session
        .enableLineageTracking() // 1st is fine
        .enableLineageTracking() // 2nd should warn
      numberOfRegisteredSplineListeners(session) shouldBe 1
      val session2 = session.newSession()
      numberOfRegisteredSplineListeners(session2) shouldBe 0
      session2.enableLineageTracking()
      numberOfRegisteredSplineListeners(session2) shouldBe 1
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
