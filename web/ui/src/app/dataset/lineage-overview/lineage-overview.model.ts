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
import {IComposite, ITypedMetaDataSource} from "../../../generated-ts/operation-model";

export type GraphNodeType = ( "operation" | "datasource" )

export interface GraphNode {
    type: GraphNodeType
    id: string
}

export enum VisNodeType {
    Process,
    Dataset
}

export abstract class VisNode implements vis.Node {
    constructor(public nodeType: VisNodeType,
                public id: string,
                public label: string,
                public icon: any) {
    }
}

export class VisProcessNode extends VisNode {
    constructor(public operation: IComposite,
                id: string,
                label: string,
                icon: any) {
        super(VisNodeType.Process, id, label, icon)
    }
}

export class VisDatasetNode extends VisNode {
    constructor(public dataSource: ITypedMetaDataSource,
                id: string,
                title: string,
                label: string,
                icon: any) {
        super(VisNodeType.Dataset, id, label, icon)
    }
}

export const ID_PREFIX_LENGTH = 3

export const ID_PREFIXES = {
    operation: "op_",
    datasource: "ds_",
    extra: "ex_"
}