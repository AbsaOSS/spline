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
import za.co.absa.spline.harvester.LineageDispatcher
import za.co.absa.spline.producer.rest.model.{ExecutionEvent, ExecutionPlan}
import za.co.absa.spline.common.JSONSerializationImplicits._


class HttpLineageDispatcher(splineServerRESTEndpointBaseURL: String)
  extends LineageDispatcher
    with Logging {

  val dataLineagePublishUrl = s"$splineServerRESTEndpointBaseURL/producer/execution/plan"
  val progressEventPublishUrl = s"$splineServerRESTEndpointBaseURL/producer/execution/event"

  def send(executionPlan: ExecutionPlan): Unit = {
    sendJson(serializeToJSON(executionPlan), dataLineagePublishUrl)
  }

  def send(event: Seq[ExecutionEvent]): Unit = {
    sendJson(serializeToJSON(event), progressEventPublishUrl)
  }

  private def sendJson(json: String, url: String) = {
    log.info("sendJson $url : $json")
    Http(url)
      .postData(json)
      .compress(true)
      .header("content-type", "application/json")
      .asString
      .throwError
  }

  private def serializeToJSON(o: AnyRef): String =  o.toJson
}


object HttpLineageDispatcher {
  val publishUrlProperty = "spline.harvester.publishUrl"

  def apply(configuration: Configuration): LineageDispatcher = {
    val publishUrl = configuration.getRequiredString(publishUrlProperty)
    new HttpLineageDispatcher(publishUrl)
  }
}
