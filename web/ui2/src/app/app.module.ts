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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CytoscapeNgLibModule } from 'cytoscape-ng-lib';
import { LineageComponent } from './components/lineage/lineage.component';
import { LineageGraphComponent } from './components/lineage/lineage-graph/lineage-graph.component';
import { LineageDetailsComponent } from './components/lineage/lineage-details/lineage-details.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LineageGraphComponent,
    LineageDetailsComponent,
    LineageComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    CytoscapeNgLibModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'partial-lineage/:datasourceId/:timestamp', component: LineageComponent },
      { path: 'error/:httpCode', component: ErrorComponent },
      { path: '', redirectTo: 'error/404', pathMatch: 'full' },
      { path: '**', redirectTo: 'error/404', pathMatch: 'full' }
    ]),
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
