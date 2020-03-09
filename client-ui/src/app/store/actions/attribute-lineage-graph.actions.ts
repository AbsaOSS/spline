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
import {Action} from '@ngrx/store';
import {AttributeGraph} from "../../generated/models/attribute-graph";

export enum AttributeLineageGraphActionTypes {
  ATTRIBUTE_LINEAGE_GRAPH_SET = '[Attribute Lineage] Set',
}

export class Set implements Action {
  public readonly type = AttributeLineageGraphActionTypes.ATTRIBUTE_LINEAGE_GRAPH_SET

  constructor(public graph: AttributeGraph) {
  }
}

export type AttributeLineageGraphActions = Set
