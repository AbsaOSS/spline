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

import scala.util.matching.Regex

object S3Location {

  /**
   * Generally usable regex for validating S3 path, e.g. `s3://my-cool-bucket1/path/to/file/on/s3.txt`
   * Protocols `s3`, `s3n`, and `s3a` are allowed.
   * Bucket naming rules defined at [[https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html#bucketnamingrules]] are instilled.
   */
  private val S3LocationRx: Regex = "(s3[an]?)://([-a-z0-9.]{3,63})/(.*)".r

  implicit class StringS3LocationExt(val path: String) extends AnyVal {

    def toS3Location: Option[SimpleS3Location] = PartialFunction.condOpt(path) {
      case S3LocationRx(protocol, bucketName, relativePath) =>
        SimpleS3Location(protocol, bucketName, relativePath)
    }

    def isValidS3Path: Boolean = S3LocationRx.pattern.matcher(path).matches
  }
}

case class SimpleS3Location(protocol: String, bucketName: String, path: String) {
  def s3String: String = s"$protocol://$bucketName/$path"
}
