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

import org.apache.commons.configuration._
import org.apache.spark
import org.apache.spark.sql.SparkSession
import org.slf4s.Logging
import za.co.absa.spline.core.conf.SplineConfigurer.SplineMode._
import za.co.absa.spline.core.conf._
import za.co.absa.spline.core.harvester.QueryExecutionEventHandler
import za.co.absa.spline.core.listener.SplineQueryExecutionListener
import za.co.absa.spline.coresparkadapterapi.SparkVersionRequirement

import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext
import scala.util.Try
import scala.util.control.NonFatal

/**
  * The object contains logic needed for initialization of the library
  */
object SparkLineageInitializer extends Logging {

  def enableLineageTracking(sparkSession: SparkSession): SparkSession =
    SparkSessionWrapper(sparkSession).enableLineageTracking()

  def enableLineageTracking(sparkSession: SparkSession, configurer: SplineConfigurer): SparkSession =
    SparkSessionWrapper(sparkSession).enableLineageTracking(configurer)

  def createEventHandler(sparkSession: SparkSession): Option[QueryExecutionEventHandler] =
    SparkSessionWrapper(sparkSession).createEventHandler()

  /**
    * The class is a wrapper around Spark session and performs all necessary registrations and procedures for initialization of the library.
    *
    * @param sparkSession A Spark session
    */
  implicit class SparkSessionWrapper(sparkSession: SparkSession) {

    private implicit val executionContext: ExecutionContext = ExecutionContext.global
    private def defaultSplineConfigurer = new DefaultSplineConfigurer(defaultSplineConfiguration, sparkSession)

    /**
      * The method performs all necessary registrations and procedures for initialization of the library.
      *
      * @param configurer A collection of settings for the library initialization
      * @return An original Spark session
      */
    def enableLineageTracking(configurer: SplineConfigurer = defaultSplineConfigurer): SparkSession = {
      val splineConfiguredForCodelessInit = sparkSession.sparkContext.getConf
        .getOption(sparkQueryExecutionListenersKey).toSeq
        .flatMap(s => s.split(",").toSeq)
        .contains(classOf[SplineQueryExecutionListener].getCanonicalName)
      if (!splineConfiguredForCodelessInit || spark.SPARK_VERSION.startsWith("2.2")) {
        if (splineConfiguredForCodelessInit) {
          log.warn("""
            |Spline lineage tracking is also configured for codeless initialization, but codeless init is
            |supported on Spark 2.3+ and not current version 2.2. Spline will be initialized only via code call to
            |enableLineageTracking i.e. the same way as is now."""
              .stripMargin.replaceAll("\n", " "))
        }
        createEventHandler(configurer)
          .foreach(h => sparkSession.listenerManager.register(new SplineQueryExecutionListener(Some(h))))
      } else {
        log.warn("""
          |Spline lineage tracking is also configured for codeless initialization.
          |It wont be initialized by this code call to enableLineageTracking now."""
            .stripMargin.replaceAll("\n", " "))
      }
      sparkSession
    }

    def createEventHandler(): Option[QueryExecutionEventHandler] = {
      val configurer = new DefaultSplineConfigurer(defaultSplineConfiguration, sparkSession)
      if (configurer.splineMode != DISABLED) {
        createEventHandler(configurer)
      } else {
        None
      }
    }

    private def createEventHandler(configurer: SplineConfigurer): Option[QueryExecutionEventHandler] = {
      if (configurer.splineMode != DISABLED) {
        if (!getOrSetIsInitialized()) {
          log.info(s"Spline v${SplineBuildInfo.version} is initializing...")
          try {
            SparkVersionRequirement.instance.requireSupportedVersion()
            val eventHandler = configurer.queryExecutionEventHandler
            log.info(s"Spline successfully initialized. Spark Lineage tracking is ENABLED.")
            Some(eventHandler)
          } catch {
            case NonFatal(e) if configurer.splineMode == BEST_EFFORT =>
              log.error(s"Spline initialization failed! Spark Lineage tracking is DISABLED.", e)
              None
          }
        } else {
          log.warn("Spline lineage tracking is already initialized!")
          None
        }
      } else {
        None
      }
    }

    private[core] val defaultSplineConfiguration = {
      val splinePropertiesFileName = "spline.properties"

      val systemConfOpt = Some(new SystemConfiguration)
      val propFileConfOpt = Try(new PropertiesConfiguration(splinePropertiesFileName)).toOption
      val hadoopConfOpt = Some(new HadoopConfiguration(sparkSession.sparkContext.hadoopConfiguration))
      val sparkConfOpt = Some(new SparkConfiguration(sparkSession.sparkContext.getConf))

      new CompositeConfiguration(Seq(
        hadoopConfOpt,
        sparkConfOpt,
        systemConfOpt,
        propFileConfOpt
      ).flatten.asJava)
    }

    private def getOrSetIsInitialized(): Boolean = sparkSession.synchronized {
      val sessionConf = sparkSession.conf
      sessionConf getOption initFlagKey match {
        case Some(_) =>
          true
        case None =>
          sessionConf.set(initFlagKey, true.toString)
          false
      }
    }

  }

  val initFlagKey = "spline.initialized_flag"

  // constant take from Spark but is not available in Spark 2.2 so we need to copy value.
  val sparkQueryExecutionListenersKey = "spark.sql.queryExecutionListeners"
}
