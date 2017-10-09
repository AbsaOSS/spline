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

import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {IAttribute, IDataLineage, IMetaDataset, IOperation} from "../../../../generated-ts/lineage-model";
import {LineageStore} from "../../lineage.store";
import {Icon} from "./operation-icon.utils";
import {OperationType, typeOfExpr, typeOfOperation} from "../../types";
import {IExpression} from "../../../../generated-ts/operation-model";
import * as _ from "lodash";

@Component({
    selector: "operation-details",
    templateUrl: 'operation-details.component.html',
    styleUrls: ['operation-details.component.less']
})
export class OperationDetailsComponent implements OnInit, OnChanges {

    constructor(private lineageStore: LineageStore) {
    }

    @Input() operation: IOperation

    private operationType: OperationType
    private lineage: IDataLineage
    private datasetById: { [id: string]: IMetaDataset }
    private attributeById: { [id: string]: IAttribute }

    ngOnInit(): void {
        this.lineageStore.lineage$.subscribe(lineage => {
            this.lineage = lineage
            this.datasetById = _.mapValues(_.groupBy(lineage.datasets, "id"), _.first)
            this.attributeById = _.mapValues(_.groupBy(lineage.attributes, "id"), _.first)
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.operationType = typeOfOperation(this.operation)
    }

    getOperationIcon() {
        return Icon.getIconForNodeType(this.operationType).name
    }

    //noinspection JSMethodCanBeStatic
    getExprType(expr: IExpression) {
        return typeOfExpr(expr)
    }

    getDatasetAttributes(dsId: string): IAttribute[] {
        return this.datasetById[dsId].schema.attrs.map(attrId => this.attributeById[attrId])
    }

    // @Input() selectedAttrIDs: number[]

    // @Output() attributeSelected = new EventEmitter<IAttribute>()
    // @Output() fullAttributeSchemaRequested = new EventEmitter<IAttribute>()

    // nodeType: OperationType

    /*

     selectAttribute(attr: IAttribute) {
     this.attributeSelected.emit(attr)
     }

     showFullAttributeSchema(attr: IAttribute) {
     this.fullAttributeSchemaRequested.emit(attr)
     }
     */
}