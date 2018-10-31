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

import java.util

import org.apache.hadoop.conf.{Configuration => SparkHadoopConf}

import scala.collection.JavaConverters._


/**
 * {@link org.apache.hadoop.conf.Configuration} to {@link org.apache.commons.configuration.Configuration} adapter
 *
 * @param shc A source of Hadoop configuration
 */
class HadoopConfiguration(shc: SparkHadoopConf) extends ReadOnlyConfiguration {

  override def getProperty(key: String): AnyRef = shc get key

  override def getKeys: util.Iterator[String] = shc.iterator.asScala.map(_.getKey).asJava

  override def containsKey(key: String): Boolean = Option(shc get key).isDefined

  override def isEmpty: Boolean = shc.size < 1
}
