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

import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IAttribute, IDataLineage } from "../../../generated-ts/lineage-model";
import { combineLatest, Observable, Subscription } from "rxjs";
import * as _ from "lodash";
import { GraphNode, GraphNodeType } from "./lineage-overview.model";
import { IComposite, ITypedMetaDataSource } from "../../../generated-ts/operation-model";
import { LineageAccessors, LineageStore } from "../../lineage/lineage.store";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { getCompositeIcon, getDatasetIcon, ProcessingType } from '../../lineage/details/operation/operation-icon.utils';

@Component({
    templateUrl: "lineage-overview.component.html",
    styleUrls: ["lineage-overview.component.less"],
    providers: [LineageStore]
})

export class DatasetLineageOverviewComponent implements OnInit, OnDestroy {

    selectedNode$: Observable<GraphNode>

    selectedDataSourceDescription: DataSourceDescription
    selectedOperation: IComposite

    private subscriptions: Subscription[] = []

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private lineageStore: LineageStore) {
    }

    ngOnInit(): void {
        this.subscriptions.unshift(
            this.route.data.subscribe((data: { lineage: IDataLineage }) =>
                this.lineageStore.lineage = data.lineage))

        this.selectedNode$ =
            combineLatest(
                this.route.fragment,
                this.route.parent.data
            ).pipe(map(([fragment, data]) =>
                <GraphNode>{
                    type: fragment,
                    id: data.dataset.datasetId
                }))

        let lineageAccessors$ = this.lineageStore.lineage$.pipe(map(lin => new LineageAccessors(lin)))

        this.subscriptions.unshift(combineLatest(lineageAccessors$, this.selectedNode$)
            .pipe(
                filter(([linAccessors, selectedNode]) => !!linAccessors.getDataset(selectedNode.id)),
                distinctUntilChanged(([la0, node0], [la1, node1]) => la0.lineage.id == la1.lineage.id && _.isEqual(node0, node1)))
            .subscribe(([linAccessors, selectedNode]) => this.updateSelectedState(linAccessors, selectedNode)))
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe())
    }

    private updateSelectedState(linAccessors: LineageAccessors, node: GraphNode) {
        let compositeOp = <IComposite>linAccessors.getOperation(node.id)
        switch (node.type) {
            case "operation":
                this.selectedDataSourceDescription = undefined
                this.selectedOperation = compositeOp
                break
            case "datasource":
                let selectedDataset = linAccessors.getDataset(node.id),
                    attrs = selectedDataset.schema.attrs.map(attrId => linAccessors.getAttribute(attrId))
                this.selectedDataSourceDescription = {
                    source: compositeOp.destination,
                    schema: { attrs: attrs },
                    timestamp: compositeOp.timestamp
                }
                this.selectedOperation = undefined
                break
        }
    }

    selectNode(nodeId: string, nodeType: GraphNodeType): void {
        switch (nodeType) {
            case "operation":
            case "datasource":
                if (this.isOverviewNotIntervalView()) {
                    this.navigateToDatasource(nodeId, "overview", nodeType)
                } else {
                    this.navigateToDatasource(nodeId, "interval", nodeType)
                }
        }
    }

    isOverviewNotIntervalView(): boolean {
        return this.router.url.replace(/[#?].*$/, "").endsWith("/overview")
    }

    private navigateToDatasource(datasetId: string, view: "interval" | "overview", nodeType: GraphNodeType): void {
        this.router.navigate(
            ["dataset", datasetId, "lineage", view], {
                relativeTo: this.route.parent.parent.parent,
                fragment: nodeType,
                queryParamsHandling: 'merge'
            })
    }

    gotoPartialLineage(dsId: string) {
        this.router.navigate(
            ["dataset", dsId, "lineage", "partial"], {
                relativeTo: this.route.parent.parent.parent,
                queryParamsHandling: 'merge'
            })
    }

    getSelectedOperationProcessingType(): ProcessingType {
        if (this.selectedOperation.isBatchNotStream) {
            return "Batch"
        } else {
            return "Stream"
        }
    }
    getSelectedOperationIcon(): string {
        return getCompositeIcon(this.selectedOperation).name
    }
    getSelectedSourceIcon(): string {
        return getDatasetIcon(this.selectedDataSourceDescription.source.type).name
    }
}

interface DataSourceDescription {
    source: ITypedMetaDataSource
    schema: { attrs: IAttribute[] }
    timestamp: number
}
