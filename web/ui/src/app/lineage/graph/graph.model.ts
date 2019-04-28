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
import {typeOfOperation} from "../types";
import {VisNodeIcon} from "../../visjs/vis-model";
import {getIconForNodeType} from "../details/operation/operation-icon.utils";

export class VisNode implements vis.Node {
    public readonly id: string
    public readonly icon: VisNodeIcon

    constructor(public readonly operation: IOperation,
                public readonly label: string,
                public readonly isHighlighted: boolean = false) {
        this.id = operation.mainProps.id
        this.icon = getIconForNodeType(typeOfOperation(operation))
            .toVisNodeIcon(isHighlighted ? "#ff9600" : "#337ab7")
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
