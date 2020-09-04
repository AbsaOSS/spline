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

const {db, aql} = require("@arangodb");
const udfs = require("@arangodb/aql/functions");

console.log("Remove SPLINE AQL UDFs");

udfs.unregister("SPLINE::OBSERVED_WRITES_BY_READ");
udfs.unregister("SPLINE::EVENT_LINEAGE_OVERVIEW");

// TODO: register Spline Foxx services

console.log("Done");
