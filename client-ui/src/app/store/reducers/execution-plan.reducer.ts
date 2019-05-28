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
import {ExecutedLogicalPlanVM} from '../../model/viewModels/executedLogicalPlanVM';
import {OperationType} from '../../model/types/operationType';

export type Action = ExecutionPlanAction.ExecutionPlanActions

export function executionPlanReducer(state: ExecutedLogicalPlanVM, action: Action): ExecutedLogicalPlanVM {
    switch (action.type) {
        case ExecutionPlanAction.ExecutionPlanActionTypes.EXECUTION_PLAN_GET_SUCCESS: return { ...state, ...action.payload }
        default: return state
    }
}

export const operationIconCodes: Map<string, number> = new Map([
    [OperationType.Projection, 0xf13a],
    [OperationType.BatchRead, 0xf085],
    [OperationType.LogicalRelation, 0xf1c0],
    [OperationType.StreamRead, 0xf085],
    [OperationType.Join, 0xf126],
    [OperationType.Union, 0xf0c9],
    [OperationType.Filter, 0xf0b0],
    [OperationType.Sort, 0xf161],
    [OperationType.Aggregate, 0xf1ec],
    [OperationType.WriteCommand, 0xf0c7],
    [OperationType.BatchWrite, 0xf0c7],
    [OperationType.StreamWrite, 0xf0c7],
    [OperationType.Alias, 0xf111],
    [OperationType.Generic, 0xf15b]
])


export const operationColorCodes: Map<string, string> = new Map([
    [OperationType.Projection, "#337AB7"],
    [OperationType.BatchRead, "#337AB7"],
    [OperationType.LogicalRelation, "#e39255"],
    [OperationType.StreamRead, "#337AB7"],
    [OperationType.Join, "#e39255"],
    [OperationType.Union, "#337AB7"],
    [OperationType.Filter, "#F04100"],
    [OperationType.Sort, "#E0E719"],
    [OperationType.Aggregate, "#008000"],
    [OperationType.WriteCommand, "#e39255"],
    [OperationType.BatchWrite, "#e39255"],
    [OperationType.StreamWrite, "#e39255"],
    [OperationType.Alias, "#337AB7"],
    [OperationType.Generic, "#808080"]
])
