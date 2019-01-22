import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { CytoscapeNgLibComponent } from 'cytoscape-ng-lib';
import { GraphService } from 'src/app/services/lineage/graph.service';
import { ContextualMenuService } from 'src/app/services/lineage/contextual-menu.service';
import { LayoutService } from 'src/app/services/lineage/layout.service';
import { OperationType } from 'src/app/types/operationTypes';

@Component({
  selector: 'lineage-graph',
  templateUrl: './lineage-graph.component.html',
  styleUrls: ['./lineage-graph.component.less']
})
export class LineageGraphComponent implements OnInit {

  @ViewChild(CytoscapeNgLibComponent)
  private cytograph: CytoscapeNgLibComponent

  constructor(
    private graphService: GraphService,
    private contextualMenuService: ContextualMenuService,
    private layoutService: LayoutService
  ) { }


  ngOnInit(): void {
    let that = this
    this.graphService.getGraphData().subscribe(
      response => {
        console.log("response", response)
        response.nodes.forEach(node => {
          node.data["icon"] = that.graphService.getIconFromOperationType(<any>OperationType[node.data.operationType])
          node.data["color"] = that.graphService.getColorFromOperationType(<any>OperationType[node.data.operationType])
        });
        that.cytograph.cy.add(response)

        that.cytograph.cy.nodes().on('click', function (event) {
          var clickedNode = event.target
          that.graphService.getDetailsInfo(clickedNode.id())
        });
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



