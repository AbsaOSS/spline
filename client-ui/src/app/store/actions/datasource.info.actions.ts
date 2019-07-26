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
import { OperationDetailsVM } from '../../model/viewModels/operationDetailsVM';
import { OperationDetailsControllerService } from 'src/app/generated/services';

export enum DataSourceActionTypes {
    DATASOURCE_INFOS_GET = '[DataSource Info] Get',
    DATASOURCE_INFOS_GET_SUCCESS = '[DataSource Info] Get Success',
    DATASOURCE_INFOS_RESET = '[DataSource Info] Reset'
}

export class Get implements Action {
    public readonly type = DataSourceActionTypes.DATASOURCE_INFOS_GET
    constructor(public payload: OperationDetailsControllerService.OperationFromSourceAndApplicationIdUsingGETParams) { }
}

export class GetSuccess implements Action {
    public readonly type = DataSourceActionTypes.DATASOURCE_INFOS_GET_SUCCESS
    constructor(public payload: OperationDetailsVM) { }
}

export class Reset implements Action {
    public readonly type = DataSourceActionTypes.DATASOURCE_INFOS_RESET
    constructor() { }
}

export type DataSourceInfoActions
    = Get
    | GetSuccess
    | Reset
