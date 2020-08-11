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

package za.co.absa.spline.persistence

import com.arangodb.async.ArangoDatabaseAsync
import org.slf4s.Logging
import org.springframework.beans.factory.InitializingBean
import org.springframework.context.annotation.{Bean, Configuration}
import za.co.absa.commons.config.ConfTyped
import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.common.config.DefaultConfigurationStack
import za.co.absa.spline.persistence.migration.MigrationScriptRepository

import scala.concurrent.Await
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.duration.Duration


@Configuration
class ArangoRepoConfig extends InitializingBean with Logging {

  import za.co.absa.spline.persistence.ArangoRepoConfig._

  override def afterPropertiesSet(): Unit = {
    log.info(s"Connecting to ${Database.connectionURL.asString}")
    ArangoDatabaseFacade.withWorkaroundForArangoAsyncBug {
      arangoDatabase.getInfo.get()
    }

    val requiredDBVersion = MigrationScriptRepository.latestToVersion
    val currentDBVersion = Await.result(databaseVersionManager.currentVersion, Duration.Inf)

    if (requiredDBVersion != currentDBVersion)
      sys.error("" +
        s"Database version ${currentDBVersion.asString} is out of date, version ${requiredDBVersion.asString} is required. " +
        s"Please execute 'java -jar admin-cli-${SplineBuildInfo.Version}.jar db-upgrade' to upgrade the database.")
  }

  @Bean def arangoDatabaseFacade: ArangoDatabaseFacade = new ArangoDatabaseFacade(Database.connectionURL)

  @Bean def arangoDatabase: ArangoDatabaseAsync = arangoDatabaseFacade.db

  @Bean def databaseVersionManager: DatabaseVersionManager = new DatabaseVersionManager(arangoDatabase)
}

object ArangoRepoConfig extends DefaultConfigurationStack with ConfTyped {

  import za.co.absa.commons.config.ConfigurationImplicits._

  override val rootPrefix: String = "spline"

  object Database extends Conf("database") {
    val connectionURL: ArangoConnectionURL = ArangoConnectionURL(
      ArangoRepoConfig.this.getRequiredStringArray(Prop("connectionUrl")).mkString(","))
  }

}
