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

package za.co.absa.spline.core.harvester

import java.util.UUID.randomUUID

import org.apache.commons.lang3.StringUtils.substringAfter
import org.apache.spark.sql.catalyst.expressions.{Literal, Attribute => SparkAttribute, Expression => SparkExpression}
import org.apache.spark.sql.catalyst.util.{ArrayData, MapData}
import org.apache.spark.sql.catalyst.{InternalRow, expressions}
import org.apache.spark.sql.{types => st}
import za.co.absa.spline.common.transformations.{AbstractConverter, CachingConverter}
import za.co.absa.spline.model.dt._
import za.co.absa.spline.model.{Attribute, MetaDataset, Schema, expr}

import scala.collection.mutable
import scala.reflect.runtime
import scala.reflect.runtime.universe

class ComponentCreatorFactory {
  val dataTypeConverter = new DataTypeConverter with CachingConverter
  val attributeConverter = new AttributeConverter(dataTypeConverter) with CachingConverter
  val expressionConverter = new ExpressionConverter(dataTypeConverter, attributeConverter)
  val metaDatasetConverter = new MetaDatasetConverter(attributeConverter) with CachingConverter
}

class DataTypeConverter extends AbstractConverter {
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

  final def convert(sparkDataType: st.DataType, nullable: Boolean): DataType = convert(sparkDataType -> nullable)
}

class AttributeConverter(dataTypeConverter: DataTypeConverter)
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


class ExpressionConverter(dataTypeConverter: DataTypeConverter, attributeConverter: AttributeConverter)
  extends AbstractConverter {

  import ExpressionConverter._

  override type From = SparkExpression
  override type To = expr.Expression

  override def convert(sparkExpr: SparkExpression): expr.Expression = sparkExpr match {

    case a: expressions.Alias =>
      expr.Alias(a.name, convert(a.child))

    case a: expressions.AttributeReference =>
      expr.AttrRef(attributeConverter.convert(a).id)

    case lit: expressions.Literal =>
      expr.Literal(getLiteralValue(lit), getDataType(lit).id)

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
        e.prettyName,
        getDataType(e).id,
        getExpressionSimpleClassName(e),
        getExpressionExtraParameters(e))

    case e =>
      expr.Generic(
        e.prettyName,
        getDataType(e).id,
        e.children map convert,
        getExpressionSimpleClassName(e),
        getExpressionExtraParameters(e))
  }

  private def getDataType(expr: SparkExpression) = dataTypeConverter.convert(expr.dataType, expr.nullable)
}

object ExpressionConverter {
  private val mirror = runtime.universe.runtimeMirror(ClassLoader.getSystemClassLoader)
  private val gettersCache = mutable.Map.empty[universe.ClassSymbol, Iterable[universe.Symbol]]

  private def getters(classSymbol: universe.ClassSymbol) =
    gettersCache.synchronized {
      gettersCache.getOrElseUpdate(classSymbol, {
        val primaryConstr = classSymbol.primaryConstructor
        val paramNames = primaryConstr.typeSignature.paramLists.
          head.map(_.name.toString).toSet -- Set("children", "dataType", "nullable")
        classSymbol.info.decls.filter(d =>
          d.isMethod
            && d.asMethod.isGetter
            && paramNames(d.name.toString))
      })
    }

  private def asOption[T <: Traversable[_]](t: T): Option[T] = if (t.isEmpty) None else Some(t)

  private def introspect(expr: SparkExpression): Iterable[(String, Any)] = {
    val exprChildren = expr.children

    def render(o: Any): Option[Any] = o match {
      case _: SparkExpression if exprChildren contains o => None // skip children
      case _ => renderValue((v, _) => render(v))(o, None)
    }

    val oMirror = mirror.reflect(expr)
    getters(oMirror.symbol).flatMap(getter => {
      val value = oMirror.reflectMethod(getter.asMethod).apply()
      render(value).map(getter.name.toString -> _)
    })
  }

  private def renderValue(recursion: (Any, Option[st.DataType]) => Option[Any])(o: Any, maybeType: Option[st.DataType]): Option[Any] = {
    lazy val symbol = mirror.classSymbol(o.getClass)
    (o, maybeType) match {
      case (null, _) => None
      case (_: Number, _) => Some(o)
      case (_: Boolean, _) => Some(o)
      case (_: String, _) => Some(o)
      case (opt: Option[_], _) => opt.flatMap(recursion(_, None))
      case (map: Map[_, _], _) => asOption[Map[String, _]](for ((k, v) <- map; r <- recursion(v, None)) yield k.toString -> r)
      case (seq: Traversable[_], _) => asOption(seq.map(item => recursion(item, None).orNull).toVector)

      case (row: InternalRow, Some(rowType: st.StructType)) =>
        val rowItems = row.toSeq(rowType)
        assert(rowItems.length == rowType.length)
        val renderedItems = rowItems
          .zip(rowType)
          .map({ case (item, field) => recursion(item, Some(field.dataType)).orNull })
        asOption[Seq[_]](renderedItems)

      case (md: MapData, Some(st.MapType(keyType, valueType, _))) =>
        val keys = md
          .keyArray
          .toArray[Any](keyType)
          .map(_.toString)
        val values = md
          .valueArray
          .toArray[Any](valueType)
          .map(recursion(_, Some(valueType)).orNull)
        asOption[Map[String, Any]](
          keys
            .zip(values)
            .toMap)

      case (ad: ArrayData, Some(st.ArrayType(elemType, _))) => asOption[Seq[_]](
        ad
          .toArray[Any](elemType)
          .map(elem => {
            val maybeValue = recursion(elem, Some(elemType))
            maybeValue.orNull
          }))

      case _ if symbol.isModuleClass => Option(symbol.name.toString)
      case _ => Option(o.toString)
    }
  }

  private def getLiteralValue(lit: Literal): Any = {
    def render(o: Any, maybeType: Option[st.DataType]): Option[Any] = renderValue(render)(o, maybeType)

    render(lit.value, Some(lit.dataType)).orNull
  }

  private def getExpressionSimpleClassName(expr: SparkExpression) = {
    val fullName = expr.getClass.getName
    val simpleName = substringAfter(fullName, "org.apache.spark.sql.catalyst.expressions.")
    if (simpleName.nonEmpty) simpleName else fullName
  }

  private def getExpressionExtraParameters(e: SparkExpression): Option[Map[String, Any]] = {
    val params = introspect(e).toMap
    if (params.isEmpty) None else Some(params)
  }
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
