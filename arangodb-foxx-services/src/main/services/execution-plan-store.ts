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


export function storeExecutionPlan(eppm: ExecutionPlanPersistentModel): void {
    console.log('STORE PLAN', eppm.executionPlan._key)

    // todo: start TX

    // execution plan
    store.insert(eppm.executes, CollectionName.Executes)
    store.insert(eppm.depends, CollectionName.Depends)
    store.insert(eppm.affects, CollectionName.Affects)
    store.insert(eppm.executionPlan, CollectionName.ExecutionPlan)

    // operation
    store.insert(eppm.operations, CollectionName.Operation)
    store.insert(eppm.follows, CollectionName.Follows)
    store.insert(eppm.readsFrom, CollectionName.ReadsFrom)
    store.insert(eppm.writesTo, CollectionName.WritesTo)
    store.insert(eppm.emits, CollectionName.Emits)
    store.insert(eppm.uses, CollectionName.Uses)
    store.insert(eppm.produces, CollectionName.Produces)

    // schema
    store.insert(eppm.schemas, CollectionName.Schema)
    store.insert(eppm.consistsOf, CollectionName.ConsistsOf)

    // attribute
    store.insert(eppm.attributes, CollectionName.Attribute)
    store.insert(eppm.computedBy, CollectionName.ComputedBy)
    store.insert(eppm.derivesFrom, CollectionName.DerivesFrom)

    // expression
    store.insert(eppm.expressions, CollectionName.Expression)
    store.insert(eppm.takes, CollectionName.Takes)

    // todo: commit TX
}

