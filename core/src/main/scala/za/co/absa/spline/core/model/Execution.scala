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

package za.co.absa.spline.core.model

import java.util.UUID

/**
  * The case class represents one run of a particular Spark job and contains relevant metrics to the execution of a data lineage.
  *
  * @param id            An unique identifier of the execution
  * @param dataLineageId An identifier of a related data lineage
  * @param jobID         An identifier of a Spark job
  * @param timestamp     A timestamp describing when the job was executed
  */
case class Execution
(
  id: UUID,
  dataLineageId: UUID,
  jobID: String,
  timestamp: Long
)


