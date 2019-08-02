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
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CytoscapeNgLibComponent } from 'cytoscape-ng-lib';
import * as _ from 'lodash';
import { filter, map, switchMap } from 'rxjs/operators';
import { LineageControllerService } from 'src/app/generated/services';
import { AppState } from 'src/app/model/app-state';
import { RouterStateUrl } from 'src/app/model/routerStateUrl';
import { LineageOverviewNodeType } from 'src/app/model/types/lineageOverviewNodeType';
import { LineageOverviewVM } from 'src/app/model/viewModels/lineageOverview';
import * as ContextMenuAction from 'src/app/store/actions/context-menu.actions';
import * as DataSourceInfoActions from 'src/app/store/actions/datasource.info.actions';
import * as ExecutionPlanDatasourceInfoAction from 'src/app/store/actions/execution-plan-datasource-info.actions';
import * as LayoutAction from 'src/app/store/actions/layout.actions';
import * as LineageOverviewAction from 'src/app/store/actions/lineage-overview.actions';
import * as RouterAction from 'src/app/store/actions/router.actions';


@Component({
  selector: 'lineage-overview-graph',
  templateUrl: './lineage-overview-graph.component.html',
  styleUrls: ['./lineage-overview-graph.component.less']
})
export class LineageOverviewGraphComponent implements OnInit, AfterViewInit {

  @ViewChild(CytoscapeNgLibComponent, { static: true })
  private cytograph: CytoscapeNgLibComponent


  constructor(
    private store: Store<AppState>
  ) {
    this.getContextMenuConfiguration()
    this.getLayoutConfiguration()
    this.getOverviewLineage()
  }

  ngOnInit(): void {
    this.store
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
      })
  }

  public ngAfterViewInit(): void {
    this.cytograph.cy.ready(() => {
      this.cytograph.cy.style().selector('edge').css({
        'width': '7'
      })
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
            url: `/app/partial-lineage/${nodeId}`
          }
          this.store.dispatch(new RouterAction.Go(params))
        }
      })
    })

    this.cytograph.cy.on('layoutstop', () => {
      this.store
        .select('router', 'state', 'queryParams', 'selectedNodeId')
        .subscribe((selectedNodeId) => {
          const selectedNode = this.cytograph.cy.nodes().filter(`[id='${selectedNodeId}']`)
          selectedNode.select()
          this.getNodeInfo(selectedNode.data())
        })
    })
  }

  private getOverviewLineage = (): void => {
    this.store
      .select('router', 'state', 'queryParams', 'path')
      .pipe(
        filter(state => state != null),
        switchMap(path => {
          return this.store
            .select('router', 'state', 'queryParams', 'applicationId')
            .pipe(
              filter(state => state != null),
              map(applicationId => {
                return { path, applicationId }
              })
            )
        })
      ).subscribe(
        queryParams => {
          const serviceParams: LineageControllerService.LineageUsingGET1Params = {
            path: queryParams.path,
            applicationId: queryParams.applicationId
          }
          this.store.dispatch(new LineageOverviewAction.Get(serviceParams))
          this.store.dispatch(new LineageOverviewAction.Save(serviceParams as LineageOverviewVM))
        }
      )
  }

  private getNodeInfo = (node: any): void => {
    if (node != null) {
      switch (node._type) {
        case LineageOverviewNodeType.Execution: {
          this.store.dispatch(new DataSourceInfoActions.Reset())
          this.store.dispatch(new ExecutionPlanDatasourceInfoAction.Get(node.id))
          break
        }
        case LineageOverviewNodeType.DataSource: {
          this.store.dispatch(new ExecutionPlanDatasourceInfoAction.Reset())
          this.store.select('router', 'state', 'queryParams', 'applicationId').subscribe(
            applicationId => this.store.dispatch(new DataSourceInfoActions.Get({ "source": node._id, "applicationId": applicationId }))
          )
          break
        }
      }
    } else {
      this.store.dispatch(new DataSourceInfoActions.Reset())
      this.store.dispatch(new ExecutionPlanDatasourceInfoAction.Reset())
    }
  }

  private getContextMenuConfiguration = (): void => {
    this.store.dispatch(new ContextMenuAction.Get())
  }

  private getLayoutConfiguration = (): void => {
    this.store.dispatch(new LayoutAction.Get())
  }

}
