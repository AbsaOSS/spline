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

package za.co.absa.spline.testdatagen

import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.testdatagen.generators.{EventGenerator, Graph}

object GenCLI {
  def main(args: Array[String]): Unit = {
    import scopt.OParser
    val builder = OParser.builder[Config]
    val configParser = {
      import builder._
      OParser.sequence(
        programName("test-data-generator"),
        head(
          s"""
             |Spline Test Data Generator
             |Version: ${SplineBuildInfo.Version} (rev. ${SplineBuildInfo.Revision})
             |""".stripMargin
        ),
        help("help").text("Print this usage text."),
        version('v', "version").text("Print version info."),
        opt[String]('r', "reads")
          .action((x, c) => c.copy(reads = NumericValue(x))),
        opt[String]('o', "operations")
          .action((x, c) => c.copy(operations = NumericValue(x))),
        opt[String]('a', "attributes")
          .action((x, c) => c.copy(attributes = NumericValue(x))),
        opt[String]('e', "expressions")
          .action((x, c) => c.copy(expressions = NumericValue(x))),
        opt[String]('g', "graph-type")
          .action((x: String, c) => c.copy(graphType = x))
      )
    }

    val config = OParser.parse(configParser, args, Config()).getOrElse(sys.exit(1))

    val configs: Seq[Config] = config.expand()

    configs.foreach(config => {
      val dispatcher = createDispatcher("file", config)
      println("Generating plan")
      val graphType: Graph = Graph(config)

      val plan = graphType.generate()
      dispatcher.send(plan)

      println("Generating event")
      val event = EventGenerator.generate(plan)
      dispatcher.send(event)
    })
  }

  private def createDispatcher(name: String, config: Config): FileDispatcher = name match {
    case "file" =>
      new FileDispatcher(s"${config.graphType}-lineage-" +
        s"${config.reads.valueOf()}reads-" +
        s"${config.operations.valueOf()}ops-" +
        s"${config.attributes.valueOf()}attr-" +
        s"${config.expressions.valueOf()}expr")
  }
}
