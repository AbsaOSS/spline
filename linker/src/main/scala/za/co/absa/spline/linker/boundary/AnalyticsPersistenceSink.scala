package za.co.absa.spline.linker.boundary

import com.mongodb.DuplicateKeyException
import org.apache.spark.sql.ForeachWriter
import za.co.absa.spline.linker.control.ConfigMapConverter.toConfiguration
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.{DataLineageWriter, Logging, PersistenceFactory}

import scala.concurrent.{Await, ExecutionContext}

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

/**
  * Handles duplicate insert via duplicate key exception ignore.
  */
class AnalyticsPersistenceSink(configMap: Map[String, Object]) extends ForeachWriter[DataLineage] with Logging {

  private implicit lazy val executionContext: ExecutionContext = ExecutionContext.global
  private var analyticsWriterFactory: PersistenceFactory = _
  private var analyticsWriter: DataLineageWriter = _

  /**
    * FIXME Method is missing coherent and general duplicate storage support.
    */
  override def process(rawLineage: DataLineage): Unit = {
    log debug s"Processing raw lineage"
    try {
      import scala.concurrent.duration.DurationInt
      Await.result(analyticsWriter.store(rawLineage), 10.minutes)
    } catch {
      case e: DuplicateKeyException => log.warn("Duplicate key ignored to tolarate potential duplicate insert to MongoDB.", e)
      case e: Throwable => throw e
    }
  }

  def close(errorOrNull: Throwable): Unit = {
    analyticsWriterFactory.destroy()
  }

  def open(partitionId: Long, version: Long): Boolean = {
    // todo: Memoize it!
    analyticsWriterFactory = createWriterFactory
    analyticsWriter = analyticsWriterFactory.createDataLineageWriter
    true
  }

  private def createWriterFactory = {
    val configuration = toConfiguration(configMap)
    PersistenceFactory.create(configuration)
  }
}


