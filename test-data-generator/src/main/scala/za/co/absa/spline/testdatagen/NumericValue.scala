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
    throw new NotImplementedError("Not expanded")
  }

  override def toString: String = valueOf().toString
}
case class Constant(value: Int) extends NumericValue

case class Variable(start: Int, end: Int, step: Int) extends NumericValue {
  def expand(): Seq[Constant] = (start to end by step).map(i => Constant(i))

  override def toString: String = s"${start}-${end}|${step}"
}

object NumericValue {
  private val numberPattern = "([0-9]+)"

  def apply(param: String): NumericValue = {
    val ConstantPattern = numberPattern.r
    val VariablePattern = (numberPattern + "-" + numberPattern + "/" + numberPattern).r
    param match {
      case ConstantPattern(c) if c.toInt > 0 => Constant(c.toInt)
      case ConstantPattern(c) => throw new IllegalArgumentException(s"Invalid value ${c}, number should be positive")
      case VariablePattern(start: String, end: String, step: String)
        if start.toInt > 0 && end.toInt > 0 && step.toInt > 0 && end > start =>
        Variable(start.toInt, end.toInt, step.toInt)
      case VariablePattern(start: String, end: String, step: String) =>
        throw new IllegalArgumentException(s"Invalid range ${param}, pattern should be start-end/step, each one > 0")
      case _ => throw new IllegalArgumentException("Invalid specified pattern")
    }
  }
}