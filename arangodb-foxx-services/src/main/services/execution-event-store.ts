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


import { ExecPlanDetails, Progress } from '../../external/api.model'
import { CollectionName, edge, WriteTxInfo } from '../persistence/model'
import { store } from './store'
import { aql, db } from '@arangodb'
import { withTimeTracking } from '../utils/common'
import { TxManager } from './txm'


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

        const wtxInfo: WriteTxInfo = TxManager.startWrite(
            progress._key,
            {
                execEventInfo: {
                    _key: progress._key,
                    planKey: progress.planKey,
                    timestamp: progress.timestamp,
                    error: progress.error,
                }
            })

        try {
            store.insertOne(progressWithPlanDetails, CollectionName.Progress, wtxInfo)
            store.insertOne(progressEdge, CollectionName.ProgressOf, wtxInfo)
            TxManager.commit(wtxInfo)
        }
        catch (e) {
            TxManager.rollback(wtxInfo)
            throw e
        }
    })
}
