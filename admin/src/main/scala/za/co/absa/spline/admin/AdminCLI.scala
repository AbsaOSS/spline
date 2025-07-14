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
import org.apache.http.Consts
import org.apache.http.entity.ContentType
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
import za.co.absa.spline.persistence.DefaultJsonSerDe._
import za.co.absa.spline.persistence.OnDBExistsAction.{Drop, Fail, Skip}
import za.co.absa.spline.persistence.{ArangoConnectionURL, ArangoManagerFactory, ArangoManagerFactoryImpl}
import za.co.absa.spline.producer.rest.ProducerAPI

import java.io.File
import java.net.URL
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.duration._
import scala.concurrent.{Await, Future}
import scala.jdk.CollectionConverters._

object AdminCLI extends App {

  case class AdminCLIConfig(
    cmd: Command = null,
    logLevel: Level = Level.INFO,
    disableSslValidation: Boolean = false,
  )

  implicit class OptionParserOps(val p: OptionParser[AdminCLIConfig]) extends AnyVal {
    def placeNewLine(): Unit = p.note("")

    def dbCommandOptions: Seq[OptionDef[_, AdminCLIConfig]] = Seq(
      p.arg[String]("<db_url>")
        required()
        text s"ArangoDB connection string in the format: ${ArangoConnectionURL.HumanReadableFormat}"
        action { case (url, c@AdminCLIConfig(cmd: DBCommand, _, _)) => c.copy(cmd.dbUrl = ArangoConnectionURL(url)) }
    )
  }

  private val dbManagerFactoryImpl = new ArangoManagerFactoryImpl()
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

      this.placeNewLine()

