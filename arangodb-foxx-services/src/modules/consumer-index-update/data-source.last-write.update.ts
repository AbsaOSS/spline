/*
 * Copyright 2023 ABSA Group Limited
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

import { TxManager } from '../../main/persistence/txm'
import { TxEvent, WriteTxInfo } from '../../main/persistence/model'
import * as Logger from '../../main/utils/logger'
import { aql, db } from '@arangodb'
import { Progress } from '../../external/api.model'

// We listen to PRE_COMMIT because we want to break a tx in case of a failure and preserve data consistency.
// The downside is that we use uncommitted data, so we risk running into dirty reads problem which again,
// would create another kind of inconsistency. But dirty reads is less of a problem for
// us in this particular case, because the chances are that it will be
// automatically corrected shortly when the transaction is re-attempted (e.g. message re-delivery).
// On the other hand if we were reacting on POST_COMMIT as logic suggests, a failure would result
// in a lost update, that could only be fixed (the same as a dirty read) by manually executing the query.
// A proper solution would require a persisted messaging mechanism, employing SAGA pattern etc.
TxManager.on(
    TxEvent.PreCommit,
    (wtxInfo: WriteTxInfo) => {
        const execEvent: Partial<Progress> = wtxInfo.params.execEventInfo

        if (execEvent === undefined) {
            // we only react on ExecutionEvent inserted
            return
        }

        Logger.debug('Update target data source `lastWriteDetails`.', 'Plan:', execEvent?.planKey, 'Event:', execEvent?._key)

        const {
            handler: targetDsHandler,
            lastWriteTimestamp
        } = db._query(aql`
            WITH executionPlan,
                 affects,
                 dataSource

            FOR ep IN executionPlan
                FILTER ep._key == ${execEvent.planKey}
                FOR ds IN 1 OUTBOUND ep affects
                    RETURN {
                        handler: {
                            _key: ds._key,
                            _rev: ds._rev
                        },
                        lastWriteTimestamp: ds.lastWriteDetails.timestamp
                    }
        `
        ).next()

        if (lastWriteTimestamp < execEvent.timestamp) {
            db._query(aql`
                WITH progress,
                     dataSource

                FOR ee IN progress
                    FILTER ee._key == ${execEvent._key}
                    UPDATE ${targetDsHandler}
                        WITH {
                            lastWriteDetails: ee
                        }
                        IN dataSource
                        OPTIONS {
                            ignoreRevs: false
                        }
                `
            )
            Logger.debug('Updated DataSource', targetDsHandler)
        }
        else {
            Logger.debug(`DataSource ${targetDsHandler} update ignored due to its more recent modification timestamp: ${lastWriteTimestamp} > ${execEvent.timestamp}`)
        }
    }
)
