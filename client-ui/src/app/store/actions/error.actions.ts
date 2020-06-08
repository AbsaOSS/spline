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


export enum ErrorActionTypes {
  APPLICATION_ERROR_GET = '[Application Error] Get',
  SERVICE_ERROR_GET = '[Service Error] Get',
  SERVICE_ERROR_RESET = '[Service Error] Reset'
}

export class ApplicationErrorGet implements Action {
  readonly type = ErrorActionTypes.APPLICATION_ERROR_GET

  constructor(public payload: string) {
  }
}

export class ServiceErrorGet implements Action {
  readonly type = ErrorActionTypes.SERVICE_ERROR_GET

  constructor(public payload: string) {
  }
}

export class ServiceErrorReset implements Action {
  readonly type = ErrorActionTypes.SERVICE_ERROR_RESET
}

export type ErrorActions
  = ApplicationErrorGet
  | ServiceErrorGet
  | ServiceErrorReset
