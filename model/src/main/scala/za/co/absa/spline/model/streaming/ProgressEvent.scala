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

package za.co.absa.spline.model.streaming

import java.util.UUID

/**
  * The class contains details about a streaming micro batch.
  * @param id An unique id of the micro-batch
  * @param lineageId An identifier of the lineage that the micro batch is related to
  * @param timestamp A time when the micro-batch was created.
  * @param readCount A number of records read within the micro batch
  * @param readPaths Paths of the sources of the data
  * @param writePath A path of the target where data are written
  */
case class ProgressEvent(
  id: UUID,
  lineageId: String,
  appId: String,
  appName: String,
  timestamp: Long,
  readCount: Long,
  readPaths: Seq[String],
  writePath: String
)