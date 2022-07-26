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

import {DataSource, DocumentKey, ExecutionEvent, LineageOverview} from '../model'

import {observedWritesByRead} from './observed-writes-by-read'
import {
    constructLineageOverview, eventLineageOverviewGraph,
    getExecutionEventFromEventKey,
    getTargetDataSourceFromExecutionEvent,
    LineageGraph
} from './commons'


/**
 * Return a high-level lineage overview of the given write event.
 *
 * @param eventKey write event key
 * @param maxDepth maximum number of job nodes in any path of the resulted graph (excluding cycles).
 * It shows how far the traversal should look for the lineage.
 * @returns za.co.absa.spline.consumer.service.model.LineageOverview
 */
export function lineageOverview(eventKey: DocumentKey, maxDepth: number): LineageOverview {

    const executionEvent: ExecutionEvent = getExecutionEventFromEventKey(eventKey)
    const targetDataSource: DataSource = executionEvent && getTargetDataSourceFromExecutionEvent(executionEvent)
    const lineageGraph: LineageGraph = eventBackwardLineageOverviewGraph(executionEvent, maxDepth)

    return lineageGraph && constructLineageOverview(executionEvent, targetDataSource, maxDepth, lineageGraph)
}

function eventBackwardLineageOverviewGraph(startEvent: ExecutionEvent, maxDepth: number): LineageGraph {
    return eventLineageOverviewGraph(observedWritesByRead, startEvent, maxDepth)
}
