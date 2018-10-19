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

import {Component, Input, OnChanges} from "@angular/core";
import {MatDialog} from "@angular/material";
import {ExpressionDialogComponent} from "./expression-dialog.component";
import {IExpression} from "../../../../generated-ts/expression-model";
import {ExpressionRenderService} from "./expression-render.service";

@Component({
    selector: "expression-inline",
    template: `
        <a href="" (click)="openExprViewDialog($event)">
            <code title="{{ exprString }}">{{ exprString }}</code>
        </a>
    `,
    styles: [`
        code {
            padding: 0;
        }
    `],
    providers: [ExpressionRenderService]
})
export class ExpressionInlineComponent implements OnChanges {
    @Input() expr: IExpression

    exprString: string

    constructor(private dialog: MatDialog,
                private expressionRenderer: ExpressionRenderService) {
    }

    ngOnChanges(): void {
        this.exprString = this.expressionRenderer.getText(this.expr)
    }

    openExprViewDialog(e: Event) {
        e.preventDefault()
        this.dialog.open(ExpressionDialogComponent, <any>{
            data: {
                expr: this.expr,
                exprString: this.exprString,
                expressionRenderer: this.expressionRenderer
            }
        })
    }
}