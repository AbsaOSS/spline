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
import {AfterContentInit, Component} from '@angular/core';
import {IActionMapping, ITreeOptions} from 'angular-tree-component';
import {ITreeNode} from 'angular-tree-component/dist/defs/api';
import {IExpression} from 'src/app/model/expression-model';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/model/app-state';
import * as ModalAction from 'src/app/store/actions/modal.actions';
import {getName, getType} from 'src/app/util/expressions';

@Component({
  selector: 'app-modal-expression',
  templateUrl: './modal-expression.component.html',
  styleUrls: ['./modal-expression.component.less']
})
export class ModalExpressionComponent implements AfterContentInit {

  ngAfterContentInit(): void {
    this.exprTree = this.buildExprTree()
  }

  private expression: IExpression
  private attributes: any
  public exprTree: any[]

  constructor(private store: Store<AppState>) {
  }

  private buildExprTree(): any[] {
    let seq = 0
    const buildNode = (expr: IExpression) => ({
      id: seq++,
      name: getName(expr, this.attributes),
      className: getType(expr).replace(".", "-"),
      children: buildChildrenNodes(expr)
    });

    function buildChildrenNodes(ex: IExpression): (any[] | undefined) {
      const children = ex['children'] || (ex['child'] && [ex['child']])
      return children && children.map(buildNode)
    }

    return [buildNode(this.expression)]
  }


  private readonly actionMapping: IActionMapping = {
    mouse: {
      click: (_, node) => ModalExpressionComponent.onNodeClicked(node)
    }
  }

  private static onNodeClicked(node: ITreeNode): void {
    node.toggleExpanded()
  }

  public readonly treeOptions: ITreeOptions = {
    actionMapping: this.actionMapping,
    allowDrag: false,
    allowDrop: false,
  }

  public close(): void {
    this.store.dispatch(new ModalAction.Close())
  }

}
