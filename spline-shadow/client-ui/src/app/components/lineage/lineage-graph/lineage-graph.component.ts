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
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CytoscapeNgLibComponent } from 'cytoscape-ng-lib';
import { LineageGraphService } from 'src/app/services/lineage/lineage-graph.service';
import { ContextualMenuService } from 'src/app/services/lineage/contextual-menu.service';
import { LayoutService } from 'src/app/services/lineage/layout.service';
import { PropertyService } from 'src/app/services/details/property.service';
import { RouterService } from 'src/app/services/router/router.service';
import { Params, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { empty } from 'rxjs';

@Component({
  selector: 'lineage-graph',
  templateUrl: './lineage-graph.component.html',
  styleUrls: ['./lineage-graph.component.less']
})
export class LineageGraphComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    const that = this
    this.cytograph.cy.ready(function () {
      that.cytograph.cy.on('click', function (event) {
        const clikedTarget = event.target
        let nodeId = (clikedTarget != that.cytograph.cy && clikedTarget.isNode()) ? clikedTarget.id() : null
        that.lineageGraphService.getDetailsInfo(nodeId).subscribe()
        that.propertyService.changeCurrentProperty(null)
        const params: Params = { selectedNode: nodeId, schemaId: null, property: null }
        that.routerService.mergeParam(params, true)

      })
      that.activatedRoute.queryParamMap.pipe(
        switchMap(param => {
          if (param.has('selectedNode')) {
            const nodeId = param.get('selectedNode')
            return that.lineageGraphService.getDetailsInfo(nodeId)
          } else {
            return empty()
          }
        })
      ).subscribe(operationDetails => {
        that.cytograph.cy.nodes().filter("[id='" + operationDetails.operation._id + "']").select()
      })

    })
  }

  @ViewChild(CytoscapeNgLibComponent)
  private cytograph: CytoscapeNgLibComponent

  constructor(
    private lineageGraphService: LineageGraphService,
    private contextualMenuService: ContextualMenuService,
    private propertyService: PropertyService,
    private layoutService: LayoutService,
    private routerService: RouterService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    const that = this
    const uid = that.activatedRoute.snapshot.params.uid
    this.lineageGraphService.getExecutedLogicalPlan(uid).subscribe(
      response => {
        that.cytograph.cy.add(response.plan)
      },
      error => {
        //Simply log the error from now
        console.log(error)
        //TODO : Implement a notification tool for letting know what is happening to the user
      },
      () => {
        that.cytograph.cy.nodeHtmlLabel([{
          tpl: function (data) {
            if (data.icon) return '<i class="fa fa-4x" style="color:' + data.color + '">' + String.fromCharCode(data.icon) + '</i>'
            return null
          }
        }])
        that.cytograph.cy.cxtmenu(that.contextualMenuService.getConfiguration())
        that.cytograph.cy.panzoom()
        that.cytograph.cy.layout(that.layoutService.getConfiguration()).run()
      }
    )
  }

}



