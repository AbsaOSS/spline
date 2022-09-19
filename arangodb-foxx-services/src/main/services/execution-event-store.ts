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


import { Progress } from '../../external/api.model'
import { CollectionName, edge, WriteTxInfo } from '../persistence/model'
import { store } from './store'
import { aql, db } from '@arangodb'
import { withTimeTracking } from '../utils/common'
import { TxManager } from './TxManager'


export function storeExecutionEvent(progress: Progress): void {
    withTimeTracking(`STORE EVENT ${progress._key}`, () => {

        // todo: do we need to wrap the following into a READ transaction?

        const planKey = progress.planKey
        const ep = store.getDocByKey(CollectionName.ExecutionPlan, planKey)
        const {
            targetDsSelector,
            lastWriteTimestamp,
            dataSourceName,
            dataSourceUri,
            dataSourceType,
            append
        } = db._query(
            aql`
            WITH executionPlan, executes, operation, affects, dataSource
            LET wo = FIRST(FOR v IN 1 OUTBOUND ${ep._id} executes RETURN v)
            LET ds = FIRST(FOR v IN 1 OUTBOUND ${ep._id} affects RETURN v)
            RETURN {
                "targetDsSelector"   : KEEP(ds, ['_id', '_rev']),
                "lastWriteTimestamp" : ds.lastWriteDetails.timestamp,
                "dataSourceName"     : ds.name,
                "dataSourceUri"      : ds.uri,
                "dataSourceType"     : wo.extra.destinationType,
                "append"             : wo.append
            }
        `).next()

        const execPlanDetails = {
            'executionPlanKey': ep._key,
            'frameworkName': `${ep.systemInfo.name} ${ep.systemInfo.version}`,
            'applicationName': ep.name,
            'dataSourceUri': dataSourceUri,
            'dataSourceName': dataSourceName,
            'dataSourceType': dataSourceType,
            'append': append
        }

        if (ep.discriminator != progress.discriminator) {
            // nobody should ever see this happening, but just in case the universe goes crazy...
            throw new Error(`UUID collision detected !!! Execution event ID: ${progress._key}, discriminator: ${progress.discriminator}`)
        }

        const progressWithPlanDetails = { ...progress, execPlanDetails }

        if (lastWriteTimestamp < progress.timestamp) {
            // todo: <-------------------------------------------------------------- GET RID OF THIS
            db._update(
                targetDsSelector,
                { lastWriteDetails: progressWithPlanDetails }
            )
        }

        const progressEdge = edge(CollectionName.Progress, progress._key, CollectionName.ExecutionPlan, progress.planKey, progress._key)

        const wtxInfo: WriteTxInfo = TxManager.startWrite()

        try {
            store.insertOne(progressWithPlanDetails, CollectionName.Progress, wtxInfo)
            store.insertOne(progressEdge, CollectionName.ProgressOf, wtxInfo)
            TxManager.commit(wtxInfo)
        } catch (e) {
            TxManager.rollback(wtxInfo)
            throw e
        }
    })
}
