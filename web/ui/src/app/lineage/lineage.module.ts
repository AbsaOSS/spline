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

import { NgModule } from "@angular/core";
import { LineageComponent } from "./lineage.component";
import { LineageService } from "./lineage.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";


import "@angular/material/prebuilt-themes/indigo-pink.css";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../material-extension/material.module";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import "font-awesome/css/font-awesome.min.css";

import { GraphComponent } from "./graph/graph.component";
import { LineageByDatasetIdResolver } from "./lineage.resolver";
import { DetailsModule } from "./details/details.module";
import { MiscModule } from "../misc/misc.module";
import { ExpressionRenderService } from "./details/expression/expression-render.service";

@NgModule({
    imports: [
        NoopAnimationsModule,
        CommonModule,
        RouterModule,
        MaterialModule,
        HttpClientModule,
        DetailsModule,
        MiscModule
    ],
    declarations: [
        LineageComponent,
        GraphComponent
    ],
    providers: [
        LineageService,
        LineageByDatasetIdResolver,
        ExpressionRenderService
    ],
    exports: [
        LineageComponent,
        GraphComponent
    ]
})
export class LineageModule {

}