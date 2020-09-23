/*
 * Copyright 2020 ABSA Group Limited
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

import java.time.{ZoneId, ZonedDateTime}

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import za.co.absa.spline.admin.DateTimeUtils.parseZonedDateTime

class DateTimeUtilsSpec extends AnyFlatSpec with Matchers {

  behavior of "parseZonedDateTime()"

  it should "parse local date" in {
    parseZonedDateTime("2020-01-11") should equal(
      ZonedDateTime.of(2020, 1, 11, 0, 0, 0, 0, ZoneId.systemDefault))
  }

  it should "parse date with offset" in {
    parseZonedDateTime("2020-01-11Z") should equal(
      ZonedDateTime.of(2020, 1, 11, 0, 0, 0, 0, ZoneId.of("Z")))
    parseZonedDateTime("2020-01-11+00:00") should equal(
      ZonedDateTime.of(2020, 1, 11, 0, 0, 0, 0, ZoneId.of("Z")))
    parseZonedDateTime("2020-01-11+07:00") should equal(
      ZonedDateTime.of(2020, 1, 11, 0, 0, 0, 0, ZoneId.of("+07:00")))
    parseZonedDateTime("2020-01-11-07:00") should equal(
      ZonedDateTime.of(2020, 1, 11, 0, 0, 0, 0, ZoneId.of("-07:00")))
  }

  it should "parse global date with zone ID " in {
    parseZonedDateTime("2020-01-11[Europe/Samara]") should equal(
      ZonedDateTime.of(2020, 1, 11, 0, 0, 0, 0, ZoneId.of("Europe/Samara")))
    parseZonedDateTime("2020-01-11[America/Argentina/Buenos_Aires]") should equal(
      ZonedDateTime.of(2020, 1, 11, 0, 0, 0, 0, ZoneId.of("America/Argentina/Buenos_Aires")))
    parseZonedDateTime("2020-01-11[Etc/GMT-10]") should equal(
      ZonedDateTime.of(2020, 1, 11, 0, 0, 0, 0, ZoneId.of("Etc/GMT-10")))
    parseZonedDateTime("2020-01-11[Etc/GMT+10]") should equal(
      ZonedDateTime.of(2020, 1, 11, 0, 0, 0, 0, ZoneId.of("Etc/GMT+10")))
  }

  it should "parse local datetime" in {
    parseZonedDateTime("2020-01-11T23:34") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 0, 0, ZoneId.systemDefault))
    parseZonedDateTime("2020-01-11T23:34:45") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 45, 0, ZoneId.systemDefault))
    parseZonedDateTime("2020-01-11T23:34:45.123") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 45, 123000000, ZoneId.systemDefault))
    parseZonedDateTime("2020-01-11T23:34:45.123456789") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 45, 123456789, ZoneId.systemDefault))
  }

  it should "parse datetime with offset" in {
    parseZonedDateTime("2020-01-11T23:34+07:00") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 0, 0, ZoneId.of("+07:00")))
    parseZonedDateTime("2020-01-11T23:34:45+07:00") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 45, 0, ZoneId.of("+07:00")))
    parseZonedDateTime("2020-01-11T23:34:45.123+07:00") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 45, 123000000, ZoneId.of("+07:00")))
    parseZonedDateTime("2020-01-11T23:34:45.123456789+07:00") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 45, 123456789, ZoneId.of("+07:00")))
  }

  it should "parse datetime with zone ID" in {
    parseZonedDateTime("2020-01-11T23:34[Europe/Samara]") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 0, 0, ZoneId.of("Europe/Samara")))
    parseZonedDateTime("2020-01-11T23:34:45[Europe/Samara]") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 45, 0, ZoneId.of("Europe/Samara")))
    parseZonedDateTime("2020-01-11T23:34:45.123[Europe/Samara]") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 45, 123000000, ZoneId.of("Europe/Samara")))
    parseZonedDateTime("2020-01-11T23:34:45.123456789[Europe/Samara]") should equal(
      ZonedDateTime.of(2020, 1, 11, 23, 34, 45, 123456789, ZoneId.of("Europe/Samara")))
  }

  it should "not allow mixed offset and zone ID" in {
    intercept[IllegalArgumentException](parseZonedDateTime("2020-01-11+01:00[Europe/Prague]")).getMessage should include("Europe/Prague")
  }

  it should "throw on malformed input" in {
    intercept[IllegalArgumentException](parseZonedDateTime("blah")).getMessage should include("blah")
  }
}
