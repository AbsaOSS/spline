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
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CytoscapeNgLibComponent} from 'cytoscape-ng-lib';
import {operationColorCodes, operationIconCodes} from 'src/app/util/execution-plan';
import {OperationType} from 'src/app/model/types/operationType';
import {CytoscapeGraphVM} from "../../../model/viewModels/cytoscape/cytoscapeGraphVM";
import {AttributeGraph} from "../../../generated/models/attribute-graph";


@Component({
  selector: 'lineage-graph',
  templateUrl: './lineage-graph.component.html'
})
export class LineageGraphComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  public embeddedMode: boolean

  @Input()
  public layout: object

  @Input()
  public graph: CytoscapeGraphVM

  @Input()
  public selectedNode: string

  @Input()
  public attributeGraph: AttributeGraph

  @Output()
  public selectedNodeChange = new EventEmitter<string>()

  @ViewChild(CytoscapeNgLibComponent, {static: true})
  private cytograph: CytoscapeNgLibComponent

  public ngOnInit(): void {
    const writeNode = this.graph.nodes.find(n => n.data._type == 'Write')
    writeNode.data.icon = operationIconCodes.get(OperationType.Write)
    writeNode.data.color = operationColorCodes.get(OperationType.Write)
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedNode']) this.refreshSelectedNode()
    if (changes['attributeGraph']) this.refreshAttributeGraph()
  }

  public ngAfterViewInit(): void {
    this.cytograph.cy.add(this.graph)
    this.cytograph.cy.nodeHtmlLabel([{
      tpl: d => d.icon && `<i class="fa fa-4x" style="color:${d.color}">${String.fromCharCode(d.icon)}</i>`
    }])
    this.cytograph.cy.panzoom()
    this.cytograph.cy.layout(this.layout).run()

    this.cytograph.cy.ready(() => {
      this.cytograph.cy.style().selector('core').css({'active-bg-size': 0})
      this.cytograph.cy.style().selector('edge').css({'width': 7})
      this.cytograph.cy.on('mouseover', 'node', e => e.originalEvent.target.style.cursor = 'pointer')
      this.cytograph.cy.on('mouseout', 'node', e => e.originalEvent.target.style.cursor = '')
      this.cytograph.cy.on('click', event => {
        const target = event.target
        const nodeId = (target != this.cytograph.cy && target.isNode()) ? target.id() : null
        this.selectedNodeChange.emit(nodeId)
      })
    })
    this.refreshSelectedNode()
    this.refreshAttributeGraph()
  }

  private refreshSelectedNode() {
    this.cytograph && this.cytograph.cy && this.cytograph.cy.ready(() => {
      this.cytograph.cy.nodes().unselect()
      this.cytograph.cy.nodes().filter(`[id='${this.selectedNode}']`).select()
    })
  }

  private refreshAttributeGraph() {
    this.cytograph && this.cytograph.cy && this.cytograph.cy.ready(() => {
      console.log("[ATTRIBUTE GRAPH]", this.attributeGraph)
    })
  }
}
