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

import com.arangodb.async.{ArangoCollectionAsync, ArangoDatabaseAsync}
import com.arangodb.entity._
import com.arangodb.entity.arangosearch.analyzer.SearchAnalyzer
import org.mockito.ArgumentMatchers._
import org.mockito.Mockito._
import org.mockito.{ArgumentCaptor, ArgumentMatchers, Mockito}
import org.scalatest.concurrent.ScalaFutures.whenReady
import org.scalatest.flatspec.AsyncFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatest.{Assertions, OneInstancePerTest}
import org.scalatestplus.mockito.MockitoSugar
import org.scalatestplus.mockito.MockitoSugar.mock
import za.co.absa.commons.version.impl.SemVer20Impl.SemanticVersion
import za.co.absa.spline.arango.ArangoManagerImplSpec._
import za.co.absa.spline.arango.foxx.FoxxManager
import za.co.absa.spline.dummy
import za.co.absa.spline.persistence.DatabaseVersionManager
import za.co.absa.spline.persistence.migration.Migrator

import java.lang.Boolean.{FALSE, TRUE}
import java.time.{Clock, Instant, ZoneId, ZonedDateTime}
import java.util.concurrent.CompletableFuture.completedFuture
import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future}
import scala.jdk.CollectionConverters._

class ArangoManagerImplSpec
  extends AsyncFlatSpec
    with OneInstancePerTest
    with MockitoSugar
    with Matchers {

  import za.co.absa.commons.version.Version._

  behavior of "createDatabase()"

  it should "create database with all components when database does NOT exist" in {
    val dbMock = mock[ArangoDatabaseAsync]
    val dbVerMgrMock = mock[DatabaseVersionManager]
    val foxxMgrMock = mock[FoxxManager]
    val colMock = mock[ArangoCollectionAsync]

    val createdColNamesCaptor: ArgumentCaptor[String] = ArgumentCaptor.forClass(classOf[String])

    when(dbMock.exists()) thenReturn completedFuture(FALSE)
    when(dbMock.create()) thenReturn completedFuture(TRUE)
    when(dbMock.createCollection(createdColNamesCaptor.capture(), any())) thenReturn completedFuture(dummy[CollectionEntity])
    when(dbMock.createSearchAnalyzer(any())) thenReturn completedFuture(dummy[SearchAnalyzer])
    when(dbMock.createArangoSearch(any(), any())) thenReturn completedFuture(dummy[ViewEntity])
    when(dbMock.collection(any())) thenReturn colMock

    when(dbVerMgrMock.insertDbVersion(any())) thenReturn Future.successful(dummy[SemanticVersion])

    when(colMock.insertDocuments(any())) thenReturn completedFuture(dummy[MultiDocumentEntity[DocumentCreateEntity[Nothing]]])
    when(colMock.ensurePersistentIndex(any(), any())) thenReturn completedFuture(dummy[IndexEntity])

    when(foxxMgrMock.install(any(), any())) thenReturn Future.successful(())

    val manager = newManager(
      db = dbMock,
      foxxManager = foxxMgrMock,
      dbVersionManager = dbVerMgrMock
    )

    for {
      _ <- manager.createDatabase(OnDBExistsAction.Skip, DatabaseCreateOptions())
    } yield {
      val inOrder = Mockito.inOrder(dbMock)

      inOrder.verify(dbMock, atLeastOnce()).exists()
      inOrder.verify(dbMock, times(1)).create()
      inOrder.verify(dbMock, times(24)).createCollection(any(), any())
      createdColNamesCaptor.getAllValues.asScala.toSet should ((have size 24) and (contain allOf("txInfo", "dbVersion", "counter")))
      inOrder.verify(dbMock, times(1)).createSearchAnalyzer(any())
      inOrder.verify(dbMock, times(2)).createArangoSearch(any(), any())

      verify(dbVerMgrMock).insertDbVersion(notNull())
      verify(foxxMgrMock).install(ArgumentMatchers.eq("/spline"), notNull())

      verify(colMock, atLeastOnce()).insertDocuments(notNull())
      verify(colMock, atLeastOnce()).ensurePersistentIndex(any(), any())

      Assertions.succeed
    }
  }

  it should "create database with all components when database EXISTS and 'Drop' option is used" in {
    val dbMock = mock[ArangoDatabaseAsync]
    val dbVerMgrMock = mock[DatabaseVersionManager]
    val foxxMgrMock = mock[FoxxManager]
    val colMock = mock[ArangoCollectionAsync]

    val createdColNamesCaptor: ArgumentCaptor[String] = ArgumentCaptor.forClass(classOf[String])

    when(dbMock.exists()) thenReturn completedFuture(TRUE)
    when(dbMock.create()) thenReturn completedFuture(TRUE)
    when(dbMock.drop()) thenReturn completedFuture(TRUE)
    when(dbMock.createCollection(createdColNamesCaptor.capture(), any())) thenReturn completedFuture(dummy[CollectionEntity])
    when(dbMock.createSearchAnalyzer(any())) thenReturn completedFuture(dummy[SearchAnalyzer])
    when(dbMock.createArangoSearch(any(), any())) thenReturn completedFuture(dummy[ViewEntity])
    when(dbMock.collection(any())) thenReturn colMock

    when(dbVerMgrMock.insertDbVersion(any())) thenReturn Future.successful(dummy[SemanticVersion])

    when(colMock.insertDocuments(any())) thenReturn completedFuture(dummy[MultiDocumentEntity[DocumentCreateEntity[Nothing]]])
    when(colMock.ensurePersistentIndex(any(), any())) thenReturn completedFuture(dummy[IndexEntity])

    when(foxxMgrMock.install(any(), any())) thenReturn Future.successful(())

    val manager = newManager(
      db = dbMock,
      foxxManager = foxxMgrMock,
      dbVersionManager = dbVerMgrMock
    )

    for {
      _ <- manager.createDatabase(OnDBExistsAction.Drop, DatabaseCreateOptions())
    } yield {
      val inOrder = Mockito.inOrder(dbMock)
      inOrder.verify(dbMock, atLeastOnce()).exists()
      inOrder.verify(dbMock).drop()
      inOrder.verify(dbMock).create()
      Assertions.succeed
    }
  }

  it should "skip creation of database when database EXISTS and 'Skip' option is used" in {
    val dbMock = mock[ArangoDatabaseAsync]
    val dbVerMgrMock = mock[DatabaseVersionManager]
    val foxxMgrMock = mock[FoxxManager]
    val colMock = mock[ArangoCollectionAsync]

    when(dbMock.exists()) thenReturn completedFuture(TRUE)

    val manager = newManager(
      db = dbMock,
      foxxManager = foxxMgrMock,
      dbVersionManager = dbVerMgrMock
    )

    for {
      _ <- manager.createDatabase(OnDBExistsAction.Skip, DatabaseCreateOptions())
    } yield {
      verify(dbMock).exists()
      verify(dbMock, never()).drop()
      verify(dbMock, never()).create()
      verify(dbMock, never()).createCollection(any(), any())
      verify(dbMock, never()).createSearchAnalyzer(any())
      verify(dbMock, never()).createArangoSearch(any(), any())
      verify(dbVerMgrMock, never()).insertDbVersion(any())
      verify(foxxMgrMock, never()).install(any(), any())
      verify(colMock, never()).insertDocuments(any())
      verify(colMock, never()).ensurePersistentIndex(any(), any())
      Assertions.succeed
    }
  }


  it should "fail to create database when database EXISTS and 'Fail' option is used" in {
    val dbMock = mock[ArangoDatabaseAsync]
    val dbVerMgrMock = mock[DatabaseVersionManager]
    val foxxMgrMock = mock[FoxxManager]
    val colMock = mock[ArangoCollectionAsync]

    when(dbMock.exists()) thenReturn completedFuture(TRUE)

    val manager = newManager(
      db = dbMock,
      foxxManager = foxxMgrMock,
      dbVersionManager = dbVerMgrMock
    )

    for {
      _ <- recoverToSucceededIf[IllegalArgumentException](manager.createDatabase(OnDBExistsAction.Fail, DatabaseCreateOptions()))
    } yield {
      verify(dbMock, atLeastOnce()).exists()
      verify(dbMock, never()).drop()
      verify(dbMock, never()).create()
      verify(dbMock, never()).createCollection(any(), any())
      verify(dbMock, never()).createSearchAnalyzer(any())
      verify(dbMock, never()).createArangoSearch(any(), any())
      verify(dbVerMgrMock, never()).insertDbVersion(any())
      verify(foxxMgrMock, never()).install(any(), any())
      verify(colMock, never()).insertDocuments(any())
      verify(colMock, never()).ensurePersistentIndex(any(), any())
      Assertions.succeed
    }
  }


  behavior of "upgrade()"

  it should "call Foxx manager and Migrator properly and in the correct order" in {
    val dbVerMgrMock = mock[DatabaseVersionManager]
    val migratorMock = mock[Migrator]
    val foxxMgrMock = mock[FoxxManager]

    when(dbVerMgrMock.currentVersion)
      .thenReturn(Future.successful(semver"1.2.3"))

    when(foxxMgrMock.install(any(), any()))
      .thenReturn(Future.successful(()))

    when(foxxMgrMock.uninstall(any()))
      .thenReturn(Future.successful(()))

    when(foxxMgrMock.list())
      .thenReturn(Future.successful(Seq(
        Map("mount" -> "aaa"),
        Map("mount" -> "bbb"))))

    when(migratorMock.migrate(any(), any()))
      .thenReturn(Future.successful(true))

    val manager = newManager(
      migrator = migratorMock,
      dbVersionManager = dbVerMgrMock,
      foxxManager = foxxMgrMock,
      appDbVersion = semver"4.5.6")

    for {
      _ <- manager.upgrade()
    } yield {
      val inOrder = Mockito.inOrder(foxxMgrMock, migratorMock)
      (inOrder verify foxxMgrMock).list()
      inOrder verify foxxMgrMock uninstall "aaa"
      inOrder verify foxxMgrMock uninstall "bbb"
      inOrder verify migratorMock migrate(semver"1.2.3", semver"4.5.6")
      inOrder verify foxxMgrMock install(ArgumentMatchers.eq("/spline"), ArgumentMatchers.any())
      Assertions.succeed
    }
  }

  it should "fail when Foxx services failed to install" in {
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
      migrator = migratorMock,
      dbVersionManager = dbVerMgrMock,
      foxxManager = foxxMgrMock,
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
    db: ArangoDatabaseAsync = mock[ArangoDatabaseAsync],
    drmMock: DataRetentionManager = mock[DataRetentionManager],
    clock: Clock = mock[Clock],
    migrator: Migrator = mock[Migrator],
    foxxManager: FoxxManager = mock[FoxxManager],
    dbVersionManager: DatabaseVersionManager = mock[DatabaseVersionManager],
    appDbVersion: SemanticVersion = mock[SemanticVersion]
  )(implicit ec: ExecutionContext): ArangoManagerImpl = {
    new ArangoManagerImpl(
      db,
      dbVersionManager,
      drmMock,
      migrator,
      foxxManager,
      clock,
      appDbVersion,
      dryRun = false)
  }
}
