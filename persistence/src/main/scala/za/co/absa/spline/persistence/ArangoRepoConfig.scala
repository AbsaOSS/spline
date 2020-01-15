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

import com.arangodb.ArangoDatabaseAsync
import org.slf4s.Logging
import org.springframework.beans.factory.InitializingBean
import org.springframework.context.annotation.{Bean, Configuration}
import za.co.absa.spline.common.config.{ConfTyped, DefaultConfigurationStack}

@Configuration
class ArangoRepoConfig extends InitializingBean with Logging {

  import za.co.absa.spline.persistence.ArangoRepoConfig._

  override def afterPropertiesSet(): Unit = {
    log.info(s"Connecting to ${Database.connectionURL.toURI}")
    arangoDatabase.getInfo.get()
  }

  @Bean def arangoDatabaseFacade: ArangoDatabaseFacade = new ArangoDatabaseFacade(Database.connectionURL)

  @Bean def arangoDatabase: ArangoDatabaseAsync = arangoDatabaseFacade.db
}

object ArangoRepoConfig extends DefaultConfigurationStack with ConfTyped {

  import za.co.absa.spline.common.ConfigurationImplicits._

  setThrowExceptionOnMissing(true)

  override val rootPrefix: String = "spline"

  object Database extends Conf("database") {
    val connectionURL: ArangoConnectionURL = ArangoConnectionURL(
      ArangoRepoConfig.this.getRequiredString(Prop("connectionUrl")))
  }

}
