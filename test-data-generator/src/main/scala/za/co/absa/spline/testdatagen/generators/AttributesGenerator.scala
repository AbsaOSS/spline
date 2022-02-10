package za.co.absa.spline.testdatagen.generators

import java.util.UUID

import za.co.absa.spline.producer.model.v1_2.Attribute

object AttributesGenerator {

  def generateSchema(nr: Int): Seq[Attribute] = {
    1.to(nr).map(id => Attribute(id = UUID.randomUUID().toString, name = s"dummy_attr_${id}"))
  }
}
