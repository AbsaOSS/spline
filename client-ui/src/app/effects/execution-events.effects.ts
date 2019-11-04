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

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import * as DashboardFormActions from 'src/app/store/actions/dashboard-form.actions';
import { PageableExecutionEventsResponse } from '../generated/models/pageable-execution-events-response';
import { ExecutionEventControllerService } from '../generated/services';
import { AppState } from '../model/app-state';
import { handleException } from '../rxjs/operators/handleException';
import * as ExecutionEventsAction from '../store/actions/execution-events.actions';
import { Action } from '../store/reducers/execution-events.reducer';

export type Action = ExecutionEventsAction.ExecutionEventsActions

@Injectable()
export class ExecutionEventsEffects {

    constructor(
        private actions$: Actions,
        private executionEventControllerService: ExecutionEventControllerService,
        private store: Store<AppState>
    ) {
        this.store
            .select('config', 'apiUrl')
            .subscribe(apiUrl => this.executionEventControllerService.rootUrl = apiUrl)
    }

    @Effect()
    public getPageableExecutionEvents$: Observable<Action> = this.actions$.pipe(
        ofType(ExecutionEventsAction.ExecutionEventsActionTypes.EXECUTION_EVENTS_GET),
        switchMap((action: any) => this.executionEventControllerService.executionEventUsingGET(action.payload)),
        map((res: PageableExecutionEventsResponse) => new ExecutionEventsAction.GetSuccess(res)),
        handleException(this.store)
    )

    @Effect()
    public getDefaultPageableExecutionEvents$: Observable<any> = this.actions$.pipe(
        ofType(ExecutionEventsAction.ExecutionEventsActionTypes.EXECUTION_EVENTS_GET_DEFAULT),
        switchMap((action: any) => this.executionEventControllerService.executionEventUsingGET(action.payload)),
        debounceTime(100),
        map((res: PageableExecutionEventsResponse) => {
            const timestamps = res.elements.map(r => r.timestamp)
            const minDate = _.min(timestamps)
            const maxDate = _.max(timestamps)
            this.store.dispatch(new DashboardFormActions.InitializeForm({ minDate: minDate, maxDate: maxDate }))
            return new ExecutionEventsAction.GetSuccessDefault(res)
        }),
        handleException(this.store)
    )

}
