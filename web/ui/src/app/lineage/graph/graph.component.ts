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

import {Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output, SimpleChange, SimpleChanges} from "@angular/core";
import {IDataLineage} from "../../../generated-ts/lineage-model";
import "vis/dist/vis.min.css";
import {visOptions} from "./vis-options";
import {lineageToGraph} from "./graph-builder";
import * as vis from "vis";
import * as _ from "lodash";
import {ClusterManager} from "../../visjs/cluster-manager";
import {VisEdge, VisNode} from "./graph.model";
import {LineageStore} from "../lineage.store";
import {OperationType} from "../types";
import {VisClusterNode, VisModel} from "../../visjs/vis-model";
import {Subscription} from "rxjs";
import {ExpressionRenderService} from "../details/expression/expression-render.service";

const isDistinct = (change: SimpleChange): boolean => change && !_.isEqual(change.previousValue, change.currentValue)

@Component({
    selector: 'graph',
    template: ''
})
export class GraphComponent implements OnChanges, OnDestroy {
    @Input() public selectedOperationId: string | undefined
    @Input() public highlightedNodeIDs: string[]
    @Input() public hiddenOperationTypes: OperationType[]

    @Output() public operationSelected = new EventEmitter<string>()

    private network: vis.Network
    private graph: VisModel<VisNode, VisEdge>

    private clusterManager: ClusterManager<VisNode, VisEdge>
    private lineage$Subscription: Subscription

    constructor(private container: ElementRef,
                private expressionRenderService: ExpressionRenderService,
                private lineageStore: LineageStore,
                private zone: NgZone) {
        this.lineage$Subscription = this.lineageStore.lineage$.subscribe(lineage => {
            this.rebuildGraph(lineage, expressionRenderService)
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["selectedOperationId"]) this.refreshSelectedNode()

        if (isDistinct(changes["highlightedNodeIDs"])) {
            this.refreshHighlightedNodes()
        }

        if (isDistinct(changes["hiddenOperationTypes"])) {
            this.rebuildGraph(this.lineageStore.lineageAccessors.lineage, this.expressionRenderService)
            this.refreshSelectedNode()
            this.refreshHighlightedNodes()
        }
    }

    ngOnDestroy(): void {
        this.lineage$Subscription.unsubscribe()
        this.network.destroy()
        delete this.network
        delete this.clusterManager
    }

    private rebuildGraph(lineage: IDataLineage, expressionRenderService: ExpressionRenderService) {
        this.zone.runOutsideAngular(() => {
            this.graph = lineageToGraph(
                lineage,
                expressionRenderService,
                this.selectedOperationId,
                this.highlightedNodeIDs,
                this.hiddenOperationTypes)

            this.network = new vis.Network(this.container.nativeElement, this.graph, visOptions)

            this.clusterManager =
                new ClusterManager(this.graph, this.network, (nodes, edges) => {
                    const nodesGroups: VisNode[][] = []
                    nodes.forEach(node => {
                        const siblingsTo = edges.filter(e => e.from == node.id).map(e => e.to)
                        const siblingsFrom = edges.filter(e => e.to == node.id).map(e => e.from)
                        if (siblingsFrom.length == 1 && siblingsTo.length == 1) {
                            const group = nodesGroups.find(grp => _.some(grp, n => n.id == siblingsTo[0]))
                            if (group) group.push(node)
                            else nodesGroups.push([node])
                        }
                    })
                    return nodesGroups.map((nodes, i) => {
                        const id = `cluster:${i}`
                        const label = "(" + nodes.length + ")"
                        const isHighlighted = _.some(nodes, n => n.isHighlighted)
                        return new VisClusterNode(id, label, nodes, isHighlighted)
                    })
                })

            this.clusterManager.rebuildClusters()

            this.network.on("click", event => {
                const nodeId = event.nodes[0]
                if (this.network.isCluster(nodeId)) {
                    this.network.openCluster(nodeId)
                    this.refreshSelectedNode()
                } else {
                    this.zone.run(() => this.operationSelected.emit(nodeId))
                }
            })

            const canvasElement = this.container.nativeElement.getElementsByTagName("canvas")[0]
            this.network.on('hoverNode', () => canvasElement.style.cursor = 'pointer')
            this.network.on('blurNode', () => canvasElement.style.cursor = 'default')
            this.network.on("beforeDrawing", ctx => {
                this.network.getSelectedNodes().forEach(nodeId => {
                    const nodePosition = this.network.getPositions(nodeId)
                    ctx.fillStyle = "#e0e0e0"
                    ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 65)
                    ctx.fill()
                })
            })

            this.clusterManager.collapseAllClusters();
        })
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
        const nodeDataSet = <vis.DataSet<VisNode>>this.graph.nodes
        const currentNodes = nodeDataSet.get()
        const updatedNodes = currentNodes.map(node => {
            const isHighlighted = _.includes(this.highlightedNodeIDs, node.id)
            return (node.isHighlighted != isHighlighted)
                ? new VisNode(node.operation, node.label, isHighlighted)
                : node
        })

        nodeDataSet.update(updatedNodes)

        this.clusterManager.refreshHighlightedClustersForNodes()
    }

}
