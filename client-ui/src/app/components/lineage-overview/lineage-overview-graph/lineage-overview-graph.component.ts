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
import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {CytoscapeNgLibComponent} from 'cytoscape-ng-lib';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {AppState} from 'src/app/model/app-state';
import {RouterStateUrl} from 'src/app/model/routerStateUrl';
import {LineageOverviewNodeType} from 'src/app/model/types/lineageOverviewNodeType';
import * as ContextMenuAction from 'src/app/store/actions/context-menu.actions';
import * as DetailsInfosAction from 'src/app/store/actions/details-info.actions';
import * as ExecutionPlanAction from 'src/app/store/actions/execution-plan.actions';
import * as LayoutAction from 'src/app/store/actions/layout.actions';
import * as LineageOverviewAction from 'src/app/store/actions/lineage-overview.actions';
import * as RouterAction from 'src/app/store/actions/router.actions';
import {getWriteOperationIdFromExecutionId} from 'src/app/util/execution-plan';


@Component({
  selector: 'lineage-overview-graph',
  templateUrl: './lineage-overview-graph.component.html'
})
export class LineageOverviewGraphComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public embeddedMode: boolean

  @ViewChild(CytoscapeNgLibComponent, { static: true })
  private cytograph: CytoscapeNgLibComponent

  private subscriptions: Subscription[] = []


  constructor(private store: Store<AppState>) {
    this.getContextMenuConfiguration()
    this.getLayoutConfiguration()
    this.getOverviewLineage()
  }

  ngOnInit(): void {
    this.subscriptions.push(this.store
      .select('layout')
      .pipe(
        switchMap(layout => {
          return this.store
            .select('contextMenu')
            .pipe(
              map(contextMenu => {
                return { layout, contextMenu }
              })
            )
        }),
        switchMap(res => {
          return this.store
            .select('lineageOverview')
            .pipe(
              filter(state => !_.isNil(state)),
              map(state => {
                return { graph: state, layout: res.layout, contextMenu: res.contextMenu }
              })
            )
        })
      )
      .subscribe(state => {
        if (state && this.cytograph.cy) {
          state.graph.lineage.nodes.map(n => {
            if (n.data.properties && n.data.properties["targetNode"]) {
              n.data.color = "#333"
              n.data.shape = "heptagon"
            }
            return n
          })
          this.cytograph.cy.add(state.graph.lineage)
          this.cytograph.cy.nodeHtmlLabel([{
            tpl: function (data) {
              if (data.icon) return `<i class='fa fa-4x' style='color:${data.color}'> ${String.fromCharCode(data.icon)}</i>`
              return null
            }
          }])
          this.cytograph.cy.cxtmenu(state.contextMenu)
          this.cytograph.cy.panzoom()
          this.cytograph.cy.layout(state.layout).run()
        }
      }))
  }

  public ngAfterViewInit(): void {
    this.cytograph.cy.ready(() => {
      this.cytograph.cy.style().selector('core').css({'active-bg-size': 0})
      this.cytograph.cy.style().selector('edge').css({'width': 7})
      this.cytograph.cy.on('mouseover', 'node', e => e.originalEvent.target.style.cursor = 'pointer')
      this.cytograph.cy.on('mouseout', 'node', e => e.originalEvent.target.style.cursor = '')
      const doubleClickDelayMs = 350
      let previousTimeStamp

      this.cytograph.cy.on('tap', (event) => {
        const currentTimeStamp = event.timeStamp
        const msFromLastTap = currentTimeStamp - previousTimeStamp

        if (msFromLastTap < doubleClickDelayMs) {
          event.target.trigger('doubleTap', event)
        } else {
          previousTimeStamp = currentTimeStamp
          const clikedTarget = event.target
          const nodeId = (clikedTarget != this.cytograph.cy && clikedTarget.isNode()) ? clikedTarget.id() : null
          const params = {} as RouterStateUrl
          params.queryParams = { selectedNodeId: nodeId }
          this.store.dispatch(new RouterAction.Go(params))
        }
      })
      this.cytograph.cy.on('doubleTap', (event) => {
        const clikedTarget = event.target
        const nodeId = (clikedTarget != this.cytograph.cy && clikedTarget.isNode()) ? clikedTarget.id() : null
        if (nodeId && clikedTarget.data()._type == LineageOverviewNodeType.Execution) {
          const params: RouterStateUrl = {
            url: `/app/lineage-detailed/${nodeId}`
          }
          this.store.dispatch(new RouterAction.Go(params))
        }
      })
    })

    this.cytograph.cy.on('layoutstop', () => {
      this.subscriptions.push(
        this.store
          .select('router', 'state', 'queryParams', 'selectedNodeId')
          .subscribe((selectedNodeId) => {
            this.cytograph.cy.nodes().unselect()
            const selectedNode = this.cytograph.cy.nodes().filter(`[id='${selectedNodeId}']`)
            selectedNode.select()
            this.getNodeInfo(selectedNode.data())
          })
      )
    })
  }

  private getOverviewLineage = (): void => {
    this.subscriptions.push(
      this.store
        .select('router', 'state', 'queryParams', 'executionEventId')
        .pipe(
          filter(state => state != null)
        )
        .subscribe(
          executionEventId => this.store.dispatch(new LineageOverviewAction.Get(executionEventId))
        )
    )
  }

  private getNodeInfo = (node: any): void => {
    if (node) {
      this.store.dispatch(new DetailsInfosAction.Reset())
      switch (node._type) {
        case LineageOverviewNodeType.Execution: {
          this.store.dispatch(new ExecutionPlanAction.Get(node.id))
          break
        }
        case LineageOverviewNodeType.DataSource: {
          this.store.dispatch(new ExecutionPlanAction.Reset())
          this.subscriptions.push(
            this.store.select('lineageOverview')
              .subscribe(lineageOverview => {
                const edge = lineageOverview.lineage.edges.find(e => e.data.target == node.id)
                if (edge) {
                  const executionPlanId = edge.data.source
                  this.store.dispatch(new DetailsInfosAction.Get(getWriteOperationIdFromExecutionId(executionPlanId)))
                }
              })
          )
          break
        }
      }
    } else {
      this.store.dispatch(new DetailsInfosAction.Reset())
      this.store.dispatch(new ExecutionPlanAction.Reset())
    }
  }

  private getContextMenuConfiguration = (): void => {
    this.store.dispatch(new ContextMenuAction.Get())
  }

  private getLayoutConfiguration = (): void => {
    this.store.dispatch(new LayoutAction.Get())
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

}
