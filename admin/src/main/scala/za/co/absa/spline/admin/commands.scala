package za.co.absa.spline.admin

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

import za.co.absa.spline.admin.DBCommand._
import za.co.absa.spline.persistence.{ArangoConnectionURL, AuxiliaryDBAction}

import java.io.File
import java.net.URL

sealed trait Command

sealed trait DBCommand extends Command {
  def dbUrl: Url
  def dbUrl_= : Url => Self = selfCopy(_)

  protected type Self <: DBCommand

  protected def selfCopy: DBCommandProps => Self
}

//noinspection ScalaUnnecessaryParentheses
object DBCommand {
  type Url = ArangoConnectionURL

  type DBCommandProps = (Url)

  def unapply(cmd: DBCommand): Option[DBCommandProps] = Some((cmd.dbUrl))
}

case class LineageImport(
  producerApiUrl: URL = null,
  lineageDumpPath: File = null,
) extends Command

case class DBInit(
  override val dbUrl: Url = null,
  force: Boolean = false,
  skip: Boolean = false
) extends DBCommand {
  override protected type Self = DBInit
  override protected val selfCopy: DBCommandProps => Self = copy(_, force, skip)
}

//noinspection ConvertibleToMethodValue
case class DBUpgrade(
  override val dbUrl: Url = null,
) extends DBCommand {
  override protected type Self = DBUpgrade
  override protected val selfCopy: DBCommandProps => Self = copy(_)
}

case class DBExec(
  override val dbUrl: Url = null,
  actions: Seq[AuxiliaryDBAction] = Nil,
) extends DBCommand {
  override protected type Self = DBExec
  override protected val selfCopy: DBCommandProps => Self = copy(_, actions)

  def addAction(action: AuxiliaryDBAction): DBExec = copy(actions = actions :+ action)
}
