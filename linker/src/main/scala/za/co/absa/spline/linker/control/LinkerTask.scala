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

package za.co.absa.spline.linker.control

import org.apache.spark.api.java.function.MapFunction
import za.co.absa.spline.model.{DataLineage, LinkedLineage}
import za.co.absa.spline.persistence.api.{Logging, PersistenceFactory}

import scala.concurrent.{Await, ExecutionContext, Future}

import ConfigMapConverter._
import scala.concurrent.duration.DurationInt

class LinkerTask(serializableConfig: Map[String, Object]) extends MapFunction[DataLineage, LinkedLineage] with Logging {

  private implicit lazy val executionContext: ExecutionContext = ExecutionContext.global
  private lazy val transformation: DataLineage => Future[LinkedLineage] = {
    val configuration = toConfiguration(serializableConfig)
    val factory = PersistenceFactory.create(configuration)
    if (factory.createDataLineageReader.isDefined) {
      new DataLineageLinker(factory.createDataLineageReader.get).apply
    } else {
      dataLineage => Future { new LinkedLineage(dataLineage, dataLineage) }
    }
  }

  override def call(rawLineage: DataLineage): LinkedLineage = {
    log debug s"Processing raw lineage"
    Await.result(transformation(rawLineage), 10 minutes)
  }

}

