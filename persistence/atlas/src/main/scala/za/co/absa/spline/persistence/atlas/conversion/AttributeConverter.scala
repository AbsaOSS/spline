/*
 * Copyright 2017 ABSA Africa Group Limited
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

package za.co.absa.spline.persistence.atlas.conversion

import java.util.UUID

import org.apache.atlas.v1.model.instance.Id
import za.co.absa.spline.{model => splineModel}
import za.co.absa.spline.persistence.atlas.{model => atlasModel}

/**
  * The object is responsible for conversion of [[za.co.absa.spline.model.Attribute Spline attributes]] to [[za.co.absa.spline.persistence.atlas.model.Attribute Atlas attributes]].
  */
object AttributeConverter {

  /**
    * The method converts [[za.co.absa.spline.model.Attribute Spline attributes]] to [[za.co.absa.spline.persistence.atlas.model.Attribute Atlas attributes]].
    * @param splineAttributes Spline attributes that will be converted
    * @param dataTypeIdAnNameMap A mapping from Spline data type ids to ids assigned by Atlas API and attribute names.
    * @return Atlas attributes
    */
  def convert(splineAttributes : Seq[splineModel.Attribute], dataTypeIdAnNameMap: Map[UUID, (Id, String)]): Seq[atlasModel.Attribute] = splineAttributes.map{
    case splineModel.Attribute(id, name, dataTypeId) => new atlasModel.Attribute(name, id, dataTypeIdAnNameMap(dataTypeId))
  }
}
