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

import za.co.absa.spline.model.Attributes
import za.co.absa.spline.persistence.atlas.model._
import za.co.absa.spline.persistence.atlas.model.Dataset

/**
  * The object is responsible for conversion of [[za.co.absa.spline.model.Attribute Spline attributes]] to [[za.co.absa.spline.persistence.atlas.model.Attribute Atlas attributes]].
  */
object AttributeConverter {

  /**
    * The method converts an options of [[za.co.absa.spline.model.Attributes Spline attributes]] to a sequence [[za.co.absa.spline.persistence.atlas.model.Attribute Atlas attributes]].
    * @param splineAttributes An Input option of Spline attributes
    * @param dataset A dataset that the attributes are part of
    * @return Sequence of Atlas attributes
    */
  def convert(splineAttributes : Option[Attributes],  dataset : Dataset) : Seq[Attribute] = splineAttributes match {
    case None => Seq.empty
    case Some(x) => convert(x, dataset)
  }

  /**
    * The method converts [[za.co.absa.spline.model.Attributes  Spline attributes]] to a sequence [[za.co.absa.spline.persistence.atlas.model.Attribute Atlas attributes]].
    * @param splineAttributes Input Spline attributes
    * @param dataset A dataset that the attributes are part of
    * @return Sequence of Atlas attributes
    */
  def convert(splineAttributes : Attributes, dataset : Dataset) : Seq[Attribute] = splineAttributes.seq.map(i => convert(i, dataset))

  /**
    * The method converts an [[za.co.absa.spline.model.Attribute Spline attribute]] to an [[za.co.absa.spline.persistence.atlas.model.Attribute Atlas attribute]].
    * @param splineAttribute An input Spline attribute
    * @param dataset A dataset that the attribute is part of
    * @return An Atlas attributes
    */
  def convert(splineAttribute : za.co.absa.spline.model.Attribute, dataset : Dataset) : Attribute = {
    val attributeQualifiedName = dataset.qualifiedName + "@" + splineAttribute.name
    val dataType = DataTypeConverter.convert(splineAttribute.dataType, attributeQualifiedName)
    new Attribute(splineAttribute.name, attributeQualifiedName, dataType, dataset.getId)
  }

}
