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

package za.co.absa.spline.core.conf

import java.util

import org.apache.spark.SparkConf

import scala.collection.JavaConverters._


/**
 * {@link org.apache.spark.SparkConf} to {@link org.apache.commons.configuration.Configuration} adapter
 *
 * @param conf A source of Spark configuration
 */
class SparkConfiguration(conf: SparkConf) extends ReadOnlyConfiguration {

  import SparkConfiguration._

  override def getProperty(key: String): AnyRef =
    try
      conf get s"$KEY_PREFIX$key"
    catch {
      case _: NoSuchElementException => null
    }

  override def getKeys: util.Iterator[String] = conf.getAll.iterator.map(_._1.drop(KEY_PREFIX.length)).asJava

  override def containsKey(key: String): Boolean = conf contains s"$KEY_PREFIX$key"

  override def isEmpty: Boolean = conf.getAll.isEmpty
}

object SparkConfiguration {
  private val KEY_PREFIX = "spark."
}