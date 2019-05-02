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

package za.co.absa.spline

import java.util.Properties

import org.apache.spark.sql.{DataFrame, SaveMode}
import za.co.absa.spline.common.TempDirectory

object DataFrameImplicits {

  implicit class DFWrapper(df: DataFrame) {
    def writeToDisk(path: String = null, mode: SaveMode = SaveMode.ErrorIfExists): Unit = {
      val dir = if (path != null) path else TempDirectory("spline_" + System.currentTimeMillis(), ".parquet", pathOnly = true).deleteOnExit().path.toString
      df.write.mode(mode).save(dir)
    }

    def writeToTable(tableName: String = "tableName", mode: SaveMode = SaveMode.ErrorIfExists): Unit = {
      df.write.mode(mode).saveAsTable(tableName)
    }

    def writeToJDBC(connectionString: String,
                    tableName: String,
                    properties: Properties = new Properties(),
                    mode: SaveMode = SaveMode.ErrorIfExists): Unit = {
      df.write.mode(mode).jdbc(connectionString, tableName, properties)
    }
  }

}
