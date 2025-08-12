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
import org.slf4j.Logger.ROOT_LOGGER_NAME
import org.slf4j.LoggerFactory
import org.slf4s.Logging
import scopt.{OptionDef, OptionParser}
import za.co.absa.spline.admin.AdminCLI.AdminCLIConfig
import za.co.absa.spline.common.ConsoleUtils._
import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.common.rest.RESTClientApacheHttpImpl
import za.co.absa.spline.common.scala13.Option
import za.co.absa.spline.common.security.TLSUtils
import za.co.absa.spline.persistence.AuxiliaryDBAction._
import za.co.absa.spline.persistence.OnDBExistsAction.{Drop, Fail, Skip}
import za.co.absa.spline.persistence.{ArangoConnectionURL, ArangoManagerFactory, ArangoManagerFactoryImpl}

import java.io.File
import java.net.URL
import java.util.concurrent.{ExecutorService, Executors}
import scala.concurrent.duration._
import scala.concurrent.{Await, ExecutionContext}

object AdminCLI extends App {

  case class AdminCLIConfig(
    cmd: Command = null,
    logLevel: Level = Level.INFO,
    disableSslValidation: Boolean = false,
    parallelism: Int = Runtime.getRuntime.availableProcessors(),
  )

  implicit class OptionParserOps(val p: OptionParser[AdminCLIConfig]) extends AnyVal {
    def placeNewLine(): Unit = p.note("")

    def dbCommandOptions: Seq[OptionDef[_, AdminCLIConfig]] = Seq(
      p.arg[String]("<db_url>")
        required()
        text s"ArangoDB connection string in the format: ${ArangoConnectionURL.HumanReadableFormat}"
        action { case (url, c@AdminCLIConfig(cmd: DBCommand, _, _, _)) => c.copy(cmd.dbUrl = ArangoConnectionURL(url)) }
    )
  }

  private val dbManagerFactoryImpl = new ArangoManagerFactoryImpl()(ExecutionContext.global)
  private val maybeConsole = InputConsole.systemConsoleIfAvailable()

  val dbManagerFactory = maybeConsole
    .map(console => new InteractiveArangoManagerFactoryProxy(dbManagerFactoryImpl, new UserInteractor(console)))
    .getOrElse(dbManagerFactoryImpl)

  new AdminCLI(dbManagerFactory).exec(args)
}

class AdminCLI(dbManagerFactory: ArangoManagerFactory) extends Logging {

