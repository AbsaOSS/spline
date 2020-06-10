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
import { OperationType } from '../model/types/operation-type'


export function getWriteOperationIdFromExecutionId(executionId: string): string {
    return `${executionId}:0`
}

export const operationIconCodes: Map<string, number> = new Map([
    [OperationType.Projection, 0xf13a],
    [OperationType.LogicalRelation, 0xf1c0],
    [OperationType.Join, 0xf126],
    [OperationType.Union, 0xf0c9],
    [OperationType.Filter, 0xf0b0],
    [OperationType.Sort, 0xf161],
    [OperationType.Aggregate, 0xf1ec],
    [OperationType.Write, 0xf0c7],
    [OperationType.Alias, 0xf02b],
    [OperationType.Generic, 0xf111]
])


export const operationColorCodes: Map<string, string> = new Map([
    [OperationType.Projection, '#337AB7'],
    [OperationType.LogicalRelation, '#e39255'],
    [OperationType.Join, '#e39255'],
    [OperationType.Union, '#337AB7'],
    [OperationType.Filter, '#F04100'],
    [OperationType.Sort, '#E0E719'],
    [OperationType.Aggregate, '#008000'],
    [OperationType.Write, '#333333'],
    [OperationType.Alias, '#337AB7'],
    [OperationType.Generic, '#337AB7']
])


export function getOperationIcon(operationType: string, operationName: string): string {
    return operationType === OperationType.Write ?
        String.fromCharCode(operationIconCodes.get(OperationType.Write)) :
        String.fromCharCode(operationIconCodes.get(operationName) || operationIconCodes.get(OperationType.Generic))
}

export function getOperationColor(operationType: string, operationName: string): string {
    return operationType === OperationType.Write ?
        operationColorCodes.get(OperationType.Write) :
        operationColorCodes.get(operationName) || operationColorCodes.get(OperationType.Generic)
}
