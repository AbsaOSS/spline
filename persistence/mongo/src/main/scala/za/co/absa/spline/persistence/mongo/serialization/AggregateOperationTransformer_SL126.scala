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

package za.co.absa.spline.persistence.mongo.serialization

import com.mongodb.casbah.Imports._
import salat.{Context, grater}
import salat.transformers.CustomTransformer
import za.co.absa.spline.model.op.Aggregate

import scala.util.matching.Regex
import scala.util.matching.Regex.Match

object AggregateOperationTransformer_SL126 {
  private val ESC = "\u001b"
  private val symbolsToEscape = Seq(".", "$")

  private val escapeRegex = symbolsToEscape.mkString("[", "", "]").r
  private val escapeTable = symbolsToEscape.zipWithIndex.toMap.mapValues(_.toString)

  private val unescapeRegex = s"$ESC(\\d)".r
  private val unescapeTable = escapeTable.map(_.swap)

  private implicit val ctx: Context = new BSONSalatContext
}

/**
  * A workaround for SL-126
  */
class AggregateOperationTransformer_SL126 extends CustomTransformer[Aggregate, DBObject]() {
  import AggregateOperationTransformer_SL126._

  override def serialize(a: Aggregate): DBObject = {
    val escapedAggregate = copyAggregationsWithTransform(escapeRegex, m => ESC + escapeTable(m.matched))(a)
    grater[Aggregate] asDBObject escapedAggregate
  }

  override def deserialize(b: DBObject): Aggregate = {
    val escapedAggregate = grater[Aggregate] asObject b
    copyAggregationsWithTransform(unescapeRegex, m => "\\" + unescapeTable(m.group(1)))(escapedAggregate)
  }

  private def copyAggregationsWithTransform(r:Regex, rep:Match => String)(agg: Aggregate): Aggregate =
    agg.copy(aggregations = agg.aggregations map { case (k, v) => (r.replaceAllIn(k, rep), v) })
}