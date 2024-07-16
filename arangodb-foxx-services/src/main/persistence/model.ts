/*
 * Copyright 2022 ABSA Group Limited
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


import { DocumentKey } from '../model'
import { ExecutionPlan, Progress } from '../../external/api.model'
import Document = ArangoDB.Document


export enum AuxCollectionName {
    DbVersion = 'dbVersion',
    Counter = 'counter',
    TxInfo = 'txInfo',
}

export enum NodeCollectionName {
    DataSource = 'dataSource',
    ExecutionPlan = 'executionPlan',
    Operation = 'operation',
    Progress = 'progress',
    Schema = 'schema',
    Attribute = 'attribute',
    Expression = 'expression',
}

export enum EdgeCollectionName {
    Follows = 'follows',
    WritesTo = 'writesTo',
    ReadsFrom = 'readsFrom',
    Executes = 'executes',
    Depends = 'depends',
    Affects = 'affects',
    ProgressOf = 'progressOf',
    Emits = 'emits',
    Produces = 'produces',
    ConsistsOf = 'consistsOf',
    ComputedBy = 'computedBy',
    DerivesFrom = 'derivesFrom',
    Takes = 'takes',
    Uses = 'uses',
}

export const DataCollectionName = {
    ...NodeCollectionName,
    ...EdgeCollectionName,
}

export type DataCollectionName =
    | NodeCollectionName
    | EdgeCollectionName

export const CollectionName = {
    ...AuxCollectionName,
    ...DataCollectionName,
}

export type CollectionName =
    | AuxCollectionName
    | DataCollectionName

export function edge(fromCollectionName, fromKey, toCollectionName, toKey, key: DocumentKey = undefined): Partial<ArangoDB.Edge> {
    return {
        _key: key,
        _from: `${fromCollectionName}/${fromKey}`,
        _to: `${toCollectionName}/${toKey}`,
    }
}

/**
 * Atomic counter record
 */
export type Counter = Document & {
    curVal: number
}

/**
 * Unique logical transaction identifier
 */
export type TxId = string

/**
 * Global sequential number - used for determining transaction position on a sequential time axis.
 */
export type TxNum = number

/**
 * WRITE transaction metadata stored in any persistent entity covered by the logical transaction management layer
 */
export type WriteTxInfo = {
    num: TxNum
    uid: TxId
    params: TxParams
}

export type ReadTxInfo = {
    num: TxNum
    liveTxIds: TxId[]
}

export enum TxEvent {
    StartWrite = 'TX_START_WRITE',
    PreCommit = 'TX_PRE_COMMIT',
    PostCommit = 'TX_POST_COMMIT',
    PreRollback = 'TX_PRE_ROLLBACK',
    PostRollback = 'TX_POST_ROLLBACK',
}

export type TxParams = Partial<{
    execPlanInfo: Partial<ExecutionPlan>,
    execEventInfo: Partial<Progress>,
}>

export type TxAwareDocument = {
    _txInfo?: WriteTxInfo
}
