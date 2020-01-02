/*
 * Copyright 2019 ABSA Group Limited
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

import org.apache.commons.configuration.{CompositeConfiguration, Configuration, PropertiesConfiguration, SystemConfiguration}
import org.apache.spark.sql.SparkSession

import scala.collection.JavaConverters._
import scala.util.Try

object StandardSplineConfigurationStack {
  private val propertiesFileName = "spline.properties"

  def apply(sparkSession: SparkSession): Configuration = new CompositeConfiguration(Seq(
    Some(new HadoopConfiguration(sparkSession.sparkContext.hadoopConfiguration)),
    Some(new SparkConfiguration(sparkSession.sparkContext.getConf)),
    Some(new SystemConfiguration),
    Try(new PropertiesConfiguration(propertiesFileName)).toOption
  ).flatten.asJava)
}
