/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.harvester.dispatcher


import org.apache.commons.configuration.Configuration
import scalaj.http.Http
import za.co.absa.spline.common.ConfigurationImplicits._
import za.co.absa.spline.common.logging.Logging
import za.co.absa.spline.harvester.exception.SplineNotInitializedException
import za.co.absa.spline.harvester.json.HarvesterJsonSerDe._
import za.co.absa.spline.producer.model.{ExecutionEvent, ExecutionPlan}

import scala.util.control.NonFatal
import scala.util.{Failure, Success, Try}

class HttpLineageDispatcher(splineServerRESTEndpointBaseURL: String)
  extends LineageDispatcher
    with Logging {

  val dataLineagePublishUrl = s"$splineServerRESTEndpointBaseURL/execution-plans"
  val progressEventPublishUrl = s"$splineServerRESTEndpointBaseURL/execution-events"
  val statusUrl = s"$splineServerRESTEndpointBaseURL/status"


  override def send(executionPlan: ExecutionPlan): String = {
    sendJson(executionPlan.toJson, dataLineagePublishUrl)
  }

  override def send(event: ExecutionEvent): Unit = {
    sendJson(Seq(event).toJson, progressEventPublishUrl)
  }

  private def sendJson(json: String, url: String) = {
    log.debug(s"sendJson $url : $json")
    try Http(url)
      .postData(json)
      .compress(true)
      .header("content-type", "application/json")
      .asString
      .throwError
      .body
    catch {
      case NonFatal(e) => throw new RuntimeException(s"Cannot send lineage data to $url", e)
    }
  }

  override def ensureProducerReady(): Unit = {
    val tryStatusOk = Try(Http(statusUrl)
      .method("HEAD")
      .asString.
       isSuccess)

    tryStatusOk match {
      case Success(false) => throw new SplineNotInitializedException("Spline is not initialized properly!")
      case Failure(e) if NonFatal(e) => throw new SplineNotInitializedException("Producer is not accessible!", e)
      case _ => Unit
    }
  }
}


object HttpLineageDispatcher {
  val producerUrlProperty = "spline.producer.url"

  def apply(configuration: Configuration): LineageDispatcher = {
    new HttpLineageDispatcher(configuration.getRequiredString(producerUrlProperty))
  }
}
