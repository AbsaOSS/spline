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
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import * as _ from 'lodash'
import { Observable } from 'rxjs'
import { map, switchMap, withLatestFrom } from 'rxjs/operators'
import { LineageOverview, Transition } from '../generated/models'
import { LineageService } from '../generated/services'
import { AppState } from '../model/app-state'
import { LineageOverviewNodeType } from '../model/types/lineageOverviewNodeType'
import { CytoscapeGraphVM } from '../model/viewModels/cytoscape/cytoscapeGraphVM'
import { CytoscapeOperationVM } from '../model/viewModels/cytoscape/cytoscapeOperationVM'
import { LineageOverviewVM } from '../model/viewModels/lineageOverview'
import { LineageOverviewNodeVM } from '../model/viewModels/LineageOverviewNodeVM'
import { handleException } from '../rxjs/operators/handleException'
import * as LineageOverviewAction from '../store/actions/lineage-overview.actions'
import { lineageOverviewColorCodes, lineageOverviewIconCodes } from '../store/reducers/lineage-overview.reducer'


@Injectable()
export class LineageOverviewEffects {

  private readonly lineageOverviewDefaultMaxDepth = 10

  constructor(
    private actions$: Actions,
    private lineageOverviewService: LineageService,
    private store: Store<AppState>
  ) {
    this.store
      .select('config', 'apiUrl')
      .subscribe(apiUrl => this.lineageOverviewService.rootUrl = apiUrl)
  }

  @Effect()
  public getLineageOverview$: Observable<Action> = this.actions$.pipe(
    ofType<LineageOverviewAction.Get>(LineageOverviewAction.LineageOverviewActionTypes.OVERVIEW_LINEAGE_GET),
    switchMap((action: any) => {
      const executionEventId = action.payload.executionEventId
      const maxDepth = action.payload.maxDepth ? action.payload.maxDepth : this.lineageOverviewDefaultMaxDepth
      return this.getLineageOverview(executionEventId, maxDepth)
    }),
    map((res: LineageOverviewVM) => new LineageOverviewAction.GetSuccess(res))
  )

  @Effect()
  public getLineageOverviewOlderNodes$: Observable<Action> = this.actions$.pipe(
    ofType<LineageOverviewAction.GetMoreNodes>(LineageOverviewAction.LineageOverviewActionTypes.OVERVIEW_LINEAGE_GET_MORE_NODES),
    withLatestFrom(this.store.select('lineageOverview')),
    switchMap(([action, currentLineageOverview]) => {
      const maxDepth = action.payload.maxDepth
        ? action.payload.maxDepth
        : currentLineageOverview.depthRequested + this.lineageOverviewDefaultMaxDepth

      const executionEventId = currentLineageOverview.lineageInfo.executionEventId
      return this.getLineageOverview(executionEventId, maxDepth)
    }),
    map((res: LineageOverviewVM) => new LineageOverviewAction.GetSuccess(res))
  )

  private getLineageOverview(executionEventId: string, maxDepth: number): Observable<LineageOverviewVM> {
    return this.lineageOverviewService
      .lineageOverviewUsingGET({ eventId: executionEventId, maxDepth })
      .pipe(
        map(response => this.toLineageOverviewVM(response, executionEventId)),
        handleException(this.store)
      )
  }

  private toLineageOverviewVM = (lineageOverview: LineageOverview, executionEventId: string): LineageOverviewVM => {
    const cytoscapeGraphVM: CytoscapeGraphVM = {
      nodes: [],
      edges: []
    }

    const graph = lineageOverview.graph
    let targetURI = ''

    _.each(graph.nodes, (node: LineageOverviewNodeVM) => {
      const cytoscapeOperation = {} as CytoscapeOperationVM
      const isTargetNode = node._id == lineageOverview.info.targetDataSourceId

      if (isTargetNode) {
        targetURI = node.name
      }

      cytoscapeOperation._type = node._type
      cytoscapeOperation.id = node._id
      cytoscapeOperation._id = node.name

      const nodeName = node._type == LineageOverviewNodeType.DataSource ? node.name.substring(node.name.lastIndexOf('/') + 1) : node.name
      const splitedNames = node.name.split('/')
      cytoscapeOperation.name = nodeName == '*' ? `${splitedNames[splitedNames.length - 2]}/${nodeName}` : nodeName
      cytoscapeOperation.icon = lineageOverviewIconCodes.get(node._type)
      cytoscapeOperation.color = isTargetNode
        ? lineageOverviewColorCodes.get("Root")
        : lineageOverviewColorCodes.get(node._type)

      cytoscapeGraphVM.nodes.push({
        data: cytoscapeOperation,
        classes: isTargetNode ? ["root"] : undefined
      })
    })

    _.each(graph.edges, (edge: Transition) => {
      cytoscapeGraphVM.edges.push({ data: edge })
    })

    const lineageOverviewVM = {} as LineageOverviewVM
    lineageOverviewVM.lineage = cytoscapeGraphVM
    lineageOverviewVM.lineageInfo = {
      ...lineageOverview.info,
      targetURI: targetURI,
      executionEventId: executionEventId
    }
    lineageOverviewVM.depthComputed = graph.depthComputed ? graph.depthComputed : 0
    lineageOverviewVM.depthRequested = graph.depthRequested ? graph.depthRequested : 0
    lineageOverviewVM.hasMoreNodes = lineageOverviewVM.depthComputed && lineageOverviewVM.depthComputed >= lineageOverviewVM.depthRequested

    return lineageOverviewVM
  }
}
