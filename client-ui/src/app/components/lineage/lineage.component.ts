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

import {Component, OnDestroy} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../model/app-state";
import {combineLatest, Observable, Subscription} from "rxjs";
import * as LayoutAction from "../../store/actions/layout.actions";
import * as _ from "lodash";
import * as ExecutionPlanAction from "../../store/actions/execution-plan.actions";
import {distinct, filter, map} from "rxjs/operators";
import {CytoscapeGraphVM} from "../../model/viewModels/cytoscape/cytoscapeGraphVM";
import * as RouterAction from "../../store/actions/router.actions";
import * as DetailsInfosAction from "../../store/actions/details-info.actions";
import {AttributeGraph} from "../../generated/models/attribute-graph";
import {AttributeVM} from "../../model/viewModels/attributeVM";

@Component({
  templateUrl: './lineage.component.html',
  styleUrls: ['./lineage.component.less']
})
export class LineageComponent implements OnDestroy {

  public data$: Observable<{
    embeddedMode: boolean,
    layout: object,
    graph: CytoscapeGraphVM,
    attributeGraph: AttributeGraph
  }>

  public selectedAttribute$: Observable<AttributeVM>

  public selectedNodeId: string

  private subscriptions: Subscription[] = []

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  constructor(private store: Store<AppState>) {
    this.subscriptions.push(this.store
      .select('router', 'state', 'params', 'uid')
      .pipe(filter(_.identity))
      .subscribe(uid => this.store.dispatch(new ExecutionPlanAction.Get(uid))))

    this.subscriptions.push(this.store
      .select('router', 'state', 'queryParams', 'selectedNode')
      .subscribe((nodeId: string) => {
        this.selectedNodeId = nodeId
        this.store.dispatch(nodeId
          ? new DetailsInfosAction.Get(nodeId)
          : new DetailsInfosAction.Reset()
        )
      })
    )

    this.store.dispatch(new LayoutAction.Get())

    this.data$ = combineLatest([
      this.store.select('config', 'embeddedMode'),
      this.store.select('layout'),
      this.store.select('executedLogicalPlan').pipe(filter(_.identity)),
      this.store.select('attributeLineageGraph')
    ]).pipe(
      distinct(),
      map(([embeddedMode, layout, plan, attributeGraph]) =>
        ({embeddedMode, layout, graph: plan.graph, attributeGraph})
      )
    )

    this.selectedAttribute$ =
      combineLatest([
        this.store.select('executedLogicalPlan').pipe(filter(_.identity)),
        this.store.select('router', 'state', 'queryParams', 'attribute')
      ]).pipe(
        map(([{executionPlan: {extra: {attributes}}}, attrId]) =>
          attrId && (attributes as AttributeVM[]).find(a => a.id == attrId)
        )
      )
  }

  public onNodeSelected(nodeId: string) {
    this.store.dispatch(new RouterAction.Go({
      url: null,
      queryParams: {selectedNode: nodeId}
    }))
  }

  public onRemoveSelectedAttrClick() {
    this.store.dispatch(new RouterAction.Go({
      url: null,
      queryParams: {attribute: undefined}
    }))
  }
}
