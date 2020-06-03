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

import { HttpClientModule } from '@angular/common/http'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { EffectsModule } from '@ngrx/effects'
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store'
import { Store, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { TreeModule } from 'angular-tree-component'
import { PrettyJsonModule } from 'angular2-prettyjson'
import { CytoscapeNgLibModule } from 'cytoscape-ng-lib'
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker'
import { ModalModule } from 'ngx-bootstrap/modal'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { ToastrModule } from 'ngx-toastr'
import { filter } from 'rxjs/operators'
import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ErrorComponent } from './components/error/error.component'
import { ExecutionPlanDetailsComponent } from './components/execution-plan-details/execution-plan-details.component'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { LineageOverviewDetailsComponent } from './components/lineage-overview/lineage-overview-details/lineage-overview-details.component'
import { LineageOverviewGraphComponent } from './components/lineage-overview/lineage-overview-graph/lineage-overview-graph.component'
import { LineageOverviewComponent } from './components/lineage-overview/lineage-overview.component'
import { LineageDetailsComponent } from './components/lineage/lineage-details/lineage-details.component'
import { AggregateComponent } from './components/lineage/lineage-details/operation-properties-details/aggregate/aggregate.component'
import { FilterComponent } from './components/lineage/lineage-details/operation-properties-details/filter/filter.component'
import { GenericComponent } from './components/lineage/lineage-details/operation-properties-details/generic/generic.component'
import { JoinComponent } from './components/lineage/lineage-details/operation-properties-details/join/join.component'
import { LogicalRelationComponent } from './components/lineage/lineage-details/operation-properties-details/logical-relation/logical-relation.component'
import { OperationPropertyJsonComponent } from './components/lineage/lineage-details/operation-properties-details/operation-property-json/operation-property-json.component'
import { OperationPropertiesDetailsComponent } from './components/lineage/lineage-details/operation-properties-details/operation-properties-details.component'
import { ProjectionComponent } from './components/lineage/lineage-details/operation-properties-details/projection/projection.component'
import { PropertiesComponent } from './components/lineage/lineage-details/operation-properties-details/properties/properties.component'
import { SortComponent } from './components/lineage/lineage-details/operation-properties-details/sort/sort.component'
import { SchemaTableComponent } from './components/lineage/lineage-details/schema-table/schema-table.component'
import { SchemaComponent } from './components/lineage/lineage-details/schema/schema.component'
import { LineageGraphComponent } from './components/lineage/lineage-graph/lineage-graph.component'
import { LineageHighlightsToolbarComponent } from './components/lineage/lineage-highlights-toolbar/lineage-highlights-toolbar.component'
import { LineageComponent } from './components/lineage/lineage.component'
import { ModalExpressionComponent } from './components/modal/modal-expression/modal-expression.component'
import { DatePickerComponent } from './components/time-frame-picker/date-picker/date-picker.component'
import { DateRangePickerComponent } from './components/time-frame-picker/date-range-picker/date-range-picker.component'
import { TimeFramePickerComponent } from './components/time-frame-picker/time-frame-picker.component'
import { TimePickerComponent } from './components/time-frame-picker/time-picker/time-picker.component'
import { ConfigEffects } from './effects/config.effects'
import { DetailsInfoEffects } from './effects/details-info.effects'
import { ExecutionEventsEffects } from './effects/execution-events.effects'
import { ExecutionPlanEffects } from './effects/execution-plan.effects'
import { LineageOverviewEffects } from './effects/lineage-overview.effects'
import { ModalEffects } from './effects/modal.effects'
import { NotificationsEffects } from './effects/notifications-effects'
import { RouterEffects } from './effects/router.effects'
import { AppState } from './model/app-state'
import { RouterSerializer } from './serializers/routerSerializer'
import * as ConfigActions from './store/actions/config.actions'
import { configReducer } from './store/reducers/config.reducer'
import { contextMenuReducer } from './store/reducers/context-menu.reducer'
import { dashboardReducer } from './store/reducers/dashboard.reducer'
import { detailsInfoReducer } from './store/reducers/details-info.reducer'
import { errorReducer } from './store/reducers/error.reducer'
import { executionEventReducer } from './store/reducers/execution-events.reducer'
import { executionPlanReducer } from './store/reducers/execution-plan.reducer'
import { layoutReducer } from './store/reducers/layout.reducer'
import { lineageOverviewReducer } from './store/reducers/lineage-overview.reducer'
import { WriteComponent } from './components/lineage/lineage-details/operation-properties-details/write/write.component'
import { AliasComponent } from './components/lineage/lineage-details/operation-properties-details/alias/alias.component'
import { PropertyErrorComponent } from './components/lineage/lineage-details/operation-properties-details/property-error/property-error.component'
import { attributeLineageAndImpactReducer } from './store/reducers/attribute-lineage-and-impact.reducer'
import { AttributeLineageAndImpactEffects } from './effects/attribute-lineage-and-impact.effects'
import { AttributeSearchBarComponent } from './components/header/attribute-search-bar/attribute-search-bar.component'
import { NgxJsonViewerModule } from 'ngx-json-viewer'


