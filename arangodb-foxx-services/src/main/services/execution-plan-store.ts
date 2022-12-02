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


import { ExecutionPlanPersistentModel } from '../../external/api.model'
import { CollectionName, WriteTxInfo } from '../persistence/model'
import { store } from './store'
import { withTimeTracking } from '../utils/common'
import { TxManager } from './TxManager'


export function storeExecutionPlan(eppm: ExecutionPlanPersistentModel): void {
    withTimeTracking(`STORE PLAN ${eppm.executionPlan._key}`, () => {
        const txInfo: WriteTxInfo = TxManager.startWrite({
            execPlanKey: eppm.executionPlan._key
        })

        try {
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

            TxManager.commit(txInfo)

        }
        catch (e) {
            TxManager.rollback(txInfo)
            throw e
        }
    })
}

