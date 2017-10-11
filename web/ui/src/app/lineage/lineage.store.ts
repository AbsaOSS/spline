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

import {Injectable} from "@angular/core";
import {IAttribute, IDataLineage, IMetaDataset, IOperation} from "../../generated-ts/lineage-model";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";
import * as _ from "lodash";

@Injectable()
export class LineageStore {

    private _lineage$: Subject<IDataLineage> = new ReplaySubject()

    private operationById: { [id: string]: IOperation }
    private datasetById: { [id: string]: IMetaDataset }
    private attributeById: { [id: string]: IAttribute }
    private operationIdsByAttributeId: { [id: string]: string }

    public get lineage$(): Observable<IDataLineage> {
        return this._lineage$
    }

    public set lineage(lineage: IDataLineage) {
        this._lineage$.next(lineage)
        this.operationById = _.mapValues(_.groupBy(lineage.operations, "mainProps.id"), _.first)
        this.datasetById = _.mapValues(_.groupBy(lineage.datasets, "id"), _.first)
        this.attributeById = _.mapValues(_.groupBy(lineage.attributes, "id"), _.first)

        this.operationIdsByAttributeId = (<any>_(lineage.operations))
            .flatMap((op: IOperation) => {
                let opDatasetIds = op.mainProps.inputs.concat(op.mainProps.output)
                let opAttrIds = _.uniq(_.flatMap(opDatasetIds, dsId => this.datasetById[dsId].schema.attrs))
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

    public getOperationIdsByAnyAttributeId(...attrIds: string[]): string[] {
        return _.uniq(_.flatMap(attrIds, attrId => this.operationIdsByAttributeId[attrId]))
    }
}