/*
 * Copyright 2024 ABSA Group Limited
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

package za.co.absa.spline.persistence

import com.arangodb.ArangoDBException
import com.arangodb.async.ArangoDatabaseAsync
import com.arangodb.internal.util.ArangoSerializationFactory.Serializer
import org.springframework.beans.factory.annotation.Autowired

import java.util.concurrent.CompletionException
import scala.PartialFunction.cond
import scala.concurrent.{ExecutionContext, Future}
import scala.jdk.FutureConverters._
import scala.reflect.ClassTag

class FoxxRouter @Autowired()(db: ArangoDatabaseAsync) {
  private val serialization = db.util(Serializer.CUSTOM)

  def get[A: ClassTag](endpoint: String)(implicit ex: ExecutionContext): Future[A] = {
    val aType = implicitly[ClassTag[A]].runtimeClass
    db
      .route(endpoint)
      .get()
      .asScala
      .map(resp => serialization.deserialize[A](resp.getBody, aType))
      .recover({
        case ce: CompletionException
          if cond(ce.getCause)({ case ae: ArangoDBException => ae.getResponseCode == 404 }) =>
          throw new NoSuchElementException(s"Resource NOT FOUND: $endpoint")
      })
  }

  def post[A: ClassTag](endpoint: String, body: AnyRef)(implicit ex: ExecutionContext): Future[A] = {
    val serializedBody = serialization.serialize(body)
    db
      .route(endpoint)
      .withBody(serializedBody)
      .post()
      .asScala
      .asInstanceOf[Future[A]]
  }
}
