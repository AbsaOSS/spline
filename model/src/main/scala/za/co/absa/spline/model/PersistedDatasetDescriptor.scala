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

package za.co.absa.spline.model

import java.net.URI
import java.util.UUID

/**
  * The case class represents a basic descriptor containing all necessary information to identify a persisted dataset.
  *
  * @param datasetId An unique identifier of the dataset
  * @param appId     An ID of the Spark application that produced this dataset
  * @param appName   A name of the Spark application that produced this dataset
  * @param path      Persisted dataset (file) URL
  * @param timestamp UNIX timestamp (in millis) when the dataset has been produced
  */
case class PersistedDatasetDescriptor
(
  datasetId: UUID,
  appId: String,
  appName: String,
  path: URI, // FIXME needs to be generalized e.g. or kafka needs to be fit into this kafka://servers/topic
  timestamp: Long
)
