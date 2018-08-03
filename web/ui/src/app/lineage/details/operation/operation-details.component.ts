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

import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {IAttribute, IOperation} from "../../../../generated-ts/lineage-model";
import {LineageStore} from "../../lineage.store";
import {OperationType, typeOfExpr, typeOfOperation} from "../../types";
import {IExpression} from "../../../../generated-ts/operation-model";
import {getIconForNodeType} from "./operation-icon.utils";

@Component({
    selector: "operation-details",
    templateUrl: 'operation-details.component.html',
    styleUrls: ['operation-details.component.less']
})
export class OperationDetailsComponent implements OnChanges {

    constructor(private lineageStore: LineageStore) {
    }

    @Input() operation: IOperation
    @Input() selectedAttrIDs: string[]

    @Output() attributeSelected = new EventEmitter<IAttribute>()

    private operationType: OperationType

    keys(object: { [key: string]: any }) {
        return Object.keys(object)
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.operationType = typeOfOperation(this.operation)
    }

    getOperationIcon() {
        return getIconForNodeType(this.operationType).name
    }

    //noinspection JSMethodCanBeStatic
    getExprType(expr: IExpression) {
        return typeOfExpr(expr)
    }

    getAttribute(id: string): IAttribute {
        return this.lineageStore.lineageAccessors.getAttribute(id)
    }

    getDatasetAttributes(dsId: string): IAttribute[] {
        let dataset = this.lineageStore.lineageAccessors.getDataset(dsId)
        return dataset.schema.attrs.map(attrId => this.lineageStore.lineageAccessors.getAttribute(attrId))
    }

    selectAttribute(attrId: string) {
        this.attributeSelected.emit(this.lineageStore.lineageAccessors.getAttribute(attrId))
    }

}