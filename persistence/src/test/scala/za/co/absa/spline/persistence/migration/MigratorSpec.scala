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

package za.co.absa.spline.persistence.migration

import java.io.File

import org.apache.commons.io.FileUtils
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import za.co.absa.commons.io.TempDirectory
import za.co.absa.commons.version.Version._
import za.co.absa.spline.persistence.migration.Migrator.MigrationScript

class MigratorSpec extends AnyFlatSpec with Matchers {

  behavior of "loadMigrationScripts()"

  it should "load scripts from a given resource" in {
    val dir = TempDirectory(getClass.getName).deleteOnExit().path.toFile

    FileUtils.writeStringToFile(new File(dir, "1.0.0-1.1.0.js"), "aaa", "UTF-8")
    FileUtils.writeStringToFile(new File(dir, "1.1.0-1.2.0.js"), "bbb", "UTF-8")
    FileUtils.writeStringToFile(new File(dir, "1.2.0-1.3.0.js"), "ccc", "UTF-8")

    Migrator.loadMigrationScripts(dir.toURI.toString) should equal(Seq(
      MigrationScript(semver"1.0.0", semver"1.1.0", "aaa"),
      MigrationScript(semver"1.1.0", semver"1.2.0", "bbb"),
      MigrationScript(semver"1.2.0", semver"1.3.0", "ccc"),
    ))
  }

  behavior of "findMigrationChain()"

  /*
   *
   *    (1.0.0)
   *       |
   *    (1.1.0)
   *     /   |
   * (1.2.0) |
   *     \   |
   *    (2.0.0)
   *     /   |
   * (2.5.0) |
   *     \   |
   *    (3.0.0)
   */
  it should "find a correct migration path" in {
    val allScripts = Seq(
      MigrationScript(semver"1.0.0", semver"1.1.0", "aaa"),
      MigrationScript(semver"1.1.0", semver"1.2.0", "bbb"),
      MigrationScript(semver"1.1.0", semver"2.0.0", "bbb"),
      MigrationScript(semver"2.0.0", semver"2.5.0", "ccc"),
      MigrationScript(semver"2.5.0", semver"3.0.0", "ccc"),
      MigrationScript(semver"2.0.0", semver"3.0.0", "ccc"),
    )

    val migrationPath = Migrator.findMigrationChain(semver"1.0.0", semver"3.0.0", allScripts)

    migrationPath should equal(Seq(
      MigrationScript(semver"1.0.0", semver"1.1.0", "aaa"),
      MigrationScript(semver"1.1.0", semver"2.0.0", "bbb"),
      MigrationScript(semver"2.0.0", semver"3.0.0", "ccc"),
    ))
  }

  it should "return empty path in 'from' and 'to' nodes are the same " in {
    val allScripts = Seq(MigrationScript(semver"1.0.0", semver"2.0.0", "aaa"))

    val path = Migrator.findMigrationChain(semver"1.0.0", semver"1.0.0", allScripts)
    path should have length 0
  }

  it should "throw if no such vertex exists" in {
    val allScripts = Seq(
      MigrationScript(semver"1.0.0", semver"2.0.0", "aaa"),
    )

    intercept[RuntimeException](
      Migrator.findMigrationChain(semver"1.5.0", semver"2.0.0", allScripts)
    ).getMessage should include("1.5.0")

    intercept[RuntimeException](
      Migrator.findMigrationChain(semver"1.0.0", semver"1.5.0", allScripts)
    ).getMessage should include("1.5.0")
  }

  it should "throw if no path exists" in {
    val allScripts = Seq(
      MigrationScript(semver"1.0.0", semver"2.0.0", "aaa"),
      MigrationScript(semver"2.0.0", semver"3.0.0", "bbb"),
    )

    val ex = intercept[RuntimeException](
      Migrator.findMigrationChain(semver"3.0.0", semver"1.0.0", allScripts)
    )
    ex.getMessage should include("Cannot")
    ex.getMessage should include("3.0.0")
    ex.getMessage should include("1.0.0")
  }

  behavior of "findClosestTargetVersion()"

  it should "return closest 'to' version that is less or equal to the given one" in {
    val allScripts = Seq(
      MigrationScript(semver"1.0.0", semver"1.1.0", "aaa"),
      MigrationScript(semver"1.1.0", semver"2.0.0", "bbb"),
      MigrationScript(semver"2.0.0", semver"3.0.0", "ccc"),
    )
    Migrator.findClosestTargetVersion(semver"1.2.3", allScripts) should equal(semver"1.1.0")
    Migrator.findClosestTargetVersion(semver"1.1.0", allScripts) should equal(semver"1.1.0")
  }
}
