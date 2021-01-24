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
import za.co.absa.commons.lang.CachingConverter
import za.co.absa.spline.persistence.model.EdgeDef
import za.co.absa.spline.persistence.{DefaultJsonSerDe, model => pm}
import za.co.absa.spline.producer.model.v1_1.AttrOrExprRef
import za.co.absa.spline.producer.model.{RecursiveSchemaFinder, v1_1 => am}

import java.util.UUID.randomUUID

object ExecutionPlanModelConverter {

  import DefaultJsonSerDe._
  import scalax.collection.GraphPredef._
  import za.co.absa.commons.lang.OptionImplicits._
  import za.co.absa.spline.common.OptionImplicitsExtra._

  def toPersistentModel(
    ep: am.ExecutionPlan,
    persistedDSKeyByURI: Map[String, pm.DataSource.Key]
  ): ExecutionPlanPersistentModel = {
    new EPPMBuilder(ep, persistedDSKeyByURI)
      .addOperations(ep.operations.all)
      .addAttributes(ep.attributes)
      .having(ep.expressions.map(_.all))(_ addExpressions _)
      .build()
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
      // todo: deduplicate it
      val referencedURIs = {
        val readSources = ep.operations.reads.flatMap(_.inputSources).toSet
        val writeSource = ep.operations.write.outputSource
        readSources + writeSource
      }
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
          if AttrOrExprRef.isAttribute(refTo)
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

    //////////////////////////////////////////////////////////////////////////

    // todo: all getXXX, pmXXX and toXXX could be static

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

    def addOperations(operations: Seq[am.OperationLike]): this.type = {
      val schemaFinder = new RecursiveSchemaFinder(
        operations.map(op => op.id -> op.output.asOption).toMap,
        operations.map(op => op.id -> op.childIds).toMap
      ) with CachingConverter

      operations.foreach(op => {
        val opKey = KeyUtils.asOperationKey(op, ep)
        this._pmOperations :+= (op match {
          case r: am.ReadOperation => toReadOperation(r)
          case w: am.WriteOperation => toWriteOperation(w)
          case t: am.DataOperation => toTransformOperation(t)
        })

        for (ref: am.AttrOrExprRef <- collectRefs(op.params)) {
          this._pmUses :+= (
            if (AttrOrExprRef.isAttribute(ref))
              EdgeDef.Uses.edgeToAttr(opKey, KeyUtils.asAttributeKey(ref.refId, ep))
            else
              EdgeDef.Uses.edgeToAttr(opKey, KeyUtils.asExpressionKey(ref.refId, ep))
            )
        }

        if (op.output.nonEmpty) {
          val schemaKey = KeyUtils.asSchemaKey(op, ep)
          // todo: reuse schema if all attrs are the same (by id) and are in the same order
          this._pmSchemas +:= pm.Schema(schemaKey)
          this._pmConsistsOf ++= op.output.zipWithIndex map {
            case (attrId, i) =>
              EdgeDef.ConsistsOf.edge(schemaKey, KeyUtils.asAttributeKey(attrId, ep), i)
          }

          // todo: can it be flat set already?
          val inSchemas: Seq[am.OperationLike.Schema] = for {
            childId <- op.childIds
            inSchema <- schemaFinder.findSchemaForOpId(childId).toSeq
          } yield inSchema

          for (attrIdIntroducedByTheOp <- op.output.toSet -- inSchemas.toSet.flatten) {
            this._pmProduces :+= EdgeDef.Produces.edge(
              opKey,
              KeyUtils.asAttributeKey(attrIdIntroducedByTheOp, ep))
          }
        }

        for (originOpId <- schemaFinder.findSchemaOriginForOpId(op.id)) {
          this._pmEmits :+= EdgeDef.Emits.edge(
            opKey,
            KeyUtils.asSchemaKey(originOpId, ep))
        }

        this._pmFollows ++= op.childIds.zipWithIndex map {
          case (childId, i) =>
            EdgeDef.Follows.edge(opKey, KeyUtils.asOperationKey(childId, ep), i)
        }
      })

      this
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
            if (AttrOrExprRef.isExpression(ref))
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

  }

}
