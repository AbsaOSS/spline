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

package za.co.absa.spline.persistence.atlas.conversion

import za.co.absa.spline.persistence.atlas.model._

/**
  * The object is responsible for conversion of [[za.co.absa.spline.model.Attribute Spline attributes]] to [[za.co.absa.spline.persistence.atlas.model.Attribute Atlas attributes]].
  */
object AttributeConverter {

  /**
    * The method converts an [[za.co.absa.spline.model.Attribute Spline attribute]] to an [[za.co.absa.spline.persistence.atlas.model.Attribute Atlas attribute]].
    * @param splineAttribute An input Spline attribute
    * @return An Atlas attributes
    */
  def convert(splineAttribute : za.co.absa.spline.model.Attribute) : Attribute = {
    val attributeQualifiedName = splineAttribute.id.toString
    val dataType = DataTypeConverter.convert(splineAttribute.dataType, attributeQualifiedName)
    new Attribute(splineAttribute.name, splineAttribute.id, dataType)
  }

}
