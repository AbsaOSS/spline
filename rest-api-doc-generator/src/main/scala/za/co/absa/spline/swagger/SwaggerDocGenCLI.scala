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
      required()
      action ((path, conf) => conf.copy(out = new File(path))))

    help("help").text("prints this usage text")
  }

  for (SwaggerDocGenConfig(outFile) <- cliParser.parse(args, SwaggerDocGenConfig())) {
    val apiDocJson = SwaggerDocGen.generate
    FileUtils.write(outFile, apiDocJson, "UTF-8")
  }

  println("Done.")
}

