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

package za.co.absa.spline.persistence.mongo.serialization

import salat.{BinaryTypeHintStrategy, Context, TypeHintFrequency, TypeHintStrategy}

class BSONSalatContext extends salat.Context {
  override val name = "BSON Salat context"
  override val typeHintStrategy: TypeHintStrategy = BinaryTypeHintStrategy(TypeHintFrequency.WhenNecessary, "_t")

  registerGlobalKeyOverride("id", "_id")
}

object BSONSalatContext {
  private val ctx_with_fix_for_SL_126: Context = new BSONSalatContext {
    override val name = "BSON Salat Context with fix for SL-126"
    registerCustomTransformer(new AggregateOperationTransformer_SL126)
  }

  implicit val ctx: Context = ctx_with_fix_for_SL_126
}
