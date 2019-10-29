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
import { Action, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { empty, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OperationType } from 'src/app/model/types/operationType';
import { ExecutedLogicalPlan, Operation, Transition } from '../generated/models';
import { ExecutionPlanControllerService } from '../generated/services';
import { StrictHttpResponse } from '../generated/strict-http-response';
import { AppState } from '../model/app-state';
import { CytoscapeGraphVM } from '../model/viewModels/cytoscape/cytoscapeGraphVM';
import { CytoscapeOperationVM } from '../model/viewModels/cytoscape/cytoscapeOperationVM';
import { ExecutedLogicalPlanVM } from '../model/viewModels/executedLogicalPlanVM';
import * as ErrorActions from '../store/actions/error.actions';
import * as ExecutionPlanAction from '../store/actions/execution-plan.actions';
import { handleError } from '../store/reducers/error.reducer';
import { operationColorCodes, operationIconCodes } from '../store/reducers/execution-plan.reducer';


export type Action = ExecutionPlanAction.ExecutionPlanActions

@Injectable()
export class ExecutionPlanEffects {

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
    public getExecutionPlan$: Observable<Action> = this.actions$.pipe(
        ofType(ExecutionPlanAction.ExecutionPlanActionTypes.EXECUTION_PLAN_GET),
        switchMap((action: any) => this.getExecutedLogicalPlan(action.payload)),
        map(res => new ExecutionPlanAction.GetSuccess(res))
    )
    private getExecutedLogicalPlan = (executionPlanId: string): Observable<ExecutedLogicalPlanVM> => {
        return this.executionPlanControllerService.lineageUsingGETResponse(executionPlanId).pipe(
            map(response => this.toLogicalPlanView(response)),
            catchError(err => {
                this.store.dispatch(new ErrorActions.ServiceErrorGet(handleError(err)))
                return empty()
            })
        )
    }

    private toLogicalPlanView = (executedLogicalPlanHttpResponse: StrictHttpResponse<ExecutedLogicalPlan>): ExecutedLogicalPlanVM => {
        const cytoscapeGraphVM = {} as CytoscapeGraphVM
        cytoscapeGraphVM.nodes = []
        cytoscapeGraphVM.edges = []
        _.each(executedLogicalPlanHttpResponse.body.plan.nodes, (node: Operation) => {
            const cytoscapeOperation = {} as CytoscapeOperationVM
            cytoscapeOperation._type = node._type
            cytoscapeOperation.id = node._id
            cytoscapeOperation._id = node._id
            cytoscapeOperation.name = node.name
            cytoscapeOperation.color = operationColorCodes.get(node.name) || operationColorCodes.get(OperationType.Generic)
            cytoscapeOperation.icon = operationIconCodes.get(node.name) || operationIconCodes.get(OperationType.Generic)
            cytoscapeGraphVM.nodes.push({ data: cytoscapeOperation })
        })
        _.each(executedLogicalPlanHttpResponse.body.plan.edges, (edge: Transition) => {
            cytoscapeGraphVM.edges.push({ data: edge })
        })
        const executedLogicalPlanVM = {} as ExecutedLogicalPlanVM
        executedLogicalPlanVM.execution = executedLogicalPlanHttpResponse.body.execution
        executedLogicalPlanVM.plan = cytoscapeGraphVM
        return executedLogicalPlanVM
    }
}
