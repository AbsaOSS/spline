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

package za.co.absa.spline.persistence.foxx

import java.io.File

import org.json4s.DefaultFormats
import org.json4s.jackson.JsonMethods.parse
import org.springframework.core.io.support.PathMatchingResourcePatternResolver
import za.co.absa.commons.lang.ARM

import scala.io.Source

object FoxxSourceResolver {
  type ServiceName = String
  type ServiceScript = String

  private final val ManifestFilename = "manifest.json"
  private final val MainProperty = "main"

  def lookupSources(baseResourceLocation: String): Seq[(ServiceName, ServiceScript)] = {
    // Although the code below might look a bit redundant it's actually not.
    // This has to work in both inside and outside a JAR, but:
    //   - ResourcePatternResolver.getResources("classpath:foo/*") doesn't behave consistently
    //   - manifestResource.createRelative(". or ..") doesn't behave consistently
    //   - Resource.getFile doesn't work within a JAR
    //
    new PathMatchingResourcePatternResolver(getClass.getClassLoader)
      .getResources(s"$baseResourceLocation/*/$ManifestFilename").toSeq
      .map(manifestResource => {
        val serviceName = new File(manifestResource.getURL.getPath).getParentFile.getName
        val manifestContent = ARM.using(Source.fromURL(manifestResource.getURL))(_.mkString)
        val manifestJson = parse(manifestContent).extract(DefaultFormats, manifest[Map[String, Any]])
        val mainJsResource = manifestResource.createRelative(manifestJson(MainProperty).toString)
        val mainJsContent = ARM.using(Source.fromURL(mainJsResource.getURL))(_.getLines.mkString("\n"))
        serviceName -> mainJsContent
      })
  }

}
