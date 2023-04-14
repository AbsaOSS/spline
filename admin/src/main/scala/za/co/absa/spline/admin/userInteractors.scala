/*
 * Copyright 2021 ABSA Group Limited
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

package za.co.absa.spline.admin

import za.co.absa.spline.persistence.ArangoConnectionURL

import scala.annotation.tailrec
import scala.collection.immutable.ListSet

trait UserInteractor {
  def credentializeConnectionUrl(url: ArangoConnectionURL): ArangoConnectionURL
  def confirmDatabaseBackupReady(): Boolean
}

class DummyUserInteractor extends UserInteractor {

  override def credentializeConnectionUrl(url: ArangoConnectionURL): ArangoConnectionURL = url

  override def confirmDatabaseBackupReady(): Boolean = true
}

class ConsoleUserInteractor(console: InputConsole) extends UserInteractor {

  override def credentializeConnectionUrl(url: ArangoConnectionURL): ArangoConnectionURL = {
    if (url.user.nonEmpty && url.password.nonEmpty) url
    else {
      val username = url.user.getOrElse(readNonEmptyLine("Username: "))
      val password = console.readPassword(s"Password for $username: ")
      url.copy(user = Some(username), password = Some(password))
    }
  }

  override def confirmDatabaseBackupReady(): Boolean = {
    val positiveAnswers = ListSet("y", "yes")
    val negativeAnswers = ListSet("n", "no")
    val validAnswers = positiveAnswers ++ negativeAnswers
    val msg =
      s"""
         |******************************************************************************
         | WARNING: This operation is irreversible.
         | It's strongly advisable to create a database backup before proceeding.
         | If this operation fails it can leave the database in the inconsistent state.
         | More info about how to create ArangoDB backups can be found here:
         | https://www.arangodb.com/docs/stable/backup-restore.html
         |******************************************************************************
         |
         |Have you created a database backup? [${validAnswers.mkString("/")}]:\u00A0
      """.stripMargin.trim

    def userAnswers: Stream[String] = console.readLine(msg).trim.toLowerCase #:: userAnswers

    val userAnswer = userAnswers.filter(validAnswers).head

    positiveAnswers(userAnswer)
  }

  @tailrec
  private def readNonEmptyLine(msg: String): String = {
    val u = console.readLine(msg).trim
    if (u.isEmpty) readNonEmptyLine(msg) else u
  }

}
