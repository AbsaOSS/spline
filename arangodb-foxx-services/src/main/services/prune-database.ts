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

import {aql, db} from '@arangodb'

export function pruneBefore(timestamp) {
    console.log(`[Spline] Prune data before: ${timestamp}`)
    const t0 = Date.now()

    // STAGE 1: Cleanup event + edges to plans
    // Option A - https://github.com/AbsaOSS/spline/issues/684#issuecomment-1311499371
    const refPlanIds = db._query(aql`
        FOR p IN progress
            FILTER p.timestamp < ${timestamp}
            REMOVE p IN progress
            FOR po IN progressOf
                FILTER po._from == p._id
                REMOVE po IN progressOf
                RETURN DISTINCT po._to
    `).toArray()

    const t1 = Date.now()
    console.log(`Purged ${refPlanIds.length} plans, ${t1 - t0} ms`)

    // STAGE 2: No progressOf corresponding to executionPlan (Need to scan all plans, and progressOf foreach) -> delete executionPlan and related fields
    // Option A - https://github.com/AbsaOSS/spline/issues/684#issuecomment-1311499371
    const orphanExecPlanIDsOlderThanThresholdDaysArray = db._query(aql`
        LET execPlanIDsWithProgressEventsArray = (FOR execPlan IN executionPlan
            FOR progOf IN progressOf
                FILTER execPlan._created < ${timestamp} && progOf._to == execPlan._id
                COLLECT ids = execPlan._id
                RETURN ids)

            FOR execPlan IN executionPlan
                FILTER execPlan._id NOT IN execPlanIDsWithProgressEventsArray && execPlan._created < ${timestamp}
                RETURN execPlan._id
    `)

    const collections = ['executes', 'operation', 'follows', 'uses', 'expression', 'affects', 'depends', 'writesTo', 'readsFrom', 'emits', 'produces', 'consistsOf', 'derivesFrom', 'computedBy', 'takes', 'schema', 'attribute']
    for (let i = 0; i < collections.length; i++) {
        console.log('### Working on', collections[i], 'collection')
        const startCount = db._query('RETURN COUNT(@@cols)', {'@cols': collections[i]}).toArray()[0]
        db._query('FOR orphanExecPlanID IN @arr FOR collectionEle IN @@cols FILTER collectionEle._belongsTo == orphanExecPlanID && collectionEle._created < @purgeLimitTimestamp REMOVE collectionEle IN @@cols',
            {
                'arr': orphanExecPlanIDsOlderThanThresholdDaysArray,
                '@cols': collections[i],
                'purgeLimitTimestamp': timestamp
            }
        )
        const endCount = db._query('RETURN COUNT(@@cols)', {'@cols': collections[i]}).toArray()[0]
        console.log(startCount - endCount, collections[i], 'objects deleted...')
    }

    ////////////////////////////////////////////////////////////////////////
    // reused below
    let startCount = 0
    let endCount = 0

    console.log('### Working on executionPlan collection')
    startCount = db._query('RETURN COUNT(@@cols)', {'@cols': 'executionPlan'}).toArray()[0]
    db._query(aql`
        FOR doc IN executionPlan
            FILTER doc._id IN ${orphanExecPlanIDsOlderThanThresholdDaysArray}
            REMOVE doc IN executionPlan
    `)
    endCount = db._query('RETURN COUNT(@@cols)', {'@cols': 'executionPlan'}).toArray()[0]
    console.log(startCount - endCount, 'executionPlan objects deleted...')

    // Deleted other collections and then the orphanExecPlanIDs

    const t2 = Date.now()
    console.log(`All collections but dataSource purge in ${t2 - t1} ms`)

    ////////////////////////////////////////////////////////////////////////


    // STAGE 3: No `affects` and `depends` corresponding to dataSource (Need to scan all dataSources, and both edges foreach) -> delete dataSource
    const dataSourceKeysInAffectUseArray = db._query(aql`
        FOR source IN dataSource
            FOR affectEdge in affects
                FILTER affectEdge._to == source._id
                COLLECT keys = source._key
                RETURN keys
    `).toArray()

    const dataSourceKeysInAffectsDependsUseArray = dataSourceKeysInAffectUseArray.concat(
        db._query(aql`
            FOR source IN dataSource
                FOR dependEdge in depends
                    FILTER dependEdge._to == source._id
                    COLLECT keys = source._key
                    RETURN keys
        `).toArray()
    )

    const dataSourceKeysInTotalUseArray = Array.from(new Set(dataSourceKeysInAffectsDependsUseArray))
    const orphanDataSourceKeysOlderThanThresholdDaysArray = db._query(aql`
        FOR source IN dataSource
            FILTER source._key NOT IN ${dataSourceKeysInTotalUseArray} && source._created < ${timestamp}
            RETURN source._key
    `).toArray()

    console.log('### Working on dataSource collection')
    startCount = db._query('RETURN COUNT(@@cols)', {'@cols': 'dataSource'}).toArray()[0]
    db._query(aql`
        FOR source IN dataSource
            FILTER source._key IN ${orphanDataSourceKeysOlderThanThresholdDaysArray}
            REMOVE source in dataSource
    `)
    endCount = db._query('RETURN COUNT(@@cols)', {'@cols': 'dataSource'}).toArray()[0]

    const t3 = Date.now()
    console.log(startCount - endCount, `dataSource objects deleted... in ${t3 - t2} ms`)
    console.log(`[Spline] Complete Prune time: ${t3 - t1} ms`)
    console.log('-------Purge completed-------')
}
