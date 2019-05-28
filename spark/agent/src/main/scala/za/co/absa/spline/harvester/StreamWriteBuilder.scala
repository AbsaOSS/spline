/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.harvester

import java.util.UUID

import org.apache.spark.sql.execution.streaming.StreamExecution
import za.co.absa.spline.model.endpoint._
import za.co.absa.spline.model.op.{OperationProps, StreamWrite}
import za.co.absa.spline.model.{DataLineage, MetaDataset}
import za.co.absa.spline.sparkadapterapi.StructuredStreamingListenerAdapter.instance._
import za.co.absa.spline.sparkadapterapi.{FileSinkVersionAgnostic, KafkaSinkVersionAgnostic}

object StreamWriteBuilder {

  private def buildEnpoint(se: StreamExecution) = se match {
      case FileSinkVersionAgnostic(fileSinkInfo) => FileEndpoint(fileSinkInfo.format.toString, fileSinkInfo.path)
      case KafkaSinkVersionAgnostic(info) => KafkaEndpoint(info.servers, info.topics)
      case x if consoleSinkClass().isAssignableFrom(x.sink.getClass) => ConsoleEndpoint()
      case x => VirtualEndpoint(x.sink.getClass)
  }

  def build(se: StreamExecution, logicalPlanLineage: DataLineage): (StreamWrite, MetaDataset) = {
    val endpoint = buildEnpoint(se)
    val metaDataset = logicalPlanLineage.rootDataset.copy(se.runId)
    val mainProps = OperationProps(UUID.randomUUID, endpoint.description, Seq(logicalPlanLineage.rootDataset.id), metaDataset.id)
    val writeOperation = StreamWrite(mainProps, endpoint.paths.mkString(","), endpoint.description)
    (writeOperation, metaDataset)
  }

}
