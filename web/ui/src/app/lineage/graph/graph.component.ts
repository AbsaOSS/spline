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

import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {IDataLineage, IOperation} from "../../../generated-ts/lineage-model";
import "vis/dist/vis.min.css";
import {visOptions} from "./vis/vis-options";
import {lineageToGraph} from "./graph-builder";
import * as vis from "vis";
import {ClusterManager} from "./cluster-manager";
import {VisNode, VisNodeType} from "./vis/vis-model";

@Component({
    selector: 'graph',
    template: ''
})
export class GraphComponent implements OnChanges {
    @Input() lineage: IDataLineage
    @Input() selectedOperationId: string

    @Input() highlightedNodeIDs: number[]
    @Output() operationSelected = new EventEmitter<string>()

    private network: vis.Network
    private graph: vis.Data

    private clusterManager: ClusterManager

    private fittedCount: number = 0

    constructor(private container: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["lineage"]) this.rebuildGraph()
        if (changes["selectedOperationId"]) this.refreshSelectedNode()
        if (changes["highlightedNodeIDs"]) this.refreshHighlightedNodes()
    }

    private rebuildGraph() {
        this.fittedCount = 0
        this.graph = lineageToGraph(this.lineage)
        this.network = new vis.Network(this.container.nativeElement, this.graph, visOptions)
        this.clusterManager = new ClusterManager(this.graph, this.network)
        this.clusterManager.rebuildClusters()

        this.network.on("click", event => {
            let nodeId = event.nodes[0]
            if (this.network.isCluster(nodeId)) {
                this.network.openCluster(nodeId)
                this.refreshSelectedNode()
            } else {
                this.operationSelected.emit(nodeId)
            }
        })

        this.network.on('hoverNode', () => this.changeCursor('pointer'))
        this.network.on('blurNode', () => this.changeCursor('default'))
        this.network.on('initRedraw', () => this.fitTimes(2))
        this.network.on("beforeDrawing", ctx => {
            this.network.getSelectedNodes().forEach(nodeId => {
                let nodePosition = this.network.getPositions([nodeId])
                ctx.fillStyle = "#e0e0e0"
                ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 65)
                ctx.fill()
            });
        });

        this.clusterManager.collapseAllClusters();
    }

    public fit() {
        this.network.fit()
    }

    private fitTimes(times: number) {
        if (this.fittedCount < times) {
            this.fittedCount++
            this.fit()
        }
    }

    private changeCursor(cursorType: string) {
        this.container.nativeElement.getElementsByTagName("canvas")[0].style.cursor = cursorType
    }

    public collapseNodes() {
        this.clusterManager.collapseClustersExceptForNode(this.selectedOperationId)
    }

    private refreshSelectedNode() {
        this.network.unselectAll()
        if (this.selectedOperationId) {
            this.network.selectNodes([this.selectedOperationId])
            this.clusterManager.expandClusterForNode(this.selectedOperationId)
        }
    }

    private refreshHighlightedNodes() {
        // TODO: !!!!!!!!!!
        console.log("highlight nodes", this.highlightedNodeIDs)
        let nodes = <vis.DataSet<VisNode>> this.graph.nodes

        /*let visNodeBuilders: VisNode[] =
            this.lineage.operations.map(op => {
                let visNodeType = _.includes(this.highlightedNodeIDs, i)
                    ? VisNodeType.Highlighted
                    : VisNodeType.Regular;
                return new VisNode(op, op.mainProps.id, visNodeType)
            });

        GraphComponent
            .filterAliasNodesOut(
                GraphComponent.spreadAliases(visNodeBuilders))
            .forEach(builber =>
                this.graph.nodes.update(builber.build()));

        this.rebuildClusters(this.graph);
        console.log("clustered", this.clusters);
        this.clusters.forEach(c => {
            if ((<any>this.network).clustering.isCluster(c.id))
                (<any>this.network).clustering.body.nodes[c.id].setOptions(c);
        });*/
    }

}
