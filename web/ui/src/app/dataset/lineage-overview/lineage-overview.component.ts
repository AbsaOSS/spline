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

import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {IAttribute, IDataLineage} from "../../../generated-ts/lineage-model";
import {Observable} from "rxjs/Observable";
import * as _ from "lodash";
import {GraphNode, GraphNodeType} from "./lineage-overview.model";
import {IComposite, ITypedMetaDataSource} from "../../../generated-ts/operation-model";
import {LineageAccessors} from "../../lineage/lineage.store";
import {getCompositeIcon} from '../../lineage/details/operation/operation-icon.utils';

@Component({
    templateUrl: "lineage-overview.component.html",
    styleUrls: ["lineage-overview.component.less"]
})

export class DatasetLineageOverviewComponent {

    lineage$: Observable<IDataLineage>
    selectedNode$: Observable<GraphNode>

    selectedDataSourceDescription: DataSourceDescription
    selectedOperation: IComposite

    constructor(private route: ActivatedRoute, private router: Router) {
        this.lineage$ = route.data.map((data: { lineage: IDataLineage }) => data.lineage)

        this.selectedNode$ =
            Observable.combineLatest(
                route.fragment,
                route.parent.data
            ).map(([fragment, data]) =>
                <GraphNode>{
                    type: fragment,
                    id: data.dataset.datasetId
                })

        let lineageAccessors$ = this.lineage$.map(lin => new LineageAccessors(lin))

        Observable
            .combineLatest(lineageAccessors$, this.selectedNode$)
            .filter(([linAccessors, selectedNode]) => !!linAccessors.getDataset(selectedNode.id))
            .distinctUntilChanged(([la0, node0], [la1, node1]) => la0.lineage.id == la1.lineage.id && _.isEqual(node0, node1))
            .subscribe(([linAccessors, selectedNode]) => this.updateSelectedState(linAccessors, selectedNode))
    }

    private updateSelectedState(linAccessors: LineageAccessors, node: GraphNode) {
        let compositeOp = <IComposite> linAccessors.getOperation(node.id)
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
                    schema: {attrs: attrs},
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

    getSelectedOperationIcon(): string {
        return getCompositeIcon(this.selectedOperation).name
    }
}

interface DataSourceDescription {
    source: ITypedMetaDataSource
    schema: { attrs: IAttribute[] }
    timestamp: number
}
