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

import {Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output} from "@angular/core";
import {IDataLineage} from "../../../generated-ts/lineage-model";
import "vis/dist/vis.min.css";
import * as vis from "vis";
import * as _ from "lodash";
import {combineLatest, concat, Observable, Subscription} from "rxjs";
import {IComposite, ITypedMetaDataSource} from "../../../generated-ts/operation-model";
import {typeOfOperation} from "../../lineage/types";
import {visOptions} from "./vis-options";
import {
    GraphNode,
    GraphNodeTypesByIdPrefixes,
    ID_PREFIX_LENGTH,
    ID_PREFIXES,
    VisDatasetNode,
    VisNode,
    VisNodeType,
    VisProcessNode
} from "./lineage-overview.model";
import {ClusterManager} from "../../visjs/cluster-manager";
import {VisClusterNode, VisModel} from "../../visjs/vis-model";
import {getIconForNodeType, Icon} from "../../lineage/details/operation/operation-icon.utils";
import {distinctUntilChanged, filter, first, pairwise} from "rxjs/operators";
import {VisNetworkService} from "../../visjs/vis-network.service";

@Component({
    selector: 'lineage-overview-graph',
    template: '',
    providers: [
        VisNetworkService
    ]
})
export class LineageOverviewGraphComponent implements OnInit, OnDestroy {

    @Input() lineage$: Observable<IDataLineage>
    @Input() selectedNode$: Observable<GraphNode>

    @Output() nodeSelected = new EventEmitter<GraphNode>()
    @Output() nodeActioned = new EventEmitter<GraphNode>()

    private selectedNode: GraphNode
    private clusterManager: ClusterManager<VisNode, vis.Edge>

    private subscriptions: Subscription[] = []

    constructor(private container: ElementRef,
                private visNetworkService: VisNetworkService,
                private zone: NgZone) {
    }

