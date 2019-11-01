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
import { ExecutedLogicalPlanVM } from '../../model/viewModels/executedLogicalPlanVM';

export type Action = ExecutionPlanAction.ExecutionPlanActions

export function executionPlanReducer(state: ExecutedLogicalPlanVM, action: Action): ExecutedLogicalPlanVM {
    switch (action.type) {
        case ExecutionPlanAction.ExecutionPlanActionTypes.EXECUTION_PLAN_GET_SUCCESS: return { ...state, ...action.payload }
        case ExecutionPlanAction.ExecutionPlanActionTypes.EXECUTION_PLAN_RESET: return null
        default: return state
    }
}
