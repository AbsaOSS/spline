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

package za.co.absa.spline.persistence.mongo.serde

import com.mongodb.DBObject
import com.mongodb.casbah.Imports._
import salat.grater
import za.co.absa.spline.common.TypeFreaks._
import za.co.absa.spline.model.dt.DataType
import za.co.absa.spline.model.op.{Operation, Projection}
import za.co.absa.spline.model.{Attribute, DataLineage, MetaDataset}
import za.co.absa.spline.persistence.mongo.DBOFields.{idField, indexField, lineageIdField}
import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext.ctx_with_fix_for_SL_126
import za.co.absa.spline.persistence.mongo.{DataLineagePO, LineageComponent, TransformationPO}

object LineageDBOSerDe {

  type Components = Map[LineageComponent, Seq[DBObject]]

  def serialize(lineage: DataLineage): Components = {
    val (transformations: Seq[TransformationPO], operations: Seq[Operation]) =
      ((Seq.empty[TransformationPO], Seq.empty[Operation]) /: lineage.operations.view) {
        case ((transformationPOsAcc, operationsAcc), op: Projection) =>
          val transformationPOs: Seq[TransformationPO] =
            op.transformations.map(expr => TransformationPO(expr, op.mainProps.id))
          (transformationPOsAcc ++ transformationPOs, op.copy(transformations = Nil) +: operationsAcc)
        case ((transformationPOsAcc, operationsAcc), op) =>
          (transformationPOsAcc, op +: operationsAcc)
      }

    LineageComponent.values
      .map(comp =>
        comp -> (comp match {
          case LineageComponent.Root => Seq(serialize[DataLineagePO](
            DataLineagePO(
              lineage.appId,
              lineage.appName,
              lineage.timestamp,
              lineage.sparkVer,
              lineage.rootOperation,
              lineage.rootDataset)
          ))
          case LineageComponent.Operation => toLineageComponentDBOs[Operation](operations.reverse, idField -> (_.mainProps.id))(lineage.id)
          case LineageComponent.Transformation => toLineageComponentDBOs[TransformationPO](transformations)(lineage.id)
          case LineageComponent.Attribute => toLineageComponentDBOs[Attribute](lineage.attributes)(lineage.id)
          case LineageComponent.DataType => toLineageComponentDBOs[DataType](lineage.dataTypes)(lineage.id)
          case LineageComponent.Dataset => toLineageComponentDBOs[MetaDataset](lineage.datasets)(lineage.id)
        }))
      .toMap
  }

  def deserialize(components: Components): DataLineage = {
    val dataLineagePO = components(LineageComponent.Root).map(deserialize[DataLineagePO]).head
    val operations = components(LineageComponent.Operation).map(deserialize[Operation])
    val transformationPOs = components(LineageComponent.Transformation).map(deserialize[TransformationPO])
    val attributes = components(LineageComponent.Attribute).map(deserialize[Attribute])
    val datasets = components(LineageComponent.Dataset).map(deserialize[MetaDataset])
    val dataTypes = components(LineageComponent.DataType).map(deserialize[DataType])

    val transformationsByOperationId = transformationPOs.groupBy(_.opId).mapValues(_.map(_.expr))
    val enrichedOperations = operations.map {
      case op@Projection(_, Nil) => op.copy(transformations = transformationsByOperationId(op.mainProps.id))
      case op => op
    }

    DataLineage(
      dataLineagePO.appId,
      dataLineagePO.appName,
      dataLineagePO.timestamp,
      dataLineagePO.sparkVer,
      enrichedOperations,
      datasets,
      attributes,
      dataTypes)
  }

  private def toLineageComponentDBOs[Y <: scala.AnyRef : Manifest](col: Seq[Y], extraProps: (String, Y => Any)*)(linId: String): Seq[DBObject] =
    col.view
      .zipWithIndex
      .map { case (o, i) =>
        val dbo = serialize[Y](o)
        dbo.put(lineageIdField, linId)
        dbo.put(indexField, i)
        for ((propName, valueFn) <- extraProps)
          dbo.put(propName, valueFn(o))
        dbo
      }

  private val LATEST_SERIAL_VERSION = 3
  private val versionField = "_ver"

  def deserialize[Y <: scala.AnyRef : Manifest](dBObject: DBObject): Y = {
    dBObject.get(versionField).asInstanceOf[Int] match {
      case LATEST_SERIAL_VERSION => grater[Y].asObject(dBObject)
      case unknownVersion => sys.error(s"Unsupported serialized lineage version: $unknownVersion")
    }
  }

  def serialize[Y <: scala.AnyRef : `not a subtype of`[DataLineage]#λ : Manifest](obj: Y): DBObject = {
    val dBObject = grater[Y].asDBObject(obj)
    dBObject.put(versionField, LATEST_SERIAL_VERSION)
    dBObject
  }

}
