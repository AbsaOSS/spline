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

const VER = "0.8.2"

const {db, aql} = require("@arangodb");

console.log(`[Spline] Start migration to ${VER}`);

console.log("[Spline] Create index 'writesTo._belongsTo'");
db.writesTo.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'readsFrom._belongsTo'");
db.readsFrom.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'executes._belongsTo'");
db.executes.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'depends._belongsTo'");
db.depends.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'affects._belongsTo'");
db.affects.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'emits._belongsTo'");
db.emits.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'produces._belongsTo'");
db.produces.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'consistsOf._belongsTo'");
db.consistsOf.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'computedBy._belongsTo'");
db.computedBy.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'derivesFrom._belongsTo'");
db.derivesFrom.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'takes._belongsTo'");
db.takes.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'uses._belongsTo'");
db.uses.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'schema._belongsTo'");
db.schema.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'attribute._belongsTo'");
db.attribute.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log("[Spline] Create index 'expression._belongsTo'");
db.expression.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

console.log(`[Spline] Migration done. Version ${VER}`);
