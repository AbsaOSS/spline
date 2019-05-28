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

package za.co.absa.spline.consumer.rest.controller

import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.service.model.{AttributeRef, Operation, OperationDetails}
import za.co.absa.spline.consumer.service.repo.OperationRepository
import za.co.absa.spline.persistence.model.{ArrayDataType, DataType, SimpleDataType, StructDataType}

import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

@RestController
@RequestMapping(Array("/operation"))
class OperationDetailsController @Autowired()
(
  val repo: OperationRepository
) {

  @GetMapping(Array("/{operationId}"))
  @ApiOperation("Returns details of an operation node")
  def operation(@PathVariable("operationId") operationId: Operation.Id): Future[OperationDetails] = {
    val result: Future[OperationDetails] = repo.findById(operationId)

    result.map(res => {
      val reducedDt = reducedDataTypes(res.dataTypes, res.schemas)
      res.copy(dataTypes = reducedDt)
    })

  }

  private def reducedDataTypes(dataTypes: Array[DataType], schemas: Array[Array[AttributeRef]]): Array[DataType] = {
    val dataTypesIdToKeep = schemas.flatten.map(attributeRef => attributeRef.dataTypeKey.toString).toSet
    val dataTypesSet = dataTypes.toSet
    dataTypesFilter(dataTypesSet, dataTypesIdToKeep).toArray
  }


  private def dataTypesFilter(dataTypes: Set[DataType], dataTypesIdToKeep: Set[String]): Set[DataType] = {
    val dt = dataTypes.filter(dataType => {
      dataTypesIdToKeep.contains(dataType._key)
    })
    if (getAllIds(dt).size != dataTypesIdToKeep.size) {
      dataTypesFilter(dataTypes, getAllIds(dt))
    } else {
      dt
    }
  }

  private def getAllIds(dataTypes: Set[DataType]): Set[String] = {
    dataTypes.flatMap {
      case dt@(_: SimpleDataType) => Set(dt._key)
      case dt@(adt: ArrayDataType) => Set(dt._key, adt.elementDataTypeKey)
      case dt@(sdt: StructDataType) => sdt.fields.map(attributeRef => attributeRef.dataTypeKey).toSet ++ Set(dt._key)
    }
  }
}