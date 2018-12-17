import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CytoscapeNgLibComponent } from 'cytoscape-ng-lib';
import { GraphService } from 'src/app/services/lineage/graph.service';
import { ContextualMenuService } from 'src/app/services/lineage/contextual-menu.service';
import { LayoutService } from 'src/app/services/lineage/layout.service';

@Component({
  selector: 'lineage-graph',
  templateUrl: './lineage-graph.component.html',
  styleUrls: ['./lineage-graph.component.less']
})
export class LineageGraphComponent implements OnInit, AfterViewInit {

  @ViewChild(CytoscapeNgLibComponent)
  private cytograph: CytoscapeNgLibComponent

  private graphData: any = []

  constructor(
    private graphService: GraphService,
    private contextualMenuService: ContextualMenuService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.graphData = this.graphService.getGraphData()
  }

  ngAfterViewInit(): void {
    if (this.cytograph.cy) {
      this.cytograph.cy.cxtmenu(this.contextualMenuService.getConfiguration())
      this.cytograph.cy.panzoom()
      this.cytograph.cy.layout(this.layoutService.getConfiguration()).run()
    }
  }


}
