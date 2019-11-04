/*
 * Copyright 2019 ABSA Group Limited
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
(function () {
    'use strict';

    class DistinctCollector {
        constructor(keyFn, initialValues) {
            this.keyFn = keyFn;
            this.keys = new Set((initialValues || []).map(v => keyFn(v)));
            this.vals = initialValues || [];
        }

        add(o) {
            const k = this.keyFn(o);
            if (!this.keys.has(k)) {
                this.keys.add(k);
                this.vals.push(o);
            }
        }
    }

    class GraphBuilder {
        constructor(vertices, edges) {
            this.vertexCollector = new DistinctCollector(v => v._id, vertices);
            this.edgeCollector = new DistinctCollector(e => `${e.source}:${e.target}`, edges);
        }

        add(pGraph) {
            pGraph.vertices.forEach(v => this.vertexCollector.add(v));
            pGraph.edges.forEach(e => this.edgeCollector.add(e));
        }

        graph() {
            return {
                vertices: this.vertexCollector.vals,
                edges: this.edgeCollector.vals
            }
        }
    }

    return (startEvent, maxDepth) => {
        const {db, aql} = require('@arangodb');

        if (!startEvent || maxDepth < 0) {
            return null;
        }

        const startSource = db._query(aql`
            RETURN FIRST(
                FOR ds IN 2 OUTBOUND ${startEvent} progressOf, affects 
                    RETURN {
                        "_id": ds._key,
                        "_class": "za.co.absa.spline.consumer.service.model.DataSourceNode",
                        "name": ds.uri
                    }
            )`
        ).next();

        const graphBuilder = new GraphBuilder([startSource]);

        function traverse(event, depth) {
            if (depth > 1) {
                db._query(aql`RETURN SPLINE::OBSERVED_WRITES_BY_READ(${event})`)
                    .next()
                    .forEach(writeEvent => traverse(writeEvent, depth - 1))
            }
            const partialGraph = db._query(aql`
                LET exec = FIRST(FOR ex IN 1 OUTBOUND ${event} progressOf RETURN ex)
                LET affectedDsEdge = FIRST(FOR v, e IN 1 OUTBOUND exec affects RETURN e)
                LET rdsWithInEdges = (FOR ds, e IN 1 OUTBOUND exec depends RETURN [ds, e])
                LET readSources = rdsWithInEdges[*][0]
                LET readDsEdges = rdsWithInEdges[*][1]
                
                LET vertices = (
                    FOR vert IN APPEND(readSources, exec)
                        LET vertType = SPLIT(vert._id, '/')[0]
                        RETURN vertType == "dataSource"
                            ? {
                                "_id": vert._key,
                                "_class": "za.co.absa.spline.consumer.service.model.DataSourceNode",
                                "name": vert.uri
                            }
                            : {
                                "_id": vert._key,
                                "_class": "za.co.absa.spline.consumer.service.model.ExecutionNode",
                                "name": vert.extra.appName
                            }
                )
                
                LET edges = (
                    FOR edge IN APPEND(readDsEdges, affectedDsEdge)
                        LET edgeType = SPLIT(edge._id, '/')[0]
                        LET exKey = SPLIT(edge._from, '/')[1]
                        LET dsKey = SPLIT(edge._to, '/')[1]
                        RETURN {
                            "source": edgeType == "depends" ? dsKey : exKey,
                            "target": edgeType == "affects" ? dsKey : exKey
                        }
                )
                
                RETURN {vertices, edges}
            `).next();

            graphBuilder.add(partialGraph);
        }

        if (maxDepth > 0) traverse(startEvent, maxDepth);

        return graphBuilder.graph()
    }
})()