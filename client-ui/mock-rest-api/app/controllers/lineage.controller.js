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

const data = require('../data/data.js')
const graphOperations = require('../lib/graph-operations.js')
const detailsOperations = require('../lib/details-operations.js')

const defaultDepth = 30

// Find a lineage with a datasourceId and a timestamp
exports.findOne = (req, res) => {
    //res.send(graphOperations.cutGraph(data.graph, nodeFocus, depth))
    res.send(data.executionPlan)
}

exports.details = (req, res) => {
    let datasourceId = req.params.operationId
    res.send(detailsOperations.getDetails(data.details, datasourceId))
}


