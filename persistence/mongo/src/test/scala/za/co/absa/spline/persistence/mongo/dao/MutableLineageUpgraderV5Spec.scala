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
import com.mongodb.casbah.commons.{MongoDBList, MongoDBObject => DBO}
import java.{util => ju}

import org.scalatest.FunSpec
import MutableLineageUpgraderV5._
import org.scalatest.Matchers.convertToStringShouldWrapper
import salat.{BinaryTypeHintStrategy, TypeHintFrequency}
import za.co.absa.spline.persistence.mongo.dao.LineageDAOv5.Field
import scala.collection.JavaConverters._

class MutableLineageUpgraderV5Spec extends FunSpec {

  val hints = BinaryTypeHintStrategy(TypeHintFrequency.Always)

  describe("type hints upgraded") {
    it("read type hint upgraded") {
      val dbo = DBO("operations" → List(
        DBO(Field.t → hints.encode("za.co.absa.spline.model.op.Read"))
      ).asJava)
      upgradeLineage(dbo)
      val updated = dbo.get("operations").asInstanceOf[ju.List[DBObject]].asScala.head.get(Field.t)
      hints.decode(updated) shouldBe "za.co.absa.spline.model.op.BatchRead"
    }
  }

}
