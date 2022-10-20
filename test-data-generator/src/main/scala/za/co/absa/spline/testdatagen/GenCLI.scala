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
import za.co.absa.spline.producer.model.v1_2.ExecutionPlan
import za.co.absa.spline.testdatagen.generators.{EventGenerator, Graph}

import scala.util.{Failure, Success, Try}

object GenCLI {

  def validateNumericParam(param: String): Either[String, Unit] = {
    Try(NumericValue(param)) match {
      case Success(_) => Right(())
      case Failure(exception) => Left(exception.getMessage)
    }
  }

  val numericParamText = "positive integers or patterns like: start-end/step, each element positive integer"

  val validGraphValues: String = GraphType.stringValues.mkString(", ")

  def validateGraphType(param: String): Either[String, Unit] = {
    GraphType.fromString(param) match {
      case Some(_) => Right(())
      case None => Left(s"Invalid provided graph type. Valid values: $validGraphValues")
    }
  }

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
        opt[String]('r', "readCount")
          .validate(validateNumericParam)
          .required()
          .text(numericParamText)
          .action((x, c) => c.copy(reads = NumericValue(x)))
        ,
        opt[String]('o', "opCount")
          .validate(validateNumericParam)
          .required()
          .text(numericParamText)
          .action((x, c) => c.copy(operations = NumericValue(x)))
          .text(""),
        opt[String]('a', "attCount")
          .validate(validateNumericParam)
          .required()
          .text(numericParamText)
          .action((x, c) => c.copy(attributes = NumericValue(x))),
        opt[String]('g', "graph-type")
          .validate(validateGraphType)
          .required()
          .text(s"Supported values: $validGraphValues")
          .action((x: String, c) => {
            c.copy(graphType = GraphType.fromString(x).get)
          }),
        opt[String]('t', "output")
          .optional()
          .text("Custom output file name - supply reasonable name/path to be usable on your platform")
          .action((x, c) => c.copy(customOutputFileName = Some(x))),
      )
    }

    val config = OParser.parse(configParser, args, Config()).getOrElse(sys.exit(1))

    val configs: Seq[ExpandedConfig] = config.expand()

    val dispatcher = new FileDispatcher(createFileName(config))

    configs.foreach(config => {
      val graphType: Graph = Graph(config)

      val plan: ExecutionPlan = graphType.generate()
      val event = EventGenerator.generate(plan)
      dispatcher.send(event, plan)
    })
  }

  private def createFileName(config: Config): String = {
    config.customOutputFileName match {
      case None => // default name assembly
        s"${config.graphType.name}-lineage-${config.reads}reads-${config.operations}ops-${config.attributes}attr.json.txt"
      case Some(customName) => customName
    }
  }
}
