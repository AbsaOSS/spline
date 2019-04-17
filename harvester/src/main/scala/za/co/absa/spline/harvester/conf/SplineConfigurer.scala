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

package za.co.absa.spline.harvester.conf

import org.apache.spark.sql.streaming.StreamingQueryListener
import za.co.absa.spline.harvester.QueryExecutionEventHandler

/**
  * The trait describes settings needed for initialization of the library.
  */
trait SplineConfigurer {

  import SplineConfigurer.SplineMode._

  /**
    * A listener handling events from batch processing
    * @return [[za.co.absa.spline.harvester.QueryExecutionEventHandler]]
    */
  def queryExecutionEventHandler: QueryExecutionEventHandler

  /**
    * A listener handling events from structured-streaming processing
    * @return [[org.apache.spark.sql.streaming.StreamingQueryListener]]
    */
  def streamingQueryListener : StreamingQueryListener

  /**
    * Spline mode designates how Spline should behave in a context of a Spark application.
    * It mostly relates to error handling. E.g. is lineage tracking a mandatory for the given Spark app or is it good to have.
    * Should the Spark app be aborted on Spline errors or not.
    *
    * @see [[SplineMode]]
    * @return [[SplineMode]]
    */
  def splineMode: SplineMode
}

object SplineConfigurer {

  object SplineMode extends Enumeration {
    type SplineMode = Value
    val

    /**
      * Spline is disabled completely
      */
    DISABLED,

    /**
      * Abort on Spline initialization errors
      */
    REQUIRED,

    /**
      * If Spline initialization fails then disable Spline and continue without lineage tracking
      */
    BEST_EFFORT

    = Value
  }

}