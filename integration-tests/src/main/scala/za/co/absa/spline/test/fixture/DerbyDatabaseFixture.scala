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

package za.co.absa.spline.test.fixture

import java.sql.DriverManager

import org.scalatest.{BeforeAndAfterEach, Suite}
import za.co.absa.spline.common.TempDirectory

import scala.util.Try

/**
  * Runs and wraps embedded Apache Derby DB.
  **/
trait DerbyDatabaseFixture extends BeforeAndAfterEach {
  this: Suite =>
  Class.forName("org.apache.derby.jdbc.EmbeddedDriver")

  val jdbcConnectionString = s"jdbc:derby:memory:splineTestDb"

  override protected def beforeEach: Unit = {
    val tempPath = TempDirectory("derbyUnitTest", "database").deleteOnExit().path
    System.setProperty("derby.system.home", tempPath.toString)
    execCommand("create")
  }

  override protected def afterEach(): Unit = {
    execCommand("drop")
    execCommand("shutdown")
  }

  private def execCommand(cmd: String) = Try {
    DriverManager.getConnection(s"$jdbcConnectionString;$cmd=true")
  }
}



