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

package za.co.absa.spline.common

import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit._

import scala.concurrent.{ExecutionContext, ExecutionContextExecutorService}

/**
 * The object contains implicit values and methods for [[scala.concurrent.Future Futures]].
 */
object FutureImplicits {

  /**
   * An execution context using a dedicated cached thread pool.
   */
  implicit val executionContext: ExecutionContextExecutorService = ExecutionContext.fromExecutorService(Executors.newWorkStealingPool)

  Runtime.getRuntime addShutdownHook new Thread() {
    override def run(): Unit = {
      executionContext.shutdown()
      executionContext.awaitTermination(10, MINUTES)
    }
  }
}
