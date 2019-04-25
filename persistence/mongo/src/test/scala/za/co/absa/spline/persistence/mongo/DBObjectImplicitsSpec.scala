/*
 * Copyright 2019 ABSA Group Limited
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

import com.mongodb.BasicDBObject
import org.scalatest.{FlatSpec, Matchers}

class DBObjectImplicitsSpec extends FlatSpec with Matchers {

  behavior of "putIfAbsent"

  it should "put a value if the key is absent" in {
    val testObj = new BasicDBObject()
    testObj.putIfAbsent("key", "value")
    testObj.get("key") shouldEqual "value"
  }

  it should "do nothing if the key already exists" in {
    val testObj = new BasicDBObject() {
      put("key", "some value")
    }
    testObj.putIfAbsent("key", "another value")
    testObj.get("key") shouldEqual "some value"
  }

}
