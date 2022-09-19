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
import { CollectionName } from '../persistence/model'
import { store } from './store'
import { withTimeTracking } from '../utils/common'


export function storeExecutionPlan(eppm: ExecutionPlanPersistentModel): void {
    withTimeTracking(`STORE PLAN ${eppm.executionPlan._key}`, () => {
        // todo: start TX

        // execution plan
        store.insertOne(eppm.executes, CollectionName.Executes)
        store.insertMany(eppm.depends, CollectionName.Depends)
        store.insertOne(eppm.affects, CollectionName.Affects)
        store.insertOne(eppm.executionPlan, CollectionName.ExecutionPlan)

        // operation
        store.insertMany(eppm.operations, CollectionName.Operation)
        store.insertMany(eppm.follows, CollectionName.Follows)
        store.insertMany(eppm.readsFrom, CollectionName.ReadsFrom)
        store.insertOne(eppm.writesTo, CollectionName.WritesTo)
        store.insertMany(eppm.emits, CollectionName.Emits)
        store.insertMany(eppm.uses, CollectionName.Uses)
        store.insertMany(eppm.produces, CollectionName.Produces)

        // schema
        store.insertMany(eppm.schemas, CollectionName.Schema)
        store.insertMany(eppm.consistsOf, CollectionName.ConsistsOf)

        // attribute
        store.insertMany(eppm.attributes, CollectionName.Attribute)
        store.insertMany(eppm.computedBy, CollectionName.ComputedBy)
        store.insertMany(eppm.derivesFrom, CollectionName.DerivesFrom)

        // expression
        store.insertMany(eppm.expressions, CollectionName.Expression)
        store.insertMany(eppm.takes, CollectionName.Takes)

        // todo: commit TX
    })
}

