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

import java.time.format.{DateTimeFormatter, DateTimeFormatterBuilder}
import java.time.temporal.ChronoField
import java.time.{ZoneId, ZonedDateTime}
import scala.util.{Failure, Success, Try}
import scala.util.control.NonFatal

object DateTimeUtils {

  private val ZonedDateTimeRegexp = (s"" +
    "^" +
    """([\dT:.+\-]+?)""".r + // local datetime
    """(Z|[+\-]\d\d:\d\d)?""".r + // timezone offset
    """(?:\[([\w/+\-]+)])?""".r + // timezone name
    "$").r

  private val ZonedDateTimeFormatter = new DateTimeFormatterBuilder()
    .parseCaseInsensitive()
    .append(DateTimeFormatter.ISO_LOCAL_DATE)
    .optionalStart()
    .appendLiteral('T')
    .append(DateTimeFormatter.ISO_LOCAL_TIME)
    .optionalEnd()
    .parseDefaulting(ChronoField.HOUR_OF_DAY, 0)
    .toFormatter();

  def parseZonedDateTime(s: String, defaultZoneId: ZoneId = ZoneId.systemDefault): ZonedDateTime =
    Try {
      val ZonedDateTimeRegexp(ldt, tzOffset, tzId) = s
      val maybeTzIds = Seq(tzId, tzOffset).map(Option.apply)

      require(!maybeTzIds.forall(_.isDefined), "Either timezone ID or offset should be specified, not both")

      val tz = maybeTzIds
        .collectFirst({ case Some(v) => ZoneId.of(v) })
        .getOrElse(defaultZoneId)

      ZonedDateTime.parse(ldt, ZonedDateTimeFormatter.withZone(tz))
    } match {
      case Success(zonedTime) => zonedTime
      case Failure(nfe@NonFatal(_)) => throw new IllegalArgumentException(s"Cannot parse zoned datetime: $s", nfe)
    }
}
