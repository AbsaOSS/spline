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

package za.co.absa.spline.producer.rest.controller

import java.util.UUID

import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.{PostMapping, RequestBody, RequestMapping, RestController}
import za.co.absa.spline.producer.rest.model.{ExecutionEvent, ExecutionPlan}
import za.co.absa.spline.producer.service.repo.ExecutionProducerRepository

import scala.concurrent.{ExecutionContext, Future}

@RestController
@RequestMapping(
  value = Array("/execution"),
  consumes = Array("application/json"),
  produces = Array("application/json")
)
class ExecutionProducerController @Autowired()(
  val repo: ExecutionProducerRepository) {

  import ExecutionContext.Implicits.global

  @PostMapping(Array("/plan"))
  @ApiOperation(
    value = "/execution/plan",
    notes =
      """
        Record an execution plan

        RequestBody format :

        //Id of the execution plan to create
        id: UUID
        // List of operations of the execution plan
        operations: Lists of operations
        {
              //Array of read operations of the execution plan
              reads: Array[ReadOperation]
              [
                // Array of input DataSources for this operation
                inputSources : Array[DataSource]
                // Id of this operation
                id : Int
                // List of references to the dataTypes
                schema: Array[String]
                // Other parameters containing for instance the name of the operation
                params: Map[String, Any]
              ]
              // Write operation of the execution plan
              write: WriteOperation{
                // Id of the write operation
                id: Int
                // output DataSource uri
                outputSource: String
                // append mode - true if append, false if override
                append: Boolean
                // Array of the children operations id
                childIds: Array[Int]
                // List of references to the dataTypes
                schema: Option[Any]
                // Other parameters containing for instance the name of the operation
                params: Map[String, Any]
              }
              other: Array[DataOperation]
              [
                // Id of the Data operation
                id: Int,
                // Array of the children operations id
                childIds: Array[Int],
                // List of references to the dataTypes
                schema: Option[Any] = None,
                // Other parameters containing for instance the name of the operation
                params: Map[String, Any]
              ]
        }
        // Information about a data framework in use (e.g. Spark, StreamSets etc)
        systemInfo: SystemInfo
        {
         name : String
         version : String
        }
        // Spline agent information
        agentInfo: Option[AgentInfo]
        {
          name: String
          version: String
        }
        // Map containing any other extra info like the name of the application
        extraInfo: Map[String, Any]
      """
  )
  def executionPlan(@RequestBody execPlan: ExecutionPlan): Future[UUID] = repo
    .insertExecutionPlan(execPlan)
    .map(_ => execPlan.id)

  @PostMapping(Array("/event"))
  @ApiOperation(
    value = "/execution/event",
    notes =
      """
        Record a list of execution events

        RequestBody format :

        Array[ExecutionEvent]
        [
          // Reference to the Executionplan Id that was triggered
          planId: UUID
          // Timestamp of the execution
          timestamp: Long
          // If an error occurred during the execution
          error: Option[Any]
          // Any other extra information related to the execution Event Like the application Id for instance
          extra: Map[String, Any]
        ]
      """
  )
  def executionEvent(@RequestBody execEvents: Array[ExecutionEvent]): Future[Unit] = {
    repo.insertExecutionEvents(execEvents)
  }

}
