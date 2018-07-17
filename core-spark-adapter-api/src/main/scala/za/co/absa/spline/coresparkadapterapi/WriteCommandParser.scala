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

package za.co.absa.spline.coresparkadapterapi

import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.catalyst.plans.logical.{Command, LogicalPlan}

import scala.language.implicitConversions
import scala.reflect.ClassTag

abstract class WriteCommandParser[T <: LogicalPlan](implicit tag: ClassTag[T]) {
  def matches(operation: LogicalPlan): Boolean = {
    tag.runtimeClass.isAssignableFrom(operation.getClass)
  }

  def asWriteCommand(operation: T): WriteCommand

  def asWriteCommandIfPossible(operation: T): Option[WriteCommand] =
    if (matches(operation)) Some(asWriteCommand(operation))
    else None

}

object WriteCommandParser extends AdapterFactory[WriteCommandParser[LogicalPlan]]

case class WriteCommand(path: String, mode: SaveMode, format: String, query: LogicalPlan) extends Command
