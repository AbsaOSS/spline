/*
 * Copyright 2022 ABSA Group Limited
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

package za.co.absa.spline.admin

import com.arangodb.ArangoDBException

import java.net.HttpURLConnection.HTTP_UNAUTHORIZED
import scala.annotation.tailrec
import scala.util.control.NonFatal

object ArangoDBAuthenticationException {
  def unapply(t: Throwable): Option[ArangoDBException] = {
    @tailrec def loop(ex: Throwable, visited: Set[Throwable]): Option[ArangoDBException] =
      if (visited(ex)) None
      else ex match {
        case null => None
        case ae: ArangoDBException if ae.getErrorNum == HTTP_UNAUTHORIZED => Some(ae)
        case NonFatal(e) => loop(e.getCause, visited + e)
        case _ => None
      }

    loop(t, Set.empty)
  }
}
