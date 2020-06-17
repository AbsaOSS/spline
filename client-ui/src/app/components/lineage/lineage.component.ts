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

import { Component, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '../../model/app-state'
import { combineLatest, Observable, Subscription } from 'rxjs'
import * as LayoutAction from '../../store/actions/layout.actions'
import * as _ from 'lodash'
import * as ExecutionPlanAction from '../../store/actions/execution-plan.actions'
import { distinct, filter, map } from 'rxjs/operators'
import * as RouterAction from '../../store/actions/router.actions'
import * as DetailsInfosAction from '../../store/actions/details-info.actions'
import { AttributeVM } from '../../model/viewModels/attributeVM'
import { AttributeLineageAndImpact } from '../../generated/models/attribute-lineage-and-impact'
import { getImpactRootAttributeNode, LineageGraphLegend, LineageGraphLegends } from '../../model/lineage-graph'
import { ExecutedLogicalPlanVM } from '../../model/viewModels/executedLogicalPlanVM'
import { ExecutionPlanInfo } from '../../generated/models/execution-plan-info'
import { Router } from '@angular/router'

@Component({
  templateUrl: './lineage.component.html',
  styleUrls: ['./lineage.component.less']
})
export class LineageComponent implements OnDestroy {

  public data$: Observable<{
    embeddedMode: boolean,
    layout: object,
    plan: ExecutedLogicalPlanVM,
    attributeLinAndImp: AttributeLineageAndImpact
  }>

  public returnUrl$: Observable<string>
  public isEmbeddedMode$: Observable<boolean>

  public selectedAttribute$: Observable<AttributeVM>

  public lineageGraphLegendsToShow$: Observable<LineageGraphLegend[]>

  public selectedNodeId: string

  private subscriptions: Subscription[] = []

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  constructor(private store: Store<AppState>,
              private router: Router) {
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

    this.subscriptions.push(this.store
      .select('attributeLineageAndImpact').pipe(filter(_.identity))
      .subscribe(({impact}: AttributeLineageAndImpact) => {
        if (!this.selectedNodeId) {
          const primaryAttr = getImpactRootAttributeNode(impact)
          this.onNodeSelected(primaryAttr.originOpId)
        }
      })
    )

    this.store.dispatch(new LayoutAction.Get())

    this.data$ = combineLatest([
      this.store.select('config', 'embeddedMode'),
      this.store.select('layout'),
      this.store.select('executedLogicalPlan').pipe(filter(_.identity)),
      this.store.select('attributeLineageAndImpact')
    ]).pipe(
      distinct(),
      map(([embeddedMode, layout, plan, attributeLinAndImp]) =>
        ({embeddedMode, layout, plan, attributeLinAndImp})
      )
    )

    this.returnUrl$ = this.store.select('router', 'state', 'queryParams', 'returnUrl')
    this.isEmbeddedMode$ = this.store.select('config', 'embeddedMode')

    this.selectedAttribute$ =
      combineLatest([
        this.store.select('executedLogicalPlan').pipe(filter(_.identity)),
        this.store.select('router', 'state', 'queryParams', 'attribute')
      ]).pipe(
        map(([{executionPlan: {extra: {attributes}}}, attrId]) =>
          attrId && (attributes as AttributeVM[]).find(a => a.id == attrId)
        )
      )

    this.lineageGraphLegendsToShow$ =
      this.store.select('attributeLineageAndImpact').pipe(filter(_.identity)).pipe(
        map(({lineage, impact}: AttributeLineageAndImpact) => {
          const lineageNonEmpty = lineage && lineage.edges.length > 0
          const impactNonEmpty = impact.edges.length > 0
          return [
            LineageGraphLegends.Usage,
            ...(lineageNonEmpty ? [LineageGraphLegends.Lineage] : []),
            ...(impactNonEmpty ? [LineageGraphLegends.Impact] : []),
          ]
        })
      )
  }

  public isExecPlanFromOldSpline(planInfo: ExecutionPlanInfo) {
    const agent = planInfo.agentInfo as { name: string, version: string }
    return agent.name.toLowerCase() == 'spline' && agent.version == '0.3.x'
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

  public goToUrl(url: string) {
    this.router.navigateByUrl(url)
  }
}
