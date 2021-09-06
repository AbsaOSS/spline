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

import java.net.URI

import org.apache.hadoop.conf.Configuration
import org.apache.hadoop.fs.permission.FsPermission
import org.apache.hadoop.fs.{FileSystem, Path}
import org.slf4s.Logging
import za.co.absa.spline.common.ARM._
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.op.Write
import za.co.absa.spline.persistence.api.DataLineageWriter
import za.co.absa.spline.persistence.hdfs.serialization.JSONSerialization
import za.co.absa.spline.common.S3Location.StringS3LocationExt

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
      persistToHadoopFs(content, path.toUri.toString)
    }
  }

  /**
   * Converts string full path to Hadoop FS and Path, e.g.
   * `s3://mybucket1/path/to/file` -> S3 FS + `path/to/file`
   * `/path/on/hdfs/to/file` -> local HDFS + `/path/on/hdfs/to/file`
   *
   * Note, that non-local HDFS paths are not supported in this method, e.g. hdfs://nameservice123:8020/path/on/hdfs/too.
   *
   * @param pathString path to convert to FS and relative path
   * @return FS + relative path
   **/
  def pathStringToFsWithPath(pathString: String): (FileSystem, Path) = {
    pathString.toS3Location match {
      case Some(s3Location) =>
        val s3Uri = new URI(s3Location.s3String) // s3://<bucket>
        val s3Path = new Path(s"/${s3Location.path}") // /<text-file-object-path>

        val fs = FileSystem.get(s3Uri, hadoopConfiguration)
        (fs, s3Path)

      case None => // local hdfs location
        val fs = FileSystem.get(hadoopConfiguration)
        (fs, new Path(pathString))
    }
  }

  private def persistToHadoopFs(content: String, hadoopPath: String): Unit = blocking {
    val (fs, path) = pathStringToFsWithPath(hadoopPath)
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
