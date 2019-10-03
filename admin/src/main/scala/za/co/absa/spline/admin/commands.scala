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

import scala.concurrent.duration._

sealed trait Command

sealed trait DBCommand extends Command {
  def dbUrl: String

  def timeout: Duration

  def timeout_=(t: Duration): Self = _copy(dbUrl, t)

  def dbUrl_=(url: String): Self = _copy(url, timeout)

  protected type Self <: DBCommand

  protected def _copy: (String, Duration) => Self
}

object DBCommand {
  val defaultTimeout: Duration = 1.minute
}

case class DBInit(
  override val dbUrl: String = null,
  override val timeout: Duration = DBCommand.defaultTimeout,
  force: Boolean = false
) extends DBCommand {
  protected override type Self = DBInit
  protected override val _copy: (String, Duration) => DBInit = copy(_, _)
}

case class DBUpgrade(
  override val dbUrl: String = null,
  override val timeout: Duration = DBCommand.defaultTimeout
) extends DBCommand {
  protected override type Self = DBUpgrade
  protected override val _copy: (String, Duration) => DBUpgrade = copy
}