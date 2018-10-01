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

import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IDataLineage} from "../../../generated-ts/lineage-model";
import "vis/dist/vis.min.css";
import * as vis from "vis";
import * as _ from "lodash";
import {combineLatest, concat, Observable} from "rxjs";
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
import {Icon, VisClusterNode, VisModel} from "../../visjs/vis-model";
import {getIconForNodeType} from "../../lineage/details/operation/operation-icon.utils";
import {distinctUntilChanged, filter, first, pairwise} from "rxjs/operators";

@Component({
    selector: 'lineage-overview-graph',
    template: ''
})
export class LineageOverviewGraphComponent implements OnInit {

    @Input() lineage$: Observable<IDataLineage>
    @Input() selectedNode$: Observable<GraphNode>

    @Output() nodeSelected = new EventEmitter<GraphNode>()
    @Output() nodeActioned = new EventEmitter<GraphNode>()

    private selectedNode: GraphNode
    private network: vis.Network
    private clusterManager: ClusterManager<VisNode, vis.Edge>

    constructor(private container: ElementRef) {
    }

    ngOnInit(): void {
        let lineageContainsDataset = (lin: IDataLineage, dsId: string) => _.some(lin.datasets, {id: dsId}),
            reactOnChange = (prevLineage: IDataLineage, nextLineage: IDataLineage, selectedNode: GraphNode) => {
                if (!this.network || nextLineage !== prevLineage)
                    this.rebuildGraph(nextLineage)
                this.selectedNode = selectedNode
                this.refreshSelectedNode(selectedNode)
            }

        let lineagePairs$ =
            concat(this.lineage$.pipe(first()), this.lineage$).pipe(pairwise())

        combineLatest(lineagePairs$, this.selectedNode$)
            .pipe(
                filter(([[__, lineage], selectedNode]) => lineageContainsDataset(lineage, selectedNode.id)),
                distinctUntilChanged(([[__, lin0], node0], [[___, lin1], node1]) => lin0.id == lin1.id && _.isEqual(node0, node1)))
            .subscribe(([[prevLineage, nextLineage], selectedNode]) => reactOnChange(prevLineage, nextLineage, selectedNode))
    }

    public fit() {
        this.network.fit()
    }

    public collapseNodes() {
        this.clusterManager.collapseAllClusters()
    }

    private static eventToClickableNode(event: any): GraphNode {
        let nodeIdWithPrefix = event.nodes.length && event.nodes[0]
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
        let graph = LineageOverviewGraphComponent.buildVisModel(lineage)
        this.network = new vis.Network(this.container.nativeElement, graph, visOptions)

        this.clusterManager = new ClusterManager<VisNode, vis.Edge>(graph, this.network, (nodes,) =>
            _(nodes)
                .filter((node: VisNode) => node.nodeType === VisNodeType.Dataset)
                .filter((dsNode: VisDatasetNode) => dsNode.dataSource.datasetsIds.length > 1) // means there were appends to the source
                .groupBy((dsNode: VisDatasetNode) => dsNode.dataSource.datasetsIds[0]) // the first write/overwrite followed by subsequent appends
                .values()
                .map((nodes, i) => new VisClusterNode(`${ID_PREFIXES.datasource_cluster}${i}`, `${nodes[0].label} (${nodes.length})`, nodes))
                .value())

        this.clusterManager.rebuildClusters()
        this.clusterManager.collapseAllClusters()

        this.network.on("click", event => {
            let node = LineageOverviewGraphComponent.eventToClickableNode(event)
            if (node)
                this.nodeSelected.emit(node)
            else {
                this.refreshSelectedNode(this.selectedNode)
                let clickedNode = event.nodes[0]
                if (this.network.isCluster(clickedNode)) {
                    this.network.openCluster(clickedNode)
                }
            }
        })

        this.network.on("doubleClick", event => {
            if (event.nodes.length == 1) {
                console.log("DOUBLE CLICK", event.nodes[0])
                let node = LineageOverviewGraphComponent.eventToClickableNode(event)
                if (node) this.nodeActioned.emit(node)
            }
        })

        let canvasElement = this.container.nativeElement.getElementsByTagName("canvas")[0]
        this.network.on('blurNode', () => canvasElement.style.cursor = 'default')
        this.network.on('hoverNode', (event) => {
            if (LineageOverviewGraphComponent.isClickableNodeId(event.node))
                canvasElement.style.cursor = 'pointer'
        })
        this.network.on("beforeDrawing", ctx => {
            this.network.getSelectedNodes().forEach(nodeId => {
                let nodePosition = this.network.getPositions(nodeId)
                ctx.fillStyle = "#f7a263"
                ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 65)
                ctx.fill()
            })
        })
    }

    private refreshSelectedNode(selectedNode: GraphNode) {
        this.network.unselectAll()
        this.network.selectNodes([ID_PREFIXES[selectedNode.type] + selectedNode.id])
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
                <any[]> _(typedMetadataSources)
                    .flatMap((src: ITypedMetaDataSource) => src.datasetsIds.map(dsId => [dsId, src]))
                    .groupBy(_.head).values()
                    .map((pairs: [string, ITypedMetaDataSource][]) => _.sortBy(pairs, ([, src]) => -src.datasetsIds.length)[0])
                    .value()


        let dataSources =
                _.flatMap(lineage.operations, (op: IComposite) =>
                    getIdentifiableDataSourcesOf(op).concat(op.destination)),

            datasetNodes: VisNode[] =
                recombineByDatasetIdAndLongestAppendSequence(dataSources)
                    .map(([datasetId, src]) =>
                        new VisDatasetNode(
                            src,
                            ID_PREFIXES.datasource + datasetId,
                            src.type + ":" + src.path,
                            src.path.substring(src.path.lastIndexOf("/") + 1),
                            LineageOverviewGraphComponent.getIcon(
                                new Icon("fa-file", "\uf15b", "FontAwesome"),
                                datasetId.startsWith(ID_PREFIXES.extra) ? "#c0cdd6" : undefined)
                        )),

            processNodes: VisNode[] = lineage.operations.map((op: IComposite) =>
                new VisProcessNode(
                    op,
                    ID_PREFIXES.operation + op.mainProps.id,
                    op.appName,
                    LineageOverviewGraphComponent.getIcon(getIconForNodeType(typeOfOperation(op)))
                )),

            nodes = processNodes.concat(datasetNodes),

            edges: vis.Edge[] = _.flatMap(lineage.operations, (op: IComposite) => {
                let opNodeId = ID_PREFIXES.operation + op.mainProps.id
                let inputEdges: vis.Edge[] =
                        recombineByDatasetIdAndLongestAppendSequence(getIdentifiableDataSourcesOf(op))
                            .map(([datasetId]) => {
                                let dsNodeId = ID_PREFIXES.datasource + datasetId
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

    static getIcon(icon: Icon, color: string = "#337ab7") {
        return {
            face: icon.font,
            size: 80,
            code: icon.code,
            color: color
        }
    }
}

