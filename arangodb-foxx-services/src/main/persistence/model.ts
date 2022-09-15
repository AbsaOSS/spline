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

export enum AuxCollectionName {
    DbVersion = 'dbVersion',
    Counter = 'counter',
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

export const CollectionName = {
    ...AuxCollectionName,
    ...NodeCollectionName,
    ...EdgeCollectionName,
}

export type CollectionName =
    AuxCollectionName
    | NodeCollectionName
    | EdgeCollectionName
