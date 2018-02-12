/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.core.streaming

import org.apache.spark.sql.FileSinkObj
import org.apache.spark.sql.execution.streaming.StreamExecution
import org.apache.spark.sql.kafka010.KafkaSinkObj
import za.co.absa.spline.model.MetaDataset
import za.co.absa.spline.model.endpoint._
import za.co.absa.spline.model.op.{OperationProps, StreamWrite}
import java.util.UUID.randomUUID

/**
  * The class is responsible for harvesting [[za.co.absa.spline.model.op.StreamWrite StreamWrite]] operations from
  * [[org.apache.spark.sql.execution.streaming.StreamExecution StreamExecution]]. The required information are usually
  * obtained from [[org.apache.spark.sql.execution.streaming.Sink Sink]] instances
  */
class StreamWriteOperationHarvester {

  /**
    * The method obtains [[za.co.absa.spline.model.op.StreamWrite StreamWrite]] operations from
    * [[org.apache.spark.sql.execution.streaming.StreamExecution StreamExecution]].
    * @param streamExecution The subject of inspection
    * @param rootDataset A dataset that will be used as input for the returned operation
    * @return An option of a [[za.co.absa.spline.model.op.StreamWrite StreamWrite]] operation with a meta dataset produced
    *         by the operation.
    */
  def harvest(streamExecution: StreamExecution, rootDataset: MetaDataset) : Option[(StreamWrite, MetaDataset)] =
  {
    val endpointOption = streamExecution.sink match {
      case FileSinkObj(path, fileFormat) => Some(FileEndpoint(path, fileFormat.toString))
      case KafkaSinkObj(cluster, topic) => Some(KafkaEndpoint(cluster, topic.getOrElse("")))
      case _ => None // Other types of sinks are ignored.
    }

    for(endpoint <- endpointOption) yield {
      val metaDataset = rootDataset.copy(randomUUID)
      val mainProps = OperationProps(randomUUID,endpoint.getClass.getSimpleName, Seq(rootDataset.id), randomUUID)
      val writeOperation = StreamWrite(mainProps, endpoint)
      (writeOperation, metaDataset)
    }
  }
}
