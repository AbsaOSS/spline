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

import java.io.File

import org.apache.commons.io.FileUtils
import za.co.absa.spline.common.SplineBuildInfo

object SwaggerDocGenCLI extends App {

  val cliParser = new scopt.OptionParser[SwaggerDocGenConfig]("rest-doc-gen-tool") {
    head("Spline REST OpenAPI v2 spec generation tool", SplineBuildInfo.version)

    (opt[String]('o', "output")
      valueName "<file>"
      text "OpenAPI JSON output file name"
      action ((path, conf) => conf.copy(maybeOutputFile = Some(new File(path)))))

    (opt[Unit]('s', "stdout")
      text "write the generated content to standard output"
      action ((_, conf) => conf.copy(writeToStdOut = true)))

    help("help").text("prints this usage text")
  }

  for (SwaggerDocGenConfig(maybeOutFile, writeToStdOut) <- cliParser.parse(args, SwaggerDocGenConfig())) {
    val apiDocJson = SwaggerDocGen.generate

    if (writeToStdOut)
      Console.out.println(apiDocJson)

    maybeOutFile.foreach(file =>
      FileUtils.write(file, apiDocJson, "UTF-8"))
  }
}

