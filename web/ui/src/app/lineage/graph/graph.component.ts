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

import {Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output} from "@angular/core";
import {IDataLineage} from "../../../generated-ts/lineage-model";
import "vis/dist/vis.min.css";
import {visOptions} from "./vis-options";
import {lineageToGraph} from "./graph-builder";
import * as vis from "vis";
import * as _ from "lodash";
import {ClusterManager} from "../../visjs/cluster-manager";
import { VisEdge, VisNode} from "./graph.model";
import {LineageStore} from "../lineage.store";
import {OperationType} from "../types";
import {VisClusterNode, VisModel} from "../../visjs/vis-model";
import {BehaviorSubject, combineLatest, Subject, Subscription} from "rxjs";
import {ExpressionRenderService} from "../details/expression/expression-render.service";
import {distinctUntilChanged} from "rxjs/operators";
import {VisNetworkService} from "../../visjs/vis-network.service";

@Component({
    selector: 'graph',
    template: '',
    providers: [
        VisNetworkService
    ]
})
export class GraphComponent implements OnDestroy {
    private hiddenOperationTypes$ = new Subject<OperationType[]>()
    private highlightedNodeIDs$ = new Subject<string[]>()
    private selectedOperationId$ = new BehaviorSubject<string | undefined>(undefined)

    @Input() public set hiddenOperationTypes(types: OperationType[]) {
        this.hiddenOperationTypes$.next(types)
    }

    @Input() public set highlightedNodeIDs(ids: string[]) {
        this.highlightedNodeIDs$.next(ids)
    }

    @Input() public set selectedOperationId(opId: string | undefined) {
        this.selectedOperationId$.next(opId)
    }

    @Output() public operationSelected = new EventEmitter<string>()

    private graph: VisModel<VisNode, VisEdge>
    private clusterManager: ClusterManager<VisNode, VisEdge>

    private readonly subscriptions: Subscription[]

    constructor(private container: ElementRef,
                private expressionRenderService: ExpressionRenderService,
                private lineageStore: LineageStore,
                private visNetworkService: VisNetworkService,
                private zone: NgZone) {

        const changedHiddenOperationTypes$ = this.hiddenOperationTypes$.pipe(distinctUntilChanged(_.isEqual))
        const changedHighlightedNodeIds$ = this.highlightedNodeIDs$.pipe(distinctUntilChanged(_.isEqual))
        const graphRebuildEvidence$ = new Subject<void>()

        this.subscriptions = [
            combineLatest([this.lineageStore.lineage$, changedHiddenOperationTypes$])
                .subscribe(([lineage, hiddenOpTypes]) => {
                    this.rebuildGraph(lineage, hiddenOpTypes)
                    graphRebuildEvidence$.next()
                }),

            combineLatest([changedHighlightedNodeIds$, graphRebuildEvidence$])
                .subscribe(([highlightedIds]) => {
                    this.refreshHighlightedNodes(highlightedIds)
                }),

            combineLatest([this.selectedOperationId$, graphRebuildEvidence$])
                .subscribe(([selectedOpId]) => {
                    this.refreshSelectedNode(selectedOpId)
                })
        ]
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sbc => sbc.unsubscribe())
    }

    private rebuildGraph(lineage: IDataLineage, hiddenOperationTypes: OperationType[]) {
        this.zone.runOutsideAngular(() => {
            this.graph = lineageToGraph(
                lineage,
                this.expressionRenderService,
                this.selectedOperationId$.value, hiddenOperationTypes)

            const network = this.visNetworkService.createNetwork(() =>
                new vis.Network(this.container.nativeElement, this.graph, visOptions))

            this.clusterManager =
                new ClusterManager(this.graph, network, (nodes, edges) => {
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

            network.on("click", event => {
                const nodeId = event.nodes[0]
                if (network.isCluster(nodeId)) {
                    network.openCluster(nodeId)
                    this.refreshSelectedNode(this.selectedOperationId$.value)
                } else {
                    this.zone.run(() => this.operationSelected.emit(nodeId))
                }
            })

            const canvasElement = this.container.nativeElement.getElementsByTagName("canvas")[0]
            network.on('hoverNode', () => canvasElement.style.cursor = 'pointer')
            network.on('blurNode', () => canvasElement.style.cursor = 'default')
            network.on("beforeDrawing", ctx => {
                network.getSelectedNodes().forEach(nodeId => {
                    const nodePosition = network.getPositions(nodeId)
                    ctx.fillStyle = "#e0e0e0"
                    ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 65)
                    ctx.fill()
                })
            })

            this.clusterManager.collapseAllClusters();
        })
    }

    public fit() {
        this.zone.runOutsideAngular(() => {
            this.visNetworkService.network.fit()
        })
    }

    public collapseNodes() {
        this.zone.runOutsideAngular(() => {
            this.clusterManager.collapseClustersExceptForNode(this.selectedOperationId$.value)
        })
    }

    private refreshSelectedNode(selectedOpId: string | undefined) {
        this.zone.runOutsideAngular(() => {
            const network = this.visNetworkService.network
            network.unselectAll()
            if (selectedOpId) {
                network.selectNodes([selectedOpId])
                this.clusterManager.expandClusterForNode(selectedOpId)
            }
        })
    }

    private refreshHighlightedNodes(highlightedNodeIDs: string[]) {
        this.zone.runOutsideAngular(() => {
            const nodeDataSet = <vis.DataSet<VisNode>>this.graph.nodes
            const currentNodes = nodeDataSet.get()
            const updatedNodes = currentNodes.map(node => {
                const isHighlighted = _.includes(highlightedNodeIDs, node.id)
                return (node.isHighlighted != isHighlighted)
                    ? new VisNode(node.operation, node.label, isHighlighted)
                    : node
            })

            nodeDataSet.update(updatedNodes)

            this.clusterManager.refreshHighlightedClustersForNodes()
        })
    }

}
