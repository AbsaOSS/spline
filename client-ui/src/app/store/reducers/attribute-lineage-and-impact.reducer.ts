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
import * as ExecutionPlanAction from '../actions/execution-plan.actions';
import {AttributeLineageAndImpactActionTypes, Set} from '../actions/attribute-lineage-and-impact.actions';
import {Action} from "@ngrx/store";
import {AttributeLineageAndImpact} from "../../generated/models/attribute-lineage-and-impact";


export function attributeLineageAndImpactReducer(state: AttributeLineageAndImpact, action: Action): AttributeLineageAndImpact {
  switch (action.type) {
    case ExecutionPlanAction.ExecutionPlanActionTypes.EXECUTION_PLAN_GET_SUCCESS:
    case ExecutionPlanAction.ExecutionPlanActionTypes.EXECUTION_PLAN_RESET:
      return undefined
    case AttributeLineageAndImpactActionTypes.ATTRIBUTE_LINEAGE_AND_IMPACT_SET:
      return (action as Set).linAndImp
    default:
      return state
  }
}
