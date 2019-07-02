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
import { DataSourceInfo } from 'src/app/generated/models';

export enum ExecutionPlanDatasouceInfoActionTypes {
    EXECUTION_PLAN_DATASOURCE_INFO_GET = '[Execution Plan DataSource Info] Get',
    EXECUTION_PLAN_DATASOURCE_INFO_GET_SUCCESS = '[Execution Plan DataSource Info] Get Success',
    EXECUTION_PLAN_DATASOURCE_INFO_RESET = '[Execution Plan DataSource Info] Reset'
}

export class Get implements Action {
    public readonly type = ExecutionPlanDatasouceInfoActionTypes.EXECUTION_PLAN_DATASOURCE_INFO_GET
    constructor(public payload: string) { }
}

export class GetSuccess implements Action {
    public readonly type = ExecutionPlanDatasouceInfoActionTypes.EXECUTION_PLAN_DATASOURCE_INFO_GET_SUCCESS
    constructor(public payload: Array<DataSourceInfo>) { }
}

export class Reset implements Action {
    public readonly type = ExecutionPlanDatasouceInfoActionTypes.EXECUTION_PLAN_DATASOURCE_INFO_RESET
    constructor() { }
}

export type ExecutionPlanDatasouceInfoActions
    = Get
    | GetSuccess
    | Reset
