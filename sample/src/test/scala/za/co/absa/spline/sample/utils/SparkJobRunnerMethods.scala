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

package za.co.absa.spline.sample.utils

import org.apache.spark.sql.SparkSession
import za.co.absa.spline.core.SparkLineageInitializer

import scala.language.reflectiveCalls
import scala.reflect.ClassTag
import scala.reflect.runtime.universe

trait SparkJobRunnerMethods {
  def runSparkJob[T](implicit ct: ClassTag[T]): Unit = {
    type MainClass = {def main(args: Array[String]): Unit}

    val jobClass = ct.runtimeClass
    val jobClassSymbol = universe runtimeMirror jobClass.getClassLoader classSymbol jobClass
    val jobInstance =
      if (jobClassSymbol.isModuleClass) jobClass getField "MODULE$" get jobClass
      else jobClass.newInstance

    try {
      jobInstance.asInstanceOf[MainClass].main(Array.empty)

    } finally {
      // clean up session state to the extent that allows running multiple sample jobs in a single JVM
      val sparkSession = SparkSession.builder.getOrCreate
      sparkSession.listenerManager.clear()
      sparkSession.sessionState.conf.unsetConf(SparkLineageInitializer.initFlagKey)
    }
  }
}
