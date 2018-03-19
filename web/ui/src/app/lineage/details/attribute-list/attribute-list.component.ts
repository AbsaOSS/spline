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

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {IAttribute} from "../../../../generated-ts/lineage-model";
import {IArray, IDataType, IStruct} from "../../../../generated-ts/datatype-model";
import {typeOfDataType} from "../../types";
import {IActionMapping, ITreeOptions, TreeComponent} from "angular-tree-component";
import {ITreeNode} from 'angular-tree-component/dist/defs/api';
import * as _ from 'lodash';

@Component({
    selector: "attribute-list",
    templateUrl: "attribute-list.component.html",
    styleUrls: ["attribute-list.component.less"]
})
export class AttributeListComponent implements OnInit {

    @Input() attrs: IAttribute[]

    @Input() set selectedAttrIDs(ids: string[]) {
        this.highlightSelected(ids)
    }

    @Input() expandRoot: boolean = false

    @Output() attrClicked = new EventEmitter<string>()

    attrTree: INodeData[]

    @ViewChild('tree') treeComponent: TreeComponent;

    readonly actionMapping: IActionMapping = {
        mouse: {
            click: (tree, node, $event) => this.onNodeClicked(node)
        }
    }

    readonly treeOptions: ITreeOptions = {
        actionMapping: this.actionMapping,
        allowDrag: false,
        allowDrop: false,
    }

    ngOnInit(): void {
        this.attrTree = this.attrs.map(a => this.buildAttrTree(a))
    }

    private buildAttrTree(attr: IAttribute): INodeData {
        const attributeId = attr.id

        function buildChildren(dt: IDataType): (INodeData[] | undefined) {
            let dtt = typeOfDataType(dt)
            return (dtt == "Simple") ? undefined
                : (dtt == "Struct") ? buildChildrenForStructType(<IStruct> dt)
                    : buildChildren((<IArray> dt).elementDataType)
        }

        function buildChildrenForStructType(sdt: IStruct): INodeData[] {
            return sdt.fields.map(f => buildNode(f.dataType, f.name, false))
        }

        function buildNode(dt: IDataType, name: string, isExpanded: boolean) {
            return {
                attributeId: attributeId,
                name: name,
                type: dt,
                children: buildChildren(dt),
                isExpanded: isExpanded
            }
        }

        return buildNode(attr.dataType, attr.name, this.expandRoot)
    }

    onNodeClicked(node: ITreeNode) {
        this.attrClicked.emit(node.data.attributeId)
    }

    private highlightSelected(ids: string[]): void {
        if (this.treeComponent && this.treeComponent.treeModel.roots) {
            let treeModel = this.treeComponent.treeModel
            treeModel.roots.forEach((node: ITreeNode) => {
                node.setIsActive(this.isSelected(node, ids), true)
            })
        }
    }

    private isSelected(node: ITreeNode, ids: string[]): boolean {
        let id = node.data.attributeId
        return id != null && _.includes(ids, id)
    }

}

interface INodeData {
    name: string,
    type: IDataType,
    attributeId: string,
    children: INodeData[],
    isExpanded: boolean
}
