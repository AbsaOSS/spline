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

import {
    IOperationNode,
    IAliasNode,
    IJoinNode,
    IFilterNode,
    IDestinationNode,
    ISourceNode,
    IProjectionNode
} from "../../generated-ts/lineage-model";
import * as _ from "lodash";
import {typeOfNode, NodeType} from "./types";
import {Icon} from "./icon";

export class VisModel {
    nodes: vis.DataSet<VisNode>;
    edges: vis.DataSet<VisEdge>;

    constructor(nodes: vis.DataSet<VisNode>, edges: vis.DataSet<VisEdge>) {
        this.nodes = nodes;
        this.edges = edges;
    }
}

export enum VisNodeType {
    Regular,
    Highlighted
}

export class VisClusterNodeBuilder {
    nodes: VisNode[];

    constructor(node : VisNode)
    {
        this.nodes = [node];
    }

    build(id: string) : VisClusterNode {
        let label = this.nodes.length + " ops";
        console.log("nodes", this)
        let highlighted = this.nodes.filter(i => i.type == VisNodeType.Highlighted).length > 0;
        if(highlighted)
            return new HighlightedVisClusterNode(id, label, this.nodes);
        else
            return new RegularVisClusterNode(id, label, this.nodes);
    }
}

export abstract class VisClusterNode {
    id: string;
    label: string;
    icon: any;
    nodes: VisNode[];

    constructor(id: string, label: string, nodes: VisNode[]) {
        this.id = id;
        this.label = label;
        this.icon = new Icon("fa-cubes" ,"\uf1b3", "FontAwesome");
        this.nodes = nodes;
    }
}

export class RegularVisClusterNode extends VisClusterNode {
    constructor(id: string, label: string, nodes: VisNode[]) {
        super(id, label, nodes);
        this.icon = {
            face: this.icon.font,
            size: 80,
            code: this.icon.code,
            color: "#644cb7"
        }
    }
}

export class HighlightedVisClusterNode extends VisClusterNode {
    constructor(id: string, label: string, nodes: VisNode[]) {
        super(id, label, nodes);
        this.icon = {
            face: this.icon.font,
            size: 80,
            code: this.icon.code,
            color: "#ff6000"
        }
    }
}

export class VisNodeBuilder {
    id: number;
    node: IOperationNode;
    caption: string;
    type: NodeType;
    alias: string;
    parents: number[];
    nodeType: VisNodeType;

    constructor(id: number, originalNode: IOperationNode, nodeType: VisNodeType = VisNodeType.Regular) {
        this.id = id;
        this.node = originalNode;
        this.caption = originalNode.mainProps.name;
        this.type = typeOfNode(originalNode);
        this.alias = (<IAliasNode>originalNode).alias;
        this.parents = originalNode.mainProps.parentRefs;
        this.nodeType = nodeType
    }

    private createLabel(): string {
        let result = this.caption;
        return result
    }

    private createDescription(): string {
        switch (this.type) {
            case "ProjectionNode" : {
                let pn = <IProjectionNode> this.node;
                let transformationStrings = pn.transformations.map(t => t.textualRepresentation).filter(_.identity);
                return transformationStrings.join(", ")
            }
            case "SourceNode" : {
                let sn = <ISourceNode> this.node;
                return sn.sourceType + " : " + (sn.paths.map(p => p.substr(p.lastIndexOf('/'))).join(", ..."))
            }
            case "JoinNode" : {
                let jn = <IJoinNode> this.node;
                return jn.condition ? jn.condition.textualRepresentation : ""
            }
            case "GenericNode" : {
                return this.node.mainProps.rawString
            }
            case "FilterNode" : {
                return (<IFilterNode> this.node).condition.textualRepresentation
            }
            case "DestinationNode" : {
                let dn = <IDestinationNode> this.node;
                return dn.destinationType + " : " + dn.path
            }
            case "AliasNode" : {
                return (<IAliasNode> this.node).alias
            }
        }
    }

    public build(): VisNode {
        let label = this.createLabel();
        let icon = Icon.GetIconForNodeType(this.type);
        switch (this.nodeType) {
            case VisNodeType.Highlighted :
                return new HighlightedVisNode(this.id, label, icon);
            default:
                return new RegularVisNode(this.id, label, icon);
        }
    }
}

export abstract class VisNode {
    id: number;
    label: string;
    icon: any;
    type: VisNodeType;

    constructor(id: number, label: string, icon: Icon, type: VisNodeType) {
        this.id = id;
        this.label = label;
        this.icon = icon;
        this.type = type;
    }
}

export class RegularVisNode extends VisNode {
    constructor(id: number, label: string, icon: Icon) {
        super(id, label, icon, VisNodeType.Regular);
        this.icon = {
            face: icon.font,
            size: 80,
            code: icon.code,
            color: "#337ab7"
        }
    }
}

export class HighlightedVisNode extends VisNode {
    constructor(id: number, label: string, icon: Icon) {
        super(id, label, icon, VisNodeType.Highlighted);
        this.icon = {
            face: icon.font,
            size: 80,
            code: icon.code,
            color: "#ffa807"
        }
    }
}

export class VisEdge {
    from: number;
    to: number;
    title: string;

    constructor(from: number, to: number, title: string) {
        this.from = from;
        this.to = to;
        this.title = title;
    }
}

