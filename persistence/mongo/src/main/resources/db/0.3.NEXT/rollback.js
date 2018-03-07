/*
 * Copyright 2017 Barclays Africa Group Limited
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
db.lineages.aggregate(
    [
        {
            $project: {
                rootDataset: 0,
                rootOperation: 0
            }
        },
        {
            "$out": "lineages"
        }
    ]
)
db.lineages.dropIndex({ "rootDataset._id" : 1})
db.lineages.dropIndex({ "rootOperation.path" : 1, "appId": 1})
db.lineages.dropIndex({ "operations.sources.datasetId" : 1})
db.lineages.dropIndex({ "timestamp" : 1})