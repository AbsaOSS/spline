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

import io.swagger.annotations.{ApiOperation, ApiParam}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.OperationRepository
import za.co.absa.spline.persistence.{model => persistence}

import scala.concurrent.Future


@RestController
@RequestMapping(Array("/operation"))
class OperationDetailsController @Autowired()
(
  val repo: OperationRepository) {

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/{operationId}"))
  @ApiOperation(
    value = "GET /operation/{operationId}",
    notes = "Returns details of an operation node"
  )
  def operation
  (
    @ApiParam(value = "Id of the operation node to retrieve")
    @PathVariable("operationId") operationId: Operation.Id
  ): Future[OperationDetails] = {
    val result: Future[OperationDetails] = repo.findById(operationId)

    result.map(res => {
      val reducedDt = reducedDataTypes(res.dataTypes, res.schemas)
      res.copy(dataTypes = reducedDt)
    })

  }

  @GetMapping(Array("/info"))
  @ApiOperation(
    value = "GET /operation/info",
    notes = "Returns details of an operation node from a DataSource uri and an applicationId"
  )
  def operationFromSourceAndApplicationId
  (
    @ApiParam(value = "DataSource uri related to the operation (Output DataSource uri for a Write Operation or one of the Input DataSources uri if it is a Read Operation)")
    @RequestParam("source") source: String,
    @ApiParam(value = "Id of the application that triggered the operation")
    @RequestParam("applicationId") applicationId: String
  ): Future[OperationDetails] = {
    val result: Future[OperationDetails] = repo.findBySourceAndApplicationId(source, applicationId)

    result.map(res => {
      val reducedDt = reducedDataTypes(res.dataTypes, res.schemas)
      res.copy(dataTypes = reducedDt)
    })
  }

  private def reducedDataTypes(dataTypes: Array[persistence.DataType], schemas: Array[Array[persistence.Attribute]]): Array[persistence.DataType] = {
    val dataTypesIdToKeep = schemas.flatten.map(attributeRef => attributeRef.dataTypeId).toSet
    val dataTypesSet = dataTypes.toSet
    dataTypesFilter(dataTypesSet, dataTypesIdToKeep).toArray
  }


  private def dataTypesFilter(dataTypes: Set[persistence.DataType], dataTypesIdToKeep: Set[String]): Set[persistence.DataType] = {
    val dt = dataTypes.filter(dataType => dataTypesIdToKeep.contains(dataType.id))
    if (getAllIds(dt).size != dataTypesIdToKeep.size) {
      dataTypesFilter(dataTypes, getAllIds(dt))
    } else {
      dt
    }
  }

  private def getAllIds(dataTypes: Set[persistence.DataType]): Set[String] = {
    dataTypes.flatMap {
      case dt@(_: persistence.SimpleDataType) => Set(dt.id)
      case dt@(adt: persistence.ArrayDataType) => Set(dt.id, adt.elementDataTypeId)
      case dt@(sdt: persistence.StructDataType) => sdt.fields.map(attributeRef => attributeRef.dataTypeId).toSet ++ Set(dt.id)
    }
  }
}