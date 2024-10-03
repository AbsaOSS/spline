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
import { Progress } from '../../external/persistence-api.model'
import {
    checkExecutionEventExists,
    listExecutionEventInfo_groupedByDataSource,
    listExecutionEvents,
    storeExecutionEvent
} from '../services/execution-event-store'


export const eventsRouter: Foxx.Router = createRouter()


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
                req.queryParams.asAtTime,
                req.queryParams.timestampStart,
                req.queryParams.timestampEnd,
                req.queryParams.searchTerm,
                req.queryParams.writeAppends,
                req.queryParams.applicationId,
                req.queryParams.dataSourceUri,
                req.queryParams.labels,
                req.queryParams.sortField,
                req.queryParams.sortOrder,
                req.queryParams.offset,
                req.queryParams.limit,
            )
            res.send(events)
        })
    .queryParam('asAtTime', Joi.number().required())
    .queryParam('timestampStart', Joi.number().optional().default(null))
    .queryParam('timestampEnd', Joi.number().optional().default(null))
    .queryParam('searchTerm', Joi.string().optional().default(null))
    .queryParam('writeAppends', Joi.array().items(Joi.boolean()).single().max(2).optional().default(null))
    .queryParam('applicationId', Joi.string().optional().default(null))
    .queryParam('dataSourceUri', Joi.string().optional().default(null))
    .queryParam('labels', Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            values: Joi.array().items(Joi.string()).required()
        }))
        .optional().default([]))
    .queryParam('sortField', Joi.string().required())
    .queryParam('sortOrder', Joi.string().required())
    .queryParam('offset', Joi.number().required())
    .queryParam('limit', Joi.number().required())
    .response(200, ['application/json'])
    .summary('List execution events')


// List execution events grouped by data source
eventsRouter
    .get('/_grouped-by-ds',
        (req: Foxx.Request, res: Foxx.Response) => {
            const events = listExecutionEventInfo_groupedByDataSource(
                req.queryParams.asAtTime,
                req.queryParams.timestampStart,
                req.queryParams.timestampEnd,
                req.queryParams.searchTerm,
                req.queryParams.writeAppends,
                req.queryParams.includeNoWrite,
                req.queryParams.applicationId,
                req.queryParams.dataSourceUri,
                req.queryParams.labels,
                req.queryParams.sortField,
                req.queryParams.sortOrder,
                req.queryParams.offset,
                req.queryParams.limit,
            )
            res.send(events)
        })
    .queryParam('asAtTime', Joi.number().required())
    .queryParam('timestampStart', Joi.number().optional().default(null))
    .queryParam('timestampEnd', Joi.number().optional().default(null))
    .queryParam('searchTerm', Joi.string().optional().default(null))
    .queryParam('writeAppends', Joi.array().items(Joi.boolean()).single().max(2).optional().default(null))
    .queryParam('includeNoWrite', Joi.boolean().required())
    .queryParam('applicationId', Joi.string().optional().default(null))
    .queryParam('dataSourceUri', Joi.string().optional().default(null))
    .queryParam('labels', Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            values: Joi.array().items(Joi.string()).required()
        }))
        .optional().default([]))
    .queryParam('sortField', Joi.string().required())
    .queryParam('sortOrder', Joi.string().required())
    .queryParam('offset', Joi.number().required())
    .queryParam('limit', Joi.number().required())
    .response(200, ['application/json'])
    .summary('List execution events')


// Check if execution event exists
eventsRouter
    .get('/:eventId/_exists',
        (req: Foxx.Request, res: Foxx.Response) => {
            const exists = checkExecutionEventExists(
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
            const overview = lineageOverview(eventKey, maxDepth)
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
            const overview = impactOverview(eventKey, maxDepth)
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
