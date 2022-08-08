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

import org.apache.commons.io.FileUtils
import org.json4s.JsonAST.JValue
import za.co.absa.spline.producer.model.v1_2.{ExecutionEvent, ExecutionPlan}
import org.json4s.jackson.JsonMethods
import za.co.absa.commons.json.AbstractJsonSerDe
import za.co.absa.commons.json.format.{DefaultFormatsBuilder, JavaTypesSupport}
import scala.collection.JavaConverters._

/**
 * Will generate file named `$fileNamePrefix%$fileNameSuffix`
 * @param fileNamePrefix
 * @param fileNameSuffix suffix - by default `.json.txt`
 */
class FileDispatcher(fileNamePrefix: String, fileNameSuffix: String = ".json.txt") extends AbstractJsonSerDe[JValue]
  with JsonMethods
  with DefaultFormatsBuilder
  with JavaTypesSupport {

  private val outputFile = new File(s"$fileNamePrefix$fileNameSuffix")

  def send(event: ExecutionEvent, plan: ExecutionPlan): Unit = {

    val strings = Seq(plan.toJson, Seq(event).toJson)

    FileUtils.writeLines(
      outputFile,
      strings.asJava,
      true
    )
  }
}
