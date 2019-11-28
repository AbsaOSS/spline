/*
 * Copyright 2019 ABSA Group Limited
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
(readEvent) => {
    'use strict';
    const {db, aql} = require('@arangodb');

    return readEvent && db._query(aql`
        LET readTime = ${readEvent}.timestamp
        FOR rds IN 2 OUTBOUND ${readEvent} progressOf, depends
            LET maybeObservedOverwrite = SLICE(
                (FOR wo IN 1 INBOUND rds writesTo
                    FILTER !wo.append
                    FOR e IN 2 INBOUND wo executes, progressOf
                        FILTER e.timestamp < readTime
                        SORT e.timestamp DESC
                        LIMIT 1
                        RETURN e
                ), 0, 1)
            LET observedAppends = (
                FOR wo IN 1 INBOUND rds writesTo
                    FILTER wo.append
                    FOR e IN 2 INBOUND wo executes, progressOf
                        FILTER e.timestamp > maybeObservedOverwrite[0].timestamp
                           AND e.timestamp < readTime
                        SORT e.timestamp ASC
                        RETURN e
                )
            LET allObservedEvents = APPEND(maybeObservedOverwrite, observedAppends)
            FOR e IN allObservedEvents RETURN e
    `).toArray()
}