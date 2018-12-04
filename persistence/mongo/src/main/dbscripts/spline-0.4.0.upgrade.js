/*
 * Copyright 2017 ABSA Group Limited
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

// Same indexes as in version 0.3.2
db.lineages_v5.createIndex({"rootDataset._id": 1})
db.lineages_v5.createIndex({"rootOperation.path": 1, "appId": 1})
db.lineages_v5.createIndex({"timestamp": 1})

db.operations_v5.createIndex({"_lineageId": 1})
db.operations_v5.createIndex({"sources.datasetsIds": 1})
db.operations_v5.createIndex({"_index": 1})
db.operations_v5.createIndex({"_typeHint": 1})

db.datasets_v5.createIndex({"_lineageId": 1})
db.datasets_v5.createIndex({"_index": 1})

db.attributes_v5.createIndex({"_lineageId": 1})
db.attributes_v5.createIndex({"_index": 1})

db.transformations_v5.createIndex({"_index": 1})
db.transformations_v5.createIndex({"_lineageId": 1})

db.dataTypes_v5.createIndex({"_index": 1})
db.dataTypes_v5.createIndex({"_lineageId": 1})


// Indexes for Events collection
db.events_v5.createIndex({"lineageId": 1})
db.events_v5.createIndex({"timestamp": 1})
db.events_v5.createIndex({"timestamp": 1, "writePath": 1})
db.events_v5.createIndex({"timestamp": 1, "readPaths": 1})
