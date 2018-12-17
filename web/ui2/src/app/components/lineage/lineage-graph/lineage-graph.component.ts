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
    let that = this;
    this.graphService.getGraphData().subscribe(response => {
      that.graphData = response
    })
  }

  ngAfterViewInit(): void {
    let that = this;
    this.graphService.getGraphData().subscribe(() => {
      if (that.cytograph.cy) {
        that.cytograph.cy.cxtmenu(that.contextualMenuService.getConfiguration())
        that.cytograph.cy.panzoom()
        that.cytograph.cy.layout(that.layoutService.getConfiguration()).run()
      }
    })

  }

}
