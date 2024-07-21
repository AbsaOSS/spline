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


import { ExecPlanDetails, ExecutionEventInfo, Frame, Label, Progress } from '../../external/api.model'
import { CollectionName, edge, ViewName, WriteTxInfo } from '../persistence/model'
import { store } from './store'
import { aql, db } from '@arangodb'
import { withTimeTracking } from '../utils/common'
import { TxManager } from './txm'
import { TxTemplate } from './txm/tx-template'
import * as Logger from '../utils/logger'


const SEARCH_FIELDS = [
    'execPlanDetails.frameworkName',
    'execPlanDetails.applicationName',
    'extra.appId',
    'execPlanDetails.dataSourceUri',
    'execPlanDetails.dataSourceType',
]

export function listExecutionEvents(
    asAtTime: number,
    timestampStart: number | null,
    timestampEnd: number | null,
    searchTerm: string | null,
    writeAppends: boolean | null,
    applicationId: string | null,
    dataSourceUri: string | null,
    labels: Label[],
    sortField: string,
    sortOrder: string,
    offset: number,
    limit: number,
): Frame<Partial<ExecutionEventInfo>> {
    const lblNames = labels.map(lbl => lbl.name)
    const lblValues = labels.map(lbl => lbl.values)

    const q: ArangoDB.Query = aql`
         WITH ${aql.literal(ViewName.ProgressSearchView)}
         FOR ee IN ${aql.literal(ViewName.ProgressSearchView)}
             SEARCH ee._created <= ${asAtTime}
                 AND (${timestampStart} == null OR IN_RANGE(ee.timestamp, ${timestampStart}, ${timestampEnd}, true, true))
                 AND (${applicationId} == null OR ${applicationId} == ee.extra.appId)
                 AND (${dataSourceUri} == null OR ${dataSourceUri} == ee.execPlanDetails.dataSourceUri)
                 AND (${writeAppends}  == null OR ee.execPlanDetails.append IN ${writeAppends})

                 ${aql.join(lblNames.map((lblName, i) => aql`
                 AND (
                     ${lblValues[i]} ANY == ee.labels[${lblName}]
                     OR ${lblValues[i]} ANY == ee.execPlanDetails.labels[${lblName}]
                 )
                 `))}

                 AND (
                     ${searchTerm} == null
                     ${aql.join(SEARCH_FIELDS.map(fld => aql`
                     OR ANALYZER(LIKE(ee.${aql.literal(fld)}, CONCAT("%", TOKENS(${searchTerm}, "norm_en")[0], "%")), "norm_en")
                     `))}
                 )

             LET resItem = {
                 "executionEventId" : ee._key,
                 "executionPlanId"  : ee.execPlanDetails.executionPlanKey,
                 "frameworkName"    : ee.execPlanDetails.frameworkName,
                 "applicationName"  : ee.execPlanDetails.applicationName,
                 "applicationId"    : ee.extra.appId,
                 "timestamp"        : ee.timestamp,
                 "dataSourceName"   : ee.execPlanDetails.dataSourceName,
                 "dataSourceUri"    : ee.execPlanDetails.dataSourceUri,
                 "dataSourceType"   : ee.execPlanDetails.dataSourceType,
                 "append"           : ee.execPlanDetails.append,
                 "durationNs"       : ee.durationNs,
                 "error"            : ee.error,
                 "extra"            : ee.extra,
                 "labels"           : ee.labels
             }

             SORT resItem.${sortField} ${sortOrder}
             LIMIT ${offset}, ${limit}

             RETURN resItem
    `

    Logger.debug('AQL query: ', q)

    const cursor = db._query(q, { fullCount: true })
    const items: ExecutionEventInfo[] = cursor.toArray()
    const totalCount = cursor.getExtra().stats.fullCount

    return {
        items,
        totalCount,
        offset,
    }
}

export function storeExecutionEvent(progress: Progress): void {
    withTimeTracking(`STORE EVENT ${progress._key}`, () => {
        const planKey = progress.planKey
        const rtxInfo = TxManager.startRead()
        const ep = store.getDocByKey(CollectionName.ExecutionPlan, planKey, rtxInfo)
        if (!ep) {
            throw Error(`Execution plan with ID ${planKey} not found`)
        }
        const {
            dataSourceName,
            dataSourceUri,
            dataSourceType,
            append
        } = db._query(aql`
            WITH executionPlan, executes, operation, affects, dataSource
            LET wo = FIRST(FOR v IN 1 OUTBOUND ${ep._id} executes RETURN v)
            LET ds = FIRST(FOR v IN 1 OUTBOUND ${ep._id} affects RETURN v)
            RETURN {
                "dataSourceName"     : ds.name,
                "dataSourceUri"      : ds.uri,
                "dataSourceType"     : wo.extra.destinationType,
                "append"             : wo.append
            }
        `).next()

        const execPlanDetails: ExecPlanDetails = {
            'executionPlanKey': ep._key,
            'frameworkName': `${ep.systemInfo.name} ${ep.systemInfo.version}`,
            'applicationName': ep.name,
            'dataSourceUri': dataSourceUri,
            'dataSourceName': dataSourceName,
            'dataSourceType': dataSourceType,
            'labels': ep.labels,
            'append': append
        }

        if (ep.discriminator != progress.discriminator) {
            // nobody should ever see this happening, but just in case the universe goes crazy...
            throw new Error(`UUID collision detected !!! Execution event ID: ${progress._key}, discriminator: ${progress.discriminator}`)
        }

        const progressWithPlanDetails: Progress =
            { ...progress, execPlanDetails }

        const progressEdge: Partial<ArangoDB.Edge> =
            edge(CollectionName.Progress, progress._key, CollectionName.ExecutionPlan, progress.planKey, progress._key)

        const txTemplate = new TxTemplate(
            `${CollectionName.Progress}/${progress._key}`,
            {
                execEventInfo: {
                    _key: progress._key,
                    planKey: progress.planKey,
                    timestamp: progress.timestamp,
                    error: progress.error,
                }
            })

        txTemplate.doWrite((wtxInfo: WriteTxInfo) => {
            store.insertOne(progressWithPlanDetails, CollectionName.Progress, wtxInfo)
            store.insertOne(progressEdge, CollectionName.ProgressOf, wtxInfo)
        })
    })
}
