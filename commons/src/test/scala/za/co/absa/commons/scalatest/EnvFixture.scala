/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.commons.scalatest

import java.{util => ju}

import org.scalatest.{BeforeAndAfter, Suite}
import za.co.absa.commons.reflect.ReflectionUtils

import scala.collection.JavaConverters._

trait EnvFixture extends BeforeAndAfter {
  this: Suite =>

  private val m = ReflectionUtils.extractFieldValue[ju.Map[String, String]](System.getenv, "m")
  private var keysBefore: Set[String] = _

  before {
    this.keysBefore = m.keySet().asScala.toSet
  }

  after {
    val keysAfter = m.keySet().asScala.toSet
    val keysToRemove = keysAfter -- keysBefore
    keysToRemove.foreach(m.remove)
  }

  def setEnv(key: String, value: String): Unit = m.put(key, value)
}
