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

package za.co.absa.spline.core.harvester

import java.util.UUID.randomUUID

import org.apache.commons.lang3.StringUtils.substringAfter
import org.apache.spark.sql.catalyst.expressions
import org.apache.spark.sql.catalyst.expressions.{Attribute => SparkAttribute, Expression => SparkExpression}
import za.co.absa.spline.model.dt._
import za.co.absa.spline.model.{Attribute, MetaDataset, Schema, expr}

import scala.collection.immutable.ListMap

class ComponentCreatorFactory {
  val dataTypeConverter = new DataTypeCreator with CachingConverter
  val attributeConverter = new AttributeConverter(dataTypeConverter) with CachingConverter
  val expressionConverter = new ExpressionConverter(dataTypeConverter, attributeConverter)
  val metaDatasetConverter = new MetaDatasetConverter(attributeConverter) with CachingConverter
}

trait AbstractConverter {
  type From
  type To

  def convert(arg: From): To
}

trait CachingConverter extends AbstractConverter {
  private var cache = ListMap.empty[From, To]

  def values: Seq[To] = cache.values.toSeq

  abstract override def convert(arg: From): To = cache.getOrElse(arg, {
    val value = super.convert(arg)
    cache += arg -> value
    value
  })
}

class DataTypeCreator extends AbstractConverter {

  import org.apache.spark.sql.{types => st}

  override type From = (st.DataType, Boolean)
  override type To = DataType

  override def convert(arg: From): DataType = {
    val (sparkDataType, nullable) = arg
    sparkDataType match {
      case structType: st.StructType =>
        Struct(structType.fields.map(field =>
          StructField(field.name, convert(field.dataType -> field.nullable).id)), nullable)

      case arrayType: st.ArrayType =>
        Array(convert(arrayType.elementType -> arrayType.containsNull).id, nullable)

      case otherType =>
        Simple(otherType.typeName, nullable)
    }
  }

  def convert(sparkDataType: st.DataType, nullable: Boolean): DataType = convert(sparkDataType -> nullable)
}

class AttributeConverter(dataTypeConverter: DataTypeCreator)
  extends AbstractConverter {
  override type From = SparkAttribute
  override type To = Attribute

  override def convert(attr: SparkAttribute): Attribute = {
    Attribute(
      id = randomUUID,
      name = attr.name,
      dataTypeId = dataTypeConverter.convert(attr.dataType, attr.nullable).id)
  }
}


class ExpressionConverter(dataTypeConverter: DataTypeCreator, attributeCreator: AttributeConverter)
  extends AbstractConverter {
  override type From = SparkExpression
  override type To = expr.Expression

  override def convert(sparkExpr: SparkExpression): expr.Expression = sparkExpr match {

    case a: expressions.Alias =>
      expr.Alias(
        a.name,
        dataTypeConverter.convert(a.dataType, a.nullable).id,
        a.children map convert)

    case a: expressions.AttributeReference =>
      expr.AttrRef(
        attributeCreator.convert(a))

    case bo: expressions.BinaryOperator =>
      expr.Binary(
        bo.symbol,
        getDataType(bo).id,
        bo.children map convert)

    case u: expressions.ScalaUDF =>
      expr.UDF(
        u.udfName getOrElse u.function.getClass.getName,
        getDataType(u).id,
        u.children map convert)

    case e: expressions.LeafExpression =>
      expr.GenericLeaf(
        getExpressionSimpleClassName(e),
        getDataType(e).id)

    case e =>
      expr.Generic(
        getExpressionSimpleClassName(e),
        getDataType(e).id,
        e.children map convert)
  }

  private def getExpressionSimpleClassName(expr: SparkExpression) = {
    val simpleName = substringAfter(expr.getClass.getName, "org.apache.spark.sql.catalyst.expressions.")
    assume(simpleName.nonEmpty)
    simpleName
  }

  private def getDataType(expr: SparkExpression) = dataTypeConverter.convert(expr.dataType, expr.nullable)
}


class MetaDatasetConverter(attributeConverter: AttributeConverter)
  extends AbstractConverter {
  override type From = AttrGroup
  override type To = MetaDataset

  override def convert(attrGroup: AttrGroup): MetaDataset = {
    val splineAttrIds = attrGroup.attrs.map(attributeConverter.convert(_).id)
    MetaDataset(randomUUID, Schema(splineAttrIds))
  }
}
