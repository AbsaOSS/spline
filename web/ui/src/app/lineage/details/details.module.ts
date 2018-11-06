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

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import "primeng/resources/primeng.min.css";
import "primeng/resources/themes/omega/theme.css";
import {AccordionModule, SharedModule} from "primeng/primeng";

import {OperationIconComponent} from "./operation/operation-icon.component";
import {OperationDetailsComponent} from "./operation/operation-details.component";
import {DetailsSectionHeaderComponent} from "./details-section-header.component";
import {DetailsPanelHeaderComponent} from "./details-panel-header.component";
import {ExpressionInlineComponent} from "./expression/expression-inline.component";
import {ExpressionDialogComponent} from "./expression/expression-dialog.component";
import {TreeModule} from "angular-tree-component";
import {AttributeListComponent} from "./attribute-list/attribute-list.component";
import {DataTypeViewComponent} from "./attribute-list/data-type-view/data-type-view.component";
import {ProcessingTypeIconComponent} from './operation/processing-type-icon.component';

@NgModule({
    imports: [
        CommonModule,
        AccordionModule,
        SharedModule,
        TreeModule
    ],
    declarations: [
        OperationDetailsComponent,
        OperationIconComponent,
        DetailsPanelHeaderComponent,
        DetailsSectionHeaderComponent,
        ExpressionInlineComponent,
        ExpressionDialogComponent,
        AttributeListComponent,
        DataTypeViewComponent,
        ProcessingTypeIconComponent
    ],
    entryComponents: [
        ExpressionDialogComponent
    ],
    exports: [
        OperationIconComponent,
        ProcessingTypeIconComponent,
        OperationDetailsComponent,
        AttributeListComponent,
        DetailsPanelHeaderComponent
    ]
})
export class DetailsModule {

}