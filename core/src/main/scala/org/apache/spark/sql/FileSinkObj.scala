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

package org.apache.spark.sql

import org.apache.spark.sql.execution.datasources.FileFormat
import org.apache.spark.sql.execution.streaming.{FileStreamSink, Sink}
import za.co.absa.spline.common.ReflectionUtils

/**
  * The object represents a value extractor for [[org.apache.spark.sql.execution.streaming.FileStreamSink FileStreamSink]].
  */
object FileSinkObj {

  /**
    * The method extracts internal properties from [[org.apache.spark.sql.execution.streaming.FileStreamSink FileStreamSink]].
    * @param sink The subject of property extraction
    * @return An option of a tuple comprising from a path and file format
    */
  def unapply(sink: Sink): Option[(String, FileFormat)] = sink match {
    case fss: FileStreamSink =>
      Some(
        (
          ReflectionUtils.getFieldValue[String](fss, "path"),
          ReflectionUtils.getFieldValue[FileFormat](fss, "fileFormat")
        )
      )
    case _ => None
  }
}
