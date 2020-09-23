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
const {pruneBefore} = require('./prune-database')

module.exports.controller = function (router) {
    router.delete('/data/before/:timestamp',
        (req) => {
            const timestamp = req.pathParams.timestamp
            pruneBefore(timestamp)
        })
        .pathParam('timestamp', joi.number().integer().min(0).required(), 'Data retention threshold [timestamp in millis]')
        .summary('Prune database')
        .description('Garbage collect the data older than the given timestamp')
}
