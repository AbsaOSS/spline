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
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LineageOverview, Transition } from '../generated/models';
import { LineageControllerService } from '../generated/services';
import { StrictHttpResponse } from '../generated/strict-http-response';
import { AppState } from '../model/app-state';
import { LineageOverviewNodeType } from '../model/types/lineageOverviewNodeType';
import { CytoscapeGraphVM } from '../model/viewModels/cytoscape/cytoscapeGraphVM';
import { CytoscapeOperationVM } from '../model/viewModels/cytoscape/cytoscapeOperationVM';
import { LineageOverviewVM } from '../model/viewModels/lineageOverview';
import { LineageOverviewNodeVM } from '../model/viewModels/LineageOverviewNodeVM';
import { handleException } from '../rxjs/operators/handleException';
import * as LineageOverviewAction from '../store/actions/lineage-overview.actions';
import { lineageOverviewColorCodes, lineageOverviewIconCodes } from '../store/reducers/lineage-overview.reducer';


@Injectable()
export class LineageOverviewEffects {
    constructor(
        private actions$: Actions,
        private lineageOverviewControllerService: LineageControllerService,
        private store: Store<AppState>
    ) {
        this.store
            .select('config', 'apiUrl')
            .subscribe(apiUrl => this.lineageOverviewControllerService.rootUrl = apiUrl)
    }

    @Effect()
    public getLineageOverview$: Observable<Action> = this.actions$.pipe(
        ofType(LineageOverviewAction.LineageOverviewActionTypes.OVERVIEW_LINEAGE_GET),
        switchMap((action: any) => this.getLineageOverview(action.payload)),
        map(res => new LineageOverviewAction.GetSuccess(res))
    )

    private getLineageOverview(executionEventId: string): Observable<LineageOverviewVM> {
        return this.lineageOverviewControllerService
            .lineageUsingGET1Response({ executionEventId, maxDepth: 10 })
            .pipe(
                map(response => this.toLineageOverviewVM(response, executionEventId)),
                handleException(this.store)
            )
    }


    private toLineageOverviewVM = (lineageUsingGET1Response: StrictHttpResponse<LineageOverview>, executionEventId: String): LineageOverviewVM => {
        const cytoscapeGraphVM = {} as CytoscapeGraphVM
        cytoscapeGraphVM.nodes = []
        cytoscapeGraphVM.edges = []

        const lineage = lineageUsingGET1Response.body.lineage
        const nonTerminalNodeIds = new Set(lineage.edges.map(e => e.source))
        const targetNodeId = lineage.nodes
            .map((n: LineageOverviewNodeVM) => n._id)
            .find(id => !nonTerminalNodeIds.has(id))

        let targetNodeName = ""
        _.each(lineageUsingGET1Response.body.lineage.nodes, (node: LineageOverviewNodeVM) => {
            const cytoscapeOperation = {} as CytoscapeOperationVM
            if (node._id == targetNodeId) {
                targetNodeName = node.name
                cytoscapeOperation.properties = { "targetNode": true }
            }
            cytoscapeOperation._type = node._type
            cytoscapeOperation.id = node._id
            cytoscapeOperation._id = node.name
            const nodeName = node._type == LineageOverviewNodeType.DataSource ? node.name.substring(node.name.lastIndexOf("/") + 1) : node.name
            const splitedNames = node.name.split('/')
            cytoscapeOperation.name = nodeName == "*" ? `${splitedNames[splitedNames.length - 2]}/${nodeName}` : nodeName
            cytoscapeOperation.color = lineageOverviewColorCodes.get(node._type)
            cytoscapeOperation.icon = lineageOverviewIconCodes.get(node._type)
            cytoscapeGraphVM.nodes.push({ data: cytoscapeOperation })
        })
        _.each(lineageUsingGET1Response.body.lineage.edges, (edge: Transition) => {
            cytoscapeGraphVM.edges.push({ data: edge })
        })

        const lineageOverviewVM = {} as LineageOverviewVM
        lineageOverviewVM.lineage = cytoscapeGraphVM
        lineageOverviewVM.lineageInfo = { ...lineageUsingGET1Response.body.lineageInfo, ...{ "targetNodeName": targetNodeName, "executionEventId": executionEventId } }
        return lineageOverviewVM
    }
}
