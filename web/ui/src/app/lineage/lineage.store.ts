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

import { Injectable } from "@angular/core";
import { IAttribute, IDataLineage, IDataType, IMetaDataset, IOperation } from "../../generated-ts/lineage-model";
import { Observable, ReplaySubject, Subject } from "rxjs";
import * as _ from "lodash";
import { typeOfOperation } from "./types";

@Injectable()
export class LineageStore {

    private _lineage$: Subject<IDataLineage> = new ReplaySubject(1)

    public get lineage$(): Observable<IDataLineage> {
        return this._lineage$
    }

    public set lineage(lineage: IDataLineage) {
        this._lineageAccessors = new LineageAccessors(lineage)
        this._lineage$.next(lineage)
    }

    private _lineageAccessors: LineageAccessors

    public get lineageAccessors(): LineageAccessors {
        return this._lineageAccessors
    }
}

export class LineageAccessors {
    private readonly operationById: { [id: string]: IOperation }
    private readonly datasetById: { [id: string]: IMetaDataset }
    private readonly attributeById: { [id: string]: IAttribute }
    private readonly operationIdsByAttributeId: { [id: string]: string }
    private readonly dataTypesById: { [id: string]: IDataType }

    constructor(public lineage: IDataLineage) {
        this.operationById = _.mapValues(_.groupBy(lineage.operations, "mainProps.id"), _.first)
        this.datasetById = _.mapValues(_.groupBy(lineage.datasets, "id"), _.first)
        this.attributeById = _.mapValues(_.groupBy(lineage.attributes, "id"), _.first)
        this.dataTypesById = _.mapValues(_.groupBy(lineage.dataTypes, "id"), _.first)

        this.operationIdsByAttributeId = (<any>_(lineage.operations))
            .flatMap((op: IOperation) => {
                // Read operation reads from external datasets that are not part of the current lineage and can be ignored.
                let opInputIds = typeOfOperation(op) != "BatchRead" && typeOfOperation(op) != "StreamRead" ? op.mainProps.inputs : [],
                    opOutputId = op.mainProps.output,
                    opDatasetIds = opInputIds.concat(opOutputId),
                    opAttrIds = _.uniq(_.flatMap(opDatasetIds, dsId => this.datasetById[dsId].schema.attrs))
                return opAttrIds.map(attrId => [attrId, op.mainProps.id])
            })
            .groupBy(_.first)
            .mapValues(_.partial(_.map, _, _.last))
            .value()
    }

    public getOperation(opId: string) {
        return this.operationById[opId]
    }

    public getDataset(dsId: string) {
        return this.datasetById[dsId]
    }

    public getAttribute(attrId: string) {
        return this.attributeById[attrId]
    }

    public getDataType(typeId: string) {
        return this.dataTypesById[typeId]
    }

    public getOperationIdsByAnyAttributeId(...attrIds: string[]): string[] {
        return _.uniq(_.flatMap(attrIds, attrId => this.operationIdsByAttributeId[attrId]))
    }

}