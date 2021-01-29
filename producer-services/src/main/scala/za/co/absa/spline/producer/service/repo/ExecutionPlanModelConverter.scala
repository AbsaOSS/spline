/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.producer.service.repo

import scalax.collection.Graph
import scalax.collection.GraphEdge.DiEdge
import za.co.absa.spline.persistence.model.EdgeDef
import za.co.absa.spline.persistence.{DefaultJsonSerDe, model => pm}
import za.co.absa.spline.producer.model.v1_1.AttrOrExprRef
import za.co.absa.spline.producer.model.{v1_1 => am}

import java.util.UUID.randomUUID

object ExecutionPlanModelConverter {

  import DefaultJsonSerDe._
  import scalax.collection.GraphPredef._
  import za.co.absa.commons.lang.OptionImplicits._
  import za.co.absa.spline.common.graph.GraphUtils._

  def toPersistentModel(
    ep: am.ExecutionPlan,
    persistedDSKeyByURI: Map[String, pm.DataSource.Key]
  ): ExecutionPlanPersistentModel = {
    val maybeExpressions = ep.expressions.map(_.all)
    new EPPMBuilder(ep, persistedDSKeyByURI)
      .addOperations(ep.operations.all)
      .addAttributes(ep.attributes)
      .having(maybeExpressions)(_ addExpressions _)
      .build()
  }

  private implicit object OpNav extends NodeNavigation[am.OperationLike, am.OperationLike.Id] {
    override def id(op: am.OperationLike): am.OperationLike.Id = op.id

    override def nextIds(op: am.OperationLike): Seq[am.OperationLike.Id] = op.childIds
  }

