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

import { aql, db } from '@arangodb'
import { Progress } from '../../external/api.model'
import { ReadTxInfo } from '../persistence/model'
import { AQLCodeGenHelper } from '../utils/aql-gen-helper'
import * as Logger from '../utils/logger'


/**
 * Returns a list of execution events which writes are visible from any read of the given execution event
 *
 * @param readEvent za.co.absa.spline.persistence.model.Progress
 * @param rtxInfo READ transaction info
 * @returns za.co.absa.spline.persistence.model.Progress[]
 */
export function observedWritesByRead(readEvent: Progress, rtxInfo: ReadTxInfo): Progress[] {
    const aqlGen = new AQLCodeGenHelper(rtxInfo)
    const query = aql`
        WITH progress, progressOf, executionPlan, executes, operation, depends, writesTo, dataSource
        LET readTime = ${readEvent}.timestamp
        FOR rds IN 2 OUTBOUND ${readEvent} progressOf, depends
            LET maybeObservedOverwrite = SLICE(
                (FOR wo, wt IN 1 INBOUND rds writesTo
                    ${aqlGen.genTxIsolationCodeForTraversal('wo', 'wt')}
                    FILTER !wo.append
                    FOR p, po IN 2 INBOUND wo executes, progressOf
                        ${aqlGen.genTxIsolationCodeForTraversal('p', 'po')}
                        FILTER p.timestamp < readTime
                           AND p.error == null
                        SORT p.timestamp DESC
                        LIMIT 1
                        RETURN p
                ), 0, 1)
            LET observedAppends = (
                FOR wo, wt IN 1 INBOUND rds writesTo
                    ${aqlGen.genTxIsolationCodeForTraversal('wo', 'wt')}
                    FILTER wo.append
                    FOR p, po IN 2 INBOUND wo executes, progressOf
                        ${aqlGen.genTxIsolationCodeForTraversal('p', 'po')}
                        FILTER p.timestamp > maybeObservedOverwrite[0].timestamp
                           AND p.timestamp < readTime
                           AND p.error == null
                        SORT p.timestamp ASC
                        RETURN p
                )
            LET allObservedEvents = APPEND(maybeObservedOverwrite, observedAppends)
            FOR p IN allObservedEvents RETURN p
    `

    Logger.debug(query)

    return db._query(query).toArray()
}
