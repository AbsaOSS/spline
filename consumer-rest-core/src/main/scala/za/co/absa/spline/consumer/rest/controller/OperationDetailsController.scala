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

import io.swagger.annotations.{Api, ApiOperation, ApiParam}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.OperationRepository
import za.co.absa.spline.persistence.{model => persistence}

import scala.annotation.tailrec
import scala.concurrent.Future


@RestController
@RequestMapping(Array("/operations"))
@Api(tags = Array("operations"))
class OperationDetailsController @Autowired()
(
  val repo: OperationRepository) {

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/{operationId}"))
  @ApiOperation("Get Operation details")
  def operation(
    @ApiParam(value = "Id of the operation node to retrieve")
    @PathVariable("operationId") operationId: Operation.Id
  ): Future[OperationDetails] = {
    repo
      .findById(operationId)
      .map(toOperationDetails)
  }

  private def toOperationDetails(operationDetails: OperationDetails): OperationDetails = {
    val reducedDt = reducedDataTypes(operationDetails.dataTypes, operationDetails.schemas)
    operationDetails.copy(dataTypes = reducedDt)
  }

  private def reducedDataTypes(dataTypes: Array[DataType], schemas: Array[Array[Attribute]]): Array[DataType] = {
    val dataTypesIdToKeep = schemas.flatten.map(attributeRef => attributeRef.dataTypeId).toSet
    val dataTypesSet = dataTypes.toSet
    dataTypesFilter(dataTypesSet, dataTypesIdToKeep).toArray
  }


  @tailrec
  private def dataTypesFilter(dataTypes: Set[DataType], dataTypesIdToKeep: Set[String]): Set[DataType] = {
    val dt = dataTypes.filter(dataType => dataTypesIdToKeep.contains(dataType.id))
    if (getAllIds(dt).size != dataTypesIdToKeep.size) {
      dataTypesFilter(dataTypes, getAllIds(dt))
    } else {
      dt
    }
  }

  private def getAllIds(dataTypes: Set[DataType]): Set[String] = {
    dataTypes.flatMap {
      case dt@(_: SimpleDataType) => Set(dt.id)
      case dt@(adt: ArrayDataType) => Set(dt.id, adt.elementDataTypeId)
      case dt@(sdt: StructDataType) => sdt.fields.map(attributeRef => attributeRef.dataTypeId).toSet ++ Set(dt.id)
    }
  }
}
