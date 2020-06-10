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


import { AttributeGraph } from '../../generated/models/attribute-graph'
import { AttributeNode } from '../../generated/models/attribute-node'


export function getImpactRootAttributeNode(graph: AttributeGraph): AttributeNode {
    const impactedAttrIds = new Set(graph.edges.map(e => e.source))
    return graph.nodes.find(a => !impactedAttrIds.has(a._id))
}
