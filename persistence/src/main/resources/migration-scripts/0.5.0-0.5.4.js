/*
 * Copyright 2020 ABSA Group Limited
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

const {db, aql} = require("@arangodb");
const udfs = require("@arangodb/aql/functions");

console.log("Update SPLINE::EVENT_LINEAGE_OVERVIEW");

udfs.unregister("SPLINE::EVENT_LINEAGE_OVERVIEW");
udfs.register("SPLINE::EVENT_LINEAGE_OVERVIEW", "" +
    "/*\n" +
    " * Copyright 2019 ABSA Group Limited\n" +
    " *\n" +
    " * Licensed under the Apache License, Version 2.0 (the \"License\");\n" +
    " * you may not use this file except in compliance with the License.\n" +
    " * You may obtain a copy of the License at\n" +
    " *\n" +
    " *     http://www.apache.org/licenses/LICENSE-2.0\n" +
    " *\n" +
    " * Unless required by applicable law or agreed to in writing, software\n" +
    " * distributed under the License is distributed on an \"AS IS\" BASIS,\n" +
    " * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" +
    " * See the License for the specific language governing permissions and\n" +
    " * limitations under the License.\n" +
    " */\n" +
    "(function () {\n" +
    "    'use strict';\n" +
    "\n" +
    "    class DistinctCollector {\n" +
    "        constructor(keyFn, initialValues) {\n" +
    "            this.keyFn = keyFn;\n" +
    "            this.keys = new Set((initialValues || []).map(v => keyFn(v)));\n" +
    "            this.vals = initialValues || [];\n" +
    "        }\n" +
    "\n" +
    "        add(o) {\n" +
    "            const k = this.keyFn(o);\n" +
    "            if (!this.keys.has(k)) {\n" +
    "                this.keys.add(k);\n" +
    "                this.vals.push(o);\n" +
    "            }\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    class GraphBuilder {\n" +
    "        constructor(vertices, edges) {\n" +
    "            this.vertexCollector = new DistinctCollector(v => v._id, vertices);\n" +
    "            this.edgeCollector = new DistinctCollector(e => `${e.source}:${e.target}`, edges);\n" +
    "        }\n" +
    "\n" +
    "        add(pGraph) {\n" +
    "            pGraph.vertices.forEach(v => this.vertexCollector.add(v));\n" +
    "            pGraph.edges.forEach(e => this.edgeCollector.add(e));\n" +
    "        }\n" +
    "\n" +
    "        graph() {\n" +
    "            return {\n" +
    "                vertices: this.vertexCollector.vals,\n" +
    "                edges: this.edgeCollector.vals\n" +
    "            }\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    function memoize(keyFn, valFn) {\n" +
    "        const cache = new Map();\n" +
    "        return function () {\n" +
    "            const key = keyFn.apply(this, arguments);\n" +
    "            if (cache.has(key)) {\n" +
    "                return cache.get(key);\n" +
    "            } else {\n" +
    "                const value = valFn.apply(this, arguments);\n" +
    "                cache.set(key, value);\n" +
    "                return value;\n" +
    "            }\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    return (startEvent, maxDepth) => {\n" +
    "        const {db, aql} = require('@arangodb');\n" +
    "\n" +
    "        if (!startEvent || maxDepth < 0) {\n" +
    "            return null;\n" +
    "        }\n" +
    "\n" +
    "        const startSource = db._query(aql`\n" +
    "            RETURN FIRST(\n" +
    "                FOR ds IN 2 OUTBOUND ${startEvent} progressOf, affects \n" +
    "                    RETURN {\n" +
    "                        \"_id\": ds._key,\n" +
    "                        \"_class\": \"za.co.absa.spline.consumer.service.model.DataSourceNode\",\n" +
    "                        \"name\": ds.uri\n" +
    "                    }\n" +
    "            )`\n" +
    "        ).next();\n" +
    "\n" +
    "        const graphBuilder = new GraphBuilder([startSource]);\n" +
    "\n" +
    "        const findObservedWritesByRead = event =>\n" +
    "            db._query(aql`RETURN SPLINE::OBSERVED_WRITES_BY_READ(${event})`).next();\n" +
    "\n" +
    "        const collectPartialGraphForEvent = event => {\n" +
    "            const partialGraph = db._query(aql`\n" +
    "                LET exec = FIRST(FOR ex IN 1 OUTBOUND ${event} progressOf RETURN ex)\n" +
    "                LET affectedDsEdge = FIRST(FOR v, e IN 1 OUTBOUND exec affects RETURN e)\n" +
    "                LET rdsWithInEdges = (FOR ds, e IN 1 OUTBOUND exec depends RETURN [ds, e])\n" +
    "                LET readSources = rdsWithInEdges[*][0]\n" +
    "                LET readDsEdges = rdsWithInEdges[*][1]\n" +
    "                \n" +
    "                LET vertices = (\n" +
    "                    FOR vert IN APPEND(readSources, exec)\n" +
    "                        LET vertType = SPLIT(vert._id, '/')[0]\n" +
    "                        RETURN vertType == \"dataSource\"\n" +
    "                            ? {\n" +
    "                                \"_id\": vert._key,\n" +
    "                                \"_class\": \"za.co.absa.spline.consumer.service.model.DataSourceNode\",\n" +
    "                                \"name\": vert.uri\n" +
    "                            }\n" +
    "                            : {\n" +
    "                                \"_id\": vert._key,\n" +
    "                                \"_class\": \"za.co.absa.spline.consumer.service.model.ExecutionNode\",\n" +
    "                                \"name\": vert.extra.appName\n" +
    "                            }\n" +
    "                )\n" +
    "                \n" +
    "                LET edges = (\n" +
    "                    FOR edge IN APPEND(readDsEdges, affectedDsEdge)\n" +
    "                        LET edgeType = SPLIT(edge._id, '/')[0]\n" +
    "                        LET exKey = SPLIT(edge._from, '/')[1]\n" +
    "                        LET dsKey = SPLIT(edge._to, '/')[1]\n" +
    "                        RETURN {\n" +
    "                            \"source\": edgeType == \"depends\" ? dsKey : exKey,\n" +
    "                            \"target\": edgeType == \"affects\" ? dsKey : exKey\n" +
    "                        }\n" +
    "                )\n" +
    "                \n" +
    "                RETURN {vertices, edges}\n" +
    "            `).next();\n" +
    "\n" +
    "            graphBuilder.add(partialGraph);\n" +
    "        };\n" +
    "\n" +
    "        const traverse = memoize(e => e._id, (event, depth) => {\n" +
    "            let remainingDepth = depth - 1;\n" +
    "            if (depth > 1) {\n" +
    "                findObservedWritesByRead(event)\n" +
    "                    .forEach(writeEvent => {\n" +
    "                        const remainingDepth_i = traverse(writeEvent, depth - 1);\n" +
    "                        remainingDepth = Math.min(remainingDepth, remainingDepth_i);\n" +
    "                    })\n" +
    "            }\n" +
    "\n" +
    "            collectPartialGraphForEvent(event);\n" +
    "\n" +
    "            return remainingDepth;\n" +
    "        });\n" +
    "\n" +
    "        const remainingDepth = maxDepth > 0 ? traverse(startEvent, maxDepth) : 0;\n" +
    "        const resultedGraph = graphBuilder.graph();\n" +
    "\n" +
    "        return {\n" +
    "            depth: maxDepth - remainingDepth,\n" +
    "            vertices: resultedGraph.vertices,\n" +
    "            edges: resultedGraph.edges\n" +
    "        }\n" +
    "    }\n" +
    "})()\n");

