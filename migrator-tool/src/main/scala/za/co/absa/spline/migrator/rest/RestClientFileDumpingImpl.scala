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

package za.co.absa.spline.migrator.rest

import org.apache.commons.io.FilenameUtils
import za.co.absa.spline.common.json.SimpleJsonSerDe.JsonToEntity
import za.co.absa.spline.common.logging.Logging

import java.io.{BufferedOutputStream, File, FileOutputStream, PrintStream}
import java.util.zip.GZIPOutputStream
import scala.concurrent.{ExecutionContext, Future, blocking}

class RestClientFileDumpingImpl(file: File)
  extends RestClient
    with AutoCloseable
    with Logging {

  private val out = new PrintStream(
    {
      val fos = new FileOutputStream(file)
      val ext = FilenameUtils.getExtension(file.getName)
      ext match {
        case "gz" =>
          log.debug(s"Target file type: GZIP")
          new GZIPOutputStream(fos)
        case _ =>
          log.debug(s"Target file type: plain text")
          new BufferedOutputStream(fos)
      }
    },
    true // auto flush
  )

  override def createEndpoint(resourceName: String): RestEndpoint = {
    new RestEndpoint {
      override def head()(implicit ec: ExecutionContext): Future[Unit] = {
        Future.successful(Unit)
      }

      override def post(data: String)(implicit ec: ExecutionContext): Future[String] = Future {
        blocking {
          out.synchronized {
            out.println(data)
          }
        }
        lineageIdOrNull(data)
      }
    }
  }

  private def lineageIdOrNull(jsonData: String) = {
    jsonData
      .stripPrefix("[")
      .stripSuffix("]")
      .fromJson[Map[String, Any]]
      .get("id")
      .map(id => s""""$id"""")
      .orNull
  }

  override def close(): Unit = {
    out.close()
  }
}
