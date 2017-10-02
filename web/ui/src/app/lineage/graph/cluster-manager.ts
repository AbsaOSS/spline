/*
 * Copyright 2017 Barclays Africa Group Limited
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

import * as vis from "vis";
import * as _ from "lodash";
import {HighlightedVisClusterNode, RegularVisClusterNode, VisClusterNode, VisEdge, VisNode, VisNodeType} from "./vis/vis-model";

export class ClusterManager {

    private clusters: VisClusterNode[]

    constructor(private graph: vis.Data,
                private network: vis.Network) {
    }

    public rebuildClusters() {
        let nodes = <VisNode[]> this.graph.nodes
        let edges = <VisEdge[]> this.graph.edges
        let result: VisClusterNodeBuilder[] = []
        nodes.forEach(n => {
            let siblingsTo = edges.filter(i => i.from == n.id).map(i => i.to)
            let siblingsFrom = edges.filter(i => i.to == n.id).map(i => i.from)
            if (siblingsFrom.length == 1 && siblingsTo.length == 1) {
                let clusters = result.filter(i => i.nodes.filter(j => j.id == siblingsTo[0]).length > 0)
                if (clusters.length > 0) {
                    clusters[0].nodes.push(n)
                } else {
                    result.push(new VisClusterNodeBuilder(n))
                }
            }
        });

        this.clusters = result.filter(i => i.nodes.length > 1).map((v, i, a) => v.build("cluster" + i))
    }

    public collapseAllClusters() {
        this.clusters.forEach(c => this.collapseCluster(c))
    }

    public collapseClustersExceptForNode(nodeId: string) {
        this.clusters
            .filter(c => !_.some(c.nodes, {id: nodeId}))
            .forEach(c => this.collapseCluster(c))
    }

    private collapseCluster(cluster: VisClusterNode) {
        this.network.cluster({
            clusterNodeProperties: cluster,
            joinCondition: nodeOps => _.some(cluster.nodes, {id: nodeOps.id})
        })
    }

    public expandClusterForNode(nodeId: string) {
        this.clusters
            .filter(c => _.some(c.nodes, {id: nodeId}))
            .forEach(c => this.expandCluster(c))
    }

    private expandCluster(cluster: VisClusterNode) {
        try {
            this.network["clustering"].openCluster(cluster.id)
        } catch (e) {
            // todo: fix clustering rather than swallowing the error
        }
    }

}

class VisClusterNodeBuilder {
    public nodes: VisNode[]

    constructor(...nodes: VisNode[]) {
        this.nodes = nodes
    }

    build(id: string): VisClusterNode {
        let label = "(" + this.nodes.length + ")",
            highlighted = this.nodes.filter(i => i.type == VisNodeType.Highlighted).length > 0
        return highlighted
            ? new HighlightedVisClusterNode(id, label, this.nodes)
            : new RegularVisClusterNode(id, label, this.nodes)
    }
}
