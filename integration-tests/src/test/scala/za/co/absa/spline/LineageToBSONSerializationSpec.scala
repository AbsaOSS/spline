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

package za.co.absa.spline

import com.mongodb.casbah.MongoDB
import com.mongodb.{DBCollection, DBObject}
import org.apache.spark.sql.{Column, DataFrame}
import org.apache.spark.sql.types.IntegerType
import org.bson.BSON
import org.mockito.{ArgumentCaptor, ArgumentMatchers}
import org.mockito.Mockito.{atLeastOnce, verify, when}
import org.mockito.invocation.InvocationOnMock
import org.mockito.stubbing.Answer
import org.scalatest.Inspectors.forAll
import org.scalatest._
import org.scalatest.mockito.MockitoSugar
import java.{util => ju}

import org.slf4s.Logging
import za.co.absa.spline.common.ByteUnits._
import za.co.absa.spline.fixture._
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.mongo.MongoConnection
import za.co.absa.spline.persistence.mongo.dao.LineageDAOv4
import za.co.absa.spline.fixture.Implicits._

import scala.collection.mutable
import scala.concurrent.Future

class LineageToBSONSerializationSpec
  extends AsyncFlatSpec
    with Matchers with MockitoSugar
    with AsyncSparkFixture
    with AsyncSplineFixture
    with Logging {

  it should "serialize small lineage" in
    withSession((session) =>
      withLineageCapturingOn(session) {
        lineageCaptor => {
          import session.implicits._
          import org.apache.spark.sql.functions._

          val frame: DataFrame = Seq((1, 2), (3, 4)).toDF().agg(concat(sum('_1), min('_2)) as "forty_two")
          frame.writeToDisk()
          val smallLineage = lineageCaptor.lineage

          smallLineage.operations.length shouldBe 3
          shouldHaveEveryComponentSizeInBSONLessThan(smallLineage, 100.kb)
        }
      }
    )

  it should "serialize big lineage" in
    withSession((spark) =>
      withLineageCapturingOn(spark) {
        lineageCaptor => {

          import org.apache.spark.sql.functions.{col, lit, when, size => arraySize}

          val columnNames = 0 until 2000 map "c".+

          def aComplexExpression(colName: String): Column = {
            val c = col(colName)
            val sz =
              arraySize(
                when(c.isNull, Array.empty[Int])
                  otherwise (
                  when(c.isNotNull && c.cast(IntegerType).isNull, Array.empty[Int])
                    otherwise Array.empty[Int]))

            (when(sz === 0 && c.isNotNull, c cast IntegerType)
              otherwise (
              when(sz === 0, lit(null) cast IntegerType)
                otherwise 0)) as colName
          }

          spark
            .createDataFrame(Seq.empty[Tuple1[Int]])
            .select((List.empty[Column] /: columnNames) ((cs, c) => (lit(0) as c) :: cs): _*)
            .select(columnNames map aComplexExpression: _*).writeToDisk()

          val bigLineage = lineageCaptor.lineage

          shouldHaveEveryComponentSizeInBSONLessThan(bigLineage, 100.kb)
        }
      })


  def shouldHaveEveryComponentSizeInBSONLessThan(lineage: DataLineage, sizeLimit: Int): Future[Assertion] = {
    import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._
    import scala.collection.JavaConverters._

    val mongoConnectionMock = mock[MongoConnection]
    val mongoDBMock = mock[MongoDB]
    val mongoDBCollectionMocks = mutable.Map.empty[String, DBCollection]

    when(mongoConnectionMock.db).thenReturn(mongoDBMock)
    when(mongoDBMock.getCollection(ArgumentMatchers.any())).thenAnswer(new Answer[DBCollection] {
      override def answer(invocation: InvocationOnMock): DBCollection =
        mongoDBCollectionMocks.getOrElseUpdate(invocation getArgument 0, mock[DBCollection])
    })

    for (_ <- new LineageDAOv4(mongoConnectionMock).save(salat.grater[DataLineage].asDBObject(lineage))) yield {
      forAll(mongoDBCollectionMocks) {
        case (colName, colMock) =>
          val argCaptor = ArgumentCaptor.forClass(classOf[ju.List[DBObject]]): ArgumentCaptor[ju.List[DBObject]]
          verify(colMock, atLeastOnce).insert(argCaptor.capture())
          val dbos = argCaptor.getAllValues.asScala.flatMap(_.asScala)
          forAll(dbos.zipWithIndex) {
            case (dbo, i) =>
              val actualSize = BSON.encode(dbo).length
              log.info(f"$colName[$i] BSON size: ${actualSize.toDouble / 1.kb}%.2f kb")
              actualSize should be < sizeLimit
          }
      }
    }
  }
}
