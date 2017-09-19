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

import java.util.UUID

import org.apache.hadoop.conf.Configuration
import org.apache.hadoop.fs.permission.FsPermission
import org.apache.hadoop.fs.{FileSystem, Path}
import za.co.absa.spline.model.{DataLineage, DataLineageDescriptor, DestinationNode, OperationNode}
import za.co.absa.spline.persistence.api.DataLineagePersistor
import za.co.absa.spline.persistence.hdfs.serialization.JSONSerialization

/**
  * The class represents persistence layer that persists the [[za.co.absa.spline.model.DataLineage DataLineage]] entity to a file on HDFS.
  */
class HdfsDataLineagePersistor(hadoopConfiguration: Configuration, fileName : String, filePermissions: FsPermission) extends DataLineagePersistor{
  /**
    * The method stores a particular data lineage to the persistence layer.
    *
    * @param lineage A data lineage that will be stored
    */
  override def store(lineage: DataLineage): Unit = {
    val pathOption = getPath(lineage)
    import JSONSerialization._
    for(path <- pathOption)
    {
      val content = lineage.toJson
      persistToHdfs(content, path)
    }
  }

  private def persistToHdfs(content : String, path : Path) : Unit =
  {
    import za.co.absa.spline.common.ARMImplicits._
    val fs = FileSystem.get(hadoopConfiguration)
    for (fos <- fs.create(
      path,
      filePermissions,
      true,
      hadoopConfiguration.getInt("io.file.buffer.size", 4096),
      fs.getDefaultReplication(path),
      fs.getDefaultBlockSize(path),
      null)
    ){
      fos.write(content.getBytes)
    }
  }

  private def getPath(lineage: DataLineage) : Option[Path] =
    lineage.nodes.headOption.flatMap((n: OperationNode) => n match {
      case dn:DestinationNode => Some(new Path(dn.path + "/" + fileName))
      case _ => None
    })

  /**
    * The method loads a particular data lineage from the persistence layer.
    *
    * @param id An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  override def load(id: UUID): Option[DataLineage] = throw new UnsupportedOperationException()

  /**
    * The method removes a particular data lineage from the persistence layer.
    *
    * @param id An unique identifier of a data lineage
    */
  override def remove(id: UUID): Unit = throw new UnsupportedOperationException()

  /**
    * The method checks whether a particular data lineage graph already exists in the persistence layer.
    *
    * @param lineage A checked data lineage
    * @return An identifier of the checked data lineage if the data lineage exists, otherwise None
    */
  override def exists(lineage: DataLineage): Option[UUID] = None

  /**
    * The method gets all data lineages stored in persistence layer.
    *
    * @return Descriptors of all data lineages
    */
  override def list(): Iterator[DataLineageDescriptor] = throw new UnsupportedOperationException()
}
