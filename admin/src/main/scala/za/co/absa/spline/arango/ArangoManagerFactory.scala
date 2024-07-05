/*
 * Copyright 2022 ABSA Group Limited
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

package za.co.absa.spline.arango

import com.arangodb.async.ArangoDatabaseAsync
import za.co.absa.spline.arango.foxx.FoxxManagerImpl
import za.co.absa.spline.persistence.ArangoImplicits.ArangoDatabaseAsyncScalaWrapper
import za.co.absa.spline.persistence.migration.{MigrationScriptRepository, Migrator}
import za.co.absa.spline.persistence.{ArangoConnectionURL, ArangoDatabaseFacade, DatabaseVersionManager}

import java.time.Clock
import javax.net.ssl.SSLContext
import scala.concurrent.ExecutionContext

trait ArangoManagerFactory {
  def create(connectionURL: ArangoConnectionURL, maybeSSLContext: Option[SSLContext], dryRun: Boolean): ArangoManager
}

class ArangoManagerFactoryImpl(implicit ec: ExecutionContext) extends ArangoManagerFactory {

  override def create(connectionURL: ArangoConnectionURL, maybeSSLContext: Option[SSLContext], dryRun: Boolean): ArangoManager = {
    val scriptRepo = MigrationScriptRepository

    def dbManager(db: ArangoDatabaseAsync): ArangoManager = {
      val versionManager = new DatabaseVersionManager(db, dryRun)
      val drManager = new DataRetentionManager(db, dryRun)
      val migrator = new Migrator(db, scriptRepo, versionManager, dryRun)
      val foxxManager = new FoxxManagerImpl(db.restClient, dryRun)
      val clock = Clock.systemDefaultZone
      new ArangoManagerImpl(
        db,
        versionManager,
        drManager,
        migrator,
        foxxManager,
        clock,
        scriptRepo.latestToVersion,
        dryRun
      )
    }

    def dbFacade(): ArangoDatabaseFacade =
      new ArangoDatabaseFacade(connectionURL, maybeSSLContext, activeFailover = false)

    AutoClosingArangoManagerProxy.create(dbManager, dbFacade)
  }

}
