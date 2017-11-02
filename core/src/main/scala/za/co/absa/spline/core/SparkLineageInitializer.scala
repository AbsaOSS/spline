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

import za.co.absa.spline.core.conf._
import org.apache.commons.configuration._
import org.apache.spark.sql.SparkSession

import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext
import scala.util.Try

/**
  * The object contains logic needed for initialization of the library
  */
object SparkLineageInitializer {

  /**
    * The class is a wrapper around Spark session and performs all necessary registrations and procedures for initialization of the library.
    *
    * @param sparkSession A Spark session
    */
  implicit class SparkSessionWrapper(sparkSession: SparkSession) {

    private val sessionState = sparkSession.sessionState

    private implicit val executionContext = ExecutionContext.global

    /**
      * The method performs all necessary registrations and procedures for initialization of the library.
      *
      * @param configurer A collection of settings for the library initialization
      * @return An original Spark session
      */
    def enableLineageTracking(configurer: SplineConfigurer = new DefaultSplineConfigurer(defaultSplineConfiguration)): SparkSession =
      sparkSession.synchronized {
        preventDoubleInitialization()
        sessionState.listenerManager register new DataLineageListener(configurer.persistenceFactory, sparkSession.sparkContext.hadoopConfiguration)
        sparkSession
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

    private def preventDoubleInitialization() = {
      val sessionConf = sessionState.conf
      if (sessionConf contains initFlagKey)
        throw new IllegalStateException("Lineage tracking is already initialized")
      sessionConf.setConfString(initFlagKey, true.toString)
    }
  }

  val initFlagKey = "spline.initialized_flag"
}
