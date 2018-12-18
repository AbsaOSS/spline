package za.co.absa.spline.migrator

import za.co.absa.spline.common.SplineBuildInfo

object MigratorCLI extends App {

  val cliParser = new scopt.OptionParser[MigratorConfig]("migrator-tool") {
    head("Spline Migration Tool", SplineBuildInfo.version)

    (opt[String]('s', "source")
      valueName "<url>"
      text "MongoDB connection URL, where the old Spline data is located"
      required()
      action ((url, conf) => conf.copy(mongoConnectionUrl = url)))

    (opt[String]('t', "target")
      valueName "<url>"
      text "ArangoDB connection URL, where the new Spline data should be written to"
      required()
      action ((url, conf) => conf.copy(arangoConnectionUrl = url)))

    (opt[Int]('n', "batch-size")
      text s"Number of lineages per batch. (Default is ${MigratorConfig.empty.batchSize})"
      validate (x => if (x > 0) success else failure("<batch-size> should be a positive number"))
      action ((value, conf) => conf.copy(batchSize = value)))

    help("help").text("prints this usage text")
  }


  cliParser.parse(args, MigratorConfig.empty) match {
    case Some(config) =>
      MigratorTool.migrate(config)

    case None =>
    // arguments are bad, error message will have been displayed
  }
}
