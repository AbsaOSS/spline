/*
 * Copyright 2019 ABSA Group Limited
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
import { Injectable } from '@angular/core'
import { ofType, Actions, Effect } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import * as _ from 'lodash'
import { Observable } from 'rxjs'
import { flatMap, map } from 'rxjs/operators'

import { Attribute, OperationDetails } from '../generated/models'
import { OperationsService } from '../generated/services'
import { StrictHttpResponse } from '../generated/strict-http-response'
import { AppState } from '../model/app-state'
import { DataTypeType } from '../model/types/dataTypeType'
import { AttributeVM, StructFieldVM } from '../model/viewModels/attributeVM'
import { DataTypeVM } from '../model/viewModels/dataTypeVM'
import { OperationDetailsVM } from '../model/viewModels/operationDetailsVM'
import { GenericDataTypeVM } from '../model/viewModels/GenericDataTypeVM'
import { handleException } from '../rxjs/operators/handleException'
import * as DetailsInfoAction from '../store/actions/details-info.actions'


@Injectable()
export class DetailsInfoEffects {

    @Effect()
    getDetailsInfo$: Observable<Action> = this.actions$.pipe(
        ofType(DetailsInfoAction.DetailsInfoActionTypes.DETAILS_INFOS_GET),
        flatMap((action: any) => this.getDetailsInfo(action.payload)),
        map(res => new DetailsInfoAction.GetSuccess(res))
    )

    constructor(
        private actions$: Actions,
        private operationsService: OperationsService,
        private store: Store<AppState>
    ) {
        this.store
            .select('config', 'apiUrl')
            .subscribe(apiUrl => this.operationsService.rootUrl = apiUrl)
    }

    private getDetailsInfo = (nodeId: string): Observable<OperationDetailsVM> => {
        return this.operationsService.operationUsingGETResponse(nodeId)
            .pipe(
                map(this.toOperationDetailsView),
                handleException(this.store)
            )
    }

    private toOperationDetailsView = (operationDetailsVMHttpResponse: StrictHttpResponse<OperationDetails>): OperationDetailsVM => {
        const operationDetails = operationDetailsVMHttpResponse.body
        const schemas: Array<Array<AttributeVM>> = operationDetails.schemas.map((attributeRefArray: Array<Attribute>) => {
            const dataTypes = _.keyBy(operationDetails.dataTypes as GenericDataTypeVM[], dt => dt.id)
            return attributeRefArray.map(attRef => {
                const structField = this.getFieldVM(
                    attRef.dataTypeId,
                    dataTypes,
                    attRef.name
                )

                return {
                    id: attRef.id,
                    ...structField
                } as AttributeVM
            }
            )
        })
        return {
            inputs: operationDetails.inputs,
            output: operationDetails.output,
            operation: operationDetails.operation,
            schemas: schemas
        }
    }

    private getFieldVM = (dataTypeId: string, dataTypes: { [id: string]: GenericDataTypeVM }, name: string): StructFieldVM => {
        const dataType = dataTypes[dataTypeId]
        switch (dataType._type) {
            case DataTypeType.Simple:
                return {
                    name: name ? name : dataType._type,
                    dataType: {
                        _type: dataType._type,
                        name: dataType.name
                    } as DataTypeVM
                }
            case DataTypeType.Array:
                return {
                    name: name,
                    dataType: {
                        _type: dataType._type,
                        name: DataTypeType.Array,
                        elementDataType: this.getFieldVM(dataType.elementDataTypeId, dataTypes, name)
                    } as DataTypeVM
                }
            case DataTypeType.Struct:
                return {
                    name: name,
                    dataType: {
                        _type: dataType._type,
                        name: DataTypeType.Struct,
                        children: dataType.fields.map(field => this.getFieldVM(field.dataTypeId, dataTypes, field.name))
                    } as DataTypeVM
                }
        }
    }
}
