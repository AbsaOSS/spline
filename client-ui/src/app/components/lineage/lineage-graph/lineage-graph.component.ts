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
import {combineLatest, Subscription} from 'rxjs';
import {filter, first} from 'rxjs/operators';
import {AppState} from 'src/app/model/app-state';
import * as DetailsInfosAction from 'src/app/store/actions/details-info.actions';
import * as ExecutionPlanAction from 'src/app/store/actions/execution-plan.actions';
import * as LayoutAction from 'src/app/store/actions/layout.actions';
import * as RouterAction from 'src/app/store/actions/router.actions';
import {operationColorCodes, operationIconCodes} from 'src/app/util/execution-plan';
import {OperationType} from 'src/app/model/types/operationType';
import * as _ from 'lodash';


@Component({
  selector: 'lineage-graph',
  templateUrl: './lineage-graph.component.html'
})
export class LineageGraphComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public embeddedMode: boolean

  @ViewChild(CytoscapeNgLibComponent, {static: true})
  private cytograph: CytoscapeNgLibComponent

  private subscriptions: Subscription[] = []

  constructor(private store: Store<AppState>) {
    this.getExecutedLogicalPlan()
    this.getLayoutConfiguration()
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([
        this.store.select('layout'),
        this.store.select('executedLogicalPlan').pipe(filter(_.identity))
      ]).subscribe(([layout, execPlan]) => {
        execPlan.graph.nodes.map(n => {
          if (n.data._type == 'Write') {
            n.data.icon = operationIconCodes.get(OperationType.Write)
            n.data.color = operationColorCodes.get(OperationType.Write)
          }
          return n
        })
        this.cytograph.cy.add(execPlan.graph)
        this.cytograph.cy.nodeHtmlLabel([{
          tpl: d => d.icon && `<i class="fa fa-4x" style="color:${d.color}">${String.fromCharCode(d.icon)}</i>`
        }])
        this.cytograph.cy.panzoom()
        this.cytograph.cy.layout(layout).run()
      })
    )
  }

  public ngAfterViewInit(): void {
    this.cytograph.cy.ready(() => {
      this.cytograph.cy.style().selector('core').css({'active-bg-size': 0})
      this.cytograph.cy.style().selector('edge').css({'width': 7})
      this.cytograph.cy.on('mouseover', 'node', e => e.originalEvent.target.style.cursor = 'pointer')
      this.cytograph.cy.on('mouseout', 'node', e => e.originalEvent.target.style.cursor = '')
      this.cytograph.cy.on('click', event => {
        const target = event.target
        const nodeId = (target != this.cytograph.cy && target.isNode()) ? target.id() : null
        this.getDetailsInfo(nodeId)
        this.store.dispatch(new RouterAction.Go({
          url: null,
          queryParams: {selectedNode: nodeId, schemaId: null, attribute: null}
        }))
      })
    })


    this.cytograph.cy.on('layoutstop', () => {
      this.subscriptions.push(
        this.store.select('router', 'state', 'queryParams', 'selectedNode')
          .pipe(
            first(),
            filter(_.identity))
          .subscribe((selectedNode: string) => {
            console.log(selectedNode)
            this.cytograph.cy.nodes().unselect()
            this.cytograph.cy.nodes().filter("[id='" + selectedNode + "']").select()
            this.getDetailsInfo(selectedNode)
          })
      )
    })
  }

  private getLayoutConfiguration = (): void => {
    this.store.dispatch(new LayoutAction.Get())
  }

  private getExecutedLogicalPlan = (): void => {
    this.subscriptions.push(
      this.store
        .select('router', 'state', 'params', 'uid')
        .pipe(filter(_.identity))
        .subscribe(uid => this.store.dispatch(new ExecutionPlanAction.Get(uid))))
  }

  private getDetailsInfo = (nodeId: string): void => {
    if (nodeId) {
      this.store.dispatch(new DetailsInfosAction.Get(nodeId))
    } else {
      this.store.dispatch(new DetailsInfosAction.Reset())
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

}



