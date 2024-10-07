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
import { AttributeGraph } from '../../external/consumer-api.model'
import { EdgeCollectionName, NodeCollectionName } from '../persistence/model'


export function getDependencyGraph(attrId: string): AttributeGraph {
    const rtxInfo = TxManager.startRead()
    const aqlGen = new AQLCodeGenHelper(rtxInfo)

    return db._query(aql`
        WITH ${NodeCollectionName.Attribute},
             ${EdgeCollectionName.DerivesFrom},
             ${NodeCollectionName.Operation},
             ${EdgeCollectionName.Follows},
             ${EdgeCollectionName.Produces},
             ${EdgeCollectionName.Emits},
             ${NodeCollectionName.Schema},
             ${EdgeCollectionName.ConsistsOf}

        LET theAttr = FIRST(
            FOR a IN attribute
                ${aqlGen.genTxIsolationCodeForLoop('a')}
                FILTER a._key == ${attrId}
                RETURN a
        )

        LET theOriginId = FIRST(
            FOR op IN 1
                INBOUND theAttr produces
                RETURN op._id
        )

        LET opIdsPrecedingTheOrigin = (
            FOR op IN 1..999999
                OUTBOUND theOriginId follows
                RETURN DISTINCT op._id
        )

        LET attrsWithEdges = (
            FOR v, e IN 1..999999
                OUTBOUND theAttr derivesFrom
                LET attr = {
                    "_id": v._id,
                    "name": v.name
                }
                LET edge = {
                    "source": PARSE_IDENTIFIER(e._from).key,
                    "target": PARSE_IDENTIFIER(e._to).key
                }
                RETURN [attr, edge]
        )

        LET nodes = (
            FOR a IN UNIQUE(attrsWithEdges[*][0])
                LET originId = FIRST(
                    FOR op IN 1
                        INBOUND a produces
                        RETURN op._id
                )
                LET transOpIds = (
                    FOR op IN 2
                        INBOUND a consistsOf, emits
                        FILTER op._id != originId
                        FILTER op._id IN opIdsPrecedingTheOrigin
                        RETURN op._key
                )
                RETURN {
                    "_id"        : PARSE_IDENTIFIER(a._id).key,
                    "name"       : a.name,
                    "originOpId" : PARSE_IDENTIFIER(originId).key,
                    "transOpIds" : transOpIds
                }
        )

        LET edges = UNIQUE(attrsWithEdges[*][1])

        RETURN {
            "nodes" : PUSH(nodes, {
                "_id"        : theAttr._key,
                "name"       : theAttr.name,
                "originOpId" : PARSE_IDENTIFIER(theOriginId).key,
                "transOpIds" : []
            }),
            edges,
        }
    `).next()
}

export function getImpactGraph(attrId: string): AttributeGraph {
    const rtxInfo = TxManager.startRead()
    const aqlGen = new AQLCodeGenHelper(rtxInfo)

    return db._query(aql`
        WITH ${NodeCollectionName.Attribute},
             ${EdgeCollectionName.DerivesFrom},
             ${NodeCollectionName.Operation},
             ${EdgeCollectionName.Produces},
             ${EdgeCollectionName.Emits},
             ${NodeCollectionName.Schema},
             ${EdgeCollectionName.ConsistsOf}

        LET theAttr = FIRST(
            FOR a IN attribute
                ${aqlGen.genTxIsolationCodeForLoop('a')}
                FILTER a._key == ${attrId}
                RETURN a
        )

        LET attrsWithEdges = (
            FOR v, e IN 0..999999
                INBOUND theAttr derivesFrom
                LET attr = KEEP(v, ["_id", "name"])
                LET edge = e && {
                    "source": PARSE_IDENTIFIER(e._from).key,
                    "target": PARSE_IDENTIFIER(e._to).key
                }
                RETURN [attr, edge]
        )

        LET nodes = (
            FOR a IN UNIQUE(attrsWithEdges[*][0])
                LET originId = FIRST(
                    FOR op IN 1
                        INBOUND a produces
                        RETURN op._id
                )
                LET transOpIds = (
                    FOR op IN 2
                        INBOUND a consistsOf, emits
                        FILTER op._id != originId
                        RETURN op._key
                )
                RETURN {
                    "_id"        : PARSE_IDENTIFIER(a._id).key,
                    "name"       : a.name,
                    "originOpId" : PARSE_IDENTIFIER(originId).key,
                    "transOpIds" : transOpIds
                }
        )

        LET edges = UNIQUE(SHIFT(attrsWithEdges)[*][1])

        RETURN {
            nodes,
            edges,
        }
    `).next()
}
