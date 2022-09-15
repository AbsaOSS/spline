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
import { insert } from './store'


export function storeExecutionPlan(eppm: ExecutionPlanPersistentModel): void {
    console.log('STORE PLAN', eppm.executionPlan._key)

    // todo: start TX

    // execution plan
    insert(eppm.executes, CollectionName.Executes)
    insert(eppm.depends, CollectionName.Depends)
    insert(eppm.affects, CollectionName.Affects)
    insert(eppm.expressions, CollectionName.ExecutionPlan)

    // operation
    insert(eppm.operations, CollectionName.Operation)
    insert(eppm.follows, CollectionName.Follows)
    insert(eppm.readsFrom, CollectionName.ReadsFrom)
    insert(eppm.writesTo, CollectionName.WritesTo)
    insert(eppm.emits, CollectionName.Emits)
    insert(eppm.uses, CollectionName.Uses)
    insert(eppm.produces, CollectionName.Produces)

    // schema
    insert(eppm.schemas, CollectionName.Schema)
    insert(eppm.consistsOf, CollectionName.ConsistsOf)

    // attribute
    insert(eppm.attributes, CollectionName.Attribute)
    insert(eppm.computedBy, CollectionName.ComputedBy)
    insert(eppm.derivesFrom, CollectionName.DerivesFrom)

    // expression
    insert(eppm.expressions, CollectionName.Expression)
    insert(eppm.takes, CollectionName.Takes)

    // todo: commit TX
}

