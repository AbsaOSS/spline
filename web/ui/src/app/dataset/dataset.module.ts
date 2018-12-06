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
import {HttpClientModule} from "@angular/common/http";

import "@angular/material/prebuilt-themes/indigo-pink.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";
import "font-awesome/css/font-awesome.min.css";
import {PersistentDatasetResolver} from "./dataset.resolver";
import {DatasetService} from "./dataset.service";
import {DatasetLineageOverviewResolver} from "./lineage-overview/lineage-overview.resolver";
import {DatasetLineageIntervalResolver} from "./lineage-overview/lineage-interval.resolver";
import {DatasetLineageOverviewComponent} from "./lineage-overview/lineage-overview.component";
import {MiscModule} from "../misc/misc.module";
import {MaterialModule} from "../material-extension/material.module";
import {LineageOverviewGraphComponent} from "./lineage-overview/lienage-overview-graph.component";
import {CommonModule} from "@angular/common";
import {DetailsModule} from "../lineage/details/details.module";


@NgModule({
    imports: [
        HttpClientModule,
        MaterialModule,
        MiscModule,
        CommonModule,
        DetailsModule
    ],
    declarations: [
        DatasetLineageOverviewComponent,
        LineageOverviewGraphComponent
    ],
    providers: [
        DatasetService,
        PersistentDatasetResolver,
        DatasetLineageOverviewResolver,
        DatasetLineageIntervalResolver
    ]
})
export class DatasetModule {

}