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

import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IDataLineage} from "../../../generated-ts/lineage-model";
import "vis/dist/vis.min.css";
import * as vis from "vis";
import * as _ from "lodash";
import {Observable} from "rxjs/Observable";
import {Icon} from "../../lineage/details/operation/operation-icon.utils";
import {IComposite, ITypedMetaDataSource} from "../../../generated-ts/operation-model";
import {typeOfOperation} from "../../lineage/types";

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
            this.lineage$.first()
                .concat(this.lineage$)
                .pairwise()

        Observable
            .combineLatest(lineagePairs$, this.selectedNode$)
            .filter(([[__, lineage], selectedNode]) => lineageContainsDataset(lineage, selectedNode.id))
            .distinctUntilChanged(([[__, lin0], node0], [[___, lin1], node1]) => lin0.id == lin1.id && _.isEqual(node0, node1))
            .subscribe(([[prevLineage, nextLineage], selectedNode]) => reactOnChange(prevLineage, nextLineage, selectedNode))
    }

    public fit() {
        this.network.fit()
    }

    private static eventToClickableNode(event: any): GraphNode {
        let nodeIdWithPrefix = event.nodes.length && event.nodes[0]
        return LineageOverviewGraphComponent.isClickableNodeId(nodeIdWithPrefix)
            && {
                id: nodeIdWithPrefix.substring(ID_PREFIX_LENGTH),
                type: (nodeIdWithPrefix.substring(0, ID_PREFIX_LENGTH) == ID_PREFIXES.operation) ? "operation" : "datasource"
            }
    }

    private static isClickableNodeId(nodeId: string): boolean {
        const nonClickablePrefix = ID_PREFIXES.datasource + ID_PREFIXES.extra
        return nodeId && !nodeId.startsWith(nonClickablePrefix)
    }

    private rebuildGraph(lineage: IDataLineage) {
        let graph = LineageOverviewGraphComponent.buildVisModel(lineage)
        this.network = new vis.Network(this.container.nativeElement, graph, visOptions)

        this.network.on("click", event => {
            let node = LineageOverviewGraphComponent.eventToClickableNode(event)
            if (node) this.nodeSelected.emit(node)
            else this.refreshSelectedNode(this.selectedNode)
        })

        this.network.on("doubleClick", event => {
            let node = LineageOverviewGraphComponent.eventToClickableNode(event)
            if (node) this.nodeActioned.emit(node)
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

    private static buildVisModel(lineage: IDataLineage): vis.Data {
        const getIdentifiableDataSourcesOf =
            (op: IComposite): ITypedMetaDataSource[] =>
                op.sources.map((src, i) =>
                    !src.datasetId
                        ? _.assign({datasetId: ID_PREFIXES.extra + i + "_" + op.mainProps.id}, src)
                        : src)

        let dataSources = (<any>_(lineage.operations))
                .flatMap((op: IComposite) => getIdentifiableDataSourcesOf(op).concat(op.destination))
                .uniqBy("datasetId")
                .value(),
            datasetNodes: vis.Node[] = dataSources.map((src: ITypedMetaDataSource) => ({
                id: ID_PREFIXES.datasource + src.datasetId,
                title: src.type + ":" + src.path,
                label: src.path.substring(src.path.lastIndexOf("/") + 1),
                icon: LineageOverviewGraphComponent.getIcon(
                    new Icon("fa-file", "\uf15b", "FontAwesome"),
                    src.datasetId.startsWith(ID_PREFIXES.extra) ? "#c0cdd6" : undefined)
            })),
            operationNodes: vis.Node[] = lineage.operations.map((op: IComposite) => ({
                id: ID_PREFIXES.operation + op.mainProps.id,
                label: op.appName,
                icon: LineageOverviewGraphComponent.getIcon(Icon.getIconForNodeType(typeOfOperation(op)))
            })),
            edges: vis.Edge[] = _.flatMap(lineage.operations, (op: IComposite) => {
                let opNodeId = ID_PREFIXES.operation + op.mainProps.id
                let inputEdges: vis.Edge[] = getIdentifiableDataSourcesOf(op).map((src: ITypedMetaDataSource) => {
                        let dsNodeId = ID_PREFIXES.datasource + src.datasetId
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

        return {
            nodes: new vis.DataSet<vis.Node>(operationNodes.concat(datasetNodes)),
            edges: new vis.DataSet<vis.Edge>(edges)
        }
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

export type GraphNodeType = ( "operation" | "datasource" )

export interface GraphNode {
    type: GraphNodeType
    id: string
}

const ID_PREFIX_LENGTH = 3
const ID_PREFIXES = {
    operation: "op_",
    datasource: "ds_",
    extra: "ex_"
}

const visOptions = {
    autoResize: true,
    interaction: {
        hover: true,
        selectConnectedEdges: false,
        hoverConnectedEdges: false
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
            springLength: 150,
            springConstant: 10,
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
}

