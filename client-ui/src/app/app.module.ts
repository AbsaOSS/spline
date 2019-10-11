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

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CytoscapeNgLibModule } from 'cytoscape-ng-lib';
import { NgrxFormsModule } from 'ngrx-forms';
import { NgxBootstrapSwitchModule } from 'ngx-bootstrap-switch';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ToastrModule } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { LineageOverviewDetailsComponent } from './components/lineage-overview/lineage-overview-details/lineage-overview-details.component';
import { LineageOverviewGraphComponent } from './components/lineage-overview/lineage-overview-graph/lineage-overview-graph.component';
import { LineageOverviewComponent } from './components/lineage-overview/lineage-overview.component';
import { AttributeDetailsComponent } from './components/lineage/lineage-details/attribute-details/attribute-details.component';
import { LineageDetailsComponent } from './components/lineage/lineage-details/lineage-details.component';
import { ExpressionComponent } from './components/lineage/lineage-details/schema-details/expression/expression.component';
import { JoinComponent } from './components/lineage/lineage-details/schema-details/join/join.component';
import { ProjectionComponent } from './components/lineage/lineage-details/schema-details/projection/projection.component';
import { SchemaDetailsComponent } from './components/lineage/lineage-details/schema-details/schema-details.component';
import { SchemaTableComponent } from './components/lineage/lineage-details/schema-table/schema-table.component';
import { SchemaComponent } from './components/lineage/lineage-details/schema/schema.component';
import { LineageGraphComponent } from './components/lineage/lineage-graph/lineage-graph.component';
import { LineageComponent } from './components/lineage/lineage.component';
import { ConfigEffects } from './effects/config.effects';
import { DetailsInfoEffects } from './effects/details-info.effects';
import { ExecutionEventsEffects } from './effects/execution-events.effects';
import { ExecutionPlanDatasourceInfoEffects } from './effects/execution-plan-datasource-info.effects';
import { ExecutionPlanEffects } from './effects/execution-plan.effects';
import { LineageOverviewEffects } from './effects/lineage-overview.effects';
import { RouterEffects } from './effects/router.effects';
import { AppState } from './model/app-state';
import { RouterSerializer } from './serializers/routerSerializer';
import * as ConfigActions from './store/actions/config.actions';
import { attributeReducer } from './store/reducers/attribute.reducer';
import { configReducer } from './store/reducers/config.reducer';
import { contextMenuReducer } from './store/reducers/context-menu.reducer';
import { dashboardFiltersReducer } from './store/reducers/dashboard-filters.reducer';
import { datasourceInfoReducer } from './store/reducers/datasource-info.reducer';
import { detailsInfoReducer } from './store/reducers/details-info.reducer';
import { errorReducer } from './store/reducers/error.reducer';
import { executionEventReducer } from './store/reducers/execution-events.reducer';
import { executionPlanDatasourceInfoReducer } from './store/reducers/execution-plan-datasource-info.reducer';
import { executionPlanReducer } from './store/reducers/execution-plan.reducer';
import { layoutReducer } from './store/reducers/layout.reducer';
import { lineageOverviewReducer } from './store/reducers/lineage-overview.reducer';
import { NotificationsEffects } from './effects/notifications-effects';


export function initializeApp(store: Store<AppState>): () => Promise<any> {
  return () => new Promise(resolve => {
    store.dispatch(new ConfigActions.StartAppInitializer())
    store.dispatch(new ConfigActions.Get(environment))
    store.select('config').pipe(
      filter(config => config !== null && config !== undefined)
    ).subscribe(t => {
      store.dispatch(new ConfigActions.FinishAppInitializer())
      resolve(true)
    })
  })
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
    AttributeDetailsComponent,
    SchemaDetailsComponent,
    SchemaTableComponent,
    JoinComponent,
    ExpressionComponent,
    ProjectionComponent,
    LineageOverviewComponent,
    LineageOverviewDetailsComponent,
    LineageOverviewGraphComponent,
    DashboardComponent
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
    NgxBootstrapSwitchModule.forRoot(),
    NgrxFormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      config: configReducer,
      dashboardForm: dashboardFiltersReducer,
      executedLogicalPlan: executionPlanReducer,
      lineageOverview: lineageOverviewReducer,
      detailsInfos: detailsInfoReducer,
      dataSourceInfo: datasourceInfoReducer,
      executionPlanDatasourceInfo: executionPlanDatasourceInfoReducer,
      executionEvents: executionEventReducer,
      attributes: attributeReducer,
      router: routerReducer,
      error: errorReducer,
      contextMenu: contextMenuReducer,
      layout: layoutReducer
    }),
    EffectsModule.forRoot([
      ConfigEffects,
      NotificationsEffects,
      ExecutionEventsEffects,
      ExecutionPlanEffects,
      ExecutionPlanDatasourceInfoEffects,
      LineageOverviewEffects,
      DetailsInfoEffects,
      RouterEffects
    ]),
    StoreRouterConnectingModule.forRoot(),
    RouterModule.forRoot([
      { path: ROOT_ROUTING + 'dashboard', component: DashboardComponent },
      { path: ROOT_ROUTING + 'lineage-overview', component: LineageOverviewComponent },
      { path: ROOT_ROUTING + 'partial-lineage/:uid', component: LineageComponent },
      { path: ROOT_ROUTING + 'error/:httpCode', component: ErrorComponent },
      { path: '**', redirectTo: ROOT_ROUTING + 'dashboard' }
    ]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Store],
      multi: true
    },
    {
      provide: RouterStateSerializer,
      useClass: RouterSerializer,
    }
  ],

  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
