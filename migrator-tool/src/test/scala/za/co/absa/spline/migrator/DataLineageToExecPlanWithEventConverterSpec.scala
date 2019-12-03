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

package za.co.absa.spline.migrator

import java.util.UUID

import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.migrator.DataLineageToExecPlanWithEventConverterSpec._
import za.co.absa.spline.model._
import za.co.absa.spline.model.op.{OperationProps, SortOrder}
import za.co.absa.spline.producer.model._

class DataLineageToExecPlanWithEventConverterSpec extends FlatSpec with Matchers {

  it should "convert DataLineage object to an (ExecutionPlan, Some(ExecutionEvent)) pair" in {
    converted(testLineage) shouldEqual ((expectedExecutionPlan, Some(expectedExecutionEvent)))
  }

  it should "convert DataLineage object with ignored write to an (ExecutionPlan, None) pair" in {
    converted(testLineage.copy(writeIgnored = true)) shouldEqual ((expectedExecutionPlan, None))
  }
}

object DataLineageToExecPlanWithEventConverterSpec {

  private def converted(lineage: DataLineage) = new DataLineageToExecPlanWithEventConverter(lineage).convert()

  /*
   *       read-A       read-B
   *        /  \          |
   *       /    \       custom
   *   filter  sort       |
   *       \   /       project
   *        \ /          /
   *       union        /
   *          \     aggregate
   *           \      /
   *            \  alias
   *             \ /
   *            join
   *              |
   *            write
   */
  private val testLineage = DataLineage(
    appId = "test-123",
    appName = "Lineage Converter Unit Test",
    timestamp = 1234567,
    sparkVer = "7.7.7",
    operations = Seq(
      op.Write(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "write",
          inputs = Seq(UUID.fromString("00000000-0000-0000-0000-000000000001")),
          output = UUID.fromString("00000000-0000-0000-0000-000000000000")),
        destinationType = "foo",
        path = "some://test/write/data/source/url?with=parameters&more=parameters",
        append = true,
        writeMetrics = Map.empty,
        readMetrics = Map.empty),

      op.Join(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "join",
          inputs = Seq(
            UUID.fromString("00000000-0000-0000-0000-000000000002"),
            UUID.fromString("00000000-0000-0000-0000-000000000006")),
          output = UUID.fromString("00000000-0000-0000-0000-000000000001")),
        condition = Some(expr.Generic(
          name = "expr1",
          dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999"),
          children = Seq(expr.Literal(value = 42, dataTypeId = UUID.fromString("00000000-0000-0000-0002-999999999999"))),
          exprType = "exprType1",
          params = Some(Map("aa" -> 1, "bb" -> "two")))),
        joinType = "INNER"),

