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
import {VisNodeBuilder, VisModel, VisEdge, VisNodeType, VisClusterNodeBuilder, VisClusterNode, VisNode} from "./visModel";
import {ClusterOptions, DataSet} from "vis";
import {Network} from "vis";
import "vis/dist/vis.min.css";
import * as _ from "lodash";
import {forEach} from "@angular/router/src/utils/collection";

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
    private clusters : VisClusterNode[];
    private fittedCount: number = 0;

    constructor(private container: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["lineage"])
            this.rebuildGraph();

        if (changes["highlightedNodeIDs"])
            this.refreshHighlightedNodes();

        if (changes["selectedNodeID"])
            this.refreshSelectedNode()
    }

    public fit()
    {
        this.network.fit()
    }

    private fitTimes(times : number)
    {
        if(this.fittedCount < times)
        {
            this.fittedCount++;
            this.fit();
        }
    }

    public collapseNodes()
    {
        this.clusters
            .filter(c => !(<any>this.network).clustering.isCluster(c.id) && c.nodes.filter(i => i.id == this.selectedNodeID).length == 0)
            .forEach(c => this.collapseCluster(c))
    }

    private refreshSelectedNode() {
        this.network.unselectAll();
        if (this.selectedNodeID >= 0){
            this.network.selectNodes([this.selectedNodeID]);
            this.clusters
                .filter(c => (<any>this.network).clustering.isCluster(c.id) && c.nodes.filter(i => i.id == this.selectedNodeID).length > 0)
                .forEach(c => (<any>this.network).clustering.openCluster(c.id))
        }
    }

    private refreshHighlightedNodes() {
        let visNodeBuilders: VisNodeBuilder[] =
            this.lineage.nodes.map((node, i) => {
                let visNodeType = _.includes(this.highlightedNodeIDs, i)
                    ? VisNodeType.Highlighted
                    : VisNodeType.Regular;
                return new VisNodeBuilder(i, node, visNodeType)
            });

        LineageGraphComponent
            .filterAliasNodesOut(
                LineageGraphComponent.spreadAliases(visNodeBuilders))
            .forEach(builber =>
                this.graph.nodes.update(builber.build()));

        this.rebuildClusters(this.graph);
        console.log("clustered",this.clusters);
        this.clusters.forEach(c => {
            if((<any>this.network).clustering.isCluster(c.id))
                (<any>this.network).clustering.body.nodes[c.id].setOptions(c);
        });
    }

    private rebuildClusters(graph: VisModel)
    {
        let nodes : VisNode[] = graph.nodes.map(i => i);
        let edges : VisEdge[] = graph.edges.map(i => i);
        let result : VisClusterNodeBuilder[] = [];
        nodes.forEach(n => {
            let siblingsTo = edges.filter(i => i.from == n.id).map(i => i.to);
            let siblingsFrom = edges.filter(i => i.to == n.id).map(i => i.from);
            if (siblingsFrom.length == 1 && siblingsTo.length == 1)
            {
                let clusters = result.filter(i => i.nodes.filter(j => j.id == siblingsTo[0]).length > 0);
                if(clusters.length > 0)
                {
                    clusters[0].nodes.push(n);
                }else{
                    result.push(new VisClusterNodeBuilder(n))
                }
            }
        });

        this.clusters = result.filter(i => i.nodes.length > 1).map((v,i,a) => v.build("cluster" + i))
    }

    private changeCursor(cursorType :string)
    {
        this.container.nativeElement.getElementsByTagName("canvas")[0].style.cursor = cursorType
    }

    private rebuildGraph() {
        this.fittedCount = 0;
        this.graph = LineageGraphComponent.lineageToGraph(this.lineage);
        this.rebuildClusters(this.graph);
        this.network = new Network(this.container.nativeElement, this.graph, <any> visOptions);

        this.network.on("click", event => {
            let selectedNodeId = event.nodes[0];
            if(this.network.isCluster(selectedNodeId)) {
                this.network.openCluster(selectedNodeId);
                this.refreshSelectedNode();
            }else{
                this.nodeSelected.emit(this.lineage.nodes[selectedNodeId])
            }
        });

        this.network.on('hoverNode', () => this.changeCursor('pointer'));
        this.network.on('blurNode', () => this.changeCursor('default'));
        this.network.on('initRedraw', () => {console.log("initRedraw"); this.fitTimes(2)});
        this.network.on("beforeDrawing", ctx => {
            this.network.getSelectedNodes().forEach(nodeId => {
                let nodePosition = this.network.getPositions([nodeId]);
                ctx.fillStyle = "#e0e0e0";
                ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 65);
                ctx.fill()
            });
        });

        console.log(this.clusters);
        this.collapseClusters();
    }

    private collapseCluster(cluster : VisClusterNode)
    {
        let clusterProps : ClusterOptions ={
            clusterNodeProperties : <any>cluster,
            joinCondition: nodeOps => {return cluster.nodes.map(i => i.id).indexOf(nodeOps.id) >= 0}
        };

        this.network.cluster(clusterProps);
    }

    private collapseClusters() {
        this.clusters.forEach(c => this.collapseCluster(c));
    }

    private static lineageToGraph(lineage: IDataLineage): VisModel {
        let nodes: VisNodeBuilder[] = [];
        let edges: VisEdge[] = [];
        for (let i = 0; i < lineage.nodes.length; i++) {
            let originalNode = lineage.nodes[i];
            nodes.push(new VisNodeBuilder(i, originalNode));
            originalNode.mainProps.childRefs.forEach(c => {
                let output = lineage.nodes[c].mainProps.output;
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
    autoResize: true,
    interaction: {
        hover: true,
        selectConnectedEdges : false,
        hoverConnectedEdges : false
    },
    layout: {
        hierarchical: {
            enabled: true,
            sortMethod: 'directed',
            direction: 'UD',
            parentCentralization: true,
            nodeSpacing: 200,
            levelSeparation: 200
        }
    },
    physics: {
        enabled: true,
        hierarchicalRepulsion: {
            nodeDistance: 250,
            springLength : 150,
            springConstant : 10,
            damping: 1
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
            multi: false,
            size: 20,
        },
    },
};
