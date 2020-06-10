/*
 * Copyright 2019 ABSA Group Limited
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

import { AfterContentInit, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { ITreeOptions } from 'angular-tree-component'
import { AppState } from 'src/app/model/app-state'
import { IExpression } from 'src/app/model/expression-model'
import * as ModalAction from 'src/app/store/actions/modal.actions'
import { getName } from 'src/app/util/expressions'


@Component({
    selector: 'app-modal-expression',
    templateUrl: './modal-expression.component.html',
    styleUrls: ['./modal-expression.component.scss']
})
export class ModalExpressionComponent implements AfterContentInit {

    title: any
    exprTree: any[]

    readonly treeOptions: ITreeOptions = {
        actionMapping: {
            click: (_, node): void => node.toggleExpanded()
        },
        allowDrag: false,
        allowDrop: false,
    }

    private data: any
    private attributes: any

    constructor(private store: Store<AppState>) {
    }

    ngAfterContentInit(): void {
        this.exprTree = this.buildExprTree()
    }

    close(): void {
        this.store.dispatch(new ModalAction.Close())
    }


    private buildExprTree(): any[] {
        let seq = 0

        const buildNode = (expr: IExpression) => ({
            id: seq++,
            name: getName(expr, this.attributes),
            children: buildChildrenNodes(expr)
        })

        // TODO: remove inline function definition.
        function buildChildrenNodes(ex: IExpression): (any[] | undefined) {
            const children = ex['children'] || (ex['child'] && [ex['child']])
            return children && children.map(buildNode)
        }

        return [buildNode(this.data.metadata)]
    }

}
