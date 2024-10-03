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

import { aql, db } from '@arangodb'
import { EdgeCollectionName, NodeCollectionName } from '../persistence/model'
import { OperationDetails } from '../../external/consumer-api.model'
import { AQLCodeGenHelper } from '../utils/aql-gen-helper'
import { TxManager } from '../persistence/txm'


export function getOperationById(opId: string): OperationDetails {
    const rtxInfo = TxManager.startRead()
    const aqlGen = new AQLCodeGenHelper(rtxInfo)

    return db._query(aql`
        WITH ${aql.literal(NodeCollectionName.ExecutionPlan)},
             ${aql.literal(EdgeCollectionName.Executes)},
             ${aql.literal(NodeCollectionName.Operation)},
             ${aql.literal(EdgeCollectionName.Follows)},
             ${aql.literal(EdgeCollectionName.Emits)},
             ${aql.literal(NodeCollectionName.Schema)},
             ${aql.literal(EdgeCollectionName.ConsistsOf)},
             ${aql.literal(EdgeCollectionName.Uses)},
             ${aql.literal(EdgeCollectionName.Takes)},
             ${aql.literal(NodeCollectionName.Attribute)},
             ${aql.literal(NodeCollectionName.Expression)}

        FOR ope IN operation
            ${aqlGen.genTxIsolationCodeForLoop('ope')}
            FILTER ope._key == ${opId}

            LET inputs = (
                FOR v, e IN 1..1
                    OUTBOUND ope follows
                    SORT e.index
                    RETURN v
            )

            LET schemas = (
                FOR op IN APPEND(inputs, ope)
                    LET schema = (
                        FOR attr, e IN 2 OUTBOUND op emits, consistsOf
                            SORT e.index
                            RETURN {
                                "id": attr._key,
                                "name": attr.name,
                                "dataTypeId": attr.dataType
                            }
                    )
                    RETURN schema
            )

            LET execPlan = DOCUMENT(ope._belongsTo)
            LET dataTypes = execPlan.extra.dataTypes || []

            RETURN {
                "operation": {
                    "_id"       : ope._key,
                    "_type"     : ope.type,
                    "name"      : ope.name || ope.type,
                    "properties": MERGE(
                        {
                            "inputSources": ope.inputSources,
                            "outputSource": ope.outputSource,
                            "append"      : ope.append
                        },
                        ope.params,
                        ope.extra
                    )
                },
                "dataTypes": dataTypes,
                "schemas"  : schemas,
                "inputs"   : LENGTH(inputs) > 0 ? RANGE(0, LENGTH(inputs) - 1) : [],
                "output"   : LENGTH(schemas) - 1
            }
        `).next()
}
