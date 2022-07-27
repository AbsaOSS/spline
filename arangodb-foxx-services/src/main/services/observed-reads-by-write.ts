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


/**
 * Returns a list of execution events which reads are visible from the write of the given execution event
 *
 * @param writeEvent za.co.absa.spline.persistence.model.Progress
 * @returns za.co.absa.spline.persistence.model.Progress[]
 */
export function observedReadsByWrite(writeEvent) {
    return writeEvent && db._query(aql`
        WITH progress, progressOf, executionPlan, executes, operation, depends, writesTo, readsFrom, dataSource
        FOR wExPlan IN 1 OUTBOUND ${writeEvent} progressOf
        FOR wds IN outbound wExPlan affects
            LET thisWriteOp = (FOR writeOp IN 1 INBOUND wds writesTo
                FILTER writeOp._belongsTo == wExPlan._id // operations have _belongsTo connections to their execPlan
                LIMIT 1 // we are expecting a single write of the execPlan
                RETURN writeOp
            )[0] // write operation that wrote the to this file
            LET minReadTime = thisWriteOp._created

            // lets find out maxReadTime - this may not exits
            LET breakingWriteOp = (FOR writeOps IN 1 INBOUND wds writesTo
                FILTER writeOps._created > thisWriteOp._created
                FILTER !writeOps.append // appends do not break lineage-connection for impact
                sort writeOps._created DESC
                LIMIT 1
                RETURN writeOps
            )[0]
            LET maxReadTime = breakingWriteOp ? breakingWriteOp._created : null // maxReadTime is optional

            // looking for readOperations that read data written by writes above - within the time window
            // result: array of execPlan keys satisfying read-time window
            LET execPlans = (FOR readOps IN 1 INBOUND wds readsFrom
                FILTER readOps._created > minReadTime
                FILTER (maxReadTime ? readOps._created < maxReadTime : true) // maxReadTime null -> all after minReadTime
                RETURN readOps._belongsTo
            )

            FOR rExPlan IN 1 INBOUND wds depends
                FILTER rExPlan._id IN execPlans
                FOR readEvent IN 1 INBOUND rExPlan progressOf
                    RETURN readEvent
    `).toArray()
}
