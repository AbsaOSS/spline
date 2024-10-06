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

import { plansRouter } from './plans-router'
import { eventsRouter } from './events-router'
import { operationsRouter } from './operations-router'


const consumerRouter: Foxx.Router = createRouter()

consumerRouter.use('/execution-plans', plansRouter)
consumerRouter.use('/execution-events', eventsRouter)
consumerRouter.use('/operations', operationsRouter)

export default consumerRouter
