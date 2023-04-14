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
import org.mockito.ArgumentMatchers._
import org.mockito.Mockito.{times, verify, when}
import org.mockito.{ArgumentMatchers, Mockito}
import org.scalatest.concurrent.ScalaFutures.whenReady
import org.scalatest.flatspec.AsyncFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatest.{Assertions, OneInstancePerTest}
import org.scalatestplus.mockito.MockitoSugar
import org.scalatestplus.mockito.MockitoSugar.mock
import za.co.absa.commons.version.impl.SemVer20Impl.SemanticVersion
import za.co.absa.spline.arango.ArangoManagerImplSpec._
import za.co.absa.spline.arango.foxx.FoxxManager
import za.co.absa.spline.persistence.DatabaseVersionManager
import za.co.absa.spline.persistence.migration.Migrator

import java.time.{Clock, Instant, ZoneId, ZonedDateTime}
import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future}

class ArangoManagerImplSpec
  extends AsyncFlatSpec
    with OneInstancePerTest
    with MockitoSugar
    with Matchers {

  import za.co.absa.commons.version.Version._

  behavior of "upgrade()"

  it should "call foxx manager and migrator properly in order" in {
    val dbVerMgrMock = mock[DatabaseVersionManager]
    val migratorMock = mock[Migrator]
    val foxxMgrMock = mock[FoxxManager]

    when(dbVerMgrMock.currentVersion)
      .thenReturn(Future.successful(semver"1.2.3"))

    when(foxxMgrMock.install(any(), any()))
      .thenReturn(Future.successful({}))

    when(foxxMgrMock.uninstall(any()))
      .thenReturn(Future.successful({}))

    when(foxxMgrMock.list())
      .thenReturn(Future.successful(Seq(
        Map("mount" -> "aaa"),
        Map("mount" -> "bbb"))))

    when(migratorMock.migrate(any(), any()))
      .thenReturn(Future.successful(true))

    val manager = newManager(
      migratorMock = migratorMock,
      dbVersionManagerMock = dbVerMgrMock,
      foxxManagerMock = foxxMgrMock,
      appDbVersion = semver"4.5.6")

    for {
      _ <- manager.upgrade()
    } yield {
      val inOrder = Mockito.inOrder(foxxMgrMock, migratorMock)
      inOrder verify foxxMgrMock list()
      inOrder verify foxxMgrMock uninstall "aaa"
      inOrder verify foxxMgrMock uninstall "bbb"
      inOrder verify migratorMock migrate(semver"1.2.3", semver"4.5.6")
      inOrder verify foxxMgrMock install(ArgumentMatchers.eq("/spline"), ArgumentMatchers.any())
      Assertions.succeed
    }
  }

  it should "fail when foxx services failed to install" in {
    val dbVerMgrMock = mock[DatabaseVersionManager]
    val migratorMock = mock[Migrator]
    val foxxMgrMock = mock[FoxxManager]

    when(dbVerMgrMock.currentVersion)
      .thenReturn(Future.successful(semver"1.2.3"))

    when(foxxMgrMock.install(any(), any()))
      .thenReturn(Future.failed(new RuntimeException("oops")))

    when(foxxMgrMock.list())
      .thenReturn(Future.successful(Seq.empty))

    when(migratorMock.migrate(any(), any()))
      .thenReturn(Future.successful(true))

    val manager = newManager(
      migratorMock = migratorMock,
      dbVersionManagerMock = dbVerMgrMock,
      foxxManagerMock = foxxMgrMock,
      appDbVersion = semver"4.5.6")

    for {
      ex <- manager.upgrade().failed
    } yield {
      ex.getMessage shouldEqual "oops"
    }
  }

  private val drmMock = mock[DataRetentionManager]
  when(drmMock.pruneBefore(any())).thenReturn(Future.successful())

  behavior of "prune(Duration)"

  it should "compute timestamp of cut correctly" in {
    val clock = Clock.fixed(Instant.ofEpochMilli(1000000), ZoneId.of("UTC"))
    val manager = newManager(drmMock = drmMock, clock = clock)

    whenReady(manager.prune(0.millis))(_ => verify(drmMock).pruneBefore(1000000))
    whenReady(manager.prune(1.millis))(_ => verify(drmMock).pruneBefore(999999))
    whenReady(manager.prune(1.second))(_ => verify(drmMock).pruneBefore(999000))
    whenReady(manager.prune(1.minute))(_ => verify(drmMock).pruneBefore(940000))

    Assertions.succeed
  }

  it should "not depend on timezone" in {
    val clock = Clock.fixed(Instant.ofEpochMilli(1000000), ZoneId.of("UTC"))
    val tzPrague = ZoneId.of("Europe/Prague")
    val tzSamara = ZoneId.of("Europe/Samara")

    for {
      _ <- newManager(drmMock = drmMock, clock = clock.withZone(tzPrague)).prune(1.milli)
      _ <- newManager(drmMock = drmMock, clock = clock.withZone(tzSamara)).prune(1.milli)
    } yield {
      verify(drmMock, times(2)).pruneBefore(999999)
      Assertions.succeed
    }
  }

  behavior of "prune(ZonedDateTime)"

  it should "compute timestamp of cut correctly" in {
    val clock = Clock.fixed(Instant.ofEpochMilli(1000000), ZoneId.of("UTC"))
    val manager = newManager(drmMock = drmMock, clock = clock)

    whenReady(manager.prune(ZonedDateTime.now(clock)))(_ => verify(drmMock).pruneBefore(1000000))

    Assertions.succeed
  }
}

object ArangoManagerImplSpec {
  private def newManager(
    drmMock: DataRetentionManager = null, // NOSONAR
    clock: Clock = null, // NOSONAR
    migratorMock: Migrator = null, // NOSONAR
    foxxManagerMock: FoxxManager = null, // NOSONAR
    dbVersionManagerMock: DatabaseVersionManager = null, // NOSONAR
    appDbVersion: SemanticVersion = null // NOSONAR
  )(implicit ec: ExecutionContext): ArangoManagerImpl = {
    new ArangoManagerImpl(
      mock[ArangoDatabaseAsync],
      dbVersionManagerMock,
      drmMock,
      migratorMock,
      foxxManagerMock,
      clock,
      appDbVersion,
      dryRun = false)
  }
}
