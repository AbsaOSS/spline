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

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IArray, IAttribute, IDataType, IStruct} from "../../../generated-ts/lineage-model";
import * as _ from "lodash";
import {TreeNode} from "angular-tree-component";
import {typeOfDataType} from "../types";
import {SeeFullSchemaRefNode} from "./TreeNode";

@Component({
    selector: "attribute-view",
    templateUrl: "attribute-view.component.html",
    styleUrls: ["attribute-view.component.css"]
})
export class AttributeViewComponent implements OnInit {
    @Input() attr: IAttribute
    @Input() subFieldCountDisplayThreshold: number = Number.MAX_SAFE_INTEGER
    @Input() subFieldCountDisplayThresholdRelax: number = 2
    @Input() expandRoot: boolean = false

    @Output() showFullSchemaClicked = new EventEmitter()

    attrTree: any[] // there is no according 'd.ts' for the input tree node in the angular tree component

    treeOptions = {
        allowDrag: false,
        allowDrop: false
    }

    ngOnInit(): void {
        this.attrTree = this.buildAttrTree(this.attr)
    }

    getTypeOfType(dt: IDataType): string {
        return typeOfDataType(dt)
    }

    private buildAttrTree(attr: IAttribute): any[] {
        let seq = 0
        let subFieldCountDisplayThreshold = this.subFieldCountDisplayThreshold
        let subFieldCountDisplayThresholdRelax = this.subFieldCountDisplayThresholdRelax

        function buildChildren(dt: IDataType): (any[] | undefined) {
            let dtt = typeOfDataType(dt)
            return (dtt == "SimpleType") ? undefined
                : (dtt == "StructType") ? buildChildrenForStructType(<IStruct> dt)
                    : buildChildren((<IArray> dt).elementDataType)
        }

        function buildChildrenForStructType(sdt: IStruct): any[] {
            let fieldsToDisplayCount = sdt.fields.length - subFieldCountDisplayThresholdRelax > subFieldCountDisplayThreshold
                ? subFieldCountDisplayThreshold
                : sdt.fields.length
            let fieldsToDisplay = _.take(sdt.fields, fieldsToDisplayCount)
            let hiddenFieldsCount = sdt.fields.length - fieldsToDisplayCount
            let nodes: any[] = fieldsToDisplay.map(f => buildNode(f.dataType, f.name, false))
            if (hiddenFieldsCount > 0)
                nodes.push(new SeeFullSchemaRefNode(seq++, hiddenFieldsCount))
            return nodes
        }

        function buildNode(dt: IDataType, name: string, isExpanded:boolean): TreeNode {
            return <any>{
                id: seq++,
                name: name,
                type: dt,
                children: buildChildren(dt),
                isExpanded: isExpanded
            }
        }

        return [buildNode(attr.dataType, attr.name, this.expandRoot)]
    }

    toggleExpand(node: TreeNode, doExpand: boolean) {
        if (doExpand) node.expand()
        else node.collapse()
    }

    showFullSchema(e: Event) {
        this.showFullSchemaClicked.emit()
        e.stopPropagation()
    }
}