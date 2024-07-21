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
import Joi from 'joi'

import { lineageOverview } from '../services/lineage-overview'
import { impactOverview } from '../services/impact-overview'
import { Progress } from '../../external/api.model'
import { listExecutionEvents, storeExecutionEvent } from '../services/execution-event-store'
import { TxManager } from '../services/txm'
import { checkKeyExistence } from '../services/store'
import { NodeCollectionName } from '../persistence/model'


export const eventsRouter: Foxx.Router = createRouter()

function toBoolean(str: string): boolean {
    return str == null ? null : str.toLowerCase() === 'true'
}

// Store execution event
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

// List execution events
eventsRouter
    .get('/',
        (req: Foxx.Request, res: Foxx.Response) => {
            const events = listExecutionEvents(
                +req.queryParams.asAtTime,
                +req.queryParams.timestampStart,
                +req.queryParams.timestampEnd,
                +req.queryParams.pageOffset,
                +req.queryParams.pageSize,
                req.queryParams.sortField,
                req.queryParams.sortOrder,
                req.queryParams.searchTerm || null,
                toBoolean(req.queryParams.writeAppends),
                req.queryParams.applicationId || null,
                req.queryParams.dataSourceUri || null,
                req.queryParams.lblNames || [],
                req.queryParams.lblValues || []
            )
            res.send(events)
        })
    //todo: add query params validation
    // .queryParam('asAtTime', Joi.number().required())
    // .queryParam('timestampStart', Joi.number().optional())
    // .queryParam('timestampEnd', Joi.number().optional())
    // .queryParam('pageOffset', Joi.number().required())
    // .queryParam('pageSize', Joi.number().required())
    // .queryParam('sortField', Joi.string().required())
    // .queryParam('sortOrder', Joi.string().required())
    // .queryParam('searchTerm', Joi.string().optional())
    // .queryParam('writeAppends', Joi.boolean().optional())
    // .queryParam('applicationId', Joi.string().optional())
    // .queryParam('dataSourceUri', Joi.string().optional())
    // .queryParam('lblNames', Joi.array().items(Joi.string()).required())
    // .queryParam('lblValues', Joi.array().items(Joi.string()).required())
    .response(200, ['application/json'])
    .summary('List execution events')

// Check if execution event exists
eventsRouter
    .get('/:eventId/_exists',
        (req: Foxx.Request, res: Foxx.Response) => {
            const exists = checkKeyExistence(
                NodeCollectionName.Progress,
                req.pathParams.eventId,
                req.queryParams.discriminator
            )
            res.send(exists)
        })
    .pathParam('eventId', Joi.string().min(1).required(), 'Execution Event ID')
    .queryParam('discriminator', Joi.string().optional(), 'Execution Event Discriminator')
    .response(200, ['application/json'], 'Boolean value indicating if the execution event exists')
    .summary('Check if the execution event with the given parameters exists')

// Get execution event lineage overview
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

// Get execution event impact overview
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
