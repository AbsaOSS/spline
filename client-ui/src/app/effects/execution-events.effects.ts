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

import { Injectable } from '@angular/core'
import { ofType, Actions, Effect } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { PageableExecutionEventsResponse } from '../generated/models/pageable-execution-events-response'
import { ExecutionEventsService } from '../generated/services'
import { AppState } from '../model/app-state'
import { handleException } from '../rxjs/operators/handleException'
import * as ExecutionEventsAction from '../store/actions/execution-events.actions'


export type Action = ExecutionEventsAction.ExecutionEventsActions

@Injectable()
export class ExecutionEventsEffects {

    @Effect()
    getDefaultPageableExecutionEvents$: Observable<ExecutionEventsAction.GetSuccess> =
        this.actions$.pipe(
            ofType(ExecutionEventsAction.ExecutionEventsActionTypes.GET),
            switchMap(({ payload: params }) =>
                this.executionEventService.executionEventsUsingGET(params)
                    .pipe(
                        handleException(this.store)
                    )
            ),
            map((res: PageableExecutionEventsResponse) =>
                new ExecutionEventsAction.GetSuccess(res))
        )

    constructor(
        private actions$: Actions,
        private executionEventService: ExecutionEventsService,
        private store: Store<AppState>
    ) {
        this.store
            .select('config', 'apiUrl')
            .subscribe(apiUrl => this.executionEventService.rootUrl = apiUrl)
    }

}
