/*
 * Copyright 2017 Barclays Africa Group Limited
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

import _root_.salat._
import com.mongodb.DBObject
import com.mongodb.casbah.Imports._
import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext.ctx_with_fix_for_SL_126

object DBSchemaVersionHelper {

  private val LATEST_SERIAL_VERSION = 3
  private val versionField = "_ver"

  def versionCheck(dbo: DBObject): DBObject = {
    dbo.get(versionField).asInstanceOf[Int] match {
      case LATEST_SERIAL_VERSION => dbo
      case unknownVersion => sys.error(s"Unsupported serialized lineage version: $unknownVersion")
    }
  }

  def withVersionCheck[T](f: DBObject => T): DBObject => T = {
    versionCheck _ andThen[T] f
  }

  def deserializeWithVersionCheck[Y <: scala.AnyRef](dBObject: DBObject)(implicit m : scala.Predef.Manifest[Y]): Y = {
    versionCheck(dBObject)
    grater[Y].asObject(dBObject)
  }

  def serializeWithVersion[Y <: scala.AnyRef](obj: Y)(implicit m : scala.Predef.Manifest[Y]): DBObject = {
    val dBObject = grater[Y].asDBObject(obj)
    putVersion(dBObject)
    dBObject
  }

  private def putVersion(dbo: DBObject): DBObject = {
    dbo.put(versionField, LATEST_SERIAL_VERSION)
    dbo
  }
}
