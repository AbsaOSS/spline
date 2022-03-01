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

import java.io.File
import java.nio.charset.Charset

import org.apache.commons.io.FileUtils
import org.json4s.JsonAST.JValue
import za.co.absa.spline.producer.model.v1_2.{ExecutionEvent, ExecutionPlan}
import org.json4s.jackson.JsonMethods
import za.co.absa.commons.json.AbstractJsonSerDe
import za.co.absa.commons.json.format.{DefaultFormatsBuilder, JavaTypesSupport}

class FileDispatcher(fileNamePrefix: String) extends AbstractJsonSerDe[JValue]
  with JsonMethods
  with DefaultFormatsBuilder
  with JavaTypesSupport {

  def send(plan: ExecutionPlan): Unit =
    FileUtils.writeStringToFile(
      new File(s"$fileNamePrefix-plan.json"),
      plan.toJson,
      Charset.defaultCharset()
    )

  def send(event: ExecutionEvent): Unit =
    FileUtils.writeStringToFile(
      new File(s"$fileNamePrefix-event.json"),
      Seq(event).toJson,
      Charset.defaultCharset()
  )
}
