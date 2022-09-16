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
import { CollectionName, edge } from '../persistence/model'
import { store } from './store'
import { aql, db } from '@arangodb'


export function storeExecutionEvent(progress: Progress): void {
    console.log('STORE EVENT', progress._key, (<any>progress)._id, (<any>progress)._rev)

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

    // todo: start TX

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

    store.insert(progressWithPlanDetails, CollectionName.Progress)

    const progressEdge = edge(CollectionName.Progress, progress._key, CollectionName.ExecutionPlan, progress.planKey, progress._key)
    store.insert(progressEdge, CollectionName.ProgressOf)

    // todo: commit TX
}
