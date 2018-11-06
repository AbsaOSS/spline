/*
 * Copyright 2017 ABSA Group Limited
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
import {IOperation} from "../../../generated-ts/lineage-model";
import {Icon, VisClusterNode, VisIcon} from "../../visjs/vis-model";
import {getOperationIcon} from '../details/operation/operation-icon.utils';

export enum VisNodeType {
    Regular,
    Highlighted
}

export class RegularVisClusterNode extends VisClusterNode<VisNode> {
    constructor(id: string, label: string, nodes: VisNode[]) {
        super(id, label, nodes)
        this.icon.color = "#a4c4df"
    }
}

export class HighlightedVisClusterNode extends VisClusterNode<VisNode> {
    constructor(id: string, label: string, nodes: VisNode[]) {
        super(id, label, nodes)
        this.icon.color = "#ff6000"
    }
}


export abstract class VisNode implements vis.Node {
    constructor(public operation: IOperation,
                public id: string,
                public label: string,
                public icon: VisIcon,
                public type: VisNodeType) {
    }
}

export class RegularVisNode extends VisNode {
    constructor(public operation: IOperation) {
        super(
            operation,
            operation.mainProps.id,
            operation.mainProps.name,
            RegularVisNode.getIcon(getOperationIcon(operation)),
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
            HighlightedVisNode.getIcon(getOperationIcon(operation)),
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

