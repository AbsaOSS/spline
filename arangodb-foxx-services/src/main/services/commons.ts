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
import {DocumentKey, LineageOverview, DataSource, LineageGraph} from '../model'

import {aql, db} from '@arangodb'
import {memoize} from '../utils/common'
import {GraphBuilder} from '../utils/graph'
import { ReadTxInfo } from '../persistence/model'
import { Progress } from '../../external/api.model'


export function getExecutionEventFromEventKey(eventKey: DocumentKey): Progress {
    return db._query(aql`
        WITH progress
        RETURN FIRST(FOR p IN progress FILTER p._key == ${eventKey} RETURN p)
    `).next()
}

export function getTargetDataSourceFromExecutionEvent(executionEvent: Progress): DataSource {
    return db._query(aql`
        WITH progress, progressOf, executionPlan, affects, dataSource
        RETURN FIRST(FOR ds IN 2 OUTBOUND ${executionEvent} progressOf, affects RETURN ds)
    `).next()
}

export function constructLineageOverview(executionEvent: Progress, targetDataSource: DataSource, maxDepth: number, lineageGraph: LineageGraph): LineageOverview {
    return {
        'info': {
            'timestamp': executionEvent.timestamp,
            'applicationId': executionEvent.extra.appId,
            'targetDataSourceId': targetDataSource._key
        },
        'graph': {
            'depthRequested': maxDepth,
            'depthComputed': lineageGraph.depth || -1,
            'nodes': lineageGraph.vertices,
            'edges': lineageGraph.edges
        }
    }
}

function getStartDataSourceFromExecutionEvent(startEvent: Progress): DataSource {
    return db._query(aql`
        WITH progress, progressOf, executionPlan, affects, dataSource
        FOR ds IN 2 OUTBOUND ${startEvent} progressOf, affects
            LIMIT 1
            RETURN {
                "_id": ds._key,
                "_type": "DataSourceNode",
                "name": ds.uri
            }
        `).next()
}

function getPartialGraphForEvent(event: Progress) {
    // using the same query for backward lineage and forward lineage (impact)
    return db._query(aql`
            WITH progress, progressOf, executionPlan, affects, depends, dataSource

            LET exec = FIRST(FOR ex IN 1 OUTBOUND ${event} progressOf RETURN ex)
            LET affectedDsEdgeAndNode = FIRST(FOR v, e IN 1 OUTBOUND exec affects RETURN [v,e])

            LET affectedDsNode = affectedDsEdgeAndNode[0] // for impact: node with result datasource must be included explicitly
            LET affectedDsEdge = affectedDsEdgeAndNode[1]

            LET rdsWithInEdges = (FOR ds, e IN 1 OUTBOUND exec depends RETURN [ds, e])
            LET readSources = rdsWithInEdges[*][0]
            LET readDsEdges = rdsWithInEdges[*][1]

            LET vertices = (
                FOR vert IN APPEND(APPEND(readSources, exec), affectedDsNode)
                    LET vertType = SPLIT(vert._id, '/')[0]
                    RETURN vertType == "dataSource"
                        ? {
                            "_id": vert._key,
                            "_type": "DataSourceNode",
                            "name": vert.uri
                        }
                        : MERGE(KEEP(vert, ["systemInfo", "agentInfo"]), {
                            "_id": vert._key,
                            "_type": "ExecutionNode",
                            "name": vert.name || ""
                        })
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
        `).next()
}

export function eventLineageOverviewGraph(observeByEventFn: (p: Progress, rtxInfo: ReadTxInfo) => Progress[], startEvent: Progress, maxDepth: number, rtxInfo: ReadTxInfo): LineageGraph {
    if (!startEvent || maxDepth < 0) {
        return null
    }

    const startSource = getStartDataSourceFromExecutionEvent(startEvent)
    const graphBuilder = new GraphBuilder([startSource])

    const collectPartialGraphForEvent = (event: Progress) => {
        const partialGraph = getPartialGraphForEvent(event)
        graphBuilder.add(partialGraph)
    }

    const traverse = memoize(e => e._id, (event: Progress, depth: number) => {
        let remainingDepth = depth - 1
        if (depth > 1) {
            observeByEventFn(event, rtxInfo)
                .forEach(writeEvent => {
                    const remainingDepth_i = traverse(writeEvent, depth - 1)
                    remainingDepth = Math.min(remainingDepth, remainingDepth_i)
                })
        }

        collectPartialGraphForEvent(event)

        return remainingDepth
    })

    const totalRemainingDepth = maxDepth > 0 ? traverse(startEvent, maxDepth) : 0
    const resultedGraph = graphBuilder.graph()

    return {
        depth: maxDepth - totalRemainingDepth,
        vertices: resultedGraph.vertices,
        edges: resultedGraph.edges
    }
}
