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
import { DataSourceActionType, ExecutionPlanDetailed, ExecutionPlanInfo, Frame } from '../../../external/consumer-api.model'
import { findExecutionPlanInfos, getDataSourceURIsByActionType, getExecutionPlanDetailedById } from '../../services/execution-plan-store'
import Joi from 'joi'


export const plansRouter: Foxx.Router = createRouter()

plansRouter
    .get('/', (req: Foxx.Request, res: Foxx.Response) => {
        const planInfos: Frame<ExecutionPlanInfo> = findExecutionPlanInfos(
            req.queryParams.asAtTime,
            req.queryParams.pageOffset,
            req.queryParams.pageSize,
            req.queryParams.sortField,
            req.queryParams.sortOrder,
        )
        res.send(planInfos)
    })
    .queryParam('asAtTime', Joi.string().required(), 'As at time')
    .queryParam('pageOffset', Joi.number().required(), 'Page offset')
    .queryParam('pageSize', Joi.number().required(), 'Page size')
    .queryParam('sortField', Joi.string().required(), 'Sort field')
    .queryParam('sortOrder', Joi.string().required().valid('asc', 'desc'), 'Sort order')
    .response(200, ['application/json'], 'Array of execution plan infos')
    .summary('Find execution plan infos')

plansRouter
    .get('/:planId/_detailed',
        (req: Foxx.Request, res: Foxx.Response) => {
            const plan: ExecutionPlanDetailed = getExecutionPlanDetailedById(req.pathParams.planId)
            res.send(plan)
        })
    .pathParam('planId', Joi.string().min(1).required(), 'Execution Plan ID')
    .response(200, ['application/json'], 'Detailed Execution Plan')
    .summary('Get detailed execution plan by ID')

plansRouter
    .get('/:planId/data-sources',
        (req: Foxx.Request, res: Foxx.Response) => {
            const uris: string[] = getDataSourceURIsByActionType(
                req.pathParams.planId,
                req.queryParams.access
            )
            res.send(uris)
        })
    .pathParam('planId', Joi.string().min(1).required(), 'Execution Plan ID')
    .queryParam('access', Joi.string().optional().valid(DataSourceActionType.values).default(null), 'Access type (read/write) to filter by')
    .response(200, ['application/json'], 'Array of data source URIs')
    .summary('Get data source URIs by action type')