export function initializeApp(store: Store<AppState>): () => Promise<any> {
  return () => new Promise(resolve => {
    store.dispatch(new ConfigActions.StartAppInitializer())
    store.dispatch(new ConfigActions.Get(environment))
    store.select('config').pipe(
      filter(config => config !== null && config !== undefined)
    ).subscribe(_ => {
      store.dispatch(new ConfigActions.FinishAppInitializer())
      resolve(true)
    })
  })
}

const ROOT_ROUTING = 'app/'

@NgModule({
  declarations: [
    AppComponent,
    ModalExpressionComponent,
    LineageGraphComponent,
    LineageHighlightsToolbarComponent,
    LineageDetailsComponent,
    LineageComponent,
    ErrorComponent,
    SchemaComponent,
    OperationPropertiesDetailsComponent,
    SchemaTableComponent,
    JoinComponent,
    PropertiesComponent,
    ProjectionComponent,
    LineageOverviewComponent,
    LineageOverviewDetailsComponent,
    LineageOverviewGraphComponent,
    DashboardComponent,
    ExecutionPlanDetailsComponent,
    AggregateComponent,
    LogicalRelationComponent,
    SortComponent,
    FilterComponent,
    GenericComponent,
    TimeFramePickerComponent,
    DatePickerComponent,
    DateRangePickerComponent,
    TimePickerComponent,
    HeaderComponent,
    FooterComponent,
    WriteComponent,
    AliasComponent,
    PropertyErrorComponent,
    AttributeSearchBarComponent,
    OperationPropertyJsonComponent
  ],
  entryComponents: [
    ModalExpressionComponent,
    SchemaTableComponent,
    PropertiesComponent,
    PropertyErrorComponent,
    WriteComponent,
    AliasComponent,
    JoinComponent,
    ProjectionComponent,
    AggregateComponent,
    LogicalRelationComponent,
    SortComponent,
    FilterComponent,
    GenericComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    PrettyJsonModule,
    TreeModule.forRoot(),
    BrowserModule,
    TooltipModule.forRoot(),
    CytoscapeNgLibModule,
    HttpClientModule,
    NgxDatatableModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      config: configReducer,
      dashboard: dashboardReducer,
      executedLogicalPlan: executionPlanReducer,
      attributeLineageAndImpact: attributeLineageAndImpactReducer,
      lineageOverview: lineageOverviewReducer,
      detailsInfos: detailsInfoReducer,
      executionEvents: executionEventReducer,
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
      AttributeLineageAndImpactEffects,
      LineageOverviewEffects,
      DetailsInfoEffects,
      RouterEffects,
      ModalEffects
    ]),
    StoreRouterConnectingModule.forRoot(),
    RouterModule.forRoot([
      { path: ROOT_ROUTING + 'dashboard', component: DashboardComponent },
      { path: ROOT_ROUTING + 'lineage-overview', component: LineageOverviewComponent },
      { path: ROOT_ROUTING + 'lineage-detailed/:uid', component: LineageComponent },
      { path: ROOT_ROUTING + 'error/:httpCode', component: ErrorComponent },
      { path: '**', redirectTo: ROOT_ROUTING + 'dashboard' }
    ]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
    MatTooltipModule,
    NgxJsonViewerModule
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
export class AppModule {
}
