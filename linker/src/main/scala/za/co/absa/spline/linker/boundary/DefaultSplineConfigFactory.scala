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

package za.co.absa.spline.linker.boundary

import org.apache.commons.configuration.{CompositeConfiguration, PropertiesConfiguration, SystemConfiguration}
import org.apache.spark.sql.SparkSession

import scala.util.Try
import scala.collection.JavaConverters._

object DefaultSplineConfig {

  def apply(sparkSession: SparkSession): CompositeConfiguration = {
    val splinePropertiesFileName = "spline.properties"

    val systemConfOpt = Some(new SystemConfiguration)
    val propFileConfOpt = Try(new PropertiesConfiguration(splinePropertiesFileName)).toOption

    new CompositeConfiguration(Seq(
      systemConfOpt,
      propFileConfOpt
    ).flatten.asJava)
  }
}