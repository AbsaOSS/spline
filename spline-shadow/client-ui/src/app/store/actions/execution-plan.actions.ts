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
import { Action } from '@ngrx/store';
import { ExecutedLogicalPlanVM } from '../../model/viewModels/executedLogicalPlanVM';

export enum ExecutionPlanActionTypes {
    EXECUTION_PLAN_GET = '[Execution Plan] Get',
    EXECUTION_PLAN_GET_SUCCESS = '[Execution Plan] Get Success'
}

export class Get implements Action {
    public readonly type = ExecutionPlanActionTypes.EXECUTION_PLAN_GET
    constructor(public payload: string) { }
}

export class GetSuccess implements Action {
    public readonly type = ExecutionPlanActionTypes.EXECUTION_PLAN_GET_SUCCESS
    constructor(public payload: ExecutedLogicalPlanVM) { }
}

export type ExecutionPlanActions
    = Get
    | GetSuccess