      (cmd("db-init")
        action ((_, c) => c.copy(cmd = DBInit()))
        text "Initialize Spline database"
        children(
        opt[Unit]('f', "force")
          text "Re-create the database if one already exists."
          action { case (_, c@AdminCLIConfig(cmd: DBInit, _, _)) => c.copy(cmd.copy(force = true)) },
        opt[Unit]('s', "skip")
          text "Skip existing database. Don't throw error, just end."
          action { case (_, c@AdminCLIConfig(cmd: DBInit, _, _)) => c.copy(cmd.copy(skip = true)) })
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
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _)) => c.copy(cmd.addAction(CheckDBAccess)) },
        opt[Unit]("foxx-reinstall")
          text "Reinstall Foxx services"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _)) => c.copy(cmd.addAction(FoxxReinstall)) },
        opt[Unit]("indices-delete")
          text "Delete indices"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _)) => c.copy(cmd.addAction(IndicesDelete)) },
        opt[Unit]("indices-create")
          text "Create indices"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _)) => c.copy(cmd.addAction(IndicesCreate)) },
        opt[Unit]("views-delete")
          text "Delete views"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _)) => c.copy(cmd.addAction(ViewsDelete)) },
        opt[Unit]("views-create")
          text "Create views"
          action { case (_, c@AdminCLIConfig(cmd: DBExec, _, _)) => c.copy(cmd.addAction(ViewsCreate)) })
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
          action { case (dir, c@AdminCLIConfig(cmd: LineageImport, _, _)) => c.copy(cmd.copy(lineageDumpPath = dir)) },
        opt[URL]("producer-url")
          text "Producer API base URL to which the lineage data files will be posted."
          required()
          action { case (url, c@AdminCLIConfig(cmd: LineageImport, _, _)) => c.copy(cmd.copy(producerApiUrl = url)) }
      ))

      this.placeNewLine()

      (cmd("lineage-export")
        action ((_, c) => c.copy(cmd = LineageExport()))
        text "Export lineage data files from the Spline database"
        children(
        opt[File]("dir")
          text "Path to the directory where the lineage data files will be exported."
          required()
          action { case (dir, c@AdminCLIConfig(cmd: LineageExport, _, _)) => c.copy(cmd.copy(lineageDumpPath = dir)) },
        opt[URL]("producer-url")
          text "Producer API base URL from which the lineage data files will be fetched."
          required()
          action { case (url, c@AdminCLIConfig(cmd: LineageExport, _, _)) => c.copy(cmd.copy(producerApiUrl = url)) }
      ))

      checkConfig {
        case AdminCLIConfig(null, _, _) =>
          failure("No command given")
        case AdminCLIConfig(cmd: DBCommand, _, _) if cmd.dbUrl == null =>
          failure("DB connection string is required")
        case AdminCLIConfig(cmd: DBInit, _, _) if cmd.force && cmd.skip =>
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
        val dir = path.toPath

        val restClient = new RESTClientApacheHttpImpl(
          uri = producerApiBaseUrl.toURI,
          maybeSslContext = sslCtxOpt,
          maybeCredentials = None
        )

        def process(pattern: String, url: String, fileContentToBodyFn: String => String): Future[Int] = {
          val dirStream = Files.newDirectoryStream(dir, pattern)
          try {
            dirStream.asScala
              .map(_.toFile)
              .filter(_.isFile)
              .foldLeft(Future.successful(0)) { (prevFut, file) =>
                prevFut.flatMap { n =>
                  val rawJsonStr = Files.readString(file.toPath).trim
                  restClient.post(
                    path = url,
                    body = fileContentToBodyFn(rawJsonStr),
                    contentType = ContentType.create(ProducerAPI.MimeTypeV1_1, Consts.UTF_8)
                  ).map(_ => n + 1)
                }
              }
          } finally {
            dirStream.close()
          }
        }

        val resFuture = for {
          nPlans <- process("plan-*.json", "execution-plans", identity)
          _ <- process("event-*.json", "execution-events", s => if (s startsWith "[") s else s"[$s]")
        } yield nPlans

        val nPlans = Await.result(resFuture, Duration.Inf)
        println(ansi"%green{Imported $nPlans execution plans with events from $path}")

      case LineageExport(producerApiBaseUrl, path) =>
        path.mkdirs()

        val restClient = new RESTClientApacheHttpImpl(
          uri = producerApiBaseUrl.toURI,
          maybeSslContext = sslCtxOpt,
          maybeCredentials = None
        )

        val resFuture = restClient
          .get("execution-plans")
          .map(_.fromJson[Array[String]])
          .flatMap((ids: Array[String]) => {
            if (ids.isEmpty) {
              println(ansi"%yellow{No lineage data found in the database}")
              Future.successful((0, 0))
            } else {
              println(s"Found ${ids.length} execution plans in the database. Exporting to $path/ ...")
              ids.foldLeft(Future.successful((0, 0))) { (prevFut, planId) =>
                prevFut.flatMap { case (nPlans, nEvents) =>
                  log.debug(s"Exporting execution plan with id: $planId")
                  val eventualPlanJson = restClient.get(s"execution-plans/$planId")
                  val eventualEventJsons = restClient.get(s"execution-plans/$planId/events")
                  for {
                    planJson <- eventualPlanJson
                    events <- eventualEventJsons.map(_.fromJson[Seq[Map[String, Any]]])
                  } yield {
                    Files.writeString(
                      path.toPath.resolve(s"plan-$planId.json"),
                      planJson,
                      StandardCharsets.UTF_8
                    )
                    events.foreach(event => {
                      val eventJson = event.toJson
                      Files.writeString(
                        path.toPath.resolve(s"event-$planId-${event("timestamp")}.json"),
                        eventJson,
                        StandardCharsets.UTF_8
                      )
                    })
                    (nPlans + 1, nEvents + events.length)
                  }
                }
              }
            }
          })

        val (nPlans, nEvents) = Await.result(resFuture, Duration.Inf)
        println(ansi"%green{Exported $nPlans execution plans and $nEvents execution events}")

      case DBExec(url, actions) =>
        val dbManager = dbManagerFactory.create(url, sslCtxOpt)
        Await.result(dbManager.execute(actions: _*), Duration.Inf)
    }

    println(ansi"%green{DONE}")
  }
}
