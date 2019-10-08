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
import { filter, map, switchMap, first } from 'rxjs/operators';
import { AppState } from 'src/app/model/app-state';
import { RouterStateUrl } from 'src/app/model/routerStateUrl';
import * as AttributesAction from 'src/app/store/actions/attributes.actions';
import * as DetailsInfosAction from 'src/app/store/actions/details-info.actions';
import * as ExecutionPlanAction from 'src/app/store/actions/execution-plan.actions';
import * as LayoutAction from 'src/app/store/actions/layout.actions';
import * as RouterAction from 'src/app/store/actions/router.actions';


@Component({
  selector: 'lineage-graph',
  templateUrl: './lineage-graph.component.html',
  styleUrls: ['./lineage-graph.component.less']
})
export class LineageGraphComponent implements OnInit, AfterViewInit {

  @ViewChild(CytoscapeNgLibComponent, { static: true })
  private cytograph: CytoscapeNgLibComponent

  constructor(
    private store: Store<AppState>
  ) {
    this.getExecutedLogicalPlan()
    this.getLayoutConfiguration()
  }

  public ngOnInit(): void {
    this.store
      .select('layout')
      .pipe(
        switchMap(layout => {
          return this.store
            .select('executedLogicalPlan')
            .pipe(
              filter(state => state != null),
              map(state => {
                return { plan: state.plan, layout: layout }
              })
            )
        })
      )
      .subscribe(state => {
        if (state && this.cytograph.cy) {
          this.cytograph.cy.add(state.plan)
          this.cytograph.cy.nodeHtmlLabel([{
            tpl: function (data) {
              if (data.icon) return '<i class="fa fa-4x" style="color:' + data.color + '">' + String.fromCharCode(data.icon) + '</i>'
              return null
            }
          }])
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
      this.cytograph.cy.on('click', (event) => {
        const clikedTarget = event.target
        const nodeId = (clikedTarget != this.cytograph.cy && clikedTarget.isNode()) ? clikedTarget.id() : null
        this.getDetailsInfo(nodeId)
        this.store.dispatch(new AttributesAction.Reset())
        const params = {} as RouterStateUrl
        params.queryParams = { selectedNode: nodeId, schemaId: null, attribute: null }
        this.store.dispatch(new RouterAction.Go(params))
      })
    })

    this.cytograph.cy.on('layoutstop', () => {
      this.store
        .select('router', 'state', 'queryParams', 'selectedNode').pipe(
          filter(state => state != null)
        )
        .subscribe((selectedNode: string) => {
          this.cytograph.cy.nodes().unselect()
          this.cytograph.cy.nodes().filter("[id='" + selectedNode + "']").select()
          this.getDetailsInfo(selectedNode)
        })
    })

  }

  private getLayoutConfiguration = (): void => {
    this.store.dispatch(new LayoutAction.Get())
  }

  private getExecutedLogicalPlan = (): void => {
    this.store
      .select('router', 'state', 'params', 'uid').pipe(
        filter(state => state != null)
      )
      .subscribe(
        uid => {
          this.store.dispatch(new ExecutionPlanAction.Get(uid))
        }
      )
  }

  private getDetailsInfo = (nodeId: string): void => {
    if (nodeId) {
      this.store.dispatch(new DetailsInfosAction.Get(nodeId))
    } else {
      this.store.dispatch(new DetailsInfosAction.Reset())
    }
  }

  public onBackClick = (): void => {
    this.store
      .select('lineageOverview')
      .pipe(
        first()
      )
      .subscribe(lineage => {
        const params: RouterStateUrl = {
          url: "/app/lineage-overview",
          queryParams: { path: lineage.path, applicationId: lineage.applicationId }
        }
        this.store.dispatch(new RouterAction.Go(params))
      })
  }

  public onHomeClick = (): void => {
    this.store.dispatch(
      new RouterAction.Go({ url: "/app/dashboard" })
    )
  }

}



