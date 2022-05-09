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

package za.co.absa.spline.persistence.tx

import com.arangodb.async.ArangoDatabaseAsync
import org.slf4s.Logging
import za.co.absa.spline.persistence.tx.JSTxBuilder.condLine

import scala.compat.java8.FutureConverters._
import scala.concurrent.{ExecutionContext, Future}
import scala.reflect.ClassTag


class JSTxBuilder extends AbstractTxBuilder with Logging {

  override def buildTx(): ArangoTx = {
    val jsCode = generateJs()
    log.debug(jsCode)
    new ArangoTx {
      override def execute[A: ClassTag](db: ArangoDatabaseAsync)(implicit ex: ExecutionContext): Future[A] = {
        val ct = implicitly[ClassTag[A]]
        db.transaction[A](jsCode, ct.runtimeClass.asInstanceOf[Class[A]], txOptions).toScala
      }
    }
  }

  private[tx] def generateJs(): String = {
    val statements = queries.zipWithIndex.map {
      case (nq: NativeQuery, i) =>
        s"""
           |lastRes = (function(db, params){
           |  return (function(){${nq.query}})()
           |})(_db, _params[$i]);
           |""".stripMargin.trim

      case (iq: InsertQuery, i) =>
        val colName = iq.collectionDef.name
        val objects = if (iq.chainInput) "lastRes" else s"_params[$i]"
        val iterMethod = if (iq.chainInput) "map" else s"forEach"
        Seq(
          s"$objects.$iterMethod(o =>",
          condLine(iq.ignoreExisting,
            s"""
               |  o._key && _db._collection("$colName").exists(o._key) ||
               |  o._from && o._to && _db._query(`
               |    WITH $colName
               |    FOR e IN $colName
               |        FILTER e._from == @o._from && e._to == @o._to
               |        LIMIT 1
               |        COLLECT WITH COUNT INTO cnt
               |        RETURN !!cnt
               |    `, {o}).next() ||
               |  """.stripMargin),
          s"""_db._collection("$colName").insert(o, {silent:true}));"""
        ).mkString

      case (uq: UpdateQuery, i) =>
        val colName = uq.collectionDef.name
        val doc = "a"
        val filter = uq.filter.replace(UpdateQuery.DocWildcard, doc)
        val bDoc = if (uq.chainInput) "lastRes" else s"_params[$i]"
        s"""
           |_db._query(`
           |  WITH $colName
           |  FOR $doc IN $colName
           |      FILTER $filter
           |      UPDATE $doc._key WITH @b IN $colName
           |`, {"b": $bDoc});
           |""".stripMargin.trim
    }
    s"""
       |function (_params) {
       |  const _db = require('internal').db;
       |  ${statements.mkString("\n").replace("\n", "\n  ")}
       |}
       |""".stripMargin
  }

}

object JSTxBuilder {
  private def condLine(cond: => Boolean, stmt: => String): String = if (cond) stmt else ""
}
