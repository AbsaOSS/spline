/*
 * Copyright 2022 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except IN compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to IN writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { aql, db } from '@arangodb'
import { Progress } from '../../external/api.model'
import { ReadTxInfo } from '../persistence/model'
import { AQLCodeGenHelper } from '../utils/aql-gen-helper'


/**
 * Returns a list of execution events which reads are visible from the write of the given execution event
 *
 * @param writeEvent za.co.absa.spline.persistence.model.Progress
 * @param rtxInfo READ transaction info
 * @returns za.co.absa.spline.persistence.model.Progress[]
 */
export function observedReadsByWrite(writeEvent: Progress, rtxInfo: ReadTxInfo): Progress[] {
    const aqlGen = new AQLCodeGenHelper(rtxInfo)

    return writeEvent && db._query(aql`
        WITH progress, progressOf, executionPlan, executes, operation, depends, writesTo, readsFrom, dataSource
        LET minReadTime = ${writeEvent}.timestamp

        FOR wExPlan, wpo IN 1 OUTBOUND ${writeEvent} progressOf
            ${aqlGen.genTxIsolationCode('wExPlan', 'wpo')}
            LET wds = FIRST(
                FOR ds IN 1 OUTBOUND wExPlan affects
                    RETURN ds
            )

            // lets find out maxReadTime - this may not exits
            LET maxReadTime = FIRST(
                FOR writeOps, wt IN 1 INBOUND wds writesTo
                    ${aqlGen.genTxIsolationCode('writeOps', 'wt')}
                    FILTER !writeOps.append // appends do not break lineage-connection for impact
                    FOR breakingExPlan IN executionPlan
                        FILTER breakingExPlan._id == writeOps._belongsTo
                        FOR breakingEvent, bpo IN 1 INBOUND breakingExPlan progressOf // looking to find writeOps' execPlan and event
                            ${aqlGen.genTxIsolationCode('breakingEvent', 'bpo')}
                            FILTER breakingEvent.timestamp > minReadTime
                            SORT breakingEvent.timestamp DESC
                            RETURN breakingEvent.timestamp
            )

            // return distinct set of events that fall into [minReadTime, maxReadTime] range
            // and are connected to the execution plan that reads from the 'wds' data source
            FOR readEvent, rpo IN progress
                ${aqlGen.genTxIsolationCode('readEvent', 'rpo')}
                FILTER readEvent.timestamp > minReadTime
                FILTER readEvent.timestamp < maxReadTime || !maxReadTime
                LET planId = CONCAT('executionPlan/', readEvent.planKey)
                FOR readOp IN operation
                    ${aqlGen.genTxIsolationCode('readOp')}
                    FILTER readOp.type == 'Read'
                    FILTER readOp._belongsTo == planId
                    FOR ds IN 1 OUTBOUND readOp readsFrom
                        FILTER ds._key == wds._key
                        RETURN DISTINCT readEvent
    `).toArray()
}
