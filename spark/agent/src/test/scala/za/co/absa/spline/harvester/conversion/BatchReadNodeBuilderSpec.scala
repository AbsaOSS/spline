/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.harvester.conversion

import java.sql.{Connection, Driver, DriverManager, DriverPropertyInfo, PreparedStatement, ResultSet}
import java.util.Properties
import java.util.logging.Logger

import javax.sql.rowset.RowSetMetaDataImpl
import org.apache.spark.sql.SQLContext
import org.apache.spark.sql.execution.datasources.LogicalRelation
import org.apache.spark.sql.sources.BaseRelation
import org.apache.spark.sql.types.StructType
import org.mockito.ArgumentMatchers._
import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FunSpec, Matchers}
import za.co.absa.spline.harvester.{ComponentCreatorFactory, FSAwareBuilder, ReadNodeBuilder}
import za.co.absa.spline.model.MetaDataSource
import za.co.absa.spline.sparkadapterapi.Constants
import za.co.absa.spline.test.fixture.SparkFixture

class BatchReadNodeBuilderSpec extends FunSpec with MockitoSugar with Matchers with SparkFixture {
  DriverManager registerDriver new FakeJDBCDriver
  implicit val compCreatorFactory: ComponentCreatorFactory = new ComponentCreatorFactory()

  trait FSUnawareBuilder extends FSAwareBuilder {
    override protected def getQualifiedPath(path: String) = throw new UnsupportedOperationException
  }

  describe("support for different types of data source") {

    it("should support JDBC") {
      withNewSparkSession(spark => {
        val df = spark.
          read.format("jdbc").
          option("url", "jdbc:fake:sql@some_host:4242:some_database").
          option("dbtable", "some_table").
          load()

        val bldr = new ReadNodeBuilder(df.queryExecution.analyzed.asInstanceOf[LogicalRelation]) with FSUnawareBuilder
        val readOp = bldr.build()

        readOp.params.getOrElse(Constants.sourceType, fail) shouldEqual "JDBC"
        readOp.inputSources shouldEqual Seq("jdbc:fake:sql@some_host:4242:some_database/some_table")
      })
    }

    it("should handle unrecognized source type") {
      val bldr = new ReadNodeBuilder(LogicalRelation(FooBarRelation)) with FSUnawareBuilder

      val readOp = bldr.build()

      readOp.params.getOrElse(Constants.sourceType, fail) shouldEqual "???: za.co.absa.spline.harvester.conversion.FooBarRelation$"
      readOp.inputSources shouldBe empty
    }
  }
}

class FakeJDBCDriver extends Driver with MockitoSugar {
  override def acceptsURL(url: String): Boolean = true

  override def connect(url: String, info: Properties): Connection = {
    val conn = mock[Connection]
    val stmt = mock[PreparedStatement]
    val rs = mock[ResultSet]
    when(conn.prepareStatement(anyString())) thenReturn stmt
    when(stmt.executeQuery) thenReturn rs
    when(rs.getMetaData) thenReturn new RowSetMetaDataImpl()
    conn
  }

  override def getParentLogger: Logger = ???

  override def getMinorVersion: Int = ???

  override def jdbcCompliant(): Boolean = ???

  override def getMajorVersion: Int = ???

  override def getPropertyInfo(url: String, info: Properties): Array[DriverPropertyInfo] = ???
}

object FooBarRelation extends BaseRelation {
  override def sqlContext: SQLContext = ???

  override def schema = new StructType
}

