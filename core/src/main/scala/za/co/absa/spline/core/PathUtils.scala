package za.co.absa.spline.core

import org.apache.hadoop.conf.Configuration
import org.apache.hadoop.fs.{FileSystem, Path}

/**
  * The object contains helper methods performing transformations over paths.
  */
object PathUtils {

  /**
    * The method transforms a relative or absolute path to qualified path.
    * @param hadoopConfiguration hadoopConfiguration
    * @param path A path to be transformed
    * @return A qualified path
    */
  def getQualifiedPath(hadoopConfiguration: Configuration)(path : String) : String =
  {
    val fsPath = new Path(path)
    val fs = FileSystem.get(hadoopConfiguration)
    val absolutePath = fsPath.makeQualified(fs.getUri, fs.getWorkingDirectory)
    absolutePath.toString
  }
}
