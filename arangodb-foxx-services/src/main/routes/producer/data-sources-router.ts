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
import { DataSource } from '../../../external/persistence-api.model'
import { storeDataSources } from '../../services/data-source-store'


export const dsRouter: Foxx.Router = createRouter()


// Store data source
dsRouter
    .post('/',
        (req: Foxx.Request, res: Foxx.Response) => {
            const transientDS: DataSource = req.body
            const persistentDS = storeDataSources(transientDS)
            res.send(persistentDS)
        })
    .body(['application/json'], 'Data Source JSON')
    .response(200, ['application/json'], 'Persistent Data Source')
    .summary('Persist a Data Source')
