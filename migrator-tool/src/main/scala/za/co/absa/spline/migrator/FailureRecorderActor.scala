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

package za.co.absa.spline.migrator

import java.io.{File, PrintWriter}
import java.util.UUID

import akka.actor.{Actor, ActorLogging}
import org.apache.commons.io.FileUtils.forceMkdirParent
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest

import scala.io.Source

class FailureRecorderActor(maybeRecFile: Option[File]) extends Actor with ActorLogging {

  var maybeOut: Option[PrintWriter] = _

  override def preStart(): Unit =
    maybeOut =
      for (file <- maybeRecFile) yield {
        forceMkdirParent(file)
        new PrintWriter(file)
      }

  override def postStop(): Unit = {
    maybeOut.foreach(_.close)
    maybeRecFile.filter(_.length == 0).foreach(_.delete())
  }

  override def receive: Receive = {
    case p: Product if p.productArity == 2 =>
      val Array(dsId: UUID, e: Throwable) = p.productIterator.toArray
      val dsIdHexStr = dsId.toString
      log.error(e, dsIdHexStr)
      maybeOut.foreach(out => {
        out.println(dsIdHexStr)
        out.flush()
      })
  }
}

object FailureRecorderActor {

  import za.co.absa.spline.common.CollectionImplicits._

  def failRecReader(file: File): PageRequest => Seq[UUID] = {
    var readCnt = 0
    val source = Source.fromFile(file)
    val idsIter = source
      .getLines
      .map(_.trim)
      .filter(_.nonEmpty)
      .map(UUID.fromString)

    page: PageRequest => {
      val ids = idsIter
        .fetch(page.size)
        .ensuring(readCnt == page.offset, "pages must be requested sequentially")
      readCnt += ids.length
      if (idsIter.isEmpty) source.close()
      ids
    }
  }
}
