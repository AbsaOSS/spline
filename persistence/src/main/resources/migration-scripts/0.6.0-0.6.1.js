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

const VER = "0.6.1"

const {db} = require("@arangodb");

console.log(`[Spline] Start migration to ${VER}`);

console.log("[Spline] Drop index 'progress.execPlanDetails.executionPlanId'");
const idxToDrop = db.progress.getIndexes().find(idx => idx.fields.every(fld => fld === "execPlanDetails.executionPlanId"));
db.progress.dropIndex(idxToDrop);

console.log("[Spline] Create index 'progress.execPlanDetails.executionPlanKey'");
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.executionPlanKey"]});

console.log(`[Spline] Migration done. Version ${VER}`);
