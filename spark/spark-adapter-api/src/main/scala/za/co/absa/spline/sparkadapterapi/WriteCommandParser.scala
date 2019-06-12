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

package za.co.absa.spline.sparkadapterapi

import scala.language.implicitConversions

import org.apache.spark.SparkContext
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan


abstract class WriteCommandParserNew[T] {
  def execute(operation: T)(implicit factory: ComponentCreatorFactoryIface): Option[OperationNodeBuilder]
}

object WriteCommandParserFactory extends AdapterFactory[WriteCommandParserFactory]

abstract class WriteCommandParserFactory
{
  def createParsers(sparkContext : SparkContext): Seq[WriteCommandParserNew[LogicalPlan]]
}

trait AdapterFactory[T] {

  lazy val instance: T = {
    val className = getClass.getCanonicalName.replaceAll("\\$$", "Impl")
    Class.forName(className).newInstance().asInstanceOf[T]
  }

}

object URIPrefixes {
  //prefix used in identifiers for saveAsTable writes
  val managedTablePrefix = "table://"
  val jdbcTablePrefix = "jdbc://"
  val filePrefix = "file:/"
}