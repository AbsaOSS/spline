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

package za.co.absa.spline.arango

import java.lang.reflect.{InvocationHandler, Method, Proxy}
import com.arangodb.async.ArangoDatabaseAsync
import za.co.absa.spline.persistence.ArangoDatabaseFacade

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success, Try}

object AutoClosingArangoManagerProxy {

  def create(
              managerProvider: ArangoDatabaseAsync => ArangoManager,
              arangoFacadeProvider: () => ArangoDatabaseFacade)
            (implicit ex: ExecutionContext): ArangoManager = {

    val handler: InvocationHandler = (_: Any, method: Method, args: Array[AnyRef]) => {
      val dbFacade = arangoFacadeProvider()
      (Try {
        val underlyingManager = managerProvider(dbFacade.db)
        method
          .invoke(underlyingManager, args: _*)
          .asInstanceOf[Future[_]]
      } match {
        case Failure(e) => Future.failed(e)
        case Success(v) => v
      }) andThen {
        case _ => dbFacade.destroy()
      }
    }

    Proxy.newProxyInstance(
      getClass.getClassLoader,
      Array(classOf[ArangoManager]),
      handler
    ).asInstanceOf[ArangoManager]
  }
}
