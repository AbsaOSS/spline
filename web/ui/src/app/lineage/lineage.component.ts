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

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {IAttribute, IDataLineage, IOperation} from "../../generated-ts/lineage-model";
import {LineageStore} from "./lineage.store";
import {OperationType, typeOfOperation} from "./types";
import * as _ from "lodash";
import {MatTabChangeEvent} from "@angular/material";
import {Tab} from "./tabs";

@Component({
    templateUrl: 'lineage.component.html',
    styleUrls: ['lineage.component.less'],
    providers: [LineageStore]
})
export class LineageComponent implements OnInit {
    lineage: IDataLineage
    selectedTabIndex: Tab = Tab.Summary
    selectedOperation?: IOperation
    attributeToShowFullSchemaFor?: IAttribute
    selectedAttrIDs: string[]
    highlightedNodeIDs: string[]

    hideableOperationTypes: OperationType[] = ['Projection', 'Filter', 'Sort', 'Aggregate']
    presentHideableOperationTypes: OperationType[]
    hiddenOperationTypes: OperationType[]

    isOperationTypeVisible(opType: OperationType) {
        return this.hiddenOperationTypes.indexOf(opType) < 0
    }

    constructor(private router: Router,
                private route: ActivatedRoute,
                private lineageStore: LineageStore) {
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: { lineage: IDataLineage }) => {
            this.lineage = data.lineage
            this.lineageStore.lineage = data.lineage
            this.presentHideableOperationTypes =
                _.intersection(
                    _.uniq(data.lineage.operations.map(typeOfOperation)),
                    this.hideableOperationTypes)
        })

        this.route.paramMap.subscribe(pm => {
            let opId = pm.get("operationId")
            this.selectedOperation = this.lineageStore.lineageAccessors.getOperation(opId)
        })

        this.route.queryParamMap.subscribe(qps => {
            this.selectedAttrIDs = qps.getAll("attr")
            this.highlightedNodeIDs = this.lineageStore.lineageAccessors.getOperationIdsByAnyAttributeId(...this.selectedAttrIDs)
            this.attributeToShowFullSchemaFor = this.lineageStore.lineageAccessors.getAttribute(qps.get("attrSchema"))
            this.hiddenOperationTypes = <OperationType[]> qps.getAll("hideOp")
        })

        this.route.fragment.subscribe(fragment => {
            this.selectedTabIndex = Tab.fromFragment(fragment).valueOr(this.selectedTabIndex)
        })
    }

    getDataSourceCount() {
        return _.sumBy(this.lineage.operations, node => +(typeOfOperation(node) == 'Read'))
    }

    onOperationSelected(opId: string) {
        if (opId)
            this.router.navigate(["op", opId], {
                    relativeTo: this.route.parent,
                    fragment: Tab.toFragment(Tab.Operation),
                    queryParams: {attrSchema: []},
                    queryParamsHandling: "merge"
                }
            )
        else
            this.router.navigate(["."], {
                    relativeTo: this.route.parent,
                    fragment: Tab.toFragment(Tab.Summary),
                    queryParams: {attrSchema: []},
                    queryParamsHandling: "merge"
                }
            )
    }

    onTabChanged(e: MatTabChangeEvent) {
        this.router.navigate([], {
            fragment: Tab.toFragment(e.index),
            queryParamsHandling: "preserve"
        })

    }

    onFullAttributeSchemaRequested(attr: IAttribute) {
        this.router.navigate([], {
            fragment: Tab.toFragment(Tab.Attribute),
            queryParams: {'attrSchema': attr.id},
            queryParamsHandling: "merge"
        })
    }

    onAttributeSelected(attr: IAttribute) {
        this.doSelectAttribute(attr.id)
    }

    clearSelection() {
        this.doSelectAttribute()
    }

    gotoLineageOverview() {
        this.router.navigate(["overview"], {
            fragment: "datasource",
            relativeTo: this.route.parent.parent
        })
    }

    private doSelectAttribute(...attrIds: string[]) {
        this.router.navigate([], {
            queryParams: {'attr': attrIds},
            queryParamsHandling: "merge",
            preserveFragment: true
        })
    }

    toggleOperationTypeVisibility(opType: OperationType) {
        let otherHiddenOpTypes = _.without(this.hiddenOperationTypes, opType),
            updatedHiddenOperationTypes = (this.hiddenOperationTypes.length > otherHiddenOpTypes.length)
                ? otherHiddenOpTypes
                : this.hiddenOperationTypes.concat(opType)

        this.router.navigate([], {
            queryParams: {'hideOp': updatedHiddenOperationTypes},
            queryParamsHandling: "merge",
            preserveFragment: true
        })
    }
}