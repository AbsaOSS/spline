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
import { context } from '@arangodb/locals'

import { RequestLogger } from '../middleware/request-logger.middleware'
import adminRouter from './admin'
import producerRouter from './producer'
import consumerRouter from './consumer'


const rootRouter: Foxx.Router = createRouter()

if (context.isDevelopment) {
    rootRouter.use(RequestLogger)
}

rootRouter.use('/admin', adminRouter)
rootRouter.use('/producer', producerRouter)
rootRouter.use('/consumer', consumerRouter)

export default rootRouter
