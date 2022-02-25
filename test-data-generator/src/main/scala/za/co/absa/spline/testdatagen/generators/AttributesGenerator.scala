/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.testdatagen.generators

import java.util.UUID

import za.co.absa.spline.producer.model.v1_2.Attribute.Id
import za.co.absa.spline.producer.model.v1_2.{AttrOrExprRef, Attribute}

object AttributesGenerator {

  def generateSchema(nr: Int, parents: Seq[Id] = Seq.empty): Seq[Attribute] = {
    if (parents.isEmpty) {
      1.to(nr).map(id => Attribute(id = UUID.randomUUID().toString, name = s"dummy_attr_${id}"))
    } else {
      parents.map(parentId => {
        val id = UUID.randomUUID().toString
        val result = Attribute(id = id, name = s"dummy_attr_${id}", childRefs =
          Seq(AttrOrExprRef(
            __attrId = None,
            __exprId = Some(parentId))
          ))
        result
      })
    }
  }

  def generateAttributeFromExprParent(parentID: Option[Id]): Attribute = {
    val attrId = UUID.randomUUID().toString
    parentID match {
      case Some(parent) => Attribute(id = attrId, name = s"dummy_attr_${attrId}", childRefs =
        Seq(AttrOrExprRef(
          __attrId = None,
          __exprId = Some(parent))
        ))
      case None => Attribute(id = UUID.randomUUID().toString, name = s"dummy_attr_${attrId}")
    }
  }
}
