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

export type DocumentKey = string
export type ExecutionEvent = ExecutionEventLike
export type DataSource = DataSourceLike

interface DataSourceLike {
    _key: string
}

interface ExecutionEventExtra {
    appId: string
}

export interface ExecutionEventLike {
    timestamp: bigint
    extra: ExecutionEventExtra
}

/**
 * mimics backend's [[za.co.absa.spline.consumer.service.model.LineageOverview]]
 */
export class LineageOverview {
    readonly info: LineageOverviewInfo
    readonly graph: LineageOverviewGraph

    constructor(info: LineageOverviewInfo, graph: LineageOverviewGraph) {
        this.info = info
        this.graph = graph
    }
}

export class LineageOverviewInfo {
    readonly timestamp: bigint
    readonly applicationId: string
    readonly targetDataSourceId: string

    constructor(timestamp: bigint, applicationId: string, targetDataSourceId: string) {
        this.timestamp = timestamp
        this.applicationId = applicationId
        this.targetDataSourceId = targetDataSourceId
    }
}

export class LineageOverviewGraph {
    readonly depthRequested: number
    readonly depthComputed: number
    readonly nodes: Array<object>
    readonly edges: Array<object>

    constructor(depthRequested: number, depthComputed: number, nodes: Array<object>, edges: Array<object>) {
        this.depthRequested = depthRequested
        this.depthComputed = depthComputed
        this.nodes = nodes
        this.edges = edges
    }
}
