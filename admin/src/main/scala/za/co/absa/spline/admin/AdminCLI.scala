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

import ch.qos.logback.classic.{Level, Logger}
import org.backuity.ansi.AnsiFormatter.FormattedHelper
import org.slf4j.Logger.ROOT_LOGGER_NAME
import org.slf4j.LoggerFactory
import scopt.{OptionDef, OptionParser}
import za.co.absa.spline.admin.AdminCLI.AdminCLIConfig
import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.persistence.ArangoConnectionURL.{ArangoDbScheme, ArangoSecureDbScheme}
import za.co.absa.spline.persistence.AuxiliaryDBAction._
import za.co.absa.spline.persistence.OnDBExistsAction.{Drop, Fail, Skip}
import za.co.absa.spline.persistence.{ArangoConnectionURL, ArangoManagerFactory, ArangoManagerFactoryImpl}

import scala.concurrent.Await
import scala.concurrent.duration._

object AdminCLI extends App {

  import scala.concurrent.ExecutionContext.Implicits._

  case class AdminCLIConfig(
    cmd: Command = null,
    logLevel: Level = Level.INFO)

  private val dbManagerFactory = new ArangoManagerFactoryImpl()
  new AdminCLI(dbManagerFactory).exec(args)
}

class AdminCLI(dbManagerFactory: ArangoManagerFactory) {

  def exec(args: Array[String]): Unit = {

    val cliParser: OptionParser[AdminCLIConfig] = new OptionParser[AdminCLIConfig]("Spline Admin CLI") {
      head("Spline Admin Command Line Interface", SplineBuildInfo.Version)

      help("help").text("prints this usage text")

      def dbCommandOptions: Seq[OptionDef[_, AdminCLIConfig]] = Seq(
        opt[Unit]('k', "insecure")
          text s"Allow insecure server connections when using SSL; disallowed by default"
          action { case (_, c@AdminCLIConfig(cmd: DBCommand, _)) => c.copy(cmd.insecure = true) },
        {
          val logLevels = classOf[Level].getFields.collect { case f if f.getType == f.getDeclaringClass => f.getName }
          val logLevelsString = logLevels.mkString(", ")

          (opt[String]('l', "log-level")
            text s"Log level ($logLevelsString). Default is ${AdminCLIConfig().logLevel}"
            validate (l => if (logLevels.contains(l.toUpperCase)) success else failure(s"<log-level> should be one of: $logLevelsString"))
            action ((str, conf) => conf.copy(logLevel = Level.valueOf(str))))
        },
        arg[String]("<db_url>")
          required()
          text s"ArangoDB connection string in the format: $ArangoDbScheme|$ArangoSecureDbScheme://[user[:password]@]host[:port]/database"
          action { case (url, c@AdminCLIConfig(cmd: DBCommand, _)) => c.copy(cmd.dbUrl = url) })

      (cmd("db-init")
        action ((_, c) => c.copy(cmd = DBInit()))
        text "Initialize Spline database"
        children (dbCommandOptions: _*)
        children(
        opt[Unit]('f', "force")
          text "Re-create the database if one already exists"
          action { case (_, c@AdminCLIConfig(cmd: DBInit, _)) => c.copy(cmd.copy(force = true)) },
        opt[Unit]('s', "skip")
          text "Skip existing database. Don't throw error, just end"
          action { case (_, c@AdminCLIConfig(cmd: DBInit, _)) => c.copy(cmd.copy(skip = true)) }
      ))

      (cmd("db-upgrade")
        action ((_, c) => c.copy(cmd = DBUpgrade()))
        text "Upgrade Spline database"
        children (dbCommandOptions: _*))

      (cmd("db-exec")
        action ((_, c) => c.copy(cmd = DBExec()))
        text "Auxiliary actions mainly intended for development, testing etc."
        children (dbCommandOptions: _*)
        children(
        opt[Unit]("foxx-reinstall")
          text "Reinstall Foxx services "
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _)) => c.copy(cmd.addAction(FoxxReinstall)) },
        opt[Unit]("indices-delete")
          text "Delete indices"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _)) => c.copy(cmd.addAction(IndicesDelete)) },
        opt[Unit]("indices-create")
          text "Create indices"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _)) => c.copy(cmd.addAction(IndicesCreate)) },
        opt[Unit]("views-delete")
          text "Delete views"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _)) => c.copy(cmd.addAction(ViewsDelete)) },
        opt[Unit]("views-create")
          text "Create views"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _)) => c.copy(cmd.addAction(ViewsCreate)) },
      ))

      checkConfig {
        case AdminCLIConfig(null, _) =>
          failure("No command given")
        case AdminCLIConfig(cmd: DBCommand, _) if cmd.dbUrl == null =>
          failure("DB connection string is required")
        case AdminCLIConfig(cmd: DBCommand, _) if cmd.dbUrl.startsWith(ArangoSecureDbScheme) && !cmd.insecure =>
          failure("At the moment, only unsecure SSL is supported; when using the secure scheme, please add the -k option to skip server certificate verification altogether")
        case AdminCLIConfig(cmd: DBInit, _) if cmd.force && cmd.skip =>
          failure("Options '--force' and '--skip' cannot be used together")
        case _ =>
          success
      }
    }

    val conf = cliParser
      .parse(args, AdminCLIConfig())
      .getOrElse(sys.exit(1))

    LoggerFactory
      .getLogger(ROOT_LOGGER_NAME)
      .asInstanceOf[Logger]
      .setLevel(conf.logLevel)

    conf.cmd match {
      case DBInit(url, _, force, skip) =>
        val onExistsAction = (force, skip) match {
          case (true, false) => Drop
          case (false, true) => Skip
          case (false, false) => Fail
        }
        val dbManager = dbManagerFactory.create(ArangoConnectionURL(url))
        val wasInitialized = Await.result(dbManager.initialize(onExistsAction), Duration.Inf)
        if (!wasInitialized) println(ansi"%yellow{Skipped. DB is already initialized}")

      case DBUpgrade(url, _) =>
        val dbManager = dbManagerFactory.create(ArangoConnectionURL(url))
        Await.result(dbManager.upgrade(), Duration.Inf)

      case DBExec(url, _, actions) =>
        val dbManager = dbManagerFactory.create(ArangoConnectionURL(url))
        Await.result(dbManager.execute(actions: _*), Duration.Inf)
    }

    println(ansi"%green{DONE}")
  }
}
