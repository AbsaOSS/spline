/*
 * Copyright 2021 ABSA Group Limited
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

const VER = "0.6.1"

const {db, aql} = require("@arangodb");
const graph = require('@arangodb/general-graph');

console.log(`[Spline] Start migration to ${VER}`);

console.log("[Spline] Remove views");

db._views().forEach(v => {
    console.log("...drop view", v.name());
    db._dropView(v.name());
});

console.log("[Spline] Remove graphs");

graph._list().forEach(g => {
    console.log("[Spline] ... drop graph", g);
    graph._drop(g, false);
});

console.log("[Spline] Remove indices");

db._collections()
    .filter(c => c.name()[0] !== '_')
    .flatMap(c => c.getIndexes())
    .filter(idx => !['primary', 'edge'].includes(idx.type))
    .forEach(idx => {
        console.log("[Spline] ...drop index", idx.id);
        db._dropIndex(idx);
    });

console.log("[Spline] Create missing NODE collections");

db._createDocumentCollection("schema");
db._createDocumentCollection("attribute");
db._createDocumentCollection("expression");

console.log("[Spline] Create missing EDGE collections");

db._createEdgeCollection("emits");
db._createEdgeCollection("produces");
db._createEdgeCollection("consistsOf");
db._createEdgeCollection("computedBy");
db._createEdgeCollection("derivesFrom");
db._createEdgeCollection("takes");
db._createEdgeCollection("uses");

// Data migration
// ===========================================================================

console.log("[Spline] Extract 'attribute'");

db._query(aql`
    WITH executionPlan, attribute
    FOR ep IN executionPlan
        FILTER LOWER(ep.agentInfo.name) == "spline"
        FILTER ep.extra.attributes != null
    
        FOR attr IN ep.extra.attributes
            INSERT {
                "_key": CONCAT(ep._key, ":", attr.id),
                "_created": ep._created,
                "_belongsTo": ep._id,
                "dataType": attr.dataTypeId,
                "name": attr.name
            }
            INTO attribute
`);

console.log("[Spline] Update 'executionPlan'");

db._query(aql`
    WITH executionPlan
    FOR ep IN executionPlan
        UPDATE ep
            WITH {
                "name": ep.extra.name || ep.extra.appName,
                "extra": { 
                    "attributes": null 
                }
            }
            IN executionPlan
            OPTIONS { 
                keepNull: false
            }
`);

console.log("[Spline] Update 'executes'");

db._query(aql`
    WITH executes
    FOR ex IN executes
        LET epId = ex._from
        UPDATE ex WITH { "_belongsTo": epId } IN executes
`);

console.log("[Spline] Traverse & Update 'operation'");

db._query(aql`
    WITH executes, operation, follows
    FOR ex IN executes
        LET epId = ex._from
        LET wop = DOCUMENT("operation", ex._to)
        
        FOR op IN 0..999999
            OUTBOUND wop follows
            UPDATE op
                WITH { 
                    "name": op.extra.name,
                    "extra": { "name": null },
                    "type": op._type,
                    "_type": null,
                    "_belongsTo": epId
                }
                IN operation 
                OPTIONS {
                    keepNull: false
                }
`);

console.log("[Spline] Traverse & Update 'follows'");

db._query(aql`
    WITH executes, operation, follows
    FOR ex IN executes
        LET epId = ex._from
        LET wop = DOCUMENT("operation", ex._to)
        
        FOR op, flw IN 0..999999
            OUTBOUND wop follows
            FILTER flw != null
            UPDATE flw WITH { "_belongsTo": epId } IN follows
`);

console.log("[Spline] Traverse & Update 'readsFrom'");

db._query(aql`
    WITH executes, operation, follows, readsFrom
    FOR ex IN executes
        LET epId = ex._from
        LET wop = DOCUMENT("operation", ex._to)
        
        FOR op IN 0..999999
            OUTBOUND wop follows
            FOR rf IN readsFrom
                FILTER rf._from == op._id
                UPDATE rf WITH { "_belongsTo": epId } IN readsFrom
`);

console.log("[Spline] Traverse & Update 'writesTo'");

db._query(aql`
    WITH executes, operation, follows, writesTo
    FOR ex IN executes
        LET epId = ex._from
        LET wop = DOCUMENT("operation", ex._to)
        
        FOR op, e IN 0..999999
            OUTBOUND wop follows
            FOR wt IN writesTo
                FILTER wt._from == op._id
                UPDATE wt WITH {"_belongsTo": epId} IN writesTo
`);

console.log("[Spline] Extract 'schema' from 'operation'");

// WARNING: This query consumes large amount of memory!
db._query(aql`
    WITH operation, emits, schema, consistsOf
    FOR op IN operation   
        COLLECT attrLocalIdSeq = op.outputSchema,
                epId = op._belongsTo
                INTO opsByPlanAndSchema
        
        LET emitterOp = opsByPlanAndSchema[0].op
        LET schemaKey = emitterOp._key
        LET schemaId = CONCAT("schema/", schemaKey)
        
        INSERT
            {
                "_key": schemaKey,
                "_created": emitterOp._created,
                "_belongsTo": epId
            }
            INTO schema
            
        LET res1 = COUNT(
            FOR op IN opsByPlanAndSchema[*].op
                INSERT
                    {
                        "_from": op._id,
                        "_to": schemaId,
                        "_created": op._created,
                        "_belongsTo": epId
                    }
                    INTO emits
        )
        
        LET attrCnt = LENGTH(attrLocalIdSeq)
        
        FILTER attrCnt > 0
        
        FOR i IN 0..attrCnt-1
            LET attrLocalId = attrLocalIdSeq[i]
            LET attrId = CONCAT("attribute/", PARSE_IDENTIFIER(epId).key, ":", attrLocalId)
            INSERT
                {
                    "_from": schemaId,
                    "_to": attrId,
                    "_created": emitterOp._created,
                    "_belongsTo": epId,
                    "index": i
                }
                INTO consistsOf
`);

console.log("[Spline] Update attribute references in 'operation'");

db._query(aql`
    WITH operation
    FOR op IN operation   
        LET orgnlParamsJson = JSON_STRINGIFY(op.params)
        LET fixedParamsJson =
            REGEX_REPLACE(
                orgnlParamsJson,
                '"refId":"([^"]+)"',
                CONCAT('"refId":"', PARSE_IDENTIFIER(op._belongsTo).key, ':$1"')
            )
            
        UPDATE op
            WITH {
                "outputSchema": null,
                "params": JSON_PARSE(fixedParamsJson)
            }
            IN operation
            OPTIONS {
                keepNull: false
            }
`);

console.log("[Spline] Update 'progress'");

db._query(aql`
    WITH progress
    FOR p IN progress
        UPDATE p
            WITH { 
                "execPlanDetails": {
                    "executionPlanKey": p.execPlanDetails.executionPlanId,
                    "executionPlanId": null
                },
                "durationNs": p.extra.durationNs,
                "extra": {
                    "durationNs": null
                }
            }
            IN progress
            OPTIONS {
                keepNull: false
            }
`);

console.log("[Spline] Update 'depends'");

db._query(aql`
    WITH depends
    FOR d IN depends
        UPDATE d
            WITH {
                "_belongsTo": d._from
            }
            IN depends
`);

console.log("[Spline] Update 'affects'");

db._query(aql`
    WITH affects
    FOR a IN affects
        UPDATE a
            WITH {
                "_belongsTo": a._from
            }
            IN affects
`);

// The following parts of migration are omitted due to complexity,
// making [0.5 -> 0.6] migration lossy on the attribute/expression lineage level:
//   - EDGE: (operation) produces (attr)
//   - EDGE: (operation) uses (attr|expr)
//   - NODE: expression
//   - EDGE: (attr) computedBy (expr)
//   - EDGE: (attr) derivesFrom (attr)
//   - EDGE: (expr) takes (attr|expr)

// ===========================================================================

console.log("[Spline] Create graphs");

graph._create(
    "overviewGraph",
    [
        {collection: "progressOf", "from": ["progress"], "to": ["executionPlan"]},
        {collection: "depends", "from": ["executionPlan"], "to": ["dataSource"]},
        {collection: "affects", "from": ["executionPlan"], "to": ["dataSource"]},
    ]);

graph._create(
    "operationsGraph",
    [
        {collection: "executes", "from": ["executionPlan"], "to": ["operation"]},
        {collection: "follows", "from": ["operation"], "to": ["operation"]},
        {collection: "readsFrom", "from": ["operation"], "to": ["dataSource"]},
        {collection: "writesTo", "from": ["operation"], "to": ["dataSource"]},
    ]);

graph._create(
    "schemasGraph",
    [
        {collection: "emits", "from": ["operation"], "to": ["schema"]},
        {collection: "consistsOf", "from": ["schema"], "to": ["attribute"]},
    ]);

graph._create(
    "attributesGraph",
    [
        {collection: "produces", "from": ["operation"], "to": ["attribute"]},
        {collection: "derivesFrom", "from": ["attribute"], "to": ["attribute"]},
    ]);

graph._create(
    "expressionsGraph",
    [
        {collection: "computedBy", "from": ["attribute"], "to": ["expression"]},
        {collection: "takes", "from": ["expression"], "to": ["attribute", "expression"]},
    ]);


console.log("[Spline] Create indices");

db.follows.ensureIndex({type: "persistent", fields: ["_belongsTo"]});

db.dataSource.ensureIndex({type: "persistent", fields: ["uri"], unique: true});

db.operation.ensureIndex({type: "persistent", fields: ["_belongsTo"]});
db.operation.ensureIndex({type: "persistent", fields: ["type"]});
db.operation.ensureIndex({type: "persistent", fields: ["outputSource"], sparse: true});
db.operation.ensureIndex({type: "persistent", fields: ["append"], sparse: true});

db.progress.ensureIndex({type: "persistent", fields: ["timestamp"]});
db.progress.ensureIndex({type: "persistent", fields: ["_created"]});
db.progress.ensureIndex({type: "persistent", fields: ["extra.appId"], sparse: true});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.executionPlanKey"]});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.frameworkName"]});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.applicationName"]});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.dataSourceUri"]});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.dataSourceType"]});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.append"]});


console.log("[Spline] Create views");

db._createView("attributeSearchView", "arangosearch", {})
    .properties({
        "links": {
            "attribute": {
                "analyzers": [
                    "text_en",
                    "identity"
                ],
                "fields": {
                    "extra": {
                        "fields": {
                            "name": {}
                        }
                    }
                },
                "includeAllFields": false,
                "storeValues": "none",
                "trackListPositions": false
            }
        }
    });

console.log(`[Spline] Migration done. Version ${VER}`);
