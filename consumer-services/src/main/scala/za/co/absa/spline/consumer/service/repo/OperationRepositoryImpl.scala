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

package za.co.absa.spline.consumer.service.repo

import com.arangodb.ArangoDatabaseAsync
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model.{Operation, OperationDetails}

import scala.concurrent.{ExecutionContext, Future}

@Repository
class OperationRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends OperationRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findById(operationId: Operation.Id)(implicit ec: ExecutionContext): Future[OperationDetails] = {
    db.queryOne[OperationDetails](
      """
        |FOR ope IN operation
        |    FILTER ope._key == @operationId
        |
        |    LET inputs = (
        |        FOR v IN 1..1
        |            OUTBOUND ope follows
        |            RETURN v.outputSchema
        |    )
        |
        |    LET output = ope.outputSchema == null ? [] : [ope.outputSchema]
        |
        |    LET pairAttributesDataTypes = FIRST(
        |        FOR v IN 1..9999
        |            INBOUND ope follows, executes
        |            FILTER IS_SAME_COLLECTION("executionPlan", v)
        |            RETURN { "attributes":  v.extra.attributes, "dataTypes" : v.extra.dataTypes }
        |    )
        |
        |    LET schemas = (
        |        FOR s in APPEND(inputs, output)
        |            LET attributeList = (
        |                FOR a IN pairAttributesDataTypes.attributes
        |                    FILTER CONTAINS(s, a.id)
        |                    RETURN KEEP(a, "dataTypeId", "name")
        |            )
        |            RETURN attributeList
        |    )
        |
        |    LET dataTypesFormatted = (
        |        FOR d IN pairAttributesDataTypes.dataTypes
        |            RETURN MERGE(
        |                KEEP(d,  "id", "name", "fields", "nullable", "elementDataTypeId"),
        |                {
        |                    "_class": d._typeHint == "dt.Simple" ?  "za.co.absa.spline.persistence.model.SimpleDataType"
        |                            : d._typeHint == "dt.Array"  ?  "za.co.absa.spline.persistence.model.ArrayDataType"
        |                            :                               "za.co.absa.spline.persistence.model.StructDataType"
        |                }
        |            )
        |    )
        |
        |    RETURN {
        |        "operation": {
        |            "_id"       : ope._key,
        |            "_type"     : ope._type,
        |            "name"      : ope.properties.name,
        |            "properties": MERGE(
        |                {
        |                    "inputSources": ope.inputSources,
        |                    "outputSource": ope.outputSource,
        |                    "append"      : ope.append
        |                },
        |                ope.properties
        |            )
        |        },
        |        "dataTypes": dataTypesFormatted,
        |        "schemas"  : schemas,
        |        "inputs"   : LENGTH(inputs) > 0 ? RANGE(0, LENGTH(inputs) - 1) : [],
        |        "output"   : LENGTH(schemas) - 1
        |    }
        |""".stripMargin,
      Map("operationId" -> operationId)
    )
  }
}
