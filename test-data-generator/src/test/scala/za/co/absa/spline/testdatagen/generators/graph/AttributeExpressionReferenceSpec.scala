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
