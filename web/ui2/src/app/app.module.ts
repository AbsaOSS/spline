import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CytoscapeNgLibModule } from 'cytoscape-ng-lib';
import { LineageComponent } from './components/lineage/lineage.component';
import { LineageGraphComponent } from './components/lineage/lineage-graph/lineage-graph.component';
import { LineageDetailsComponent } from './components/lineage/lineage-details/lineage-details.component';
import { ErrorComponent } from './components/error/error.component';

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
