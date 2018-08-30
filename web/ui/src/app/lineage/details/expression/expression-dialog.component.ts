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

import {MAT_DIALOG_DATA} from "@angular/material";
import {Component, Inject} from "@angular/core";
import {IExpression} from "../../../../generated-ts/expression-model";
import {ITreeNode} from 'angular-tree-component/dist/defs/api';
import {IActionMapping, ITreeOptions} from 'angular-tree-component';
import {ExpressionRenderService} from "./expression-render.service";


@Component({
    selector: "expression-dialog",
    styleUrls: ["expression-dialog.component.less"],
    template: `
        <code>{{ exprString }}</code>
        <hr>
        <tree-root #tree [nodes]="exprTree" [options]="treeOptions">
            <ng-template #treeNodeTemplate let-node>{{ node.data.name }}</ng-template>
        </tree-root>
    `
})
export class ExpressionDialogComponent {

    private readonly expr: IExpression
    private expressionRenderer: ExpressionRenderService

    exprString: string
    exprTree: any[]

    readonly actionMapping: IActionMapping = {
        mouse: {
            click: (tree, node) => ExpressionDialogComponent.onNodeClicked(node)
        }
    }

    readonly treeOptions: ITreeOptions = {
        actionMapping: this.actionMapping,
        allowDrag: false,
        allowDrop: false,
    }

    constructor(@Inject(MAT_DIALOG_DATA) data: any) {
        this.expr = data.expr
        this.exprString = data.exprString
        this.expressionRenderer = data.expressionRenderer
        this.exprTree = this.buildExprTree()
    }

    private buildExprTree(): any[] {
        let seq = 0

        const buildNode = (expr: IExpression) => ({
            id: seq++,
            name: this.expressionRenderer.getName(expr),
            children: buildChildrenNodes(expr)
        })

        function buildChildrenNodes(ex: IExpression): (any[] | undefined) {
            const children = ex['children'] || (ex['child'] && [ex['child']])
            return children && children.map(buildNode)
        }

        return [buildNode(this.expr)]
    }

    static onNodeClicked(node: ITreeNode) {
        node.toggleExpanded()
    }

}