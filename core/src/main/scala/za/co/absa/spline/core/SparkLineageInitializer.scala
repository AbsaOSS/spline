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

import org.apache.commons.configuration._
import org.apache.spark
import org.apache.spark.sql.SparkSession
import org.slf4s.Logging
import za.co.absa.spline.core.conf.SplineConfigurer.SplineMode._
import za.co.absa.spline.core.conf._

import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext
import scala.util.Try
import scala.util.control.NonFatal

/**
  * The object contains logic needed for initialization of the library
  */
object SparkLineageInitializer extends Logging {

  /**
    * The class is a wrapper around Spark session and performs all necessary registrations and procedures for initialization of the library.
    *
    * @param sparkSession A Spark session
    */
  implicit class SparkSessionWrapper(sparkSession: SparkSession) {

    private val sessionState = sparkSession.sessionState

    private implicit val executionContext: ExecutionContext = ExecutionContext.global

    /**
      * The method performs all necessary registrations and procedures for initialization of the library.
      *
      * @param configurer A collection of settings for the library initialization
      * @return An original Spark session
      */
    def enableLineageTracking(configurer: SplineConfigurer = new DefaultSplineConfigurer(defaultSplineConfiguration)): SparkSession = {
      if (configurer.splineMode != DISABLED) sparkSession.synchronized {
        preventDoubleInitialization()
        log info s"Spline v${SplineBuildInfo.version} is initializing..."
        try {
          attemptInitialization(configurer)
          log info s"Successfully initialized. Spark Lineage tracking is ENABLED."
        } catch {
          case NonFatal(e) if configurer.splineMode == BEST_EFFORT =>
            log.error(s"Initialization failed! Spark Lineage tracking is DISABLED.", e)
        }
      }
      sparkSession
    }

    def attemptInitialization(configurer: SplineConfigurer): Unit = {
      require(SparkVersionInfo.matchesRequirements, s"Unsupported Spark version: ${spark.SPARK_VERSION}. Required version ${SparkVersionInfo.requiredVersion}")
      val hadoopConfiguration = sparkSession.sparkContext.hadoopConfiguration
      val persistenceFactory = configurer.persistenceFactory
      sessionState.listenerManager register new DataLineageListener(persistenceFactory, hadoopConfiguration)
    }

    private[core] val defaultSplineConfiguration = {
      val splinePropertiesFileName = "spline.properties"

      val systemConfOpt = Some(new SystemConfiguration)
      val propFileConfOpt = Try(new PropertiesConfiguration(splinePropertiesFileName)).toOption
      val hadoopConfOpt = Some(new HadoopConfiguration(sparkSession.sparkContext.hadoopConfiguration))

      new CompositeConfiguration(Seq(
        hadoopConfOpt,
        systemConfOpt,
        propFileConfOpt
      ).flatten.asJava)
    }

    private def preventDoubleInitialization(): Unit = {
      val sessionConf = sessionState.conf
      if (sessionConf contains initFlagKey)
        throw new IllegalStateException("Lineage tracking is already initialized")
      sessionConf.setConfString(initFlagKey, true.toString)
    }
  }

  val initFlagKey = "spline.initialized_flag"
}
