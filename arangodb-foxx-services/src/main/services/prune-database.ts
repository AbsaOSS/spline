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

import { aql, db } from '@arangodb'

export function pruneBefore(timestamp) {
    console.log(`[Spline] Prune data before: ${timestamp}`)
    const t0 = Date.now()

    // remove event + edges to plans

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
    console.log({refPlanIds: [refPlanIds.length, `${t1 - t0} ms`]})

    // remove orphan plans + edges to sources

    const refDataSourceKeys = db._query(aql`
        FOR epId IN ${refPlanIds}
            LET ep = DOCUMENT(epId)

            LET isEpReferred = 0 < LENGTH(FOR po IN progressOf FILTER po._to == ep._id LIMIT 1 RETURN 1)

            FILTER NOT isEpReferred

            LET vertsIdsWithInEdgesIds = (
                FOR v, e  IN 1..9999
                    OUTBOUND ep executes, follows, writesTo, readsFrom, affects, depends
                    COLLECT vid = v._id INTO g
                    RETURN [vid, UNIQUE(g[*].e._id)]
            )

            LET keysByCollection = (
                FOR id IN APPEND(vertsIdsWithInEdgesIds[*][0], vertsIdsWithInEdgesIds[*][1][**])
                    LET parsedId = PARSE_IDENTIFIER(id)
                    COLLECT c = parsedId.collection INTO g
                    RETURN [c, g[*].parsedId.key]
            )

            LET executesKey = FIRST(keysByCollection[* FILTER CURRENT[0] == 'executes'][1][**])
            LET affectsKey  = FIRST(keysByCollection[* FILTER CURRENT[0] == 'affects' ][1][**])
            LET writesToKey = FIRST(keysByCollection[* FILTER CURRENT[0] == 'writesTo'][1][**])

            LET dependsKeys    = keysByCollection[* FILTER CURRENT[0] == 'depends'   ][1][**]
            LET readsFromKeys  = keysByCollection[* FILTER CURRENT[0] == 'readsFrom' ][1][**]
            LET followsKeys    = keysByCollection[* FILTER CURRENT[0] == 'follows'   ][1][**]
            LET operationKeys  = keysByCollection[* FILTER CURRENT[0] == 'operation' ][1][**]
            LET dataSourceKeys = keysByCollection[* FILTER CURRENT[0] == 'dataSource'][1][**]

            REMOVE ep IN executionPlan
            REMOVE executesKey IN executes
            REMOVE affectsKey IN affects
            REMOVE writesToKey IN writesTo

            LET r1 = (FOR d IN dependsKeys   REMOVE d IN depends)
            LET r2 = (FOR r IN readsFromKeys REMOVE r IN readsFrom)
            LET r3 = (FOR f IN followsKeys   REMOVE f IN follows)
            LET r4 = (FOR o IN operationKeys REMOVE o IN operation)

            FOR dsKey IN dataSourceKeys
                RETURN DISTINCT dsKey
    `).toArray()

    const t2 = Date.now()
    console.log({refDataSourceKeys: [refDataSourceKeys.length, `${t2 - t1} ms`]})

    // remove orphan sources

    const dss = db._query(aql`
        FOR dsKey IN ${refDataSourceKeys}
            LET ds = DOCUMENT('dataSource', dsKey)
            LET isDsReferred =
                0 < LENGTH(FOR e IN affects   FILTER e._to == ds._id LIMIT 1 RETURN 1) OR
                0 < LENGTH(FOR e IN depends   FILTER e._to == ds._id LIMIT 1 RETURN 1) OR
                0 < LENGTH(FOR e IN readsFrom FILTER e._to == ds._id LIMIT 1 RETURN 1) OR
                0 < LENGTH(FOR e IN writesTo  FILTER e._to == ds._id LIMIT 1 RETURN 1)
            FILTER NOT isDsReferred
            REMOVE ds IN dataSource
            RETURN ds._id // <--- delete this statement
    `).toArray() // todo: delete this and ^

    const t3 = Date.now()
    console.log({dss: [dss.length, `${t3 - t2} ms`]})
}
