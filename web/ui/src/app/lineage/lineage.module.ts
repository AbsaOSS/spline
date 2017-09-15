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

import {NgModule} from "@angular/core";
import {LineageComponent} from "./lineage.component";
import {DescriptorListComponent} from "./descriptor-list/lineage-descriptor-list.component";
import {LineageViewComponent} from "./lineage-view/lineage-view.component";
import {LineageGraphComponent} from "./lineage-graph.component";
import {OperationNodeDetailsComponent} from "./operation-node-details/operation-node-details.component";
import {AttributeListComponent} from "./attribute-list/attribute-list.component";
import {LineageDAGItemDetailsHeaderComponent} from "./lineage-dag-item-details-header.component";
import {LineageDAGItemDetailsSectionHeader} from "./lineage-dag-item-details-section-header.component";
import {MaterialModule} from "@angular/material";
import {LineageService} from "./lineage.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {TreeModule} from "angular-tree-component";
import {AttributeViewComponent} from "./attribute-view/attribute-view.component";
import {DataTypeViewComponent} from "./data-type-view/data-type-view.component";
import {ExpressionInlineViewComponent} from "./expression-inline-view.component";
import {ExpressionViewDialogComponent} from "./expression-view-dialog.component";
import {AccordionModule} from "primeng/components/accordion/accordion";
import "primeng/resources/primeng.min.css";
import "primeng/resources/themes/omega/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import "font-awesome/css/font-awesome.min.css";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TreeModule,
        AccordionModule,
        HttpModule
    ],
    declarations: [
        LineageComponent,
        DescriptorListComponent,
        LineageViewComponent,
        LineageGraphComponent,
        OperationNodeDetailsComponent,
        AttributeListComponent,
        AttributeViewComponent,
        DataTypeViewComponent,
        ExpressionInlineViewComponent,
        ExpressionViewDialogComponent,
        LineageDAGItemDetailsHeaderComponent,
        LineageDAGItemDetailsSectionHeader
    ],
    providers: [
        LineageService
    ],
    exports: [
        LineageComponent,
        LineageViewComponent
    ],
    bootstrap: [ExpressionViewDialogComponent]
})
export class LineageModule {

}