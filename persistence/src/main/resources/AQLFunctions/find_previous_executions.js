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
(executionKey, timestamp, depth) => {
    'use strict';
    const db = require('@arangodb').db;
    const AQL_FUNCTION = db._query;
    const graphDepth = depth - 1;
    const concat = (x, y) => x.concat(y);

    if (executionKey === undefined || executionKey === null || executionKey === "" || depth === 0) {
        return null;
    }
    const previousExecution = AQL_FUNCTION(
        `FOR exec IN execution
            FILTER exec._key == @executionKey
            LET readsFrom = (
                FOR v, e IN 1..9999
                    OUTBOUND exec executes, follows, readsFrom
                    OPTIONS {uniqueEdges: "none"}
                    FILTER IS_SAME_COLLECTION("readsFrom", e)
                    RETURN v
            )
            LET previousExecutions = (
                FOR rf in readsFrom
                    LET previousExecution = FIRST(
                        FOR v, e IN 1..9999
                            INBOUND rf executes, progressOf, writesTo
                            FILTER IS_SAME_COLLECTION("progressOf", e) && v.timestamp <= @timestamp
                            LET progressKey = v
                                FOR v2, e2 IN 1..1 
                                    OUTBOUND progressKey progressOf
                                    RETURN  { "_key" : v2._key, "timestamp" : progressKey.timestamp}
                    )
                    RETURN previousExecution
            )
            RETURN FLATTEN(previousExecutions)`
        , {
            executionKey: executionKey,
            timestamp: timestamp
        }
    );

    const previousExecutionFiltered = previousExecution.toArray()[0].filter(key => key != null);

    if (graphDepth >= 1) {
        return previousExecutionFiltered.map((exec) => {
            if (exec != null) {
                return AQL_FUNCTION(
                    "RETURN SPLINE::FIND_PREVIOUS_EXECUTIONS(@prevExec, @timestamp, @depth)",
                    {
                        prevExec: exec._key,
                        timestamp: exec.timestamp,
                        depth: graphDepth
                    }
                ).toArray()[0].concat(exec._key);
            } else {
                return null;
            }
        }).reduce(concat, []);
    } else {
        return previousExecutionFiltered.map((exec) => {
            return exec._key;
        });
    }
}