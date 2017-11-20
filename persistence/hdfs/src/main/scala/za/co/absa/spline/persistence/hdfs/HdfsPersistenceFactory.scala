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

package za.co.absa.spline.persistence.hdfs

import org.apache.commons.configuration.Configuration
import org.apache.hadoop.fs.FileSystem
import org.apache.hadoop.fs.permission.FsPermission
import org.apache.spark.SparkContext
import za.co.absa.spline.persistence.api._

/**
  * The object contains static information about settings needed for initialization of the HdfsPersistenceWriterFactory class.
  */
object HdfsPersistenceFactory {
  val fileNameKey = "spline.hdfs.file.name"
  val filePermissionsKey = "spline.hdfs.file.permissions"
}

/**
  * The class represents a factory creating HDFS persistence layers for all main data lineage entities.
  *
  * @param configuration A source of settings
  */
class HdfsPersistenceFactory(configuration: Configuration) extends PersistenceFactory(configuration) {

  import HdfsPersistenceFactory._

  private val hadoopConfiguration = SparkContext.getOrCreate().hadoopConfiguration
  private lazy val fileName = configuration getString(fileNameKey, "_LINEAGE")
  private val defaultFilePermissions = FsPermission.getFileDefault.applyUMask(FsPermission.getUMask(FileSystem.get(hadoopConfiguration).getConf))
  private lazy val filePermissions = new FsPermission(configuration.getString(filePermissionsKey, defaultFilePermissions.toShort.toString))

  log info s"Lineage destination path: $fileName"

  /**
    * The method creates a persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return A persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  override def createDataLineageWriter(): DataLineageWriter = new HdfsDataLineageWriter(hadoopConfiguration, fileName, filePermissions)

  /**
    * The method creates a reader from the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return A reader from the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  override def createDataLineageReader(): DataLineageReader = throw new UnsupportedOperationException

  /**
    * The method creates a reader from the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity if the factory can. Otherwise, returns default.
    *
    * @param default A default data lineage reader
    * @return A reader from the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  override def createDataLineageReaderOrGetDefault(default: DataLineageReader): DataLineageReader = default
}
