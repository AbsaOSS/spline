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

package za.co.absa.spline.persistence.api

import _root_.salat.grater
import org.apache.commons.codec.digest.DigestUtils
import za.co.absa.spline.model.{DataLineage, OperationNode}

/**
  * The object is responsible for calculating a hash from a data lineage graph.
  */
object DataLineageHashResolver {

  import serialization.BSONSalatContext._

  /**
    * The method calculates a hash for a data lineage graph.
    *
    * @param dataLineage An input data lineage
    * @return A calculated hash
    */
  def resolve(dataLineage: DataLineage): Array[Byte] = {
    DigestUtils sha1 (grater[HashedObject] toBSON HashedObject(dataLineage))
  }
}

private case class HashedObject(appName: String, nodes: Seq[OperationNode])

private object HashedObject {
  def apply(dataLineage: DataLineage): HashedObject = HashedObject(dataLineage.appName, dataLineage.nodes)
}
