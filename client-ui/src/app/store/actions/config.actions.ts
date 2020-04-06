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
import { Action } from '@ngrx/store'


export enum ConfigActionTypes {
  START_APP_INITIALIZER = '[App] Start Initialization',
  FINISH_APP_INITIALIZER = '[App] Finish Initialization',
  CONFIG_GET = '[Config] Get',
  CONFIG_GET_SUCCESS = '[Config] Get Success'
}

export class StartAppInitializer implements Action {
  readonly type = ConfigActionTypes.START_APP_INITIALIZER
}

export class FinishAppInitializer implements Action {
  readonly type = ConfigActionTypes.FINISH_APP_INITIALIZER
}

export class Get implements Action {
  readonly type = ConfigActionTypes.CONFIG_GET

  constructor(public payload: any) {
  }
}

export class GetSuccess implements Action {
  readonly type = ConfigActionTypes.CONFIG_GET_SUCCESS

  constructor(public payload: any) {
  }
}

export type ConfigActions
  = StartAppInitializer
  | FinishAppInitializer
  | Get
  | GetSuccess
