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
import "@angular/material/prebuilt-themes/indigo-pink.css";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import {LineageModule} from "./lineage/lineage.module";
import {LineageComponent} from "./lineage/lineage.component";
import {LineageViewComponent} from "./lineage/lineage-view/lineage-view.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'lineage',
        pathMatch: 'full'
    },
    {
        path: 'lineage',
        component: LineageComponent,
        children: [
            {
                component: LineageViewComponent,
                matcher: (url: UrlSegment[]) =>
                    (url.length === 1)
                        ? {consumed: url, posParams: {'lineageId': url[0]}}
                        : (url.length === 3 && url[1].path === 'node')
                            ? {consumed: url, posParams: {'lineageId': url[0], 'nodeId': url[2]}}
                            : null
            }
        ]
    }
]

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        LineageModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}