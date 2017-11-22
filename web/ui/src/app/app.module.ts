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
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes, UrlSegment} from "@angular/router";
import "hammerjs/hammer";
import {AppComponent} from "./app.component";
import {DashboardModule} from "./dashboard/dashboard.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LineageComponent} from "./lineage/lineage.component";
import {LineageModule} from "./lineage/lineage.module";
import {LineageByDatasetIdResolver} from "./lineage/lineage.resolver";
import {WelcomeComponent} from "./dashboard/welcome/welcome.component";
import {PersistentDatasetResolver} from "./dataset/dataset.resolver";
import {DatasetModule} from "./dataset/dataset.module";
import {DatasetLineageOverviewResolver} from "./dataset/lineage-overview/lineage-overview.resolver";
import {DatasetLineageOverviewComponent} from "./dataset/lineage-overview/lineage-overview.component";


const lineageRoute = {
    component: LineageComponent,
    matcher: (url: UrlSegment[]) =>
        (url.length === 0)
            ? {consumed: url}
            : (url.length === 2 && url[0].path === 'op')
            ? {consumed: url, posParams: {'operationId': url[1]}}
            : null
}

const datasetRoute = {
    path: "dataset/:id",
    resolve: {dataset: PersistentDatasetResolver},
    children: [
        {
            path: "lineage",
            children: [
                {
                    path: "overview",
                    resolve: {lineage: DatasetLineageOverviewResolver},
                    component: DatasetLineageOverviewComponent
                },
                {
                    path: "partial",
                    resolve: {lineage: LineageByDatasetIdResolver},
                    children: [lineageRoute]
                }
            ]
        }
    ]
}

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: WelcomeComponent
            },
            datasetRoute
        ]
    },
    datasetRoute,
    {
        path: '**',
        redirectTo: '/dashboard'
    },
]

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, {enableTracing: false}),
        DashboardModule,
        LineageModule,
        DatasetModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}