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


/**
 * Returns a list of execution events which reads are visible from the write of the given execution event
 *
 * @param writeEvent za.co.absa.spline.persistence.model.Progress
 * @returns za.co.absa.spline.persistence.model.Progress[]
 */
export function observedReadsByWrite(writeEvent) {
    return writeEvent && db._query(aql`
        FOR wExPlan IN 1 OUTBOUND ${writeEvent} progressOf
        for wds in outbound wExPlan affects
            let thisWriteOp = (for writeOp in 1 inbound wds writesTo
                filter writeOp._belongsTo == wExPlan._id // operations have _belongsTo connections to their execPlan
                limit 1 // we are expecting a single write of the execPlan
                return writeOp
            )[0] // write operation that wrote the to this file
            LET minReadTime = thisWriteOp._created

            // lets find out maxReadTime - this may not exits
            let breakingWriteOp = (for writeOps in 1 inbound wds writesTo
                filter writeOps._created > thisWriteOp._created
                filter !writeOps.append // appends do not break lineage-connection for impact
                sort writeOps._created DESC
                limit 1
                return writeOps
            )[0]
            let maxReadTime = breakingWriteOp ? breakingWriteOp._created : null // maxReadTime is optional

            // looking for readOperations that read data written by writes above - within the time window
            // result: array of execPlan keys satisfying read-time window
            let execPlans = (for readOps in 1 inbound wds readsFrom
                filter readOps._created > minReadTime
                filter (maxReadTime ? readOps._created < maxReadTime : true) // maxReadTime null -> all after minReadTime
                return readOps._belongsTo
            )

            for rExPlan in 1 inbound wds depends
                filter rExPlan._id in execPlans
                for readEvent in 1 inbound rExPlan progressOf
                    return readEvent
    `).toArray()
}
