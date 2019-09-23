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

package za.co.absa.spline.harvester.builder

import org.apache.spark.sql.SQLContext
import org.apache.spark.sql.execution.datasources.LogicalRelation
import org.apache.spark.sql.sources.BaseRelation
import org.apache.spark.sql.types.StructType
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FunSpec, Inside, Matchers}
import za.co.absa.spline.harvester.ComponentCreatorFactory
import za.co.absa.spline.harvester.builder.ReadCommandExtractorSpec.FooBarRelation
import za.co.absa.spline.harvester.builder.read.{ReadCommand, ReadCommandExtractor}
import za.co.absa.spline.harvester.qualifier.PathQualifier

class ReadCommandExtractorSpec extends FunSpec with MockitoSugar with Matchers {
  implicit val compCreatorFactory: ComponentCreatorFactory = new ComponentCreatorFactory()

  describe("support for different types of data source") {

    it("should handle unrecognized source type") {
      val extractor = new ReadCommandExtractor(mock[PathQualifier], null)
      val readCommand = extractor.asReadCommand(LogicalRelation(FooBarRelation))

      Inside.inside(readCommand) {
        case Some(ReadCommand(SourceIdentifier(Some(format), uris), _)) =>
          format should be("???: za.co.absa.spline.harvester.builder.ReadCommandExtractorSpec$FooBarRelation$")
          uris should be(empty)
      }
    }
  }
}

object ReadCommandExtractorSpec {

  object FooBarRelation extends BaseRelation {
    override def sqlContext: SQLContext = ???

    override def schema = new StructType
  }

}

