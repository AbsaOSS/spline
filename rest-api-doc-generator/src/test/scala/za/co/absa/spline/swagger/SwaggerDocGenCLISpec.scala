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
import org.mockito.Mockito._
import org.scalatest.OneInstancePerTest
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.commons.io.TempDirectory
import za.co.absa.commons.scalatest.SystemExitFixture.ExitException
import za.co.absa.commons.scalatest.{ConsoleStubs, SystemExitFixture}

class SwaggerDocGenCLISpec
  extends AnyFlatSpec
    with OneInstancePerTest
    with MockitoSugar
    with Matchers
    with ConsoleStubs
    with SystemExitFixture.SuiteHook {

  private val genMock = mock[SwaggerDocGen]
  private val cli = new SwaggerDocGenCLI(genMock)

  behavior of "SwaggerDocGenCLI.main()"

  it should "when called with no args, print welcome message" in intercept[ExitException] {
    captureStdErr(cli.exec(Array.empty)) should include("Try --help for more information")
  }

  it should "when called with a wrong option, print error message" in intercept[ExitException] {
    captureStdErr(cli.exec(Array("--wrong-option"))) should include("Unknown option --wrong-option")
  }

  it should "when called with a wrong argument, print error message" in intercept[ExitException] {
    captureStdErr(cli.exec(Array("wrong-argument"))) should include("Argument <class> failed when given 'wrong-argument'")
  }

  it should "print JSON to stdout by default" in {
    val dummyClass = classOf[Any]
    when(genMock.generate(dummyClass)).thenReturn("{dummy JSON}")
    captureStdOut(cli.exec(Array(dummyClass.getName))) should be("{dummy JSON}")
  }

  it should "write to file" in {
    val dummyClass = classOf[Any]
    when(genMock.generate(dummyClass)).thenReturn("{dummy JSON}")
    val tmpDir = TempDirectory().deleteOnExit().path.toFile
    val file = new File(tmpDir, "a/b/c")
    cli.exec(Array("-o", file.getPath, dummyClass.getName))
    FileUtils.readFileToString(file, "UTF-8") should be("{dummy JSON}")
  }
}

object SwaggerDocGenCLISpec {

  implicit class StringWrapper(str: String) {
    def normalizeWhitespaces: String = str.replaceAll("\\s+", " ")
  }

}
