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

"use strict";
const {observedReadsByWrite} = require('./observed-reads-by-write');
const {getExecutionEventFromEventKey, getTargetDataSourceFromExecutionEvent, constructLineageOverview, eventLineageOverviewGraph} = require('./commons')

/**
 * Return a high-level impact (forward-lineage) overview of the given write event.
 *
 * @param eventKey read event key
 * @param maxDepth maximum number of job nodes in any path of the resulted graph (excluding cycles).
 * It shows how far the traversal should looks for the impact (forward-lineage).
 * @returns za.co.absa.spline.consumer.service.model.LineageOverview
 */
function impactOverview(eventKey, maxDepth) {

    const executionEvent = getExecutionEventFromEventKey(eventKey)
    const targetDataSource = executionEvent && getTargetDataSourceFromExecutionEvent(executionEvent)
    const impactGraph = eventImpactOverviewGraph(executionEvent, maxDepth);

    return impactGraph && constructLineageOverview(executionEvent, targetDataSource, maxDepth, impactGraph)
}

function eventImpactOverviewGraph(startEvent, maxDepth) {
    return eventLineageOverviewGraph(observedReadsByWrite, startEvent, maxDepth)
}

module.exports = {
    impactOverview
}
