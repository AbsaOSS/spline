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

package za.co.absa.spline.persistence.atlas.conversion

import java.util.UUID

import org.apache.atlas.typesystem.persistence.Id
import za.co.absa.spline.model.op
import za.co.absa.spline.persistence.atlas.model._

/**
  * The object is responsible for conversion of [[za.co.absa.spline.model.op.Operation Spline operations]] to [[za.co.absa.spline.persistence.atlas.model.Operation Atlas operations]].
  */
object OperationConverter {

  /**
    * The method converts [[za.co.absa.spline.model.op.Operation Spline operations]] to [[za.co.absa.spline.persistence.atlas.model.Operation Atlas operations]].
    * @param operations A sequence of [[za.co.absa.spline.model.op.Operation Spline operations]]
    * @param datasetIdMap A map of Spline data set ids to Atlas ids
    * @return A sequence of [[za.co.absa.spline.persistence.atlas.model.Operation Atlas operations]]
    */
  def convert(operations: Seq[op.Operation], datasetIdMap : Map[UUID, Id]) : Seq[Operation] =
    operations.map{o =>
      val commonProperties = OperationCommonProperties(
        o.mainProps.name,
        o.mainProps.id.toString,
        o.mainProps.inputs.map(i => datasetIdMap(i)),
        Seq(datasetIdMap(o.mainProps.output))
      )
      o match {
        case op.Join(_, c, t) => new JoinOperation(commonProperties, t, c.map(j => ExpressionConverter.convert(commonProperties.qualifiedName, j)).get)
        case op.Filter(_, c) => new FilterOperation(commonProperties, ExpressionConverter.convert(commonProperties.qualifiedName, c))
        case op.Projection(_, t) => new ProjectOperation(commonProperties, t.zipWithIndex.map(j => ExpressionConverter.convert(commonProperties.qualifiedName + "@" + j._2, j._1)))
        case op.Alias(_, a) => new AliasOperation(commonProperties, a)
        case op.Generic(_, r) => new GenericOperation(commonProperties, r)
        case _ => new Operation(commonProperties)
      }
    }
}
