/*
 * Copyright 2019 ABSA Group Limited
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

import org.apache.commons.io.FileUtils


object App {
  def main(args : Array[String]) {

    val opCount = args(0).toInt
    println(s"Plan with $opCount operations will be generated.")
    println(s"Approximate size of plan string is ${FileUtils.byteCountToDisplaySize((opCount * 180).toLong)}")

    val dispatcher = createDispatcher("file", opCount)

    println("Generating plan")
    val plan = PlanGenerator.generate(opCount)
    dispatcher.send(plan)

    println("Generating event")
    val event = EventGenerator.generate(plan)
    dispatcher.send(event)
  }

  private def createDispatcher(name: String, opCount: Int): FileDispatcher = name match {
    case "file" =>
      new FileDispatcher(s"lineage-${opCount}ops")
  }
}
