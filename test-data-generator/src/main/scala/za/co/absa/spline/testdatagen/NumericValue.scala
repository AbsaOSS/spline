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

package za.co.absa.spline.testdatagen

sealed trait NumericValue {
  def isExpanded: Boolean = this.isInstanceOf[Constant]

  def valueOf(): Int = if (isExpanded) this.asInstanceOf[Constant].value else {
    throw new Exception("Not expanded")
  }
}
case class Constant(value: Int) extends NumericValue

case class Variable(start: Int, end: Int, step: Int) extends NumericValue {
  def expand(): Seq[Constant] = (start to end by step).map(i => Constant(i))
}

object NumericValue {
  def apply(param: String): NumericValue = {
    val ConstantPattern = "([0-9]+)".r
    val VariablePattern = "([0-9]+)-([0-9]+)/([0-9]+)".r
    param match {
      case ConstantPattern(c) => Constant(c.toInt)
      case VariablePattern(start: String, end: String, step: String) => Variable(start.toInt, end.toInt,step.toInt)
      case _ => throw new Exception("Invalid")
    }
  }
}