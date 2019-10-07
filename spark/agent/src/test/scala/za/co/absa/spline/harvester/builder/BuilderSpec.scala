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

package za.co.absa.spline.harvester.builder

import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.mockito.Mockito.when
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.harvester.ComponentCreatorFactory
import za.co.absa.spline.harvester.builder.read.{ReadCommand, ReadNodeBuilder}

class BuilderSpec extends FlatSpec with Matchers with MockitoSugar {

  implicit private val componentCreatorFactory: ComponentCreatorFactory = new ComponentCreatorFactory

  private val logicalPlanMock = mock[LogicalPlan]

  when(logicalPlanMock.output) thenReturn Seq.empty
  when(logicalPlanMock.nodeName) thenReturn "NODE"

  private val command = ReadCommand(
    SourceIdentifier(Some("CSV"), "whaateverpath"),
    logicalPlanMock,
    Map("caseSensitiveKey" -> "blabla")
  )

  private val readNode = new ReadNodeBuilder(command).build()


  it should "not force lowercase on keys of the params Map" in {
    readNode.params.keySet should contain("caseSensitiveKey")
    readNode.params.keySet should contain("sourceType")
    readNode.params.keySet shouldNot contain("casesensitivekey")
    readNode.params.keySet shouldNot contain("sourcetype")
  }

}
