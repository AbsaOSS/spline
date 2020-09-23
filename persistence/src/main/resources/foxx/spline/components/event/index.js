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

"use strict"

const joi = require('joi')
const {lineageOverview} = require('./lineage-overview')

module.exports.controller = function (router) {
    router.get('/:eventKey/lineage-overview/:maxDepth',
        (req, res) => {
            const eventKey = req.pathParams.eventKey
            const maxDepth = req.pathParams.maxDepth
            const overview = lineageOverview(eventKey, maxDepth)
            if (overview) {
                res.send(overview)
            } else {
                res.status(404)
            }
        })
        .pathParam('eventKey', joi.string().min(1).required(), 'Execution Event UUID')
        .pathParam('maxDepth', joi.number().integer().min(0).required(), 'Max depth of traversing in terms of [Data Source] -> [Execution Plan] pairs')
        .response(['application/json'], 'Lineage overview graph')
        .summary('Execution event end-to-end lineage overview')
        .description('Builds a lineage of the data produced by the given execution event')
}
