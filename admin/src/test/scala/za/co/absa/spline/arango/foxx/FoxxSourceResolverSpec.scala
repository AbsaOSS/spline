/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.arango.foxx

import java.io.File

import org.apache.commons.io.FileUtils
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import za.co.absa.commons.io.TempDirectory

class FoxxSourceResolverSpec extends AnyFlatSpec with Matchers {

  behavior of "lookupSources()"

  it should "search a given location and return a list of Foxx service" in {
    val tmpDir = TempDirectory(getClass.getName).deleteOnExit().path.toFile

    FileUtils.writeByteArrayToFile(new File(tmpDir, "dummy-srv_1.zip"), Array(1, 2, 3))
    FileUtils.writeByteArrayToFile(new File(tmpDir, "dummy-srv_2.zip"), Array(5, 6, 7, 8, 9))

    (FoxxSourceResolver
      .lookupSources(tmpDir.toURI.toString)
      .map({ case (sn, ba) => sn -> ba.toSeq })

      should contain theSameElementsAs Set(

      ("dummy-srv_1", Seq(1, 2, 3)),
      ("dummy-srv_2", Seq(5, 6, 7, 8, 9)),
    ))
  }

}
