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

import { TxManager } from '../persistence/txm'
import { AQLCodeGenHelper } from '../utils/aql-gen-helper'
import { aql, db } from '@arangodb'
import { EdgeCollectionName, NodeCollectionName } from '../persistence/model'
import { ExpressionGraph } from '../../external/consumer-api.model'


export function expressionGraphUsedByOperation(opId: string): ExpressionGraph {
    const rtxInfo = TxManager.startRead()
    const aqlGen = new AQLCodeGenHelper(rtxInfo)

    return db._query(aql`
        WITH ${aql.literal(NodeCollectionName.Operation)},
             ${aql.literal(EdgeCollectionName.Uses)},
             ${aql.literal(NodeCollectionName.Expression)},
             ${aql.literal(EdgeCollectionName.Takes)},
             ${aql.literal(NodeCollectionName.Attribute)}

        LET op = FIRST(
            FOR op IN operation
                ${aqlGen.genTxIsolationCodeForLoop('op')}
                FILTER op._key == ${opId}
                RETURN op
        )

        LET ps = (
            FOR v, e IN 1..999999
                OUTBOUND op uses, takes
                RETURN [
                    UNSET(
                        MERGE(v, {
                            "_id" : v._key
                        }),
                        ["_key", "_created", "_rev", "type"]
                    ),
                    MERGE(KEEP(e, ["index", "path"]), {
                        "source"   : PARSE_IDENTIFIER(e._from).key,
                        "target"   : PARSE_IDENTIFIER(e._to).key,
                        "type"     : PARSE_IDENTIFIER(e._id).collection,
                    })
                ]
        )

        RETURN {
            "nodes" : UNIQUE(ps[*][0]),
            "edges" : UNIQUE(ps[*][1])
        }
    `).next()
}
