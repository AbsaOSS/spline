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

package za.co.absa.spline.admin

import com.arangodb.ArangoDBException
import com.arangodb.entity.ErrorEntity
import com.arangodb.entity.ErrorEntityImplicits._
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers._

class ArangoDBAuthenticationExceptionSpec extends AnyFlatSpec {

  behavior of "unapply()"

  it should "return None on null" in {
    ArangoDBAuthenticationException.unapply(null) shouldBe None
  }

  it should "return None on throwable that is not ArangoDBException including fatal ones" in {
    ArangoDBAuthenticationException.unapply(new Throwable) shouldBe None
    ArangoDBAuthenticationException.unapply(new Exception) shouldBe None
    ArangoDBAuthenticationException.unapply(new RuntimeException) shouldBe None
    ArangoDBAuthenticationException.unapply(new InterruptedException) shouldBe None
    ArangoDBAuthenticationException.unapply(new OutOfMemoryError) shouldBe None
  }

  it should "return None on ArangoDBException that is not authentication related" in {
    val errorEmpty = new ErrorEntity()
    val error42 = new ErrorEntity().copy(errorNum = 42)
    ArangoDBAuthenticationException.unapply(new ArangoDBException("foo")) shouldBe None
    ArangoDBAuthenticationException.unapply(new ArangoDBException("foo", 42)) shouldBe None
    ArangoDBAuthenticationException.unapply(new ArangoDBException(errorEmpty)) shouldBe None
    ArangoDBAuthenticationException.unapply(new ArangoDBException(error42)) shouldBe None
    ArangoDBAuthenticationException.unapply(new ArangoDBException(new ArangoDBException("bar"))) shouldBe None
    ArangoDBAuthenticationException.unapply(new ArangoDBException(new ArangoDBException("bar", 42))) shouldBe None
    ArangoDBAuthenticationException.unapply(new ArangoDBException(new ArangoDBException(errorEmpty))) shouldBe None
    ArangoDBAuthenticationException.unapply(new ArangoDBException(new ArangoDBException(error42))) shouldBe None
  }

  it should "return Some(ex) on ArangoDBException that is authentication related" in {
    val authEx = new ArangoDBException(new ErrorEntity().copy(errorNum = 401))
    ArangoDBAuthenticationException.unapply(authEx) shouldBe Some(authEx)
    ArangoDBAuthenticationException.unapply(new ArangoDBException(authEx)) shouldBe Some(authEx)
    ArangoDBAuthenticationException.unapply(new ArangoDBException(new Exception(authEx))) shouldBe Some(authEx)
  }

  it should "not fail on cycled exceptions" in {
    lazy val loopedEx: Exception =
      new Exception {
        override def getCause: Throwable =
          new Exception {
            override def getCause: Throwable = loopedEx
          }
      }
    ArangoDBAuthenticationException.unapply(loopedEx) shouldBe None
  }
}
