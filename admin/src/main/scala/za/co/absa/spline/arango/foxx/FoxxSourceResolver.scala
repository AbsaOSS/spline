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

import org.apache.commons.io.IOUtils
import org.springframework.core.io.support.PathMatchingResourcePatternResolver
import za.co.absa.commons.lang.ARM

import java.io.File

object FoxxSourceResolver {
  type ServiceName = String
  type ServiceContent = Array[Byte]

  private final val ServiceArchiveFilenamePattern = "**/*.zip"
  private final val ServiceNameRegexp = """(.*)\.zip""".r

  def lookupSources(baseResourceLocation: String): Array[(ServiceName, ServiceContent)] = {
    new PathMatchingResourcePatternResolver(getClass.getClassLoader)
      .getResources(s"$baseResourceLocation/$ServiceArchiveFilenamePattern")
      .map(resource => {
        // Note: Resource.getFile() doesn't work from within a JAR, so we need to use Resource.getURL().getFile()
        val ServiceNameRegexp(serviceName) = new File(resource.getURL.getFile).getName
        val serviceContent = ARM.using(resource.getInputStream)(IOUtils.toByteArray)
        serviceName -> serviceContent
      })
  }

}
