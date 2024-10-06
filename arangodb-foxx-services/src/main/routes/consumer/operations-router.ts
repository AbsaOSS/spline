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
import { getOperationById } from '../../services/operation-store'
import { ExpressionGraph, OperationDetails } from '../../../external/consumer-api.model'
import { expressionGraphUsedByOperation } from '../../services/expressions-store'


export const operationsRouter: Foxx.Router = createRouter()


// Get operation details
operationsRouter
    .get('/:operationId',
        (req: Foxx.Request, res: Foxx.Response) => {
            const opDetails: OperationDetails = getOperationById(req.pathParams.operationId)
            res.send(opDetails)
        })
    .pathParam('operationId', Joi.string().min(1).required(), 'Operation ID')
    .response(200, ['application/json'], 'Operation details')
    .summary('Get operation details by ID')

// Get expressions graph
operationsRouter
    .get('/:operationId/expressions/_graph',
        (req: Foxx.Request, res: Foxx.Response) => {
            const graph: ExpressionGraph = expressionGraphUsedByOperation(req.pathParams.operationId)
            res.send(graph)
        })
    .pathParam('operationId', Joi.string().min(1).required(), 'Operation ID')
    .response(200, ['application/json'], 'Expressions graph')
    .summary('Get expressions graph used by operation')
