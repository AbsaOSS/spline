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

export class Icon {
    constructor(public name: string,
                public code: string,
                public font: string = "FontAwesome") {
    }
}

export class VisModel<TVisNode extends vis.Node, TVisEdge extends vis.Edge> implements vis.Data {
    constructor(public nodes: vis.DataSet<TVisNode>,
                public edges: vis.DataSet<TVisEdge>) {
    }
}

export class VisClusterNode<TVisNode> implements vis.Node {
    public icon = {
        face: "FontAwesome",
        size: 80,
        code: "\uf00a",
        color: "#a4c4df"
    }

    constructor(public id: string,
                public label: string,
                public nodes: TVisNode[]) {
    }
}

