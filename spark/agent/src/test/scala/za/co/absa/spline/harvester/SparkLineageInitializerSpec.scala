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

package za.co.absa.spline.harvester

import java.{util => ju}

import org.apache.commons.configuration.BaseConfiguration
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.execution.streaming.StreamingQueryListenerBus
import org.apache.spark.sql.streaming.StreamingQueryListener
import org.apache.spark.sql.util.QueryExecutionListener
import org.apache.spark.{SparkConf, SparkContext}
import org.scalatest.Matchers._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{BeforeAndAfterEach, FunSpec, Matchers}
import za.co.absa.spline.common.ReflectionUtils.getFieldValue
import za.co.absa.spline.harvester.SparkLineageInitializer._
import za.co.absa.spline.harvester.SparkLineageInitializerSpec._
import za.co.absa.spline.harvester.conf.DefaultSplineConfigurer
import za.co.absa.spline.harvester.conf.DefaultSplineConfigurer.ConfProperty._
import za.co.absa.spline.harvester.conf.SplineConfigurer.SplineMode._
import za.co.absa.spline.harvester.dispatcher.HttpLineageDispatcher.publishUrlProperty
import za.co.absa.spline.harvester.listener.{SplineQueryExecutionListener, StructuredStreamingListener}
import za.co.absa.spline.test.fixture.SparkFixture

import scala.collection.JavaConverters._

object SparkLineageInitializerSpec {

  private[this] def getSparkQueryExecutionListenerClasses(session: SparkSession): Seq[Class[_ <: QueryExecutionListener]] = {
    getFieldValue[Seq[QueryExecutionListener]](
      session.listenerManager.clone(),
      "org$apache$spark$sql$util$ExecutionListenerManager$$listeners")
      .map(_.getClass)
  }

  private[this] def getStreamingListenerClasses(session: SparkSession): Seq[Class[_ <: StreamingQueryListener]] = {
    val listenerBus: StreamingQueryListenerBus = getFieldValue(session.streams, "listenerBus")
    getFieldValue[ju.List[(StreamingQueryListener, Option[Any])]](
      listenerBus,
      "org$apache$spark$util$ListenerBus$$listenersPlusTimers")
      .asScala
      .map(_._1.getClass)
      .filter(c => classOf[StreamingQueryListener].isAssignableFrom(c))
  }

  private def assertSplineIsDisabled(session: SparkSession = SparkSession.builder().getOrCreate()) =
    getSparkQueryExecutionListenerClasses(session) should not contain classOf[SplineQueryExecutionListener]

  def numberOfRegisteredBatchListeners(session: SparkSession): Int =
    getSparkQueryExecutionListenerClasses(session).count(_ == classOf[SplineQueryExecutionListener])

  def numberOfRegisteredStreamListeners(session: SparkSession): Int =
    getStreamingListenerClasses(session).count(_ == classOf[StructuredStreamingListener])


}

class SparkLineageInitializerSpec extends FunSpec with BeforeAndAfterEach with Matchers with MockitoSugar with SparkFixture {
  private val configuration = new BaseConfiguration
  configuration.setProperty("spark.master", "local")
  // needed for codeless init tests
  System.setProperty(publishUrlProperty, "invalidTestVal")

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
      withNewSparkSession(sparkSession => {
        val jvmProps = System.getProperties
        //      jvmProps.setProperty("spark.master", "local")

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
      })
    }
  }

  describe("codeless initialization") {
    it("should not allow duplicate tracking when combining the methods") {
      withNewSparkSession(session => {
        numberOfRegisteredBatchListeners(session) shouldBe 0
        numberOfRegisteredStreamListeners(session) shouldBe 0
        // creatEventHandler relies on Spark for registration during session creation,
        // but it never the less inits Spline and registers Streaming Listener
        SparkLineageInitializer.createEventHandler(session)
        numberOfRegisteredStreamListeners(session) shouldBe 1
        numberOfRegisteredBatchListeners(session) shouldBe 0
        session.enableLineageTracking()
        numberOfRegisteredBatchListeners(session) shouldBe 0
        numberOfRegisteredStreamListeners(session) shouldBe 1
      })
    }

    it("should not allow duplicate codeless tracking") {
      withNewSparkSession(session => {
        numberOfRegisteredStreamListeners(session) shouldBe 0
        SparkLineageInitializer
          .createEventHandler(session).getClass shouldBe classOf[Some[QueryExecutionEventHandler]]
        numberOfRegisteredStreamListeners(session) shouldBe 1
        SparkLineageInitializer
          .createEventHandler(session) shouldBe None
        numberOfRegisteredStreamListeners(session) shouldBe 1
      })
    }
  }

  describe("enableLineageTracking()") {
    it("should warn on double initialization") {
      withNewSparkSession(session => {
        session
          .enableLineageTracking(createConfigurer(session)) // 1st is fine
        numberOfRegisteredStreamListeners(session) shouldBe 1
        numberOfRegisteredBatchListeners(session) shouldBe 1
        session
          .enableLineageTracking(createConfigurer(session)) // 2nd should warn
        numberOfRegisteredStreamListeners(session) shouldBe 1
        numberOfRegisteredBatchListeners(session) shouldBe 1
      })
    }

    it("should return the spark session back to the caller") {
      withNewSparkSession(session =>
        session.enableLineageTracking(createConfigurer(session)) shouldBe session
      )
    }

    describe("modes") {

      it("should disable Spline and proceed, when is in BEST_EFFORT (default) mode") {
        withNewSparkSession(sparkSession => {
          configuration.setProperty(MODE, BEST_EFFORT.toString)
          sparkSession.enableLineageTracking(createFailingConfigurer(sparkSession))
          assertSplineIsDisabled()
        })
      }

      it("should disable Spline and proceed, when is in DEFAULT mode") {
        withNewSparkSession(sparkSession => {
          configuration.clearProperty(MODE) // default mode is BEST_EFFORT
          sparkSession.enableLineageTracking(createFailingConfigurer(sparkSession))
          assertSplineIsDisabled()
        })
      }

      it("should abort application, when is in REQUIRED mode") {
        intercept[Exception] {
          withNewSparkSession(session => {
            configuration.setProperty(MODE, REQUIRED.toString)
            session.enableLineageTracking(createFailingConfigurer(session))
          })
        }
      }

      it("should have no effect, when is in DISABLED mode") {
        withNewSparkSession(sparkSession => {
          configuration.setProperty(MODE, DISABLED.toString)
          sparkSession.enableLineageTracking(createFailingConfigurer(sparkSession))
          assertSplineIsDisabled()
        })
      }

      def createFailingConfigurer(sparkSession: SparkSession) = {
        new DefaultSplineConfigurer(configuration, sparkSession) {
          override lazy val lineageDispatcher: LineageDispatcher = {
            throw new RuntimeException("Testing exception - please ignore.")
          }
        }
      }

    }
  }

  def createConfigurer(sparkSession: SparkSession): DefaultSplineConfigurer = {
    new DefaultSplineConfigurer(configuration, sparkSession) {
      override lazy val lineageDispatcher: LineageDispatcher = mock[LineageDispatcher]
    }
  }

}
