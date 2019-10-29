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
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { empty, Observable } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { Attribute, DataType, OperationDetails } from '../generated/models';
import { OperationDetailsControllerService } from '../generated/services';
import { StrictHttpResponse } from '../generated/strict-http-response';
import { AppState } from '../model/app-state';
import { AttributeType } from '../model/types/attributeType';
import { AttributeVM } from '../model/viewModels/attributeVM';
import { DataTypeVM } from '../model/viewModels/dataTypeVM';
import { GenericDataTypeVM } from '../model/viewModels/GenericDataTypeVM';
import { OperationDetailsVM } from '../model/viewModels/operationDetailsVM';
import * as DetailsInfoAction from '../store/actions/details-info.actions';
import * as ErrorActions from '../store/actions/error.actions';
import { handleError } from '../store/reducers/error.reducer';


@Injectable()
export class DetailsInfoEffects {

    constructor(
        private actions$: Actions,
        private operationDetailsControllerService: OperationDetailsControllerService,
        private store: Store<AppState>
    ) {
        this.store
            .select('config', 'apiUrl')
            .subscribe(apiUrl => this.operationDetailsControllerService.rootUrl = apiUrl)
    }

    @Effect()
    public getDetailsInfo$: Observable<Action> = this.actions$.pipe(
        ofType(DetailsInfoAction.DetailsInfoActionTypes.DETAILS_INFOS_GET),
        flatMap((action: any) => this.getDetailsInfo(action.payload)),
        map(res => new DetailsInfoAction.GetSuccess(res))
    )


    private getDetailsInfo = (nodeId: string): Observable<OperationDetailsVM> => {
        return this.operationDetailsControllerService.operationUsingGETResponse(nodeId).pipe(
            map(this.toOperationDetailsView),
            catchError(err => {
                this.store.dispatch(new ErrorActions.ServiceErrorGet(handleError(err)))
                return empty()
            })
        )
    }

    private toOperationDetailsView = (operationDetailsVMHttpResponse: StrictHttpResponse<OperationDetails>): OperationDetailsVM => {
        const operationDetailsVm = {} as OperationDetailsVM
        operationDetailsVm.inputs = operationDetailsVMHttpResponse.body.inputs
        operationDetailsVm.output = operationDetailsVMHttpResponse.body.output
        operationDetailsVm.operation = operationDetailsVMHttpResponse.body.operation

        const schemas: Array<Array<AttributeVM>> = []
        _.each(operationDetailsVMHttpResponse.body.schemas, (attributeRefArray: Array<Attribute>) => {
            const attributes = _.map(attributeRefArray, attRef => this.getAttribute(attRef.dataTypeId, operationDetailsVMHttpResponse.body.dataTypes, attributeRefArray, attRef.name))
            schemas.push(attributes)
        })
        operationDetailsVm.schemas = schemas
        return operationDetailsVm
    }

    private getAttribute = (attributeId: string, dataTypes: Array<DataType>, attributeRefArray: Array<Attribute>, attributeName: string = null): AttributeVM => {
        const dataType = this.getDataType(dataTypes, attributeId)
        const attribute = {} as AttributeVM
        const dataTypeVM = {} as DataTypeVM
        dataTypeVM._type = dataType._type
        dataTypeVM.name = dataType.name

        switch (dataType._type) {
            case AttributeType.Simple:
                attribute.name = attributeName ? attributeName : dataType._type
                attribute.dataType = dataTypeVM
                return attribute
            case AttributeType.Array:
                attribute.name = attributeName
                dataTypeVM.elementDataType = this.getAttribute(dataType.elementDataTypeId, dataTypes, attributeRefArray, attributeName)
                dataTypeVM.name = AttributeType.Array
                attribute.dataType = dataTypeVM
                return attribute
            case AttributeType.Struct:
                attribute.name = attributeName
                dataTypeVM.children = [] as Array<AttributeVM>
                _.each(dataType.fields, (attributeRef: Attribute) => {
                    dataTypeVM.children.push(this.getAttribute(attributeRef.dataTypeId, dataTypes, attributeRefArray, attributeRef.name))
                })
                dataTypeVM.name = AttributeType.Struct
                attribute.dataType = dataTypeVM
                return attribute
        }
    }

    private getDataType = (dataTypes: Array<DataType>, dataTypeId: string): GenericDataTypeVM => {
        return _.find(dataTypes, (dt: GenericDataTypeVM) => dt.id == dataTypeId)
    }

}
