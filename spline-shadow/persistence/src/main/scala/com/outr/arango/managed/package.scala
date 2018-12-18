package com.outr.arango

import co.za.absa.spline.persistence.{Attribute, DataType, Schema}

package object managed {

  import io.circe.generic.semiauto._
  import io.circe.{Decoder, Encoder}
  implicit val attrDec: Decoder[Attribute] = deriveDecoder[Attribute]
  implicit val schemaDec: Decoder[Schema] = deriveDecoder[Schema]
  implicit val attrEnc: Encoder[Attribute] = deriveEncoder[Attribute]
  implicit val schemaEnc: Encoder[Schema] = deriveEncoder[Schema]
  implicit val dataTypeDec: Decoder[DataType] = deriveDecoder[DataType]
  implicit val dataTypeEnc: Encoder[DataType] = deriveEncoder[DataType]

}
