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

// SL-141

db.operations.createIndex({"_index": 1})
db.operations.createIndex({"_typeHint": 1})

db.datasets.createIndex({"_index": 1})

db.attributes.createIndex({"_index": 1})

db.transformations_v4.createIndex({"_index": 1})
db.transformations_v4.createIndex({"_lineageId": 1})

db.dataTypes_v4.createIndex({"_index": 1})
db.dataTypes_v4.createIndex({"_lineageId": 1})