  private class EPPMBuilder(
    ep: am.ExecutionPlan,
    persistedDSKeyByURI: Map[String, pm.DataSource.Key]
  ) {
    // operation
    private var _pmOperations: Seq[pm.Operation] = Vector.empty
    private var _pmFollows: Seq[pm.Edge] = Vector.empty
    private var _pmEmits: Seq[pm.Edge] = Vector.empty
    private var _pmUses: Seq[pm.Edge] = Vector.empty
    private var _pmProduces: Seq[pm.Edge] = Vector.empty

    // schema
    private var _pmSchemas: Seq[pm.Schema] = Vector.empty
    private var _pmConsistsOf: Seq[pm.Edge] = Vector.empty

    // attribute
    private var _pmAttributes: Seq[pm.Attribute] = Vector.empty
    private var _pmComputedBy: Seq[pm.Edge] = Vector.empty

    // expression
    private var _pmExpressions: Seq[pm.Expression] = Vector.empty
    private var _pmTakes: Seq[pm.Edge] = Vector.empty

    // attr dependency graph
    private var _attrDepGraph = Graph.empty[AttrOrExprRef, DiEdge]

    private val pmDataSourceByURI: Map[String, pm.DataSource] = {
      val referencedURIs = ep.dataSources
      val persistedURIs = persistedDSKeyByURI.keys
      val transientDSKeyByURI = (referencedURIs -- persistedURIs).map(_ -> randomUUID.toString).toMap
      val dsKeyByUri = transientDSKeyByURI ++ persistedDSKeyByURI
      dsKeyByUri.map {
        case (uri, key) => uri -> pm.DataSource(uri, key)
      }
    }

    def build(): ExecutionPlanPersistentModel = {
      val pmExecutionPlan = pm.ExecutionPlan(
        systemInfo = ep.systemInfo.toJsonAs[Map[String, Any]],
        agentInfo = ep.agentInfo.map(_.toJsonAs[Map[String, Any]]).orNull,
        extra = ep.extraInfo,
        _key = ep.id.toString)

      val pmExecutes = EdgeDef.Executes.edge(ep.id, KeyUtils.asOperationKey(ep.operations.write, ep))

      val pmDerivesFrom =
        for {
          attrFrom <- ep.attributes if attrFrom.childIds.nonEmpty
          refFrom = AttrOrExprRef.attrRef(attrFrom.id)
          refTo <- this._attrDepGraph.get(refFrom).outerNodeTraverser
          if refTo.isAttribute
        } yield {
          EdgeDef.DerivesFrom.edge(
            KeyUtils.asAttributeKey(refFrom.refId, ep),
            KeyUtils.asAttributeKey(refTo.refId, ep))
        }

      val pmTransientDataSources = {
        val persistentDSUris = persistedDSKeyByURI.keys
        (pmDataSourceByURI -- persistentDSUris).values.toSeq
      }

      ExecutionPlanPersistentModel(
        // plan
        executionPlan = pmExecutionPlan,
        executes = pmExecutes,
        depends = pmDepends,
        affects = pmAffects,

        // operation
        operations = _pmOperations,
        follows = _pmFollows,
        readsFrom = pmReadsFrom,
        writesTo = pmWritesTo,
        emits = _pmEmits,
        uses = _pmUses,
        produces = _pmProduces,

        // data source
        dataSources = pmTransientDataSources,

        // schema
        schemas = _pmSchemas,
        consistsOf = _pmConsistsOf,

        // attribute
        attributes = _pmAttributes,
        computedBy = _pmComputedBy,
        derivesFrom = pmDerivesFrom,

        // expression
        expressions = _pmExpressions,
        takes = _pmTakes,
      )
    }

    def addOperations(operations: Seq[am.OperationLike]): this.type = {

      // todo: extract it to a new method or a class
      case class SchemaInfo(oid: am.OperationLike.Id, schema: am.OperationLike.Schema, diff: Set[am.Attribute.Id])
      val schemaInfoByOpId: Map[am.OperationLike.Id, SchemaInfo] =
        operations
          .sortedTopologically(reverse = true)
          .foldLeft(Map.empty[am.OperationLike.Id, SchemaInfo]) {
            (schemaByOpId, op) =>
              val inSchemaInfos = op.childIds.map(schemaByOpId)
              val outSchema = op.output
              inSchemaInfos match {
                case (si@SchemaInfo(oid, inSchema, _)) +: sis
                  if sis.forall(_.oid == oid) && (outSchema.isEmpty || outSchema == inSchema) =>
                  schemaByOpId.updated(op.id, si)
                case _ if outSchema.nonEmpty =>
                  val inputSchemas = inSchemaInfos.map(_.schema)
                  val diff = inputSchemas.foldLeft(outSchema.toSet)(_ -- _)
                  schemaByOpId.updated(op.id, SchemaInfo(op.id, outSchema, diff))
                case _ =>
                  throw new InconsistentEntityException(s"Cannot infer schema for operation #${op.id}: the input is either empty or ambiguous")
              }
          }

      import za.co.absa.spline.common.CollectionImplicits._
      val schemaInfos = schemaInfoByOpId.values.distinctBy(_.oid)

      for (SchemaInfo(oid, attrs, diff) <- schemaInfos) {
        val opKey = KeyUtils.asOperationKey(oid, ep)
        val schemaKey = KeyUtils.asSchemaKey(oid, ep)
        this._pmSchemas +:= pm.Schema(schemaKey)
        this._pmConsistsOf ++= attrs.zipWithIndex map {
          case (attrId, i) =>
            val attrKey = KeyUtils.asAttributeKey(attrId, ep)
            EdgeDef.ConsistsOf.edge(schemaKey, attrKey, i)
        }
        for (attrId <- diff) {
          val attrKey = KeyUtils.asAttributeKey(attrId, ep)
          this._pmProduces :+= EdgeDef.Produces.edge(opKey, attrKey)
        }
      }

      operations.foreach(op => {
        val opKey = KeyUtils.asOperationKey(op, ep)
        this._pmOperations :+= (op match {
          case r: am.ReadOperation => toReadOperation(r)
          case w: am.WriteOperation => toWriteOperation(w)
          case t: am.DataOperation => toTransformOperation(t)
        })

        for (ref: am.AttrOrExprRef <- collectRefs(op.params)) {
          val refKey =
            if (ref.isAttribute) KeyUtils.asAttributeKey(ref.refId, ep)
            else KeyUtils.asExpressionKey(ref.refId, ep)
          this._pmUses :+= EdgeDef.Uses.edgeToAttr(opKey, refKey)
        }

        this._pmEmits :+= EdgeDef.Emits.edge(
          opKey,
          KeyUtils.asSchemaKey(schemaInfoByOpId(op.id).oid, ep))

        this._pmFollows ++= op.childIds.zipWithIndex map {
          case (childId, i) =>
            EdgeDef.Follows.edge(opKey, KeyUtils.asOperationKey(childId, ep), i)
        }
      })

      this
    }

    def addAttributes(attributes: Seq[am.Attribute]): this.type = {
      for (attr <- attributes) {
        val attrKey = KeyUtils.asAttributeKey(attr, ep)
        this._pmAttributes :+= pm.Attribute(
          _key = attrKey,
          dataType = attr.dataType,
          extra = attr.extra,
          name = attr.name
        )
        attr.childIds.zipWithIndex.foreach {
          case (ref, i) =>
            this._attrDepGraph += AttrOrExprRef.attrRef(attr.id) ~> ref
            if (ref.isExpression)
              this._pmComputedBy :+= EdgeDef.ComputedBy.edge(attrKey, KeyUtils.asExpressionKey(ref.refId, ep), i)
        }
      }
      this
    }

    def addExpressions(expressions: Seq[am.ExpressionLike]): this.type = {
      expressions.foreach {
        case expr: am.Literal =>
          this._pmExpressions :+= pm.LiteralExpression(
            KeyUtils.asExpressionKey(expr, ep),
            expr.dataType,
            expr.extra,
            expr.value
          )
        case expr: am.FunctionalExpression =>
          val exprKey = KeyUtils.asExpressionKey(expr, ep)
          this._pmExpressions :+= pm.FunctionalExpression(
            exprKey,
            expr.dataType,
            expr.extra,
            expr.name,
            expr.params,
          )
          expr.childIds.zipWithIndex.foreach({
            case (ref, i) =>
              this._attrDepGraph += AttrOrExprRef.exprRef(expr.id) ~> ref
              this._pmTakes :+= (ref match {
                case AttrOrExprRef(Some(attrId), _) =>
                  EdgeDef.Takes.edgeToAttr(exprKey, KeyUtils.asAttributeKey(attrId, ep), i)
                case AttrOrExprRef(_, Some(exprId)) =>
                  EdgeDef.Takes.edgeToExpr(exprKey, KeyUtils.asExpressionKey(exprId, ep), i)
              })
          })
      }

      this
    }

    private def pmReadsFrom: Seq[pm.Edge] =
      for {
        ro <- ep.operations.reads
        ds <- ro.inputSources
      } yield {
        EdgeDef.ReadsFrom.edge(
          KeyUtils.asOperationKey(ro, ep),
          pmDataSourceByURI(ds)._key)
      }

    private def pmWritesTo: pm.Edge = {
      EdgeDef.WritesTo.edge(
        KeyUtils.asOperationKey(ep.operations.write, ep),
        pmDataSourceByURI(ep.operations.write.outputSource)._key)
    }

    private def pmDepends: Seq[pm.Edge] =
      for {
        ro <- ep.operations.reads
        ds <- ro.inputSources
      } yield EdgeDef.Depends.edge(
        ep.id,
        pmDataSourceByURI(ds)._key)

    private def pmAffects: pm.Edge =
      EdgeDef.Affects.edge(
        ep.id,
        pmDataSourceByURI(ep.operations.write.outputSource)._key)

    private def collectRefs(obj: Map[String, Any]): Iterable[am.AttrOrExprRef] = {
      def fromVal(v: Any): Iterable[am.AttrOrExprRef] = v match {
        case m: Map[String, _] =>
          am.AttrOrExprRef
            .fromMap(m)
            .map(Seq(_))
            .getOrElse(collectRefs(m))
        case xs: Seq[_] => xs.flatMap(fromVal)
        case _ => Nil
      }

      obj.values.flatMap(fromVal)
    }

    private def toTransformOperation(t: am.DataOperation) = {
      pm.Transformation(
        params = t.params,
        extra = t.extra,
        _key = KeyUtils.asOperationKey(t, ep)
      )
    }

    private def toWriteOperation(w: am.WriteOperation) = {
      pm.Write(
        outputSource = w.outputSource,
        append = w.append,
        params = w.params,
        extra = w.extra,
        _key = KeyUtils.asOperationKey(w, ep)
      )
    }

    private def toReadOperation(r: am.ReadOperation) = {
      pm.Read(
        inputSources = r.inputSources,
        params = r.params,
        extra = r.extra,
        _key = KeyUtils.asOperationKey(r, ep)
      )
    }
  }

}
