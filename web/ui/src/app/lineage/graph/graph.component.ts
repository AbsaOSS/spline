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
import {IDataLineage} from "../../../generated-ts/lineage-model";
import "vis/dist/vis.min.css";
import {visOptions} from "./vis/vis-options";
import {lineageToGraph} from "./graph-builder";
import * as vis from "vis";
import * as _ from "lodash";
import {ClusterManager} from "./cluster-manager";
import {HighlightedVisNode, RegularVisNode, VisModel, VisNode, VisNodeType} from "./vis/vis-model";
import {LineageStore} from "../lineage.store";
import {OperationType} from "../types";

@Component({
    selector: 'graph',
    template: ''
})
export class GraphComponent implements OnChanges {
    @Input() selectedOperationId?: string
    @Input() highlightedNodeIDs: string[]
    @Input() hiddenOperationTypes: OperationType[]

    @Output() operationSelected = new EventEmitter<string>()

    private network: vis.Network
    private graph: VisModel

    private clusterManager: ClusterManager

    constructor(private container: ElementRef, private lineageStore: LineageStore) {
        lineageStore.lineage$.subscribe(lineage => {
            this.rebuildGraph(lineage)
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["selectedOperationId"]) this.refreshSelectedNode()

        let highlightedNodesChange = changes["highlightedNodeIDs"]
        if (highlightedNodesChange && !_.isEqual(highlightedNodesChange.previousValue, highlightedNodesChange.currentValue)) {
            this.refreshHighlightedNodes()
        }

        if (changes["hiddenOperationTypes"]) {
            this.rebuildGraph(this.lineageStore.lineageAccessors.lineage)
            this.refreshSelectedNode()
            this.refreshHighlightedNodes()
        }
    }

    private rebuildGraph(lineage: IDataLineage) {
        this.graph = lineageToGraph(lineage, this.selectedOperationId, this.hiddenOperationTypes)
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

        let canvasElement = this.container.nativeElement.getElementsByTagName("canvas")[0]
        this.network.on('hoverNode', () => canvasElement.style.cursor = 'pointer')
        this.network.on('blurNode', () => canvasElement.style.cursor = 'default')
        this.network.on("beforeDrawing", ctx => {
            this.network.getSelectedNodes().forEach(nodeId => {
                let nodePosition = this.network.getPositions(nodeId)
                ctx.fillStyle = "#e0e0e0"
                ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 65)
                ctx.fill()
            })
        })

        this.clusterManager.collapseAllClusters();
    }

    public fit() {
        this.network.fit()
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
        const createNode = (id: string, type: VisNodeType): VisNode => {
            let nodeConstructor = type == VisNodeType.Highlighted ? HighlightedVisNode : RegularVisNode
            let operation = this.lineageStore.lineageAccessors.getOperation(id)
            return new nodeConstructor(operation)
        }

        let nodeDataSet = <vis.DataSet<VisNode>> this.graph.nodes
        let currentNodes = nodeDataSet.get()
        let updatedNodes = currentNodes.map(node => {
            let desiredType = _.includes(this.highlightedNodeIDs, node.id) ? VisNodeType.Highlighted : VisNodeType.Regular
            return (node.type != desiredType)
                ? createNode(node.id, desiredType)
                : node
        })

        nodeDataSet.update(updatedNodes)

        this.clusterManager.refreshHighlightedClustersForNodes()
    }

}
