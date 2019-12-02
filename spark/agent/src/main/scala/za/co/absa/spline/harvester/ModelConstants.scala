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

package za.co.absa.spline.harvester

object ModelConstants {

  object AppMetaInfo {
    val Spark = "spark"
    val Spline = "spline"
  }

  object ExecutionPlanExtra {
    val AppName = "appName"
    val DataTypes = "dataTypes"
    val Attributes = "attributes"
  }

  object ExecutionEventExtra {
    val AppId = "appId"
    val WriteMetrics = "writeMetrics"
    val ReadMetrics = "readMetrics"
  }

  object OperationParams {
    val Name = "name"

    // op.Read
    val SourceType = "sourceType" //todo: find better attribute name. See: https://github.com/AbsaOSS/spline/issues/496

    // op.Write
    val DestinationType = "destinationType" //todo: find better attribute name. See: https://github.com/AbsaOSS/spline/issues/496

    // op.Join
    val JoinType = "joinType"
    val Condition = "condition"

    // op.Sort
    val SortOrders = "order"

    // op.Aggregation
    val Groupings = "groupingExpressions"
    val Aggregations = "aggregateExpressions"

    // op.Projection
    val Transformations = "projectList"

    // op.Alias
    val Alias = "alias"

    // op.Generic
    val RawString = "rawString" //todo: find better attribute name. See: https://github.com/AbsaOSS/spline/issues/496
  }

}
