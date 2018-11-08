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

package za.co.absa.spline.persistence.mongo.dao

import com.mongodb.DBObject
import org.mockito.ArgumentMatchers._
import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{Assertions, AsyncFlatSpec, Matchers, OneInstancePerTest}
import za.co.absa.spline.persistence.api.CloseableIterable
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest.EntireLatestContent

import scala.concurrent.{ExecutionContext, Future}

class MultiVersionLineageDAOSpec extends AsyncFlatSpec with MockitoSugar with Matchers with OneInstancePerTest {

  behavior of "MultiVersionLineageDAO.findDatasetDescriptors"

  private val daoV1Mock = createVersionedDAOMock(1)
  private val daoV2Mock = createVersionedDAOMock(2)
  private val daoV3Mock = createVersionedDAOMock(3)
  private val daoV4Mock = createVersionedDAOMock(4)
  private val daoV5Mock = createVersionedDAOMock(5)

  private def createVersionedDAOMock(ver: Int) = {
    val aMock = mock[VersionedLineageDAO]
    when(aMock.version).thenReturn(ver)
    when(aMock.upgrader).thenReturn(
      if (ver == 1) None
      else Some(new VersionUpgrader {
        override def versionFrom: Int = ver - 1

        override def apply[T](data: T)(implicit ec: ExecutionContext): Future[T] = Future.successful(data)
      }))
    aMock
  }

  private val dao = {
    when(daoV1Mock.findDatasetDescriptors(any(), any[PageRequest]())(any())).thenReturn(Future.successful(CloseableIterable.empty[DescriptorDBObject]))
    when(daoV2Mock.findDatasetDescriptors(any(), any[PageRequest]())(any())).thenReturn(Future.successful(CloseableIterable.empty[DescriptorDBObject]))
    when(daoV3Mock.findDatasetDescriptors(any(), any[PageRequest]())(any())).thenReturn(Future.successful(CloseableIterable.empty[DescriptorDBObject]))
    when(daoV4Mock.findDatasetDescriptors(any(), any[PageRequest]())(any())).thenReturn(Future.successful(CloseableIterable.empty[DescriptorDBObject]))
    when(daoV5Mock.findDatasetDescriptors(any(), any[PageRequest]())(any())).thenReturn(Future.successful(CloseableIterable.empty[DescriptorDBObject]))

    when(daoV1Mock.countDatasetDescriptors(any(), any())(any())).thenReturn(Future.successful(0))
    when(daoV2Mock.countDatasetDescriptors(any(), any())(any())).thenReturn(Future.successful(10))
    when(daoV3Mock.countDatasetDescriptors(any(), any())(any())).thenReturn(Future.successful(10))
    when(daoV4Mock.countDatasetDescriptors(any(), any())(any())).thenReturn(Future.successful(0))
    when(daoV5Mock.countDatasetDescriptors(any(), any())(any())).thenReturn(Future.successful(0))

    new MultiVersionLineageDAO(daoV1Mock, daoV2Mock, daoV3Mock, daoV4Mock, daoV5Mock)
  }

  it should "find all items" in {

    dao.findDatasetDescriptors(None, EntireLatestContent).map(_ => {
      verify(daoV1Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV2Mock).findDatasetDescriptors(None, EntireLatestContent.copy(offset = 0, size = 10))
      verify(daoV3Mock).findDatasetDescriptors(None, EntireLatestContent.copy(offset = 0, size = 10))
      verify(daoV4Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV5Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      Assertions.succeed
    })
  }

  it should "find first page inside a shard" in {
    dao.findDatasetDescriptors(None, EntireLatestContent.copy(offset = 0, size = 7)).map(_ => {
      verify(daoV1Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV2Mock).findDatasetDescriptors(None, EntireLatestContent.copy(offset = 0, size = 7))
      verify(daoV3Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV4Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV5Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      Assertions.succeed
    })
  }

  it should "find second page across shards" in {
    dao.findDatasetDescriptors(None, EntireLatestContent.copy(offset = 7, size = 7)).map(_ => {
      verify(daoV1Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV2Mock).findDatasetDescriptors(None, EntireLatestContent.copy(offset = 7, size = 3))
      verify(daoV3Mock).findDatasetDescriptors(None, EntireLatestContent.copy(offset = 0, size = 4))
      verify(daoV4Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV5Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      Assertions.succeed
    })
  }

  it should "find first page across shards" in {
    dao.findDatasetDescriptors(None, EntireLatestContent.copy(offset = 0, size = 15)).map(_ => {
      verify(daoV1Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV2Mock).findDatasetDescriptors(None, EntireLatestContent.copy(offset = 0, size = 10))
      verify(daoV3Mock).findDatasetDescriptors(None, EntireLatestContent.copy(offset = 0, size = 5))
      verify(daoV4Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV5Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      Assertions.succeed
    })
  }

  it should "find second page inside a shard" in {
    dao.findDatasetDescriptors(None, EntireLatestContent.copy(offset = 15, size = 5)).map(_ => {
      verify(daoV1Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV2Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV3Mock).findDatasetDescriptors(None, EntireLatestContent.copy(offset = 5, size = 5))
      verify(daoV4Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      verify(daoV5Mock, never).findDatasetDescriptors(any(), any[PageRequest]())(any())
      Assertions.succeed
    })
  }

}
