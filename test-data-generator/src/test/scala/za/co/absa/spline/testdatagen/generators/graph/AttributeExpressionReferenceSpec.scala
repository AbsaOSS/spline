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

package za.co.absa.spline.testdatagen.generators.graph

import org.scalatest.Assertion
import org.scalatest.matchers.must.Matchers.contain
import org.scalatest.matchers.should.Matchers.convertToAnyShouldWrapper
import za.co.absa.spline.producer.model.v1_2.Attribute.Id
import za.co.absa.spline.producer.model.v1_2.{AttrOrExprRef, Attribute, Expressions, FunctionalExpression}

trait AttributeExpressionReferenceSpec {
  // attributes from child data op should reference the expressions which reference the parent attributes
  def checkExpressionAttributeReferencingFor(expressions: Expressions, allAttributes: Seq[Attribute])
                                            (parentAttributeIds: Seq[Id], childAttributeIds: Seq[Id]): Assertion = {
    val expressionIdsReferencingParentAttributes: Seq[Id] = parentAttributeIds
      .flatMap(expressionsReferencingAttributeId(expressions, _)).map(_.id)

    val dataOpAttributes = findAttributesWithIdsIn(allAttributes, childAttributeIds)
    val expressionIdsReferencedByDataOpAttributes = dataOpAttributes.flatMap(_.childRefs).flatMap(_.__exprId)
    expressionIdsReferencingParentAttributes.toSet should contain allElementsOf expressionIdsReferencedByDataOpAttributes
  }

  private def findAttributesWithIdsIn(allAttributes: Seq[Attribute], idsToSearch: Seq[Id]): Seq[Attribute] =
    allAttributes.filter(attr => idsToSearch.contains(attr.id))

  private def expressionsReferencingAttributeId(expressions: Expressions, attributeId: Id): Seq[FunctionalExpression] =
    expressions.functions.filter(_.childRefs
      .contains(AttrOrExprRef(__attrId = Some(attributeId), __exprId = None)))

}
