/*
 * Copyright 2022 ABSA Group Limited
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

import { createRouter } from '@arangodb/foxx'
import * as Joi from 'joi'
import { lineageOverview } from '../services/lineage-overview'
import { impactOverview } from '../services/impact-overview'
import { Progress } from '../../external/api.model'
import { storeExecutionEvent } from '../services/execution-event-store'
import { TxManager } from '../services/TxManager'


export const eventsRouter: Foxx.Router = createRouter()

eventsRouter
    .get('/:eventKey/lineage-overview/:maxDepth',
        (req: Foxx.Request, res: Foxx.Response) => {
            const eventKey = req.pathParams.eventKey
            const maxDepth = req.pathParams.maxDepth
            const rtxInfo = TxManager.startRead()
            const overview = lineageOverview(eventKey, maxDepth, rtxInfo)
            if (overview) {
                res.send(overview)
            }
            else {
                res.status(404)
            }
        })
    .pathParam('eventKey', Joi.string().min(1).required(), 'Execution Event UUID')
    .pathParam('maxDepth', Joi.number().integer().min(0).required(), 'Max depth of traversing in terms of [Data Source] -> [Execution Plan] pairs')
    .response(200, ['application/json'], 'Lineage overview graph')
    .response(404, 'Lineage overview not found for the given execution event')
    .summary('Get execution event end-to-end lineage overview')
    .description('Builds a lineage of the data produced by the given execution event')

eventsRouter
    .get('/:eventKey/impact-overview/:maxDepth',
        (req: Foxx.Request, res: Foxx.Response) => {
            const eventKey = req.pathParams.eventKey
            const maxDepth = req.pathParams.maxDepth
            const rtxInfo = TxManager.startRead()
            const overview = impactOverview(eventKey, maxDepth, rtxInfo)
            if (overview) {
                res.send(overview)
            }
            else {
                res.status(404)
            }
        })
    .pathParam('eventKey', Joi.string().min(1).required(), 'Execution Event UUID')
    .pathParam('maxDepth', Joi.number().integer().min(0).required(), 'Max depth of traversing in terms of [Data Source] -> [Execution Plan] pairs')
    .response(200, ['application/json'], 'Impact (forward lineage) overview graph')
    .response(404, 'Impact (forward lineage) overview not found for the given execution event')
    .summary('Get execution event end-to-end impact (forward lineage) overview')
    .description('Builds an impact (forward lineage) of the data produced by the given execution event')

eventsRouter
    .post('/',
        (req: Foxx.Request, res: Foxx.Response) => {
            const execEvent: Progress = req.body
            storeExecutionEvent(execEvent)
            res.status('created')
        })
    .body(['application/json'], 'Execution Event (Progress) JSON')
    .response(201, 'Execution event recorded')
    .summary('Record a new execution event')
