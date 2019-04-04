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

package za.co.absa.spline.sparkadapterapi

import org.apache.spark.sql.execution.datasources.FileFormat
import org.apache.spark.sql.execution.streaming.StreamExecution

trait FileSinkAdapter {
  def extractFileInfo(streamExecution: StreamExecution): Option[FileSinkInfo]
}

object FileSinkAdapter extends AdapterFactory[FileSinkAdapter]

case class FileSinkInfo(path: String, format: FileFormat)

object FileSinkVersionAgnostic {
  def unapply(streamExecution: StreamExecution): Option[FileSinkInfo] = FileSinkAdapter.instance.extractFileInfo(streamExecution)
}