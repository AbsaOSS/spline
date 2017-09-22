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
import za.co.absa.spline.model.deprecated.Execution
import za.co.absa.spline.persistence.api._

/**
  * The object contains static information about settings needed for initialization of the HdfsPersistenceFactory class.
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
class HdfsPersistenceFactory(configuration: Configuration) extends PersistenceFactory(configuration){

  import za.co.absa.spline.common.ConfigurationImplicits._
  import HdfsPersistenceFactory._

  private val hadoopConfiguration = SparkContext.getOrCreate().hadoopConfiguration
  private lazy val fileName = configuration getString (fileNameKey, "_LINEAGE")
  private val defaultFilePermissions = FsPermission.getFileDefault().applyUMask(FsPermission.getUMask(FileSystem.get(hadoopConfiguration).getConf))
  private lazy val filePermissions = new FsPermission(configuration getString (filePermissionsKey, defaultFilePermissions.toShort.toString))

  /**
    * The method creates a persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return A persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  override def createDataLineagePersistor(): DataLineagePersistor = new HdfsDataLineagePersistor(hadoopConfiguration, fileName, filePermissions)

  /**
    * The method creates a persistence layer for the [[Execution Execution]] entity.
    *
    * @return A persistence layer for the [[Execution Execution]] entity
    */
  override def createExecutionPersistor(): ExecutionPersistor = new NopExecutionPersistor
}
