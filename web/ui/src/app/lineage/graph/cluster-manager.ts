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
import {HighlightedVisClusterNode, RegularVisClusterNode, VisClusterNode, VisModel, VisNode, VisNodeType} from "./vis/vis-model";

export class ClusterManager {

    private clusters: VisClusterNode[]

    constructor(private graph: VisModel,
                private network: vis.Network) {
    }

    public rebuildClusters() {
        let nodes = this.graph.nodes.get()
        let edges = this.graph.edges.get()
        let clusterBuilders: VisClusterNodeBuilder[] = []

        nodes.forEach(node => {
            let siblingsTo = edges.filter(e => e.from == node.id).map(e => e.to)
            let siblingsFrom = edges.filter(e => e.to == node.id).map(e => e.from)
            if (siblingsFrom.length == 1 && siblingsTo.length == 1) {
                let clusters = clusterBuilders.filter(cb => _.some(cb.nodes, n => n.id == siblingsTo[0]))
                if (clusters.length > 0) {
                    clusters[0].nodes.push(node)
                } else {
                    clusterBuilders.push(new VisClusterNodeBuilder(node))
                }
            }
        })

        this.clusters = clusterBuilders
            .filter(cb => cb.nodes.length > 1)
            .map((cb, i) => cb.build("cluster" + i))
    }

    public refreshHighlightedClustersForNodes() {
        this.rebuildClusters()
        this.clusters.forEach(c => {
            if (this.network.isCluster(c.id))
            // we can't use updateClusteredNode() method as it emits "_dataChanged" event that makes the graph shaking
                (<any>this.network).clustering.body.nodes[c.id].setOptions(c)
        })
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
            this.network.openCluster(cluster.id)
        } catch (e) {
            // todo: fix clustering rather than swallowing this error
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
            isHighlighted = _.some(this.nodes, n => n.type == VisNodeType.Highlighted)
        return isHighlighted
            ? new HighlightedVisClusterNode(id, label, this.nodes)
            : new RegularVisClusterNode(id, label, this.nodes)
    }
}