      op.Union(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "union",
          inputs = Seq(
            UUID.fromString("00000000-0000-0000-0000-000000000003"),
            UUID.fromString("00000000-0000-0000-0000-000000000004")),
          output = UUID.fromString("00000000-0000-0000-0000-000000000002"))),

      op.Filter(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "filter",
          inputs = Seq(UUID.fromString("00000000-0000-0000-0000-000000000005")),
          output = UUID.fromString("00000000-0000-0000-0000-000000000003")),
        condition = expr.Binary(
          symbol = "++",
          dataTypeId = UUID.fromString("00000000-0000-0000-0003-999999999999"),
          children = Seq(
            expr.Literal(value = 111, dataTypeId = UUID.fromString("00000000-0000-0000-0003-999999999999")),
            expr.Literal(value = 222, dataTypeId = UUID.fromString("00000000-0000-0000-0003-999999999999"))))),

      op.Sort(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "sort",
          inputs = Seq(UUID.fromString("00000000-0000-0000-0000-000000000005")),
          output = UUID.fromString("00000000-0000-0000-0000-000000000004")),
        orders = Seq(SortOrder(
          expression = expr.AttrRef(UUID.fromString("00000001-9999-9999-9999-999999999999")),
          direction = "DESC",
          nullOrder = "NULLS LAST"))),

      op.Read(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "read-A",
          inputs = Nil,
          output = UUID.fromString("00000000-0000-0000-0000-000000000005")),
        sourceType = "bar",
        sources = Seq(
          MetaDataSource(path = "some://test/read/source-1", datasetsIds = Nil),
          MetaDataSource(path = "some://test/read/source-2", datasetsIds = Nil))),

      op.Alias(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "alias",
          inputs = Seq(UUID.fromString("00000000-0000-0000-0000-000000000007")),
          output = UUID.fromString("00000000-0000-0000-0000-000000000006")),
        alias = "my-df"),

      op.Aggregate(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "aggregate",
          inputs = Seq(UUID.fromString("00000000-0000-0000-0000-000000000008")),
          output = UUID.fromString("00000000-0000-0000-0000-000000000007")),
        groupings = Seq(
          expr.AttrRef(UUID.fromString("00000002-9999-9999-9999-999999999999")),
          expr.AttrRef(UUID.fromString("00000005-9999-9999-9999-999999999999"))),
        aggregations = Map(
          "avg" -> expr.AttrRef(UUID.fromString("00000004-9999-9999-9999-999999999999")),
          "sum" -> expr.AttrRef(UUID.fromString("00000005-9999-9999-9999-999999999999")))),

      op.Projection(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "project",
          inputs = Seq(UUID.fromString("00000000-0000-0000-0000-000000000009")),
          output = UUID.fromString("00000000-0000-0000-0000-000000000008")),
        transformations = Seq(
          expr.Literal(
            value = 777,
            dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")))),

      op.Generic(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "custom",
          inputs = Seq(UUID.fromString("00000000-0000-0000-0000-000000000010")),
          output = UUID.fromString("00000000-0000-0000-0000-000000000009")),
        rawString = "CUSTOM_OPERATION_RAW_STRING"),

      op.Read(
        mainProps = OperationProps(
          id = UUID.randomUUID,
          name = "read-B",
          inputs = Nil,
          output = UUID.fromString("00000000-0000-0000-0000-000000000010")),
        sourceType = "bar",
        sources = Seq(MetaDataSource(path = "some://test/read/source-3", datasetsIds = Nil)))),

    datasets = Seq(
      // Attribute ID corresponds to the ID of a dataset where it appeared first.
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000000"), Schema(attrs = Seq(UUID.fromString("00000001-9999-9999-9999-999999999999")))),
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000001"), Schema(attrs = Seq(UUID.fromString("00000001-9999-9999-9999-999999999999")))),
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000002"), Schema(attrs = Seq(UUID.fromString("00000002-9999-9999-9999-999999999999")))),
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000003"), Schema(attrs = Seq(UUID.fromString("00000002-9999-9999-9999-999999999999")))),
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000004"), Schema(attrs = Seq(UUID.fromString("00000002-9999-9999-9999-999999999999")))),
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000005"), Schema(attrs = Seq(UUID.fromString("00000002-9999-9999-9999-999999999999")))),
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000006"), Schema(attrs = Seq(UUID.fromString("00000007-9999-9999-9999-999999999999")))),
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000007"), Schema(attrs = Seq(UUID.fromString("00000007-9999-9999-9999-999999999999")))),
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000008"), Schema(attrs = Seq(UUID.fromString("00000008-9999-9999-9999-999999999999")))),
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000009"), Schema(attrs = Seq(UUID.fromString("00000009-9999-9999-9999-999999999999")))),
      MetaDataset(id = UUID.fromString("00000000-0000-0000-0000-000000000010"), Schema(attrs = Seq(UUID.fromString("00000010-9999-9999-9999-999999999999"))))),

    attributes = Seq(
      Attribute(id = UUID.fromString("00000001-9999-9999-9999-999999999999"), name = "aaa", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
      Attribute(id = UUID.fromString("00000002-9999-9999-9999-999999999999"), name = "bbb", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
      Attribute(id = UUID.fromString("00000004-9999-9999-9999-999999999999"), name = "ccc", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
      Attribute(id = UUID.fromString("00000005-9999-9999-9999-999999999999"), name = "ddd", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
      Attribute(id = UUID.fromString("00000007-9999-9999-9999-999999999999"), name = "eee", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
      Attribute(id = UUID.fromString("00000008-9999-9999-9999-999999999999"), name = "fff", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
      Attribute(id = UUID.fromString("00000009-9999-9999-9999-999999999999"), name = "ggg", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
      Attribute(id = UUID.fromString("00000010-9999-9999-9999-999999999999"), name = "hhh", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999"))),

    dataTypes = Seq(
      dt.Simple(UUID.fromString("00000000-0000-0000-0001-999999999999"), "type1", nullable = false),
      dt.Simple(UUID.fromString("00000000-0000-0000-0002-999999999999"), "type2", nullable = false),
      dt.Simple(UUID.fromString("00000000-0000-0000-0003-999999999999"), "type3", nullable = false)
    )
  )


  private val expectedExecutionPlan = ExecutionPlan(
    id = UUID.fromString("00000000-0000-0000-0000-000000000000"),
    operations = Operations(
      reads = Seq(
        ReadOperation(
          id = 5,
          inputSources = Seq(
            "some://test/read/source-1",
            "some://test/read/source-2"),
          schema = Some(Seq(UUID.fromString("00000002-9999-9999-9999-999999999999"))),
          extra = Map(
            "name" -> "read-A",
            "sourceType" -> "bar"
          )),
        ReadOperation(
          id = 10,
          inputSources = Seq("some://test/read/source-3"),
          schema = Some(Seq(UUID.fromString("00000010-9999-9999-9999-999999999999"))),
          extra = Map(
            "name" -> "read-B",
            "sourceType" -> "bar"
          ))),

      write = WriteOperation(
        id = 0,
        childIds = Seq(1),
        outputSource = "some://test/write/data/source/url?with=parameters&more=parameters",
        append = true,
        extra = Map(
          "name" -> "write",
          "destinationType" -> "foo")),

      other = Seq(
        DataOperation(
          id = 1,
          childIds = Seq(2, 6),
          schema = Some(Seq(UUID.fromString("00000001-9999-9999-9999-999999999999"))),
          params = Map(
            "joinType" -> "INNER",
            "condition" -> expr.Generic(
              name = "expr1",
              dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999"),
              children = Seq(expr.Literal(value = 42, dataTypeId = UUID.fromString("00000000-0000-0000-0002-999999999999"))),
              exprType = "exprType1",
              params = Some(Map("aa" -> 1, "bb" -> "two")))),
          extra = Map(
            "name" -> "join")),

        DataOperation(
          id = 2,
          childIds = Seq(3, 4),
          schema = None,
          extra = Map(
            "name" -> "union")),

        DataOperation(
          id = 3,
          childIds = Seq(5),
          schema = None,
          params = Map(
            "condition" -> expr.Binary(
              symbol = "++",
              dataTypeId = UUID.fromString("00000000-0000-0000-0003-999999999999"),
              children = Seq(
                expr.Literal(value = 111, dataTypeId = UUID.fromString("00000000-0000-0000-0003-999999999999")),
                expr.Literal(value = 222, dataTypeId = UUID.fromString("00000000-0000-0000-0003-999999999999"))))),
          extra = Map(
            "name" -> "filter")),

        DataOperation(
          id = 4,
          childIds = Seq(5),
          schema = None,
          params = Map(
            "order" -> Seq(SortOrder(
              expression = expr.AttrRef(UUID.fromString("00000001-9999-9999-9999-999999999999")),
              direction = "DESC",
              nullOrder = "NULLS LAST"
            ))),
          extra = Map(
            "name" -> "sort")),

        DataOperation(
          id = 6,
          childIds = Seq(7),
          schema = None,
          params = Map(
            "alias" -> "my-df"),
          extra = Map(
            "name" -> "alias")),

        DataOperation(
          id = 7,
          childIds = Seq(8),
          schema = Some(Seq(UUID.fromString("00000007-9999-9999-9999-999999999999"))),
          params = Map(
            "groupingExpressions" -> Seq(
              expr.AttrRef(UUID.fromString("00000002-9999-9999-9999-999999999999")),
              expr.AttrRef(UUID.fromString("00000005-9999-9999-9999-999999999999"))),
            "aggregateExpressions" -> Seq(
              expr.AttrRef(UUID.fromString("00000004-9999-9999-9999-999999999999")),
              expr.AttrRef(UUID.fromString("00000005-9999-9999-9999-999999999999")))),
          extra = Map(
            "name" -> "aggregate")),

        DataOperation(
          id = 8,
          childIds = Seq(9),
          schema = Some(Seq(UUID.fromString("00000008-9999-9999-9999-999999999999"))),
          params = Map(
            "projectList" -> Seq(
              expr.Literal(
                value = 777,
                dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")))),
          extra = Map(
            "name" -> "project")),

        DataOperation(
          id = 9,
          childIds = Seq(10),
          schema = Some(Seq(UUID.fromString("00000009-9999-9999-9999-999999999999"))),
          params = Map.empty,
          extra = Map(
            "name" -> "custom",
            "rawString" -> "CUSTOM_OPERATION_RAW_STRING")))),

    systemInfo = SystemInfo("spark", "7.7.7"),
    agentInfo = Some(AgentInfo("spline", "0.3.x")),
    extraInfo = Map(
      "appName" -> "Lineage Converter Unit Test",
      "attributes" -> Seq(
        Attribute(id = UUID.fromString("00000001-9999-9999-9999-999999999999"), name = "aaa", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
        Attribute(id = UUID.fromString("00000002-9999-9999-9999-999999999999"), name = "bbb", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
        Attribute(id = UUID.fromString("00000004-9999-9999-9999-999999999999"), name = "ccc", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
        Attribute(id = UUID.fromString("00000005-9999-9999-9999-999999999999"), name = "ddd", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
        Attribute(id = UUID.fromString("00000007-9999-9999-9999-999999999999"), name = "eee", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
        Attribute(id = UUID.fromString("00000008-9999-9999-9999-999999999999"), name = "fff", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
        Attribute(id = UUID.fromString("00000009-9999-9999-9999-999999999999"), name = "ggg", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999")),
        Attribute(id = UUID.fromString("00000010-9999-9999-9999-999999999999"), name = "hhh", dataTypeId = UUID.fromString("00000000-0000-0000-0001-999999999999"))),
      "dataTypes" -> Seq(
        dt.Simple(UUID.fromString("00000000-0000-0000-0001-999999999999"), "type1", nullable = false),
        dt.Simple(UUID.fromString("00000000-0000-0000-0002-999999999999"), "type2", nullable = false),
        dt.Simple(UUID.fromString("00000000-0000-0000-0003-999999999999"), "type3", nullable = false)
      )
    )
  )


  private val expectedExecutionEvent = ExecutionEvent(
    planId = UUID.fromString("00000000-0000-0000-0000-000000000000"),
    timestamp = 1234567,
    error = None,
    extra = Map(
      "appId" -> "test-123")
  )
}
