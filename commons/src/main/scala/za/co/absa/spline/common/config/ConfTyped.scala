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

package za.co.absa.spline.common.config

import scala.language.implicitConversions

trait ConfTyped {
  protected val rootPrefix: String = null

  private def rootPrefixOpt: Option[Conf] = Option(rootPrefix).map(new Conf(_)(None))

  protected class Conf(name: String)(implicit prefixOpt: Option[Conf] = rootPrefixOpt) {

    protected implicit def asOption: Option[Conf] = Some(this)

    override def toString: String = prefixOpt.toSeq :+ name mkString "."
  }

  protected object Prop {
    def apply(name: String)(implicit prefix: Option[Conf] = rootPrefixOpt): String = new Conf(name)(prefix).toString
  }

}