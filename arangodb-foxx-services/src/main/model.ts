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
export type ExecutionEvent = {
    timestamp: bigint
    extra: {
        appId: string
    }
}
export type DataSource = {
    _key: string
    name: string
}

export type ExecutionNode = {
    _key: string
    name: string

}
export type LineageGraphNode = ExecutionNode | DataSource

export type LineageGraphEdge = {
    source: string
    target: string
}

export type LineageGraph = {
    depth: number
    vertices: Array<LineageGraphNode>
    edges: Array<LineageGraphEdge>
}

/**
 * Mimics backend's [[za.co.absa.spline.consumer.service.model.LineageOverview]]
 */
export type LineageOverview = {
    info: {
        timestamp: bigint
        applicationId: string
        targetDataSourceId: string
    }
    graph: {
        depthRequested: number
        depthComputed: number
        nodes: Array<LineageGraphNode>
        edges: Array<LineageGraphEdge>
    }
}

