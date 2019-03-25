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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CytoscapeNgLibModule } from 'cytoscape-ng-lib';
import { LineageComponent } from './components/lineage/lineage.component';
import { LineageGraphComponent } from './components/lineage/lineage-graph/lineage-graph.component';
import { LineageDetailsComponent } from './components/lineage/lineage-details/lineage-details.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { SchemaComponent } from './components/lineage/lineage-details/schema/schema.component';
import { PropertyDetailsComponent } from './components/lineage/lineage-details/property-details/property-details.component';
import { SchemaDetailsComponent } from './components/lineage/lineage-details/schema-details/schema-details.component';
import { ConfigService } from './services/config/config.service';
import { environment } from '../environments/environment';
import { SchemaTableComponent } from './components/lineage/lineage-details/schema-table/schema-table.component';
import { JoinComponent } from './components/lineage/lineage-details/schema-details/join/join.component';
import { ExpressionComponent } from './components/lineage/lineage-details/schema-details/expression/expression.component';
import { ProjectionComponent } from './components/lineage/lineage-details/schema-details/projection/projection.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


export function initializeApp(appConfig: ConfigService) {
  return () => appConfig.load(environment);
}

const ROOT_ROUTING = "app/"

@NgModule({
  declarations: [
    AppComponent,
    LineageGraphComponent,
    LineageDetailsComponent,
    LineageComponent,
    ErrorComponent,
    SchemaComponent,
    PropertyDetailsComponent,
    SchemaDetailsComponent,
    SchemaTableComponent,
    JoinComponent,
    ExpressionComponent,
    ProjectionComponent
  ],
  entryComponents: [
    SchemaTableComponent,
    ExpressionComponent,
    JoinComponent,
    ProjectionComponent
  ],
  imports: [
    BrowserModule,
    CytoscapeNgLibModule,
    HttpClientModule,
    NgxDatatableModule,
    RouterModule.forRoot([
      { path: ROOT_ROUTING + 'partial-lineage/:uid', component: LineageComponent },
      { path: ROOT_ROUTING + 'error/:httpCode', component: ErrorComponent },
      { path: ROOT_ROUTING, redirectTo: ROOT_ROUTING + 'error/404', pathMatch: 'full' },
      { path: '**', redirectTo: ROOT_ROUTING + 'error/404', pathMatch: 'full' }
    ]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    }
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
