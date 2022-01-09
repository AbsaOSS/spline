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

console.log("[Spline] Drop 'attributeSearchView'");
db._dropView("attributeSearchView");

console.log("[Spline] Create index 'progress.durationNs'");
db.progress.ensureIndex({type: "persistent", fields: ["durationNs"]});

console.log(`[Spline] Migration done. Version ${VER}`);
