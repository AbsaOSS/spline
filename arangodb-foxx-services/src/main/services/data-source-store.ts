/*
 * Copyright 2024 ABSA Group Limited
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

import * as api from '../../external/api.model'
import { withTimeTracking } from '../utils/common'
import { aql, db } from '@arangodb'
import { NodeCollectionName } from '../persistence/model'
import * as persistence from '../model'


export function storeDataSources(ds: api.DataSource): persistence.DataSource {
    return withTimeTracking(`STORE DATA SOURCE ${ds}`, () => {
        return db._query(aql`
            WITH ${NodeCollectionName.DataSource}
            UPSERT { uri: ${ds.uri} }
            INSERT KEEP(${ds}, ['_created', 'uri', 'name'])
            UPDATE {} IN ${aql.literal(NodeCollectionName.DataSource)}
            RETURN KEEP(NEW, ['_key', 'uri'])
        `).next()
    })
}
