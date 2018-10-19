/*
 * Copyright 2017 ABSA Group Limited
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

import org.apache.hadoop.conf.Configuration
import org.apache.hadoop.fs.permission.FsPermission
import org.apache.hadoop.fs.{FileSystem, Path}
import org.slf4s.Logging
import za.co.absa.spline.common.ARM._
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.op.Write
import za.co.absa.spline.persistence.api.DataLineageWriter
import za.co.absa.spline.persistence.hdfs.serialization.JSONSerialization

import scala.concurrent.{ExecutionContext, Future, blocking}

/**
  * The class represents persistence layer that persists the [[za.co.absa.spline.model.DataLineage DataLineage]] entity to a file on HDFS.
  */
class HdfsDataLineageWriter(hadoopConfiguration: Configuration, fileName: String, filePermissions: FsPermission) extends DataLineageWriter with Logging {
  /**
    * The method stores a particular data lineage to the persistence layer.
    *
    * @param lineage A data lineage that will be stored
    */
  override def store(lineage: DataLineage)(implicit ec: ExecutionContext): Future[Unit] = Future {
    val pathOption = getPath(lineage)
    import JSONSerialization._
    for (path <- pathOption) {
      val content = lineage.toJson
      persistToHdfs(content, path)
    }
  }

  private def persistToHdfs(content: String, path: Path): Unit = blocking {
    val fs = FileSystem.get(hadoopConfiguration)
    log debug s"Writing lineage to $path"
    using(fs.create(
      path,
      filePermissions,
      true,
      hadoopConfiguration.getInt("io.file.buffer.size", 4096),
      fs.getDefaultReplication(path),
      fs.getDefaultBlockSize(path),
      null)) {
      _.write(content.getBytes)
    }
  }

  private def getPath(lineage: DataLineage): Option[Path] =
    lineage.rootOperation match {
      case dn: Write => Some(new Path(dn.path, fileName))
      case _ => None
    }
}
