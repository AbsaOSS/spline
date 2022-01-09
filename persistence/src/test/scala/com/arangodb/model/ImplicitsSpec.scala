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

package com.arangodb.model

import com.arangodb.entity.IndexType
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

class ImplicitsSpec extends AnyFlatSpec with Matchers {

  import com.arangodb.model.Implicits._

  behavior of "IndexOptionsOps.indexType"

  it should "resolve index type" in {
    (new SkiplistIndexOptions).indexType should be theSameInstanceAs IndexType.skiplist
    (new GeoIndexOptions).indexType should be theSameInstanceAs IndexType.geo
    (new TtlIndexOptions).indexType should be theSameInstanceAs IndexType.ttl
    (new FulltextIndexOptions).indexType should be theSameInstanceAs IndexType.fulltext
    (new HashIndexOptions).indexType should be theSameInstanceAs IndexType.hash
    (new PersistentIndexOptions).indexType should be theSameInstanceAs IndexType.persistent
  }
}