console.log("Remove indices");

db._collections()
    .filter(c => c.name()[0] !== '_')
    .flatMap(c => c.getIndexes())
    .filter(idx => !['primary', 'edge'].includes(idx.type))
    .forEach(idx => {
        console.log("...drop index", idx.id);
        db._dropIndex(idx);
    });

console.log("Upgrade data");

db._query(aql`
    FOR ee IN progress
        LET executionEventDetails = FIRST(
            FOR v,e,p IN 2 OUTBOUND ee progressOf, executes
                LET exec = p.vertices[1]
                LET ope = v
                RETURN {
                    "executionPlanId" : exec._key,
                    "frameworkName" : CONCAT(exec.systemInfo.name, " ", exec.systemInfo.version),
                    "applicationName" : exec.extra.appName,
                    "dataSourceUri" : ope.outputSource,
                    "dataSourceType" : ope.extra.destinationType,
                    "append" : ope.append
                }
        )
    
       UPDATE ee WITH {
            execPlanDetails : {
                executionPlanId : executionEventDetails.executionPlanId,
                frameworkName : executionEventDetails.frameworkName,
                applicationName : executionEventDetails.applicationName,
                dataSourceUri : executionEventDetails.dataSourceUri,
                dataSourceType : executionEventDetails.dataSourceType,
                append : executionEventDetails.append
            }
       } IN progress
     `
);

console.log("Create indices");

db.dataSource.ensureIndex({type: "persistent", fields: ["uri"], unique: true});

db.operation.ensureIndex({type: "persistent", fields: ["_type"]});
db.operation.ensureIndex({type: "persistent", fields: ["outputSource"], sparse: true});
db.operation.ensureIndex({type: "persistent", fields: ["append"], sparse: true});

db.progress.ensureIndex({type: "persistent", fields: ["timestamp"]});
db.progress.ensureIndex({type: "persistent", fields: ["_created"]});
db.progress.ensureIndex({type: "persistent", fields: ["extra.appId"], sparse: true});

db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.executionPlanId"]});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.frameworkName"]});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.applicationName"]});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.dataSourceUri"]});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.dataSourceType"]});
db.progress.ensureIndex({type: "persistent", fields: ["execPlanDetails.append"]});

console.log("Done");
