/*
 * Copyright 2025 ABSA Group Limited
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

package za.co.absa.spline.test

import org.testcontainers.containers.wait.strategy.Wait
import org.testcontainers.containers.{GenericContainer, Network}
import org.testcontainers.images.builder.ImageFromDockerfile
import za.co.absa.spline.persistence.ArangoConnectionURL

import java.io.File
import java.nio.file.{Files, Path}
import java.time.Duration

//noinspection deprecation
class SplineRESTGatewayContainer
  extends {
    private val warModuleDir: File = new File(getClass.getResource("/").getFile, "../../../rest-gateway").getCanonicalFile
    private val warExplodedDir: Path = Files.list(Path.of(warModuleDir.getPath, "target"))
      .filter(p => Files.isDirectory(p) && p.getFileName.toString.startsWith("spline-rest-server-"))
      .findFirst()
      .orElseThrow(() => new RuntimeException("No spline-rest-server-* directory found"))
      .getFileName

  } with GenericContainer[SplineRESTGatewayContainer](
    new ImageFromDockerfile()
      .withFileFromPath(".", warModuleDir.toPath)
      .withBuildArg("PROJECT_BUILD_FINAL_NAME", warExplodedDir.toString)
  ) {

  withExposedPorts(8009, 8080)
  waitingFor(
    Wait.forHttp("/about/readiness")
      .forPort(8080)
      .forStatusCode(200)
      .withStartupTimeout(Duration.ofMinutes(2))
  )

  def withArangoDbConnection(connUrl: ArangoConnectionURL, network: Network): SplineRESTGatewayContainer = {
    withNetwork(network)
    withEnv(
      "SPLINE_DATABASE_CONNECTION_URL",
      s"${connUrl.scheme}://arangodb/${connUrl.dbName}"
    )
    self()
  }
}
