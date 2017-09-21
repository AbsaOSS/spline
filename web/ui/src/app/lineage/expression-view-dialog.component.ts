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

import {MdDialogRef} from "@angular/material";
import {Component} from "@angular/core";
import {IExpression} from "../../generated-ts/lineage-model";
import * as _ from "lodash";
import {typeOfExpr} from "./types";
import {Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: "expression-view-dialog",
    template: `
        <code>{{ exprString }}</code>
        <hr>
        <tree-root [nodes]="exprTree" [options]="treeOptions">
            <template #treeNodeTemplate let-expr="node.data">
                <span title="{{ expr.text }}">{{ expr.name }}</span>
            </template>
        </tree-root>
    `
})
export class ExpressionViewDialogComponent {

    expr: IExpression
    exprString: string
    exprTree: any[]

    treeOptions = {
        allowDrag: false,
        allowDrop: _.constant(false)
    }

    constructor(@Inject(MD_DIALOG_DATA) data: any) {
        this.expr = data.expr
        this.exprString = data.exprString
        this.exprTree = this.buildExprTree()
    }

    private buildExprTree(): any[] {
        let seq = 0

        function buildChildren(ex: IExpression): (any[] | undefined) {
            let et = typeOfExpr(ex)
            // todo: improve expression view for specific expression types
            return buildChildrenForGenericExpression(ex.children)
        }

        function buildChildrenForGenericExpression(subExprs: IExpression[]): any[] {
            return subExprs.map(buildNode)
        }

        function buildNode(expr: IExpression) {
            return {
                id: seq++,
                name: _.isEmpty(expr.children)
                    ? expr.textualRepresentation // only use it for leaf expressions
                    : expr.exprType,
                text: expr.textualRepresentation.replace(/#\d+/g, ""),
                children: buildChildren(expr)
            }
        }

        return [buildNode(this.expr)]
    }

}