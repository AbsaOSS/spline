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

package za.co.absa.spline.model

import java.util.UUID

/**
  * The case class represents a basic descriptor containing all necessary information to identify a specific data lineage.
  *
  * @param dataLineageId An unique identifier of the data lineage
  * @param appId      An unique identifier of the application run
  * @param appName    A name of the Spark application that data lineage is derived from
  * @param timestamp  A timestamp describing when the application was executed
  */
case class DataLineageDescriptor
(
  dataLineageId: UUID,
  appId: String,
  appName: String,
  timestamp: Long
)
