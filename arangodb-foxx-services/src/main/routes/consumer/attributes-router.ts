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
import { AttributeGraph } from '../../../external/consumer-api.model'
import { getDependencyGraph, getImpactGraph } from '../../services/attributes-store'


export const attributesRouter: Foxx.Router = createRouter()


attributesRouter
    .get('/:attrId/dependency-graph',
        (req: Foxx.Request, res: Foxx.Response) => {
            const dependencyGraph: AttributeGraph = getDependencyGraph(req.pathParams.attrId)
            res.send(dependencyGraph)
        })
    .pathParam('attrId', Joi.string().min(1).required(), 'Attribute ID')
    .response(200, ['application/json'], 'Attribute dependency graph')
    .summary('Get attribute dependency graph')

attributesRouter
    .get('/:attrId/impact-graph',
        (req: Foxx.Request, res: Foxx.Response) => {
            const impactGraph: AttributeGraph = getImpactGraph(req.pathParams.attrId)
            res.send(impactGraph)
        })
    .pathParam('attrId', Joi.string().min(1).required(), 'Attribute ID')
    .response(200, ['application/json'], 'Attribute impact graph')
    .summary('Get attribute impact graph')
