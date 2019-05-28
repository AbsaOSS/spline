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

import * as _ from 'lodash';
import {AttributeType} from '../../model/types/attributeType';
import {AttributeVM} from '../../model/viewModels/attributeVM';
import {CytoscapeGraphVM} from '../../model/viewModels/cytoscape/cytoscapeGraphVM';
import {GraphNode} from '../../model/viewModels/cytoscape/graphNodeVM';
import * as AttributesAction from '../actions/attributes.actions';

export type Action = AttributesAction.AttributeActions

export function attributeReducer(state: any, action: Action): CytoscapeGraphVM {
    switch (action.type) {
        case AttributesAction.AttributesActionTypes.ATTRIBUTES_GET:
            return { ...state, ...buildAttributeGraph(action.payload) }
        default:
            return null
    }
}

export function getAttributeType(attribute: AttributeVM): string {
    switch (attribute.dataType._type) {
        case AttributeType.Struct:
            return '{ ... }'
        case AttributeType.Array:
            if (attribute.dataType.elementDataType.dataType.children != null) {
                return '[{ ... }]'
            }
            return '[' + attribute.dataType.elementDataType.dataType.name + ']'
        case AttributeType.Simple:
            return attribute.dataType.name
        default:
            return ''
    }
}

function buildAttributeGraph(attribute: AttributeVM, parentAttribute?: AttributeVM, graph?: CytoscapeGraphVM, depth: number = 0): CytoscapeGraphVM {
    if (!attribute)
        return null
    let graphDepth = depth
    let newGraph = null
    if (graph == null) {
        newGraph = {
            nodes: [],
            edges: []
        }
    } else {
        newGraph = graph
        graphDepth = depth + 1
    }
    if (attribute.name) {
        const node: GraphNode = { data: { id: attribute.name + graphDepth, name: attribute.name + ' : ' + getAttributeType(attribute), icon: 0xf111, color: getAttributeColor(attribute) } }
        newGraph.nodes.push(node)
        if (parentAttribute != null) {
            const edge = { data: { source: parentAttribute.name + (graphDepth - 1), target: attribute.name + graphDepth, id: attribute.name + parentAttribute.name } }
            newGraph.edges.push(edge)
        }
    }
    const childrenAttributes = getChildrenAttributes(attribute)
    _.each(childrenAttributes, item => {
        buildAttributeGraph(item, attribute, newGraph, graphDepth)
    })
    return newGraph
}

function getAttributeColor(attribute: AttributeVM): string {
    switch (attribute.dataType._type) {
        case AttributeType.Struct:
        case AttributeType.Array:
            return '#e39255'
        default:
            return '#337AB7'
    }
}

function getChildrenAttributes(attribute: AttributeVM): AttributeVM[] {
    switch (attribute.dataType._type) {
        case AttributeType.Array:
            return attribute.dataType.elementDataType.dataType.children ? attribute.dataType.elementDataType.dataType.children : null
        case AttributeType.Struct:
            return attribute.dataType.children
        default:
            return null
    }
}
