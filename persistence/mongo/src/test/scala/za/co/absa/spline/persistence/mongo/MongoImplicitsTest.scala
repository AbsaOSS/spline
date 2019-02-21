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

package za.co.absa.spline.persistence.mongo

import com.mongodb.casbah.query.dsl.QueryExpressionObject
import org.scalatest.{FunSpec, Matchers}

class MongoImplicitsTest extends FunSpec with Matchers {

  import com.mongodb.casbah.Imports._
  import za.co.absa.spline.persistence.mongo.MongoImplicits._

  describe("$options") {

    it("should add $options to $regex") {
      spaceLess("foo" $regex "my_regex" $options "i") shouldEqual """{"foo":{"$regex":"my_regex","$options":"i"}}"""
    }

    it("should support field names with dots") {
      spaceLess("foo.bar" $regex "my_regex" $options "i") shouldEqual """{"foo.bar":{"$regex":"my_regex","$options":"i"}}"""
    }
  }


  private def spaceLess(e: QueryExpressionObject): String = e.toString.replaceAll(" ", "")

}
