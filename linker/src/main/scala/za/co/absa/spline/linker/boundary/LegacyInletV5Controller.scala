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

package za.co.absa.spline.linker.boundary

import io.swagger.annotations.ApiOperation
import org.slf4s.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation._
import salat.grater
import za.co.absa.spline.linker.control.{BatchDataLineageLinker, LineageProjectionMerger}
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.streaming.ProgressEvent
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter, ProgressEventWriter}
import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._

import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

@Controller
@RequestMapping(Array("/legacyInlet/v5/"))
@Autowired()
class LegacyInletV5Controller(
    lineageWriter: DataLineageWriter,
    lineageReader: DataLineageReader,
    progressEventWriter: ProgressEventWriter) {

  private val log = LoggerFactory.getLogger(getClass)
  private val batchLinker = new BatchDataLineageLinker(lineageReader)

  @PostMapping(Array("dataLineage"))
  @ApiOperation("Links and stores a DataLineage v5 in BSON serialized via Salat.")
  def lineage(@RequestBody body: Array[Byte]): Future[Unit] = {
    val rawLineage = grater[DataLineage].fromBSON(body)
    val processed = LineageProjectionMerger(rawLineage)
    for {
      linked <- batchLinker(processed)
       _ <- lineageWriter.store(linked)
         .andThen({ case _ => log.info(s"Saved lineage ${processed.id}")})
    } yield Unit
  }

  @PostMapping(Array("progressEvent"))
  @ApiOperation("Stores progressEvent v5 in BSON serialized via Salat.")
  def progress(@RequestBody body: Array[Byte]): Future[Unit] = {
    val progress = grater[ProgressEvent].fromBSON(body)
    progressEventWriter.store(progress).map(_ => {
      log.info(s"Saved progressEvent ${progress.id}")
      Unit
    })
  }

}
