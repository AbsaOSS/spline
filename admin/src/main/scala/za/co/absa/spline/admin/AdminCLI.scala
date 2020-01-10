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

package za.co.absa.spline.admin

import org.backuity.ansi.AnsiFormatter.FormattedHelper
import scopt.{OptionDef, OptionParser}
import za.co.absa.commons.BuildInfo
import za.co.absa.spline.admin.AdminCLI.AdminCLIConfig
import za.co.absa.spline.persistence.{ArangoConnectionURL, ArangoInit}

import scala.concurrent.Await
import scala.concurrent.duration._

object AdminCLI extends App {

  case class AdminCLIConfig(cmd: Command = null)

  new AdminCLI(ArangoInit).exec(args)
}

class AdminCLI(arangoInit: ArangoInit) {

  def exec(args: Array[String]): Unit = {

    val cliParser: OptionParser[AdminCLIConfig] = new OptionParser[AdminCLIConfig]("Spline Admin CLI") {
      head("Spline Admin Command Line Interface", BuildInfo.Version)

      help("help").text("prints this usage text")

      def dbCommandOptions: Seq[OptionDef[_, AdminCLIConfig]] = Seq(
        opt[String]('t', "timeout")
          text s"Timeout in format `<length><unit>` or `Inf` for infinity. Default is ${DBInit().timeout}"
          action { case (s, c@AdminCLIConfig(cmd: DBCommand)) => c.copy(cmd.timeout = Duration(s)) },
        arg[String]("<db_url>")
          required()
          text "ArangoDB connection string in the format: arangodb://[user[:password]@]host[:port]/database"
          action { case (url, c@AdminCLIConfig(cmd: DBCommand)) => c.copy(cmd.dbUrl = url) })

      (cmd("db-init")
        action ((_, c) => c.copy(cmd = DBInit()))
        text "Initialize Spline database"
        children (dbCommandOptions: _*)
        children (
        opt[Unit]('f', "force")
          text "Re-create the database if one already exists"
          action { case (_, c@AdminCLIConfig(cmd: DBInit)) => c.copy(cmd.copy(force = true)) }
        ))

      (cmd("db-upgrade")
        action ((_, c) => c.copy(cmd = DBUpgrade()))
        text "Upgrade Spline database"
        children (dbCommandOptions: _*))

      checkConfig {
        case AdminCLIConfig(null) =>
          failure("No command given")
        case AdminCLIConfig(cmd: DBCommand) if cmd.dbUrl == null =>
          failure("DB connection string is required")
        case _ =>
          success
      }
    }

    val command = cliParser
      .parse(args, AdminCLIConfig())
      .getOrElse(sys.exit(1))
      .cmd

    command match {
      case DBInit(url, timeout, force) =>
        Await.result(arangoInit.initialize(ArangoConnectionURL(url), dropIfExists = force), timeout)
      case DBUpgrade(url, timeout) =>
        Await.result(arangoInit.upgrade(ArangoConnectionURL(url)), timeout)
    }

    println(ansi"%green{DONE}")
  }
}
