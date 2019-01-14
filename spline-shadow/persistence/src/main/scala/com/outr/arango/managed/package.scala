/*
 * Copyright 2017 ABSA Group Limited
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

package com.outr.arango

import co.za.absa.spline.persistence.{Attribute, DataType, Schema}
import io.circe.generic.semiauto._
import io.circe.{Decoder, Encoder}

package object managed {
  implicit val attrDec: Decoder[Attribute] = deriveDecoder[Attribute]
  implicit val schemaDec: Decoder[Schema] = deriveDecoder[Schema]
  implicit val attrEnc: Encoder[Attribute] = deriveEncoder[Attribute]
  implicit val schemaEnc: Encoder[Schema] = deriveEncoder[Schema]
  implicit val dataTypeDec: Decoder[DataType] = deriveDecoder[DataType]
  implicit val dataTypeEnc: Encoder[DataType] = deriveEncoder[DataType]

}
