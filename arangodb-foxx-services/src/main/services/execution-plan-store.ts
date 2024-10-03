/*
 * Copyright 2020 ABSA Group Limited
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


import { ExecutionPlanPersistentModel } from '../../external/persistence-api.model'
import { DataSourceActionType } from '../../external/consumer-api.model'
import { CollectionName, EdgeCollectionName, NodeCollectionName, WriteTxInfo } from '../persistence/model'
import { checkKeyExistence, store } from '../persistence/store'
import { withTimeTracking } from '../utils/common'
import { TxTemplate } from '../persistence/txm/tx-template'
import { DocumentKey } from '../model'
import { DataSourceActionTypeValue } from './model'
import { aql, db } from '@arangodb'
import { AQLCodeGenHelper } from '../utils/aql-gen-helper'
import { TxManager } from '../persistence/txm'


export function checkExecutionPlanExists(planKey: DocumentKey, discriminator: string): boolean {
    return checkKeyExistence(
        NodeCollectionName.ExecutionPlan,
        planKey,
        discriminator
    )
}

export function storeExecutionPlan(eppm: ExecutionPlanPersistentModel): void {
    const execPlanKey = eppm.executionPlan._key
    withTimeTracking(`STORE PLAN ${execPlanKey}`, () => {
        const txTemplate = new TxTemplate(
            `${CollectionName.ExecutionPlan}/${execPlanKey}`,
            {
                execPlanInfo: {
                    _key: execPlanKey,
                }
            })

        txTemplate.doWrite((txInfo: WriteTxInfo) => {
            // execution plan
            store.insertOne(eppm.executes, CollectionName.Executes, txInfo)
            store.insertMany(eppm.depends, CollectionName.Depends, txInfo)
            store.insertOne(eppm.affects, CollectionName.Affects, txInfo)
            store.insertOne(eppm.executionPlan, CollectionName.ExecutionPlan, txInfo)

            // operation
            store.insertMany(eppm.operations, CollectionName.Operation, txInfo)
            store.insertMany(eppm.follows, CollectionName.Follows, txInfo)
            store.insertMany(eppm.readsFrom, CollectionName.ReadsFrom, txInfo)
            store.insertOne(eppm.writesTo, CollectionName.WritesTo, txInfo)
            store.insertMany(eppm.emits, CollectionName.Emits, txInfo)
            store.insertMany(eppm.uses, CollectionName.Uses, txInfo)
            store.insertMany(eppm.produces, CollectionName.Produces, txInfo)

            // schema
            store.insertMany(eppm.schemas, CollectionName.Schema, txInfo)
            store.insertMany(eppm.consistsOf, CollectionName.ConsistsOf, txInfo)

            // attribute
            store.insertMany(eppm.attributes, CollectionName.Attribute, txInfo)
            store.insertMany(eppm.computedBy, CollectionName.ComputedBy, txInfo)
            store.insertMany(eppm.derivesFrom, CollectionName.DerivesFrom, txInfo)

            // expression
            store.insertMany(eppm.expressions, CollectionName.Expression, txInfo)
            store.insertMany(eppm.takes, CollectionName.Takes, txInfo)
        })
    })
}

export function getDataSourceURIsByActionType(planKey: DocumentKey, access: DataSourceActionTypeValue): string[] {
    const rtxInfo = TxManager.startRead()
    const aqlGen = new AQLCodeGenHelper(rtxInfo)

    let edges: EdgeCollectionName[]
    if (access === DataSourceActionType.Read.name) {
        edges = [EdgeCollectionName.Depends]
    }
    else if (access === DataSourceActionType.Write.name) {
        edges = [EdgeCollectionName.Affects]
    }
    else {
        edges = [EdgeCollectionName.Depends, EdgeCollectionName.Affects]
    }

    return db._query(aql`
        WITH ${aql.literal([...edges, NodeCollectionName.DataSource].join(', '))}
        FOR ds IN 1..1
            OUTBOUND DOCUMENT('executionPlan', ${planKey}) ${aql.literal(edges.join(', '))}
            ${aqlGen.genTxIsolationCodeForTraversal('ds')}
            RETURN ds.uri
    `).toArray()
}
