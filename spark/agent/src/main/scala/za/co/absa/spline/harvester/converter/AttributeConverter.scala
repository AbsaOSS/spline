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

package za.co.absa.spline.harvester.converter

import java.util.UUID.randomUUID

import org.apache.spark.sql.catalyst.expressions.{Attribute => SparkAttribute}
import za.co.absa.spline.common.transformations.AbstractConverter
import za.co.absa.spline.model.Attribute

class AttributeConverter(dataTypeConverter: DataTypeConverter)
  extends AbstractConverter {
  override type From = SparkAttribute
  override type To = Attribute

  override def convert(attr: SparkAttribute): Attribute = {
    Attribute(
      id = randomUUID,
      name = attr.name,
      dataTypeId = dataTypeConverter.convert(attr.dataType, attr.nullable).id)
  }
}
