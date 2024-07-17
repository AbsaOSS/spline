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
import { ExecutionPlanPersistentModel } from '../../external/api.model'
import { storeExecutionPlan } from '../services/execution-plan-store'
import Joi from 'joi'
import { checkKeyExistence } from '../services/store'
import { NodeCollectionName } from '../persistence/model'


export const plansRouter: Foxx.Router = createRouter()

plansRouter
    .post('/',
        (req: Foxx.Request, res: Foxx.Response) => {
            const execPlanModel: ExecutionPlanPersistentModel = req.body
            storeExecutionPlan(execPlanModel)
            res.status('created')
        })
    .body(['application/json'], 'Execution Plan Persistent Model JSON')
    .response(201, 'Plan registered')
    .summary('Register a new execution plan')

plansRouter
    .get('/:planId/_exists',
        (req: Foxx.Request, res: Foxx.Response) => {
            const exists = checkKeyExistence(
                NodeCollectionName.ExecutionPlan,
                req.pathParams.planId,
                req.queryParams.discriminator
            )
            res.send(exists)
        })
    .pathParam('planId', Joi.string().min(1).required(), 'Execution Plan ID')
    .queryParam('discriminator', Joi.string().optional(), 'Execution Plan Discriminator')
    .response(200, ['application/json'], 'Boolean value indicating if the execution plan exists')
    .summary('Check if the execution plan with the given parameters exists')
