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
import {IOperation} from "../../../../generated-ts/lineage-model";
import {typeOfOperation} from "../../types";
import {Icon} from "../../details/operation/operation-icon.utils";

export class VisModel implements vis.Data {
    constructor(public nodes: vis.DataSet<VisNode>, public edges: vis.DataSet<VisEdge>) {
    }
}

export enum VisNodeType {
    Regular,
    Highlighted
}

export abstract class VisClusterNode implements vis.Node {
    id: string;
    label: string;
    icon: any;
    nodes: VisNode[];

    constructor(id: string, label: string, nodes: VisNode[]) {
        this.id = id;
        this.label = label;
        this.icon = new Icon("fa-th", "\uf00a", "FontAwesome");
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
            color: "#a4c4df"
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


export abstract class VisNode implements vis.Node {
    constructor(public operation: IOperation,
                public id: string,
                public label: string,
                public icon: any,
                public type: VisNodeType) {
    }
}

export class RegularVisNode extends VisNode {
    constructor(public operation: IOperation) {
        super(
            operation,
            operation.mainProps.id,
            operation.mainProps.name,
            RegularVisNode.getIcon(Icon.getIconForNodeType(typeOfOperation(operation))),
            VisNodeType.Regular)
    }

    static getIcon(icon: Icon) {
        return {
            face: icon.font,
            size: 80,
            code: icon.code,
            color: "#337ab7"
        }
    }
}

export class HighlightedVisNode extends VisNode {
    constructor(public operation: IOperation) {
        super(
            operation,
            operation.mainProps.id,
            operation.mainProps.name,
            HighlightedVisNode.getIcon(Icon.getIconForNodeType(typeOfOperation(operation))),
            VisNodeType.Highlighted)
    }

    static getIcon(icon: Icon) {
        return {
            face: icon.font,
            size: 80,
            code: icon.code,
            color: "#ffa807"
        }
    }
}

export class VisEdge implements vis.Edge {
    from: string;
    to: string;
    title: string;

    constructor(from: string, to: string, title: string) {
        this.from = from;
        this.to = to;
        this.title = title;
    }
}

