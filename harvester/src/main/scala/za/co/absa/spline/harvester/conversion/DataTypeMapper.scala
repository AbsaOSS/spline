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

package za.co.absa.spline.harvester.conversion

import org.apache.spark.sql
import za.co.absa.spline.model.dt._

/**
  * The trait represents a mapper translating Spark data types to data types specified by Spline library.
  */
trait DataTypeMapper {

  /**
    * The method translates a Spark data type to a data type specified by Spline library.
    *
    * @param sparkDataType An input Spark data type
    * @param nullable      A flag specifying whether result data type will be nullable or not
    * @return A Spline data type
    */
  def fromSparkDataType(sparkDataType: sql.types.DataType, nullable: Boolean): DataType = sparkDataType match {
    case s: sql.types.StructType => Struct(s.fields.map(i => StructField(i.name, fromSparkDataType(i.dataType, i.nullable))), nullable)
    case a: sql.types.ArrayType => Array(fromSparkDataType(a.elementType, a.containsNull), nullable)
    case x => Simple(x.typeName, nullable)
  }
}
