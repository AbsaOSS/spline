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

import {Component, Input, OnInit} from "@angular/core";
import {IExpression} from "../../generated-ts/lineage-model";
import {MdDialog} from "@angular/material";
import {ExpressionViewDialogComponent} from "./expression-view-dialog.component";

@Component({
    selector: "expression-inline-view",
    template: `
        <a href="" (click)="openExprViewDialog($event)">
            <code title="{{ exprString }}">{{ exprString }}</code>
        </a>
    `,
    styles: [`
        code {
            padding: 0;
        }
    `]
})
export class ExpressionInlineViewComponent implements OnInit {
    @Input() expr: IExpression

    exprString: string

    constructor(private dialog: MdDialog) {
    }

    ngOnInit(): void {
        this.exprString = this.expr.textualRepresentation.replace(/#\d+/g, "")
    }

    openExprViewDialog(e: Event) {
        e.preventDefault()
        this.dialog.open(ExpressionViewDialogComponent, {
            data: {
                expr: this.expr,
                exprString: this.exprString,
            }
        })
    }
}