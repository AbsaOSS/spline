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

import org.apache.commons.io.FileUtils
import za.co.absa.spline.common.SplineBuildInfo

object App {
  def main(args : Array[String]): Unit = {
    import scopt.OParser
    val builder = OParser.builder[Config]
    val configParser = {
      import builder._
      OParser.sequence(
        programName("test-data-generator"),
        head(
          s"""
             |Spline Data Generator
             |Version: ${SplineBuildInfo.Version} (rev. ${SplineBuildInfo.Revision})
             |""".stripMargin
        ),
        help("help").text("Print this usage text."),
        version('v', "version").text("Print version info."),
        opt[Int]('o', "operations")
          .action((x, c) => c.copy(operations = x))
          .text("Plan with operations will be generated.")
      )
    }

    val config = OParser.parse(configParser, args, Config()).getOrElse(sys.exit(1))

    println(s"Approximate size of plan string is ${FileUtils.byteCountToDisplaySize((config.operations * 180).toLong)}")
    val dispatcher = createDispatcher("file", config.operations)
    println("Generating plan")
    val plan = PlanGenerator.generate(config.operations)
    dispatcher.send(plan)

    println("Generating event")
    val event = EventGenerator.generate(plan)
    dispatcher.send(event)
  }

  private def createDispatcher(name: String, opCount: Int): FileDispatcher = name match {
    case "file" =>
      new FileDispatcher(s"lineage-${opCount}ops")
  }
}
