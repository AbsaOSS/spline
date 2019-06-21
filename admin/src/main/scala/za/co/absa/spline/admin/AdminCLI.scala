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

import za.co.absa.spline.admin.AdminCLI.AdminCLIConfig
import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.persistence.{ArangoConnectionURL, ArangoInit}

import scala.concurrent.Await
import scala.concurrent.duration._

object AdminCLI extends App {

  case class AdminCLIConfig(cmd: Command = null)

  new AdminCLI(ArangoInit).exec(args)
}

class AdminCLI(arangoInit: ArangoInit) {

  def exec(args: Array[String]): Unit = {

    val cliParser = new scopt.OptionParser[AdminCLIConfig]("Spline Admin CLI") {
      head("Spline Admin Command Line Interface", SplineBuildInfo.version)

      help("help").text("prints this usage text")

      (cmd("initdb")
        action ((_, c) => c.copy(cmd = InitDB()))
        text "Initialize Spline database."
        children(
        opt[Unit]('f', "force")
          text "Re-create the database if one already exists"
          action { case (_, c@AdminCLIConfig(cmd: InitDB)) => c.copy(cmd.copy(force = true)) },
        opt[String]('t', "timeout")
          text s"Timeout in format `<length><unit>` or `Inf` for infinity. Default is ${InitDB().timeout}"
          action { case (s, c@AdminCLIConfig(cmd: InitDB)) => c.copy(cmd.copy(timeout = Duration(s))) },
        arg[String]("<db_url>")
          text "ArangoDB connection string in the format: arangodb://[user[:password]@]host[:port]/database"
          action { case (url, c@AdminCLIConfig(cmd: InitDB)) => c.copy(cmd.copy(dbUrl = url)) }))

      checkConfig {
        case AdminCLIConfig(null) => failure("No command given.")
        case _ => success
      }
    }

    val command = cliParser
      .parse(args, AdminCLIConfig())
      .getOrElse(sys.exit(1))
      .cmd

    command match {
      case InitDB(force, url, timeout) =>
        Await.ready(arangoInit.initialize(ArangoConnectionURL(url), dropIfExists = force), timeout)
    }
  }
}

