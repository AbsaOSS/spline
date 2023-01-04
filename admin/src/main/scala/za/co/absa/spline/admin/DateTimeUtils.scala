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

import org.slf4s.Logging

import java.time.format.{DateTimeFormatter, DateTimeFormatterBuilder}
import java.time.temporal.ChronoField
import java.time.{LocalDateTime, ZoneId, ZoneOffset, ZonedDateTime}
import scala.collection.JavaConverters._
import scala.util.control.NonFatal
import scala.util.{Failure, Success, Try}

object DateTimeUtils extends Logging {

  private val ZonedDateTimeRegexp = (s"" +
    "^" +
    """([\dT:.+\-]+?)""".r + // local datetime
    """(Z|[+\-]\d\d:\d\d)?""".r + // timezone offset
    """(?:\[([\w/+\-]+)])?""".r + // timezone name
    "$").r

  private val LocalDateOptionalTimeFormatter = new DateTimeFormatterBuilder()
    .parseCaseInsensitive()
    .append(DateTimeFormatter.ISO_LOCAL_DATE)
    .optionalStart()
    .appendLiteral('T')
    .append(DateTimeFormatter.ISO_LOCAL_TIME)
    .optionalEnd()
    .parseDefaulting(ChronoField.HOUR_OF_DAY, 0)
    .toFormatter()

  def parseZonedDateTime(s: String, defaultZoneId: ZoneId = ZoneId.systemDefault): ZonedDateTime =
    Try {
      val ZonedDateTimeRegexp(ldtStr, tzOffsetStr, tzIdStr) = s
      val maybeZoneOffset = Option(tzOffsetStr).map(ZoneOffset.of)
      val maybeZoneGeoId = Option(tzIdStr).map(ZoneId.of)

      val ldt = LocalDateTime.parse(ldtStr, LocalDateOptionalTimeFormatter)

      val tz = Seq(maybeZoneOffset, maybeZoneGeoId)
        .collectFirst({ case Some(zid) => zid })
        .getOrElse(defaultZoneId)

      val zdt = ZonedDateTime.of(ldt, tz)

      val validOffsets = tz.getRules.getValidOffsets(ldt).asScala
      if (validOffsets.isEmpty) {
        log.warn(s"" +
          s"DST gap was detected for the input '$s' in the time zone '$tz'. " +
          s"Continue with the adjusted datetime '$zdt''")
      }
      if (validOffsets.length > 1) {
        log.warn(s"" +
          s"DST overlap (${validOffsets.mkString(", ")}) was detected for the input '$s' in the time zone '$tz'. " +
          s"Continue with the assumed datetime '$zdt'")
      }

      maybeZoneGeoId.foldLeft(zdt)(_ withZoneSameInstant _)

    } match {
      case Success(zonedTime) => zonedTime
      case Failure(nfe@NonFatal(_)) => throw new IllegalArgumentException(s"Cannot parse zoned datetime: $s", nfe)
    }
}
