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
import * as ErrorAction from '../actions/error.actions';

export type Action = ErrorAction.ErrorActions

export function errorReducer(state: string, action: Action): string {
    switch (action.type) {
        case ErrorAction.ErrorActionTypes.ERROR_GET: return getTextError(action.payload)
        default: return state
    }
}

function getTextError(httpCode: string): string {
    let codeNumber = Number(httpCode)
    switch (codeNumber) {
        case 404: return "404 ! Could not find the requested lineage"
        default: return "OUPS, Something went wrong !"
    }
}