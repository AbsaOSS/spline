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

package za.co.absa.spline.consumer.service

import com.arangodb.model.AqlQueryOptions
import com.arangodb.{ArangoCursorAsync, ArangoDatabaseAsync}

import scala.collection.JavaConverters._
import scala.compat.java8.FutureConverters._
import scala.concurrent.{ExecutionContext, Future}

package object repo {

  trait _package

  implicit class ArangoDatabaseAsyncScalaWrapper(db: ArangoDatabaseAsync) {
    def queryOne[T: Manifest](query: String,
                              bindVars: Map[String, AnyRef] = null,
                              options: AqlQueryOptions = null)
                             (implicit ec: ExecutionContext): Future[T] = {
      for (
        res <- this.query[T](query, bindVars, options)
        if res.hasNext
      ) yield res.next
    }

    def query[T: Manifest](query: String,
                           bindVars: Map[String, AnyRef] = null,
                           options: AqlQueryOptions = null
                          ): Future[ArangoCursorAsync[T]] = {
      val resultType = implicitly[Manifest[T]].runtimeClass.asInstanceOf[Class[T]]
      db.query(query, bindVars.asJava, options, resultType).toScala
    }
  }


}
