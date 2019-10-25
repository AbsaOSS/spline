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

package za.co.absa.spline.test.fixture

import org.apache.spark.sql.SparkSession

trait SparkDatabaseFixture {
  private type DatabaseName = String
  private type TableName = String
  private type TableDef = String
  private type TableData = Seq[Any]

  /**
   * this function creates tables in a way that is hive dependent, therefore hive must be enabled for this to work
   */
  def withHiveDatabase[T](spark: SparkSession)(databaseName: DatabaseName, tableDefs: (TableName, TableDef, TableData)*)(testBody: => T): T = {
    prepareDatabase(spark, databaseName)

    tableDefs.foreach({
      case (tableName, tableDef, rows) =>
        spark.sql(s"CREATE TABLE $tableName $tableDef")
        rows
          .map(sqlizeRow)
          .foreach(values =>
            spark.sql(s"INSERT INTO $tableName VALUES (${values mkString ","})"))
    })

    try
      testBody
    finally
      dropDatabase(spark, databaseName)
  }

  def withDatabase[T](spark: SparkSession)(databaseName: DatabaseName)(testBody: => T): T = {
    prepareDatabase(spark, databaseName)

    try
      testBody
    finally
      dropDatabase(spark, databaseName)
  }

  private def prepareDatabase(spark: SparkSession, databaseName: DatabaseName) :Unit = {
    spark.sql(s"DROP DATABASE IF EXISTS $databaseName CASCADE")
    spark.sql(s"CREATE DATABASE $databaseName")
    spark.sql(s"USE $databaseName")
  }

  private def dropDatabase(spark: SparkSession, databaseName: DatabaseName) :Unit = {
    spark.sql(s"DROP DATABASE IF EXISTS $databaseName CASCADE")
  }

  private def sqlizeRow[T](row: Any) = {
    val product: Product = row match {
      case p: Product => p
      case v: Any => Tuple1(v)
    }
    product.productIterator.map({
      case s: String => s"'$s'"
      case v => v
    })
  }
}
