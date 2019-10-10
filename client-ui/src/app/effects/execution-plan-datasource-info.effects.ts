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

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DataSourceInfo } from '../generated/models';
import { ExecutionPlanControllerService } from '../generated/services';
import { AppState } from '../model/app-state';
import * as ExecutionPlanDatasouceInfoAction from '../store/actions/execution-plan-datasource-info.actions';
import * as ErrorActions from '../store/actions/error.actions';

export type Action = ExecutionPlanDatasouceInfoAction.ExecutionPlanDatasouceInfoActions

@Injectable()
export class ExecutionPlanDatasourceInfoEffects {

    constructor(
        private actions$: Actions,
        private executionPlanControllerService: ExecutionPlanControllerService,
        private store: Store<AppState>
    ) {
        this.store
            .select('config', 'apiUrl')
            .subscribe(apiUrl => this.executionPlanControllerService.rootUrl = apiUrl)
    }

    @Effect()
    public getExecutionPlanDatasourceInfo$: Observable<Action> = this.actions$.pipe(
        ofType(ExecutionPlanDatasouceInfoAction.ExecutionPlanDatasouceInfoActionTypes.EXECUTION_PLAN_DATASOURCE_INFO_GET),
        switchMap((action: any) => this.getExecutionPlanDatasourceInfo(action.payload)),
        map(res => new ExecutionPlanDatasouceInfoAction.GetSuccess(res))
    )


    private getExecutionPlanDatasourceInfo = (executionPlanId: string): Observable<DataSourceInfo[]> => {
        return this.executionPlanControllerService.infoUsingGETResponse(executionPlanId).pipe(
            map(response => response.body),
            catchError(err => {
                this.handleError(err)
                this.store.dispatch(new ExecutionPlanDatasouceInfoAction.Reset())
                return of<DataSourceInfo[]>()
            })
        )
    }

    private handleError = (err: HttpErrorResponse): void => {
        const errorMessage = (err.error instanceof ErrorEvent)
            ? `An error occurred: ${err.error.message}`
            : `Server returned code: ${err.status}, error message is: ${err.message}`
        this.store.dispatch(new ErrorActions.ServiceErrorGet(errorMessage))
    }
}