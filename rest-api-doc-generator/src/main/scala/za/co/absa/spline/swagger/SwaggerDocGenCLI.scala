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

package za.co.absa.spline.swagger

import java.io.{File, FileWriter, OutputStreamWriter}

import za.co.absa.commons.BuildInfo
import za.co.absa.commons.lang.ARM._

object SwaggerDocGenCLI extends App {
  new SwaggerDocGenCLI(SwaggerDocGen).exec(args)
}

class SwaggerDocGenCLI(gen: SwaggerDocGen) {
  def exec(args: Array[String]): Unit = {

    val cliParser = new scopt.OptionParser[SwaggerDocGenConfig]("rest-doc-gen-tool") {
      head("Spline REST OpenAPI v2 spec generation tool", BuildInfo.Version)

      (opt[String]('o', "output")
        valueName "<file>"
        text "OpenAPI JSON output file name"
        action ((path, conf) => conf.copy(maybeOutputFile = Some(new File(path).getAbsoluteFile))))

      help("help").text("prints this usage text")

      (arg[String]("<class>")
        text "Fully specified class name of a Spring context to generate a swagger definition for"
        action ((className, conf) => conf.copy(restContextClass = Some(Class.forName(className)))))
    }


    cliParser.parse(args, SwaggerDocGenConfig()) match {

      case Some(SwaggerDocGenConfig(maybeOutFile, Some(restContextClass))) =>
        val json = gen.generate(restContextClass)
        val writer =
          maybeOutFile
            .map { file =>
              file.getParentFile.mkdirs()
              new FileWriter(file)
            }
            .getOrElse(
              new OutputStreamWriter(Console.out))

        using(writer)(_.write(json))

      case _ => sys.exit(1)
    }
  }
}
