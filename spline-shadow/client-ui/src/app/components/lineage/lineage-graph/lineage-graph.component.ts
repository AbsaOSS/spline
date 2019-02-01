/*
 * Copyright 2017 ABSA Group Limited
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
import { Component, ViewChild, OnInit } from '@angular/core';
import { CytoscapeNgLibComponent } from 'cytoscape-ng-lib';
import { LineageGraphService } from 'src/app/services/lineage/lineage-graph.service';
import { ContextualMenuService } from 'src/app/services/lineage/contextual-menu.service';
import { LayoutService } from 'src/app/services/lineage/layout.service';
import { OperationType } from 'src/app/types/operationTypes';
import { PropertyService } from 'src/app/services/details/property.service';

@Component({
  selector: 'lineage-graph',
  templateUrl: './lineage-graph.component.html',
  styleUrls: ['./lineage-graph.component.less']
})
export class LineageGraphComponent implements OnInit {

  @ViewChild(CytoscapeNgLibComponent)
  private cytograph: CytoscapeNgLibComponent

  constructor(
    private lineageGraphService: LineageGraphService,
    private contextualMenuService: ContextualMenuService,
    private layoutService: LayoutService,
    private propertyService: PropertyService
  ) { }


  ngOnInit(): void {
    let that = this
    this.lineageGraphService.getGraphData().subscribe(
      response => {
        console.log("response", response)
        response.nodes.forEach(node => {
          node.data["icon"] = that.lineageGraphService.getIconFromOperationType(<any>OperationType[node.data.operationType])
          node.data["color"] = that.lineageGraphService.getColorFromOperationType(<any>OperationType[node.data.operationType])
        })
        that.cytograph.cy.add(response)

        that.cytograph.cy.nodes().on('click', function (event) {
          let clickedNode = event.target
          that.lineageGraphService.getDetailsInfo(clickedNode.id())
          that.propertyService.changeCurrentProperty(null)
        })
      },
      error => {
        //Simply log the error from now
        console.log(error)
        //TODO : Implement a notification tool for letting know what is happening to the user
      },
      () => {
        that.cytograph.cy.cxtmenu(that.contextualMenuService.getConfiguration())
        that.cytograph.cy.panzoom()
        that.cytograph.cy.layout(that.layoutService.getConfiguration()).run()
      }
    )

  }


}



