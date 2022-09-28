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

import { ReadTxInfo } from '../persistence/model'
import { aql } from '@arangodb'


export class AQLCodeGenHelper {
    private i = 0

    constructor(
        private readonly rtxInfo: ReadTxInfo
    ) {
    }

    genTxIsolationCode(...aqlVarIdentifiers: string[]) {
        this.i++
        const pruneVar = aql.literal(`__isTxDirty${this.i}`)
        return aql`
            PRUNE ${pruneVar} = !SPLINE::IS_VISIBLE_FROM_TX(${this.rtxInfo}, ${aql.literal(aqlVarIdentifiers.join(','))})
            FILTER !${pruneVar}
        `
    }
}
