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
import * as _ from 'lodash'
import {cyStyles} from './graph.stylesheet'
import {AttributeLineageAndImpact} from "../../../generated/models/attribute-lineage-and-impact";
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
  public attributeLineageAndImpactGraph: AttributeLineageAndImpact

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
    if (changes['attributeLineageAndImpactGraph']) this.refreshAttributeGraph()
  }

  public ngAfterViewInit(): void {
    this.cytograph.cy.add(this.graph)
    this.cytograph.cy.nodeHtmlLabel([{
      tpl: d => d.icon && `<i class="fa fa-4x" style="color:${d.color}">${String.fromCharCode(d.icon)}</i>`
    }])
    this.cytograph.cy.panzoom()
    this.cytograph.cy.layout(this.layout).run()

    this.cytograph.cy.ready(() => {
      this.cytograph.cy.style(cyStyles)
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
    if (this.attributeLineageAndImpactGraph)
      this.highlightAttrLinAndImp(
        this.attributeLineageAndImpactGraph.lineage,
        this.attributeLineageAndImpactGraph.impact)
    else
      this.clearAttrHighlighting()
  }

  private clearAttrHighlighting() {
    this.cytograph && this.cytograph.cy && this.cytograph.cy.ready(() => {
      let attrStyleClasses = _.values(AttrRelationStyleClass)
      this.cytograph.cy.nodes().forEach(v => attrStyleClasses.forEach(c => v.removeClass(c)))
      this.cytograph.cy.edges().forEach(e => attrStyleClasses.forEach(c => e.removeClass(c)))
    })
  }

  private highlightAttrLinAndImp(attrLinGraph: AttributeGraph, attrImpGraph: AttributeGraph) {
    this.cytograph && this.cytograph.cy && this.cytograph.cy.ready(() => {
      const lineageAttrIds = new Set(attrLinGraph.edges.map(e => e.target))
      const primaryAttrId = attrLinGraph.nodes.find(a => !lineageAttrIds.has(a._id))._id

      const primaryAttr = attrImpGraph.nodes.find(a => a._id === primaryAttrId)
      const lineageAttrs = attrLinGraph.nodes.filter(a => a != primaryAttr)
      const impactAttrs = attrImpGraph.nodes.filter(a => a != primaryAttr)

      const primaryOpIds = new Set([primaryAttr.originOpId].concat(primaryAttr.transOpIds))
      const lineageOpIds = new Set(_.flatMap(lineageAttrs, a => [a.originOpId].concat(a.transOpIds)))
      const impactOpIds = new Set(_.flatMap(impactAttrs, a => [a.originOpId].concat(a.transOpIds)))

      const primOrLinOpIds = new Set([...primaryOpIds, ...lineageOpIds])
      const primOrImpOpIds = new Set([...primaryOpIds, ...impactOpIds])

      this.cytograph.cy.nodes().forEach(v => {
        const vd = v.data()
        _.values(AttrRelationStyleClass).forEach(c => v.removeClass(c))
        if (primaryOpIds.has(vd.id)) v.addClass(AttrRelationStyleClass.PRIMARY)
        else if (lineageOpIds.has(vd.id)) v.addClass(AttrRelationStyleClass.LINEAGE)
        else if (impactOpIds.has(vd.id)) v.addClass(AttrRelationStyleClass.IMPACT)
        else v.addClass(AttrRelationStyleClass.UNRELATED)
      })

      this.cytograph.cy.edges().forEach(e => {
        const ed = e.data()
        _.values(AttrRelationStyleClass).forEach(c => e.removeClass(c))
        if (primaryOpIds.has(ed.source) && primaryOpIds.has(ed.target)) e.addClass(AttrRelationStyleClass.PRIMARY)
        else if (lineageOpIds.has(ed.source) && primOrLinOpIds.has(ed.target) ) e.addClass(AttrRelationStyleClass.LINEAGE)
        else if (impactOpIds.has(ed.target) && primOrImpOpIds.has(ed.source) ) e.addClass(AttrRelationStyleClass.IMPACT)
        else e.addClass(AttrRelationStyleClass.UNRELATED)
      })
    })
  }
}

enum AttrRelationStyleClass {
  PRIMARY = "hlt_prim",
  LINEAGE = "hlt_lin",
  IMPACT = "hlt_imp",
  UNRELATED = "hlt_none"
}
