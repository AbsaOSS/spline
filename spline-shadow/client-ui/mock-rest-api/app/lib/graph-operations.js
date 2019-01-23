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

let _ = require('lodash')
const maxDepth = 100

let getNode = function (data, nodeId) {
    return _.find(data.nodes, function (node) { return node.data['id'] === nodeId })
}

let getChildren = function (data, originNode, children, depth) {
    depth = depth - 1
    _.each(data.edges, function (edge) {
        if (edge.data['source'] === originNode.data['id']) {
            let targetNode = getNode(data, edge.data['target'])
            children.push(targetNode)
            if (depth > 0) {
                getChildren(data, targetNode, children, depth)
            }
        }
    })
    return children
}

let getAncestors = function (data, originNode, ancestors, depth) {
    depth = depth - 1
    _.each(data.edges, function (edge) {
        if (edge.data['target'] === originNode.data['id']) {
            let sourceNode = getNode(data, edge.data['source'])
            ancestors.push(sourceNode)
            if (depth > 0) {
                getAncestors(data, sourceNode, ancestors, depth)
            }
        }
    })
    return ancestors
}

let filterEdges = function (edges, nodes) {
    let finalEdges = new Set()
    _.each(edges, function (edge) {
        let nodeFound = 0
        _.each(nodes, function (node) {
            if (edge.data['source'] === node.data['id'] || edge.data['target'] === node.data['id']) {
                nodeFound++
                if (nodeFound === 2) {
                    finalEdges.add(edge)
                    return false
                }

            }
        })
    })
    return Array.from(finalEdges)
}

let cutGraph = function (data, nodeId, depth) {

    depth = depth <= maxDepth ? depth : maxDepth

    let originNode = getNode(data, nodeId)

    let finalNodes = new Set()
    finalNodes.add(originNode)

    let children = getChildren(data, originNode, [], depth)

    children.forEach(finalNodes.add, finalNodes)

    let ancestors = getAncestors(data, originNode, [], depth)
    ancestors.forEach(finalNodes.add, finalNodes)

    _.each(children, function (child) {
        let siblings = getAncestors(data, child, [], depth - 1)
        siblings.forEach(finalNodes.add, finalNodes)
    })

    let res = {
        nodes: Array.from(finalNodes),
        edges: filterEdges(data.edges, Array.from(finalNodes))
    }

    return res
}


module.exports = { cutGraph }

