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

import za.co.absa.spline.persistence.model.{ArangoDocument, CollectionDef}

import java.util.UUID

sealed trait Query {
  def collectionDefs: Seq[CollectionDef]
}

object Query {
  final val LastResultPlaceholder = null
}

case class NativeQuery(
  query: String,
  params: Map[String, Any] = Map.empty,
  override val collectionDefs: Seq[CollectionDef] = Nil
) extends Query

case class UpdateQuery(
  collectionDef: CollectionDef,
  filter: String,
  data: Map[String, Any],
) extends Query {
  override def collectionDefs: Seq[CollectionDef] = Seq(collectionDef)
}

object UpdateQuery {
  val DocWildcard = s"_${UUID.randomUUID}_"
}

case class InsertQuery(
  collectionDef: CollectionDef,
  documents: Seq[ArangoDocument],
  ignoreExisting: Boolean = false,
) extends Query {
  override def collectionDefs: Seq[CollectionDef] = Seq(collectionDef)
}

object InsertQuery {
  def apply(colDef: CollectionDef, docs: ArangoDocument*): InsertQuery = InsertQuery(colDef, docs)
}
