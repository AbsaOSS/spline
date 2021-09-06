/*
 * Copyright 2018-2019 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package za.co.absa.spline.common

import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.common.S3Location.StringS3LocationExt

class S3LocationSpec extends FlatSpec with Matchers {

  "StringS3LocationExt" should "parse S3 path from String using toS3Location" in {
    "s3://mybucket-123/path/to/file.ext".toS3Location shouldBe Some(SimpleS3Location("s3", "mybucket-123", "path/to/file.ext"))
    "s3n://mybucket-123/path/to/ends/with/slash/".toS3Location shouldBe Some(SimpleS3Location("s3n", "mybucket-123", "path/to/ends/with/slash/"))
    "s3a://mybucket-123.asdf.cz/path-to-$_file!@#$.ext".toS3Location shouldBe Some(SimpleS3Location("s3a", "mybucket-123.asdf.cz", "path-to-$_file!@#$.ext"))
  }

  it should "find no valid S3 path when parsing invalid S3 path from String using toS3Location" in {
    "s3x://mybucket-123/path/to/file/on/invalid/prefix".toS3Location shouldBe None
    "s3://bb/some/path/but/bucketname/too/short".toS3Location shouldBe None
  }

  it should "check path using isValidS3Path" in {
    "s3://mybucket-123/path/to/file.ext".isValidS3Path shouldBe true
    "s3n://mybucket-123/path/to/ends/with/slash/".isValidS3Path shouldBe true
    "s3a://mybucket-123.asdf.cz/path-to-$_file!@#$.ext".isValidS3Path shouldBe true

    "s3x://mybucket-123/path/to/file/on/invalid/prefix".isValidS3Path shouldBe false
    "s3://bb/some/path/but/bucketname/too/short".isValidS3Path shouldBe false
  }

}
