/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package za.co.absa.spline.fixture

import java.sql.{Connection, DriverManager, ResultSet}

import org.scalactic.source.Position
import org.scalatest.{BeforeAndAfter, Suite}
import za.co.absa.spline.common.TempDirectory

/**
  * Runs and wraps embedded Apache Derby DB.
  **/
trait DerbyDatabaseFixture extends BeforeAndAfter{

  this: Suite =>

  private val dbName = "splineTestDb"
  val connectionString = s"jdbc:derby:memory:$dbName ;create=true"

  var connection : Connection = null

  private def execute(sql: String): ResultSet = {
    val statement = connection.createStatement
    statement.execute(sql)
    statement.getResultSet
  }

  private def closeDatabase() : Unit = {
    def closeCommand(cmd: String) = util.Try({DriverManager.getConnection(cmd)})

    val connectionString = "jdbc:derby:memory:" + dbName
    closeCommand(connectionString + ";drop=true")
    closeCommand(connectionString + ";shutdown=true")
  }

  private def createTable(table: String): ResultSet = {
    execute("Create table " + table + " (id int, name varchar(30))")
  }

  private def dropTable(table: String): ResultSet = {
    execute("drop table " + table)
  }

  override protected def after(fun: => Any)(implicit pos: Position): Unit = try super.after(fun) finally closeDatabase()

  override protected def before(fun: => Any)(implicit pos: Position): Unit = {
    val tempPath = TempDirectory("derbyUnitTest", "database").deleteOnExit().path
    System.setProperty("derby.system.home", tempPath.toString)
    DriverManager.registerDriver(new org.apache.derby.jdbc.EmbeddedDriver)
    Class.forName("org.apache.derby.jdbc.EmbeddedDriver")
    connection = DriverManager.getConnection(connectionString)
  }
}



