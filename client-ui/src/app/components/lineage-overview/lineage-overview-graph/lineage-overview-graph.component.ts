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
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/model/app-state';
import * as LineageOverviewAction from 'src/app/store/actions/lineage-overview.actions';
import * as LayoutAction from 'src/app/store/actions/layout.actions';
import * as ContextMenuAction from 'src/app/store/actions/context-menu.actions';
import * as _ from 'lodash';

import { LineageControllerService } from 'src/app/generated/services';
import { CytoscapeNgLibComponent } from 'cytoscape-ng-lib';
import { switchMap, filter, map } from 'rxjs/operators';
import { Params } from '@angular/router';
import * as RouterAction from 'src/app/store/actions/router.actions';
import * as ExecutionPlanDatasourceInfoAction from 'src/app/store/actions/execution-plan-datasource-info.actions';
import * as DataSourceInfoActions from 'src/app/store/actions/datasource.info.actions';
import { LineageOverviewNodeType } from 'src/app/model/types/lineageOverviewNodeType';


@Component({
  selector: 'lineage-overview-graph',
  templateUrl: './lineage-overview-graph.component.html',
  styleUrls: ['./lineage-overview-graph.component.less']
})
export class LineageOverviewGraphComponent implements OnInit, AfterViewInit {

  @ViewChild(CytoscapeNgLibComponent)
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
        if (state) {
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
      this.cytograph.cy.on('click', (event) => {
        const clikedTarget = event.target
        const nodeId = (clikedTarget != this.cytograph.cy && clikedTarget.isNode()) ? clikedTarget.id() : null
        const params: Params = { selectedNodeId: nodeId }
        this.store.dispatch(new RouterAction.Go(params))
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
        switchMap(path => {
          return this.store
            .select('router', 'state', 'queryParams', 'applicationId')
            .pipe(
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
