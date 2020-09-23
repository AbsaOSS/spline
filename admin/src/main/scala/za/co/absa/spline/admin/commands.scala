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

import za.co.absa.spline.persistence.AuxiliaryDBAction

import scala.concurrent.duration._

sealed trait Command

sealed trait DBCommand extends Command {
  def dbUrl: String

  def insecure: Boolean

  def timeout_=(t: Duration): Self = selfCopy(dbUrl, insecure)

  def dbUrl_=(url: String): Self = selfCopy(url, insecure)

  def insecure_=(b: Boolean): Self = selfCopy(dbUrl, b)

  protected type Self <: DBCommand

  protected def selfCopy: (String, Boolean) => Self
}

object DBCommand {
  val defaultInsecure: Boolean = false
}

case class DBInit(
  override val dbUrl: String = null,
  override val insecure: Boolean = DBCommand.defaultInsecure,
  force: Boolean = false,
  skip: Boolean = false
) extends DBCommand {
  protected override type Self = DBInit
  protected override val selfCopy: (String, Boolean) => Self = copy(_, _)
}

case class DBUpgrade(
  override val dbUrl: String = null,
  override val insecure: Boolean = DBCommand.defaultInsecure
) extends DBCommand {
  protected override type Self = DBUpgrade
  protected override val selfCopy: (String, Boolean) => Self = copy
}

case class DBExec(
  override val dbUrl: String = null,
  override val insecure: Boolean = DBCommand.defaultInsecure,
  actions: Seq[AuxiliaryDBAction] = Nil,
) extends DBCommand {
  protected override type Self = DBExec
  protected override val selfCopy: (String, Boolean) => Self = copy(_, _)

  def addAction(action: AuxiliaryDBAction): DBExec = copy(actions = actions :+ action)
}
