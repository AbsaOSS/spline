/*
 * Copyright 2017 Barclays Africa Group Limited
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

import {Component, Input, OnChanges, SimpleChanges, ElementRef, Output, EventEmitter} from "@angular/core";
import {IDataLineage, IOperationNode} from "../../generated-ts/lineage-model";
import {VisNodeBuilder, VisModel, VisEdge, VisNodeType} from "./visModel";
import {DataSet} from "vis";
import {Network} from "vis";
import "vis/dist/vis.min.css";
import * as _ from "lodash";

@Component({
    selector: 'graph',
    template: ''
})
export class LineageGraphComponent implements OnChanges {
    @Input() lineage: IDataLineage;
    @Input() selectedNodeID: number;
    @Input() highlightedNodeIDs: number[];

    @Output() nodeSelected = new EventEmitter<IOperationNode>();

    private network: Network;
    private graph: VisModel;

    constructor(private container: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["lineage"])
            this.rebuildGraph()

        if (changes["highlightedNodeIDs"])
            this.refreshHighlightedNodes()

        if (changes["selectedNodeID"])
            this.refreshSelectedNode()
    }

    private refreshSelectedNode() {
        this.network.unselectAll()
        if (this.selectedNodeID >= 0)
            this.network.selectNodes([this.selectedNodeID])
    }

    private refreshHighlightedNodes() {
        let visNodeBuilders: VisNodeBuilder[] =
            this.lineage.nodes.map((node, i) => {
                let visNodeType = _.includes(this.highlightedNodeIDs, i)
                    ? VisNodeType.Highlighted
                    : VisNodeType.Regular;
                return new VisNodeBuilder(i, node, visNodeType)
            })

        LineageGraphComponent
            .filterAliasNodesOut(
                LineageGraphComponent.spreadAliases(visNodeBuilders))
            .forEach(builber =>
                this.graph.nodes.update(builber.build()))
    }

    private rebuildGraph() {
        this.graph = LineageGraphComponent.lineageToGraph(this.lineage);

        this.network = new Network(this.container.nativeElement, this.graph, <any> visOptions);

        this.network.on("click", event => {
            let selectedNodeId = event.nodes[0];
            this.nodeSelected.emit(this.lineage.nodes[selectedNodeId])
        });

        this.network.on("beforeDrawing", ctx => {
            this.network.getSelectedNodes().forEach(nodeId => {
                let nodePosition = this.network.getPositions([nodeId]);
                ctx.fillStyle = "#e0e0e0";
                ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 65);
                ctx.fill()
            });
        });
        //visGraph.nodes.forEach(n => this.makeSummaryCluster(n))
    }

    private static lineageToGraph(lineage: IDataLineage): VisModel {
        let nodes: VisNodeBuilder[] = [];
        let edges: VisEdge[] = [];
        for (let i = 0; i < lineage.nodes.length; i++) {
            let originalNode = lineage.nodes[i];
            nodes.push(new VisNodeBuilder(i, originalNode));
            originalNode.mainProps.childRefs.forEach(c => {
                let output = lineage.nodes[c].mainProps.output
                if (output) {
                    edges.push(new VisEdge(c, i, '[' + output.seq.map(i => i.name).join(', ') + ']'))
                }
            })
        }
        this.spreadAliases(nodes);
        edges = this.bypassAliasNodes(nodes, edges);
        nodes = LineageGraphComponent.filterAliasNodesOut(nodes);
        return new VisModel(new DataSet(nodes.map(i => i.build())), new DataSet(edges))
    }

    private static filterAliasNodesOut(input: VisNodeBuilder[]): VisNodeBuilder[] {
        return input.filter(i => i.type != "AliasNode")
    }

    private static bypassAliasNodes(nodes: VisNodeBuilder[], edges: VisEdge[]): VisEdge[] {
        let aliasNodes = nodes.filter(i => i.type == "AliasNode");
        let aliasIdGroups: number[][] = this.makeAliasNodeIdGroups(aliasNodes, nodes);
        let aliasNodeIds = aliasNodes.map(i => i.id);
        let result: VisEdge[] = edges.filter(i => aliasNodeIds.indexOf(i.from) < 0 && aliasNodeIds.indexOf(i.to) < 0);
        for (let nodeGroupId of aliasIdGroups) {
            let first = nodeGroupId[0];
            let last = nodeGroupId[nodeGroupId.length - 1];
            for (let inputEdge of edges.filter(i => i.to == first))
                for (let outputEdge of edges.filter(i => i.from == last)) {
                    result.push(new VisEdge(inputEdge.from, outputEdge.to, inputEdge.title))
                }
        }
        return result;
    }

    private static makeAliasNodeIdGroups(aliasNodes: VisNodeBuilder[], nodes: VisNodeBuilder[]): number[][] {
        let visitedNodes: number[] = [];
        let result: number[][] = [];
        for (let aliasNode of aliasNodes) {
            if (visitedNodes.indexOf(aliasNode.id) < 0) {
                let newgroup: number[] = [];
                let cNode = aliasNode;
                while (cNode.type == "AliasNode") {
                    newgroup.push(cNode.id);
                    visitedNodes.push(cNode.id);
                    cNode = nodes[cNode.parents[0]];
                }
                result.push(newgroup)
            }
        }
        return result;
    }

    private static spreadAliases(nodes: VisNodeBuilder[]) {
        for (let node of nodes) {
            if (node.type == "AliasNode") {
                for (let parentIndex of node.parents) {
                    this.assignAlias(node.alias, nodes[parentIndex], nodes);
                }
            }
        }
        return nodes
    }

    private static assignAlias(alias: string, node: VisNodeBuilder, nodes: VisNodeBuilder[]) {
        if (["AliasNode", "JoinNode", "UnionNode"].indexOf(node.type) >= 0) return;
        node.alias = alias;
        for (let parentIndex of node.parents) {
            this.assignAlias(alias, nodes[parentIndex], nodes);
        }
    }
}

const visOptions = {
    interaction: {
        hover: true
    },
    layout: {
        hierarchical: {
            levelSeparation: 250,
            enabled: true,
            sortMethod: 'directed',
            direction: 'UD',
            parentCentralization: true
        }
    },
    physics: {
        hierarchicalRepulsion: {
            nodeDistance: 200,
            springLength: 250
        }
    },
    edges: {
        color: '#E0E0E0',
        shadow: false,
        width: 10,
        arrows: "to",
        font: {
            color: '#343434',
            background: '#ffffff',
            strokeWidth: 0
        }
    },
    nodes: {
        shape: 'icon',
        shadow: false,
        margin: 10,
        labelHighlightBold: false,
        font: {
            color: '#343434',
            multi: 'html'
        },
    },
};
