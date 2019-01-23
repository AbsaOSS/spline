/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.persistence.atlas

import java.io.File

import org.apache.atlas.ApplicationProperties.{APPLICATION_PROPERTIES, ATLAS_CONFIGURATION_DIRECTORY_PROPERTY}
import org.apache.commons.configuration.BaseConfiguration
import org.apache.commons.io.FileUtils
import org.scalatest.{AsyncFlatSpec, Matchers}

import scala.collection.JavaConverters._

class AtlasPersistenceFactorySpec extends AsyncFlatSpec with Matchers {

  "Constructor" should "generate Atlas application config file and set a JVM property with the conf file absolute location" in {
    new AtlasPersistenceFactory(new BaseConfiguration {
      setProperty("this.key.should.not.be.included", "does not matter")
      setProperty("atlas.foo", "foo")
      setProperty("atlas.complex=key:name", "a complex value :=)")
    })

    val confDir = new File(System.getProperty(ATLAS_CONFIGURATION_DIRECTORY_PROPERTY))
    val confLines = FileUtils.readLines(new File(confDir, APPLICATION_PROPERTIES), "UTF-8").asScala

    confLines.filterNot(_ startsWith "#").sorted shouldEqual List(
      "atlas.complex\\=key\\:name=a complex value \\:\\=)",
      "atlas.foo=foo"
    )
  }

}