    ngOnInit(): void {
        const lineageContainsDataset = (lin: IDataLineage, dsId: string) => _.some(lin.datasets, {id: dsId}),
            reactOnChange = (prevLineage: IDataLineage, nextLineage: IDataLineage, selectedNode: GraphNode) => {
                if (!this.visNetworkService.network || nextLineage !== prevLineage)
                    this.rebuildGraph(nextLineage)
                this.selectedNode = selectedNode
                this.refreshSelectedNode(selectedNode)
            }

        const lineagePairs$ =
            concat(this.lineage$.pipe(first()), this.lineage$).pipe(pairwise())

        this.subscriptions.unshift(combineLatest([lineagePairs$, this.selectedNode$])
            .pipe(
                filter(([[, lineage], selectedNode]) => lineageContainsDataset(lineage, selectedNode.id)),
                distinctUntilChanged(([[, lin0], node0], [[, lin1], node1]) => lin0.id == lin1.id && _.isEqual(node0, node1)))
            .subscribe(([[prevLineage, nextLineage], selectedNode]) => reactOnChange(prevLineage, nextLineage, selectedNode)))
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe())
    }

    public fit() {
        this.zone.runOutsideAngular(() => {
            this.visNetworkService.network.fit()
        })
    }

    public collapseNodes() {
        this.zone.runOutsideAngular(() => {
            this.clusterManager.collapseAllClusters()
        })
    }

    private static eventToClickableNode(event: any): GraphNode {
        const nodeIdWithPrefix = event.nodes.length && event.nodes[0]
        return LineageOverviewGraphComponent.isClickableNodeId(nodeIdWithPrefix)
            && {
                id: nodeIdWithPrefix.substring(ID_PREFIX_LENGTH),
                type: GraphNodeTypesByIdPrefixes[nodeIdWithPrefix.substring(0, ID_PREFIX_LENGTH)]
            }
    }

    private static isClickableNodeId(nodeId: string): boolean {
        const nonClickablePrefixes = [ID_PREFIXES.datasource + ID_PREFIXES.extra, ID_PREFIXES.datasource_cluster]
        return nodeId && !_.some(nonClickablePrefixes, prf => nodeId.startsWith(prf))
    }

    private rebuildGraph(lineage: IDataLineage) {
        this.zone.runOutsideAngular(() => {
            const graph = LineageOverviewGraphComponent.buildVisModel(lineage)
            const network = this.visNetworkService.createNetwork(() =>
                new vis.Network(this.container.nativeElement, graph, visOptions))

            this.clusterManager = new ClusterManager<VisNode, vis.Edge>(graph, network, (nodes,) =>
                _(nodes)
                    .filter((node: VisNode) => node.nodeType === VisNodeType.Dataset)
                    .filter((dsNode: VisDatasetNode) => dsNode.dataSource.datasetsIds.length > 1) // means there were appends to the source
                    .groupBy((dsNode: VisDatasetNode) => dsNode.dataSource.datasetsIds[0]) // the first write/overwrite followed by subsequent appends
                    .values()
                    .map((nodes, i) => new VisClusterNode(`${ID_PREFIXES.datasource_cluster}${i}`, `${nodes[0].label} (${nodes.length})`, nodes))
                    .value())

            this.clusterManager.rebuildClusters()
            this.clusterManager.collapseAllClusters()

            network.on("click", event => {
                const node = LineageOverviewGraphComponent.eventToClickableNode(event)
                if (node)
                    this.zone.run(() => this.nodeSelected.emit(node))
                else {
                    this.refreshSelectedNode(this.selectedNode)
                    const clickedNode = event.nodes[0]
                    if (network.isCluster(clickedNode)) {
                        network.openCluster(clickedNode)
                    }
                }
            })

            network.on("doubleClick", event => {
                if (event.nodes.length == 1) {
                    const node = LineageOverviewGraphComponent.eventToClickableNode(event)
                    if (node)
                        this.zone.run(() => this.nodeActioned.emit(node))
                }
            })

            const canvasElement = this.container.nativeElement.getElementsByTagName("canvas")[0]
            network.on('blurNode', () => canvasElement.style.cursor = 'default')
            network.on('hoverNode', (event) => {
                if (LineageOverviewGraphComponent.isClickableNodeId(event.node))
                    canvasElement.style.cursor = 'pointer'
            })
            network.on("beforeDrawing", ctx => {
                network.getSelectedNodes().forEach(nodeId => {
                    const nodePosition = network.getPositions(nodeId)
                    ctx.fillStyle = "#f7a263"
                    ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 65)
                    ctx.fill()
                })
            })
        })
    }

    private refreshSelectedNode(selectedNode: GraphNode) {
        this.zone.runOutsideAngular(() => {
            const network = this.visNetworkService.network
            network.unselectAll()
            network.selectNodes([ID_PREFIXES[selectedNode.type] + selectedNode.id])
        })
    }

    private static buildVisModel(lineage: IDataLineage): VisModel<VisNode, vis.Edge> {
        const getIdentifiableDataSourcesOf =
            (op: IComposite): ITypedMetaDataSource[] =>
                _.flatMap(op.sources, (src, i) =>
                    _.isEmpty(src.datasetsIds)
                        ? _.assign({}, src, {datasetsIds: [ID_PREFIXES.extra + i + "_" + op.mainProps.id]})
                        : src)

        const recombineByDatasetIdAndLongestAppendSequence =
            (typedMetadataSources: ITypedMetaDataSource[]): [string, ITypedMetaDataSource][] =>
                <any[]>_(typedMetadataSources)
                    .flatMap((src: ITypedMetaDataSource) => src.datasetsIds.map(dsId => [dsId, src]))
                    .groupBy(_.head).values()
                    .map((pairs: [string, ITypedMetaDataSource][]) => _.sortBy(pairs, ([, src]) => -src.datasetsIds.length)[0])
                    .value()


        const dataSources =
                _.flatMap(lineage.operations, (op: IComposite) =>
                    getIdentifiableDataSourcesOf(op).concat(op.destination)),

            datasetNodes: VisNode[] =
                recombineByDatasetIdAndLongestAppendSequence(dataSources)
                    .map(([datasetId, src]) => {
                        const lastPathItemName = src.path.substring(src.path.replace(/\/$/, '').lastIndexOf("/") + 1)
                        const label = LineageOverviewGraphComponent.wrapText(src.type + "\n" + lastPathItemName)
                        return new VisDatasetNode(
                            src,
                            ID_PREFIXES.datasource + datasetId,
                            src.type + ":" + src.path,
                            label,
                            new Icon("fa-file", "\uf15b", "FontAwesome")
                                .toVisNodeIcon(datasetId.startsWith(ID_PREFIXES.extra) ? "#c0cdd6" : "#337ab7")
                        )
                    }),

            processNodes: VisNode[] = lineage.operations.map((op: IComposite) =>
                new VisProcessNode(
                    op,
                    ID_PREFIXES.operation + op.mainProps.id,
                    LineageOverviewGraphComponent.wrapText(op.appName),
                    getIconForNodeType(typeOfOperation(op)).toVisNodeIcon("#337ab7")
                )),

            nodes = processNodes.concat(datasetNodes),

            edges: vis.Edge[] = _.flatMap(lineage.operations, (op: IComposite) => {
                const opNodeId = ID_PREFIXES.operation + op.mainProps.id
                const inputEdges: vis.Edge[] =
                        recombineByDatasetIdAndLongestAppendSequence(getIdentifiableDataSourcesOf(op))
                            .map(([datasetId]) => {
                                const dsNodeId = ID_PREFIXES.datasource + datasetId
                                return {
                                    id: dsNodeId + "_" + opNodeId,
                                    from: dsNodeId,
                                    to: opNodeId
                                }
                            }),
                    outputDsNodeId = ID_PREFIXES.datasource + op.mainProps.output,
                    outputEdge: vis.Edge = {
                        id: opNodeId + "_" + outputDsNodeId,
                        from: opNodeId,
                        to: outputDsNodeId
                    }
                return inputEdges.concat(outputEdge)
            })

        return new VisModel(
            new vis.DataSet<VisNode>(nodes),
            new vis.DataSet<vis.Edge>(edges)
        )
    }

    static wrapText(text: string): string {
        const textSize = 13
        return text.split('\n').map(
            line => {
                if (line.length < textSize) {
                    return line
                }
                return line.substring(0, textSize - 2) + "\n" + this.wrapText(line.substring(textSize - 2))
            }
        ).join("\n")
    }
}

