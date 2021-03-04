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

import com.arangodb.async.ArangoDatabaseAsync
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionPlanDetailsRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionPlanDetailsRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  /*
   * StringBuilder used for building each part of query required for intersection
   * Using ListBuffer for adding each query string
   * each datasource is provided as read/write:datasource id
   * for ex : ds_rel=read:1111,write:2222
   * fields=name,id
   */
  override def getExecutionPlan(
    datasourceRelation: Array[String],
    fields: Array[String])(
    implicit ec: ExecutionContext): Future[Array[Map[String, Any]]] = {

    val queryBuilderForExecutionPlan = List.newBuilder[String]
    val queryValue = StringBuilder.newBuilder
    val paramsMapBuilder = Map.newBuilder[String, String]
    val fieldValuesBuilder = List.newBuilder[String]
    val queryDataSourceList = List.newBuilder[String]

    if (datasourceRelation.size >= 2) {
      for ((dsRel, resultIndex) <- datasourceRelation.zipWithIndex) {

        val dsRelPair = dsRel.split(":")
        if (!dsRelPair.isEmpty && dsRelPair.size == 2) {
          val dsAccessType = dsRelPair(0)
          paramsMapBuilder += s"dsId$resultIndex" -> dsRelPair(1)
          queryDataSourceList += s"result${resultIndex}"

          dsAccessType match {
            case "read" =>
              val readQuery =
                s"""
                   |LET result$resultIndex = (FOR execPlan IN 1..1
                   |INBOUND DOCUMENT('dataSource',@dsId$resultIndex) depends
                   |RETURN execPlan)
                   """.stripMargin

              queryBuilderForExecutionPlan += readQuery

            case "write" =>
              val writeQuery =
                s"""
                   |LET result$resultIndex = (FOR execPlan IN 1..1
                   |INBOUND DOCUMENT('dataSource',@dsId$resultIndex) affects
                   |RETURN execPlan)
                   """.stripMargin

              queryBuilderForExecutionPlan += writeQuery
          }
        }
      }
    }

    queryValue.append(
       s"""
         |${queryBuilderForExecutionPlan.result().mkString("")}
         |FOR execPlan IN UNION_DISTINCT
         |(${queryDataSourceList.result().mkString(",")})
         |""".stripMargin)

    for (field <- fields) {
      field match{
        case "name" => fieldValuesBuilder += "name: execPlan.extra.appName"
        case "id" => fieldValuesBuilder += "id : execPlan._id"
        case _  => fieldValuesBuilder += "extra : execPlan.extra"
      }
    }

    queryValue.append(s" RETURN { ${fieldValuesBuilder.result().mkString(",")} }")

    db.queryStream[Map[String, Any]](
      queryValue.toString(),
      paramsMapBuilder.result()).map(_.toArray)
  }
}


