/*
 * Copyright 2021 ABSA Group Limited
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

const VER = "1.0.0"

const {db, aql} = require("@arangodb");

console.log(`[Spline] Start migration to ${VER}`);

console.log("[Spline] Add 'progress.labels'");
db._query(aql`
    WITH progress
    FOR ee IN progress
        FILTER ee.labels == null
        UPDATE ee WITH { labels: {} } IN progress
`);

console.log("[Spline] Add 'executionPlan.labels'");
db._query(aql`
    WITH executionPlan
    FOR ep IN executionPlan
        FILTER ep.labels == null
        UPDATE ep WITH { labels: {} } IN executionPlan
`);

console.log("[Spline] Update 'dataSource.lastWriteDetails'");
db._query(aql`
    WITH dataSource, progress
    FOR ds IN dataSource
        LET lwe = FIRST(
            FOR we IN progress
                FILTER we.execPlanDetails.dataSourceUri == ds.uri
                SORT we.timestamp DESC
                RETURN UNSET(we, ["_id", "_rev"])
        )
        FILTER lwe != null
        UPDATE ds
          WITH {lastWriteDetails: lwe}
            IN dataSource
`);

console.log("[Spline] Drop 'attributeSearchView'");
db._dropView("attributeSearchView");

console.log("[Spline] Create 'progress_view'");
db._createView("progress_view", "arangosearch", {})
    .properties({
        "links": {
            "progress": {
                "analyzers": [
                    "identity"
                ],
                "fields": {
                    "labels": {
                        "analyzers": [
                            "norm_en",
                            "identity"
                        ],
                        "includeAllFields": true
                    },
                    "extra": {
                        "fields": {
                            "appId": {
                                "analyzers": [
                                    "norm_en",
                                    "identity"
                                ]
                            }
                        }
                    },
                    "timestamp": {},
                    "_created": {},
                    "execPlanDetails": {
                        "fields": {
                            "dataSourceUri": {
                                "analyzers": [
                                    "norm_en",
                                    "identity"
                                ]
                            },
                            "dataSourceType": {
                                "analyzers": [
                                    "norm_en"
                                ]
                            },
                            "append": {},
                            "frameworkName": {
                                "analyzers": [
                                    "norm_en"
                                ]
                            },
                            "applicationName": {
                                "analyzers": [
                                    "norm_en"
                                ]
                            }
                        }
                    }
                },
                "includeAllFields": false,
                "storeValues": "none",
                "trackListPositions": false
            }
        }
    });

console.log("[Spline] Create 'dataSource_view'");
db._createView("dataSource_view", "arangosearch", {})
    .properties({
        "links": {
            "dataSource": {
                "analyzers": [
                    "identity"
                ],
                "fields": {
                    "uri": {},
                    "name": {
                        "analyzers": [
                            "norm_en",
                            "identity"
                        ]
                    },
                    "_created": {},
                    "lastWriteDetails": {
                        "fields": {
                            "labels": {
                                "analyzers": [
                                    "norm_en",
                                    "identity"
                                ],
                                "includeAllFields": true
                            },
                            "extra": {
                                "fields": {
                                    "appId": {
                                        "analyzers": [
                                            "norm_en",
                                            "identity"
                                        ]
                                    }
                                }
                            },
                            "timestamp": {},
                            "durationNs": {},
                            "execPlanDetails": {
                                "fields": {
                                    "dataSourceType": {
                                        "analyzers": [
                                            "norm_en"
                                        ]
                                    },
                                    "append": {},
                                    "frameworkName": {
                                        "analyzers": [
                                            "norm_en"
                                        ]
                                    },
                                    "applicationName": {
                                        "analyzers": [
                                            "norm_en"
                                        ]
                                    }
                                }
                            }
                        },
                        "storeValues": "id"
                    }
                },
                "includeAllFields": false,
                "storeValues": "none",
                "trackListPositions": false
            }
        }
    });

console.log("[Spline] Drop user indices 'progress.*' (except 'timestamp')");
db.progress.getIndexes()
    .filter(idx => idx.type !== "primary" && !idx.fields.some(fld => fld === "timestamp"))
    .forEach(idx => db._dropIndex(idx));

console.log("[Spline] Drop user indices 'dataSource.*' (except 'uri')");
db.dataSource.getIndexes()
    .filter(idx => idx.type !== "primary" && !idx.fields.some(fld => fld === "uri"))
    .forEach(idx => db._dropIndex(idx));

console.log("[Spline] Drop unused indices 'operation.outputSource'");
db.operation.getIndexes()
    .filter(idx => idx.type !== "primary" && idx.fields.every(fld => fld === "outputSource"))
    .forEach(idx => db._dropIndex(idx));

console.log(`[Spline] Migration done. Version ${VER}`);
