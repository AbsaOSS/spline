/*
 * Copyright 2022 ABSA Group Limited
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
import com.arangodb.entity.MultiDocumentEntity
import com.arangodb.model.{DocumentCreateOptions, OverwriteMode}
import za.co.absa.spline.persistence.MultiDocumentArangoDBException

import java.util
import scala.collection.JavaConverters._
import scala.compat.java8.FutureConverters.CompletionStageOps
import scala.concurrent.{ExecutionContext, Future}
import scala.reflect.ClassTag

class AppTxBuilder extends AbstractTxBuilder {

  override def buildTx(): ArangoTx =
    new ArangoTx {
      override def execute[A: ClassTag](db: ArangoDatabaseAsync)(implicit ex: ExecutionContext): Future[A] = {
        queries
          .map(q => (r: Any) => q match {
            case nq: NativeQuery =>
              new JSTxBuilder()
                .addQuery(nq)
                .buildTx()
                .execute[Any](db)

            case InsertQuery(collectionDef, documents, _) =>
              val colName = collectionDef.name
              val opts = new DocumentCreateOptions()
                .silent(true)
                .overwriteMode(OverwriteMode.conflict)

              val input = documents.flatMap({
                case Query.LastResultPlaceholder => r match {
                  case docs: util.Collection[_] => docs.asScala
                  case docs: Seq[_] => docs
                  case doc => Seq(doc)
                }
                case d => Seq(d)
              })

              db.collection(colName)
                .insertDocuments(input.asJava, opts)
                .toScala
                .map(withErrorPropagation)

            case _ =>
              sys.error(s"Unsupported query type: ${q.getClass.getName}")
          })
          .foldLeft[Future[_]](Future.successful(()))(_ flatMap _)
          .asInstanceOf[Future[A]]
      }
    }

  private def withErrorPropagation[A](r: MultiDocumentEntity[A]): MultiDocumentEntity[A] = {
    if (r.getErrors.isEmpty) r
    else throw new MultiDocumentArangoDBException(r.getErrors.asScala.toArray: _*)
  }
}