  def exec(args: Array[String]): Unit = {

    val cliParser: OptionParser[AdminCLIConfig] = new OptionParser[AdminCLIConfig](AppConfig.Spline.CLI.Executable) {

      import AdminCLI._

      head(
        s"""
           |Spline Admin Tool
           |Version: ${SplineBuildInfo.Version} (rev. ${SplineBuildInfo.Revision})
           |""".stripMargin
      )

      help("help").text("Print this usage text.")
      version('v', "version").text("Print version info.")

      {
        val logLevels = classOf[Level].getFields.collect { case f if f.getType == f.getDeclaringClass => f.getName }
        val logLevelsString = logLevels.mkString(", ")

        (opt[String]('l', "log-level")
          text s"Log level ($logLevelsString). Default is ${AdminCLIConfig().logLevel}."
          validate (l => if (logLevels.contains(l.toUpperCase)) success else failure(s"<log-level> should be one of: $logLevelsString"))
          action ((str, conf) => conf.copy(logLevel = Level.valueOf(str))))
      }

      // FIXME: Deprecated since Spline 0.6.1. To be removed in Spline 1.0.0 - https://github.com/AbsaOSS/spline/issues/906
      (opt[Unit]('k', "insecure")
        text s"Deprecated. See --disable-ssl-validation"
        action { case (_, conf) => conf.copy(disableSslValidation = true) })

      (opt[Unit]("disable-ssl-validation")
        text s"Disable validation of self-signed SSL certificates. (Don't use on production)."
        action { case (_, conf) => conf.copy(disableSslValidation = true) })

      (opt[Int]("threads")
        text s"Number of threads to use for parallel processing. Default is the maximum number of processors available to the JVM; never smaller than 1."
        validate (p => if (p > 0) success else failure("Number of threads must be a positive integer"))
        action ((p, conf) => conf.copy(parallelism = p)))

      this.placeNewLine()

      (cmd("db-init")
        action ((_, c) => c.copy(cmd = DBInit()))
        text "Initialize Spline database"
        children(
        opt[Unit]('f', "force")
          text "Re-create the database if one already exists."
          action { case (_, c@AdminCLIConfig(cmd: DBInit, _, _, _)) => c.copy(cmd.copy(force = true)) },
        opt[Unit]('s', "skip")
          text "Skip existing database. Don't throw error, just end."
          action { case (_, c@AdminCLIConfig(cmd: DBInit, _, _, _)) => c.copy(cmd.copy(skip = true)) })
        children (this.dbCommandOptions: _*)
        )

      this.placeNewLine()

      (cmd("db-upgrade")
        action ((_, c) => c.copy(cmd = DBUpgrade()))
        text "Upgrade Spline database"
        children (this.dbCommandOptions: _*))

      this.placeNewLine()

      (cmd("db-exec")
        action ((_, c) => c.copy(cmd = DBExec()))
        text "Auxiliary actions mainly intended for development, testing etc."
        children(
        opt[Unit]("check-access")
          text "Check access to the database"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _, _)) => c.copy(cmd.addAction(CheckDBAccess)) },
        opt[Unit]("foxx-reinstall")
          text "Reinstall Foxx services"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _, _)) => c.copy(cmd.addAction(FoxxReinstall)) },
        opt[Unit]("indices-delete")
          text "Delete indices"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _, _)) => c.copy(cmd.addAction(IndicesDelete)) },
        opt[Unit]("indices-create")
          text "Create indices"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _, _)) => c.copy(cmd.addAction(IndicesCreate)) },
        opt[Unit]("views-delete")
          text "Delete views"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _, _)) => c.copy(cmd.addAction(ViewsDelete)) },
        opt[Unit]("views-create")
          text "Create views"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _, _)) => c.copy(cmd.addAction(ViewsCreate)) })
        children (this.dbCommandOptions: _*)
        )

      this.placeNewLine()

      (cmd("lineage-import")
        action ((_, c) => c.copy(cmd = LineageImport()))
        text "Import lineage data files into the Spline database"
        children(
        opt[File]("dir")
          text "Path to the directory containing the lineage data files to import."
          required()
          action { case (dir, c@AdminCLIConfig(cmd: LineageImport, _, _, _)) => c.copy(cmd.copy(lineageDumpPath = dir)) },
        opt[URL]("producer-url")
          text "Producer API base URL to which the lineage data files will be posted."
          required()
          action { case (url, c@AdminCLIConfig(cmd: LineageImport, _, _, _)) => c.copy(cmd.copy(producerApiUrl = url)) }
      ))

      this.placeNewLine()

      (cmd("lineage-export")
        action ((_, c) => c.copy(cmd = LineageExport()))
        text "Export lineage data files from the Spline database"
        children(
        opt[File]("dir")
          text "Path to the directory where the lineage data files will be exported."
          required()
          action { case (dir, c@AdminCLIConfig(cmd: LineageExport, _, _, _)) => c.copy(cmd.copy(lineageDumpPath = dir)) },
        opt[URL]("producer-url")
          text "Producer API base URL from which the lineage data files will be fetched."
          required()
          action { case (url, c@AdminCLIConfig(cmd: LineageExport, _, _, _)) => c.copy(cmd.copy(producerApiUrl = url)) }
      ))

      checkConfig {
        case AdminCLIConfig(null, _, _, _) =>
          failure("No command given")
        case AdminCLIConfig(cmd: DBCommand, _, _, _) if cmd.dbUrl == null =>
          failure("DB connection string is required")
        case AdminCLIConfig(cmd: DBInit, _, _, _) if cmd.force && cmd.skip =>
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

    val sslCtxOpt = Option.when(conf.disableSslValidation)(TLSUtils.TrustingAllSSLContext)
    implicit val threadPool: ExecutorService = Executors.newWorkStealingPool(conf.parallelism)
    implicit val execContext: ExecutionContext = ExecutionContext.fromExecutorService(threadPool)


    conf.cmd match {
      case DBInit(url, force, skip) =>
        val onExistsAction = (force, skip) match {
          case (true, false) => Drop
          case (false, true) => Skip
          case (false, false) => Fail
        }
        val dbManager = dbManagerFactory.create(url, sslCtxOpt)
        val wasInitialized = Await.result(dbManager.initialize(onExistsAction), Duration.Inf)
        if (!wasInitialized) println(ansi"%yellow{Skipped. DB is already initialized}")

      case DBUpgrade(url) =>
        val dbManager = dbManagerFactory.create(url, sslCtxOpt)
        Await.result(dbManager.upgrade(), Duration.Inf)

      case LineageImport(producerApiBaseUrl, path) =>
        val restClient = new RESTClientApacheHttpImpl(
          uri = producerApiBaseUrl.toURI,
          maybeSslContext = sslCtxOpt,
          maybeCredentials = None
        )
        val importer = new LineageImporter(restClient)
        val eventualResult = importer.importFrom(path)
        val nPlans = Await.result(eventualResult, Duration.Inf)
        println(ansi"%green{Imported $nPlans execution plans with events from $path}")

      case LineageExport(producerApiBaseUrl, path) =>
        val restClient = new RESTClientApacheHttpImpl(
          uri = producerApiBaseUrl.toURI,
          maybeSslContext = sslCtxOpt,
          maybeCredentials = None
        )
        val exporter = new LineageExporter(restClient)
        val eventualResult = exporter.exportTo(path)
        val (nPlans, nEvents) = Await.result(eventualResult, Duration.Inf)
        println(ansi"%green{Exported $nPlans execution plans and $nEvents execution events}")

      case DBExec(url, actions) =>
        val dbManager = dbManagerFactory.create(url, sslCtxOpt)
        Await.result(dbManager.execute(actions: _*), Duration.Inf)
    }

    println(ansi"%green{DONE}")
  }
}
