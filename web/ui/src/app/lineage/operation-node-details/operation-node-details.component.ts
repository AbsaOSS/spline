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

import {Component, Input, OnChanges, SimpleChanges, EventEmitter, Output} from "@angular/core";
import {IOperationNode, IAttribute, IExpression} from "../../../generated-ts/lineage-model";
import {NodeType, typeOfNode, typeOfExpr} from "../types";
import {Icon} from "../icon";

@Component({
    selector: 'operation-node-details',
    templateUrl: 'operation-node-details.component.html',
    styleUrls: [
        'operation-node-details.component.less',
        'operation-node-details.component.css'
    ]
})
export class OperationNodeDetailsComponent implements OnChanges {
    @Input() node: IOperationNode
    @Input() selectedAttrIDs: number[]

    @Output() attributeSelected = new EventEmitter<IAttribute>()
    @Output() fullAttributeSchemaRequested = new EventEmitter<IAttribute>()

    nodeType: NodeType

    ngOnChanges(changes: SimpleChanges): void {
        this.nodeType = typeOfNode(this.node)
    }

    selectAttribute(attr: IAttribute) {
        this.attributeSelected.emit(attr)
    }

    showFullAttributeSchema(attr: IAttribute) {
        this.fullAttributeSchemaRequested.emit(attr)
    }

    getNodeIcon() {
        return Icon.GetIconForNodeType(this.nodeType).name
    }

    //noinspection JSMethodCanBeStatic
    getExprType(expr: IExpression) {
        return typeOfExpr(expr)
    }
}