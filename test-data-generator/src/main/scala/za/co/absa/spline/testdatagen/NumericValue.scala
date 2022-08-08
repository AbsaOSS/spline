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
  def valueOf(): Int
}

case class Constant(value: Int) extends NumericValue {
  override def valueOf(): Int = value

  override def toString: String = value.toString
}

case class Variable(start: Int, end: Int, step: Int) extends NumericValue {
  def expand(): Seq[Constant] = (start to end by step).map(Constant)

  override def toString: String = s"$start-${end}by$step"

  override def valueOf(): Int = throw new NotImplementedError("Not expanded")
}

object NumericValue {

  def apply(param: String): NumericValue = {
    val ConstantPattern = "(\\d+)".r
    val VariablePattern = "(\\d+)-(\\d+)by(\\d+)".r
    param match {
      case ConstantPattern(c) if c.toInt > 0 => Constant(c.toInt)
      case ConstantPattern(c) => throw new IllegalArgumentException(s"Invalid name $c, number should be positive")
      case VariablePattern(start: String, end: String, step: String)
        if start.toInt > 0 && end.toInt > 0 && step.toInt > 0 && end.toInt > start.toInt =>
        Variable(start.toInt, end.toInt, step.toInt)
      case VariablePattern(_, _, _) =>
        throw new IllegalArgumentException(s"Invalid range $param, pattern should be {start}-{end}by{step}, each one > 0")
      case _ => throw new IllegalArgumentException("Invalid specified pattern")
    }
  }
}
