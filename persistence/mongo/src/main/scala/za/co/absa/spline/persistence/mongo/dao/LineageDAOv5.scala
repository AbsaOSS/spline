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

package za.co.absa.spline.persistence.mongo.dao

import java.util.UUID
import java.util.function.Consumer
import java.{util => ju}

import com.mongodb.casbah.query.Implicits.mongoQueryStatements
import com.mongodb.{BasicDBList, DBObject}
import salat.{BinaryTypeHintStrategy, TypeHintFrequency}
import za.co.absa.spline.common.EnumerationMacros.sealedInstancesOf
import za.co.absa.spline.persistence.api.CloseableIterable
import za.co.absa.spline.persistence.mongo.MongoConnection
import za.co.absa.spline.persistence.mongo.dao.BaselineLineageDAO.Component
import za.co.absa.spline.persistence.mongo.dao.BaselineLineageDAO.Component.SubComponent
import za.co.absa.spline.persistence.mongo.dao.LineageDAOv5.Field
import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext

import scala.collection.JavaConverters._
import scala.concurrent.{ExecutionContext, Future}

class LineageDAOv5(override val connection: MongoConnection) extends BaselineLineageDAO with MutableLineageUpgraderV5 {

  import LineageDAOv5._

  override val version: Int = 5

  override protected lazy val subComponents: Seq[SubComponent] =
    SubComponent.values ++ SubComponentV5.values

  override def save(lineage: DBObject)(implicit e: ExecutionContext): Future[Unit] = {
    lineage.put(SubComponentV5.Transformation.name, extractTransformationsFromLineage(lineage))
    super.save(lineage)
  }

  override def saveProgress(event: ProgressDBObject)(implicit e: ExecutionContext): Future[Unit] = {
    super.saveProgress(event)
  }

  override protected def addComponents(rootComponentDBO: DBObject, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[DBObject] = {
    val eventualLineageDBO = super.addComponents(rootComponentDBO, overviewOnly)
    if (overviewOnly)
      eventualLineageDBO
    else
      eventualLineageDBO.map(lineage => {
        val transformations = lineage.get(SubComponentV5.Transformation.name).asInstanceOf[ju.List[DBObject]]
        insertTransformationsIntoLineage(transformations.asScala, lineage)
      })
  }

  override protected val overviewComponentFilter: PartialFunction[Component.SubComponent, DBObject] = {
    case Component.Operation =>
      Field.t $in Seq(
        "za.co.absa.spline.model.op.BatchRead",
        "za.co.absa.spline.model.op.BatchWrite",
        "za.co.absa.spline.model.op.StreamRead",
        "za.co.absa.spline.model.op.StreamWrite"
      ).map(binaryTypeHintStrategy.encode)
  }
}

object LineageDAOv5 {

  private def extractTransformationsFromLineage(lineage: DBObject) = {
    val operations = lineage.get(Component.Operation.name).asInstanceOf[Seq[DBObject]]
    (Seq.empty[DBObject] /: operations.view) {
      case (transformationsAcc, op: DBObject) if isProjectOperation(op) =>
        val augmentedTransformations = {
          val opId = getOperationId(op)
          val opTransformations = op.removeField(SubComponentV5.Transformation.name).asInstanceOf[Seq[DBObject]]
          opTransformations.map(expr => {
            expr.put(Field.opId, opId)
            expr
          })
        }
        transformationsAcc ++ augmentedTransformations

      case (transformationPOsAcc, _) => transformationPOsAcc
    }
  }

  private def insertTransformationsIntoLineage(transformations: Seq[DBObject], lineage: DBObject) = {
    val transformationsByOperationId = transformations.groupBy(_.get(Field.opId))
    val operations = lineage.get(Component.Operation.name).asInstanceOf[ju.List[DBObject]]
    operations.forEach(new Consumer[DBObject] {
      override def accept(op: DBObject): Unit =
        if (isProjectOperation(op)) {
          val opId = getOperationId(op)
          val opTransformations = transformationsByOperationId.getOrElse(opId, Nil)
          op.put(SubComponentV5.Transformation.name, new BasicDBList {
            addAll(opTransformations.asJava)
          })
        }
    })
    lineage
  }

  private def isProjectOperation(op: DBObject): Boolean = {
    val hintStrategy = BSONSalatContext.ctx.typeHintStrategy
    val opClassName = hintStrategy.decode(op.get(hintStrategy.typeHint))
    opClassName.endsWith("op.Projection")
  }

  private def getOperationId(op: DBObject) =
    op.get(Field.mainProps).asInstanceOf[DBObject].get(Field.id).asInstanceOf[UUID]

  val binaryTypeHintStrategy = BinaryTypeHintStrategy(TypeHintFrequency.Always)

  object Field {
    val child = "child"
    val children = "children"

    val condition = "condition"
    val aggregations = "aggregations"
    val groupings = "groupings"
    val transformations = "transformations"
    val orders = "orders"
    val expression = "expression"

    val t = "_t"
    val typeHint = "_typeHint"
    val id = "_id"
    val opId = "_opId"
    val sparkVer = "sparkVer"

    val mainProps = "mainProps"
    val datasetId = "datasetId"
    val dataType = "dataType"
    val dataTypeId = "dataTypeId"
    val elementDataType = "elementDataType"
    val elementDataTypeId = "elementDataTypeId"
    val fields = "fields"
    val text = "text"
    val value = "value"
    val name = "name"
    val exprType = "exprType"
  }

  object SubComponentV5 {

    sealed trait SubComponentV5 extends SubComponent

    case object Transformation extends Component("transformations") with SubComponentV5

    case object DataType extends Component("dataTypes") with SubComponentV5

    val values: Seq[SubComponent] = sealedInstancesOf[SubComponentV5].toSeq
  }

}

trait MutableLineageUpgraderV5 {
  this: VersionedLineageDAO =>

  import MutableLineageUpgraderV5._

  override def upgrader = Some(new VersionUpgrader {
    override def versionFrom: Int = 4

    override def apply[T](data: T)(implicit ec: ExecutionContext): Future[T] = data match {
      case None | _: UUID | _: Number => Future.successful(data)

      case Some(o) => apply(o).map(Some(_).asInstanceOf[T])

      case iterable: CloseableIterable[_]
        if iterable.iterator.isEmpty => Future.successful(data)

      case iterable: CloseableIterable[_] =>
        Future.traverse(iterable.iterator)(apply).
          map(new CloseableIterable(_, iterable.close()).asInstanceOf[T])

      case _: DescriptorDBObject => Future.successful(data)
      case lineage: DBObject
        if (lineage get Field.id).toString startsWith "ln_" =>
          upgradeLineage(lineage)
          Future.successful(lineage.asInstanceOf[T])
    }
  })
}

object MutableLineageUpgraderV5 {

  import LineageDAOv5.{ binaryTypeHintStrategy => hints }

  def upgradeLineage(lineage: DBObject): Unit = {
    for (op <- lineage.get(Component.Operation.name).asInstanceOf[ju.List[DBObject]].asScala) {
      val opType = getOperationType(op)
      opType match {
        case "Read" =>
          op.put(Field.t, hints.encode("za.co.absa.spline.model.op.BatchRead"))
        case "Write" =>
          op.put(Field.t, hints.encode("za.co.absa.spline.model.op.BatchWrite"))
        case _ =>
      }
    }
  }

  private def getOperationType(op: DBObject) = extractClassName(hints.decode(op.get(Field.t)))

  private def extractClassName(fullQualifiedName: String) = fullQualifiedName.replaceAll(".*\\.", "")

}
