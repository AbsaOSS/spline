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

import java.util.UUID

import za.co.absa.spline.persistence.atlas.{model => atlasModel}
import za.co.absa.spline.{model => splineModel}

/**
 * The object is responsible for conversion of [[splineModel.dt.DataType Spline data types]] to [[za.co.absa.spline.persistence.atlas.model.DataType Atlas data types]].
 */
trait DataTypeConverter {

  def dataTypeById: UUID => splineModel.dt.DataType

  /**
   * The method converts a [[splineModel.dt.DataType Spline data type]] to a [[za.co.absa.spline.persistence.atlas.model.DataType Atlas data type]]
   *
   * @param splineDataTypeId      An input Spline data type
   * @param qualifiedNamePrefix A name prefix ensuring uniqueness of qualified name of created Atlas data type
   * @return An Atlas data type
   */
  def convertDataType(splineDataTypeId: UUID, qualifiedNamePrefix: String): za.co.absa.spline.persistence.atlas.model.DataType = {
    val typeQualifiedName = qualifiedNamePrefix + "_type"
    dataTypeById(splineDataTypeId) match {
      case splineModel.dt.Simple(_, name, nullable) => new atlasModel.SimpleDataType(name, typeQualifiedName, nullable)
      case splineModel.dt.Struct(_, fields, nullable) => new atlasModel.StructDataType(convert(fields, typeQualifiedName), typeQualifiedName, nullable)
      case splineModel.dt.Array(_, elementDataTypeId, nullable) =>
        new atlasModel.ArrayDataType(convertDataType(elementDataTypeId, qualifiedNamePrefix + "_element"), typeQualifiedName, nullable)
    }
  }

  /**
   * The method converts a sequence of [[splineModel.dt.StructField Spline struct fields]] to a sequence of [[za.co.absa.spline.persistence.atlas.model.StructField Atlas struct fields]]
   *
   * @param structFields      An input sequence of Spline struct fields
   * @param typeQualifiedName A qualified name of parent struct type helping to ensure uniqueness of qualified names of particular fields
   * @return A sequence of Atlas struct fields
   */
  private def convert(structFields: Seq[splineModel.dt.StructField], typeQualifiedName: String): Seq[atlasModel.StructField] = {
    structFields.map(field => {
      val qn = typeQualifiedName + "_field@" + field.name
      new atlasModel.StructField(field.name, qn, convertDataType(field.dataTypeId, qn))
    })
  }
}
