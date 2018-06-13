package za.co.absa.spline.sparkadapterapi
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.streaming.{StreamingRelation, StreamingRelationV2}

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


// TODO SL-128 Review implementation and consider need for expanding supported logicalPlans. See JavaDoc on StreamingRelationV2.
class StreamingRelationAdapterImpl extends StreamingRelationAdapter {
  override def toStreamingRelation(streamingRelation: LogicalPlan): StreamingRelation = {
    streamingRelation match {
      case x: StreamingRelationV2 => x.v1Relation
        .getOrElse(throw new UnsupportedOperationException("Continuous streaming without microbatch support is not implemented: Used StreamingRelation does not contain v1Relation: " + streamingRelation))
      case x: StreamingRelation => x
      case _ => throw new IllegalArgumentException("Unexpected type: " + streamingRelation)
    }
  }
}
