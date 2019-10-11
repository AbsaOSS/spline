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
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Params } from "@angular/router";
import { FormGroupState, NgrxValueConverter } from 'ngrx-forms';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/model/app-state';
import { RouterStateUrl } from 'src/app/model/routerStateUrl';
import * as DashboardFormActions from 'src/app/store/actions/dashboard-form.actions';
import * as ExecutionEventsActions from 'src/app/store/actions/execution-events.actions';
import * as RouterAction from 'src/app/store/actions/router.actions';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private store: Store<AppState>
  ) {
    this.formState$ = store.select('dashboardForm')
  }

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent

  private subscribtions: Subscription[] = []
  public rows: any[] = []
  public loading: boolean = false
  public totalCount: number = 0
  public limit: number = 10
  public formState$: Observable<FormGroupState<any>>
  public asAtTime: number = moment().valueOf()
  public queryParams: Params = {
    timestampStart: 0,
    timestampEnd: 0,
    offset: 0,
    sortName: "timestamp",
    sortDirection: "desc",
    searchTerm: ""
  }
  public liveData: boolean = true

  rangeConverter = {
    convertViewToStateValue: dates => {
      return dates.map(d => this.dateConverter.convertViewToStateValue(d))
    },
    convertStateToViewValue: timestamps => {
      return timestamps.map(t => this.dateConverter.convertStateToViewValue(t))
    }
  } as NgrxValueConverter<Date[], number[]>

  dateConverter = {
    convertViewToStateValue: date => {
      return date.getTime()
    },
    convertStateToViewValue: timestamp => {
      return moment(timestamp).toDate()
    }
  } as NgrxValueConverter<Date, number>

  ngOnInit(): void {
    this.subscribtions.push(
      this.store.select('router', 'state', 'queryParams')
        .subscribe((queryParams: any) => {
          if (!_.isEmpty(queryParams)) {
            this.queryParams = queryParams
            if (queryParams.timestampStart != 0) {
              this.liveData = false
            }
            this.store.dispatch(new ExecutionEventsActions.Get({ ...this.queryParams, asAtTime: this.asAtTime }))
          }
          if (this.liveData) {
            this.store.dispatch(new ExecutionEventsActions.GetDefault({}))
          }
          this.store.dispatch(new DashboardFormActions.InitializeForm({ minDate: this.queryParams.timestampStart, maxDate: this.queryParams.timestampEnd }))
        })
    )

    this.subscribtions.push(
      this.store
        .select('dashboardForm', 'dashboardFilters', 'value', 'minDate')
        .pipe(
          switchMap(minDate => {
            return this.store
              .select('dashboardForm', 'dashboardFilters', 'value', 'maxDate')
              .pipe(
                map(maxDate => {
                  return { minDate: minDate, maxDate: maxDate }
                })
              )
          })
        )
        .subscribe(state => {
          if (!this.liveData) {
            this.queryParams = { ...this.queryParams, timestampStart: state.minDate, timestampEnd: state.maxDate }
            this.store.dispatch(new RouterAction.ReplaceUrlState(this.queryParams))
            this.store.dispatch(new ExecutionEventsActions.Get({ ...this.queryParams, asAtTime: this.asAtTime }))
          }
        })
    )

    this.subscribtions.push(
      this.store.select('executionEvents')
        .pipe(
          filter(state => state != null)
        ).subscribe(executionEvents => {
          this.rows = executionEvents.elements[1]
          this.queryParams = { ...this.queryParams, offset: executionEvents.offset }
          this.totalCount = executionEvents.totalCount
        })
    )
  }

  ngAfterViewInit(): void {

    this.subscribtions.push(
      this.table.page.pipe(
        tap(_ => this.loading = true),
      ).subscribe(
        page => {
          this.queryParams = { ...this.queryParams, offset: page.offset }
          this.applyFilters()
        }
      )
    )

    this.subscribtions.push(
      this.table.sort.pipe(
        tap(_ => this.loading = true),
        map(event => event.sorts[0]),
      ).subscribe(
        sort => {
          this.queryParams = { ...this.queryParams, offset: 0, sortName: sort.prop, sortDirection: sort.dir }
          this.applyFilters()
        }
      )
    )

    this.subscribtions.push(
      fromEvent<any>(this.searchInput.nativeElement, 'keyup')
        .pipe(
          tap(_ => this.loading = true),
          map(event => event.target.value),
          debounceTime(400)
        ).subscribe(
          searchTerm => {
            this.queryParams = { ...this.queryParams, offset: 0, searchTerm: searchTerm }
            this.applyFilters()
          }
        )
    )

  }

  private applyFilters() {
    if (!this.liveData) {
      this.store.dispatch(new RouterAction.ReplaceUrlState(this.queryParams))
    }
    this.store.dispatch(new ExecutionEventsActions.Get({ ...this.queryParams, asAtTime: this.asAtTime }))
    this.loading = false
  }

  public onDataModeChange(value) {
    this.liveData = value
    this.queryParams = (this.liveData == true && {})
    this.store.dispatch(new RouterAction.ReplaceUrlState(this.queryParams))
  }

  public onSelect(event): void {
    const appId = event.selected[0].applicationId
    const datasource = event.selected[0].datasource
    const params = {} as RouterStateUrl
    params.url = `/app/partial-lineage/${appId}`
    params.queryParams = { "path": datasource, "applicationId": appId }
    params.url = "/app/lineage-overview/"
    this.store.dispatch(new RouterAction.Go(params))
  }


  public getFrameworkImg(frameworkName: String) {
    if (frameworkName.toLowerCase().includes('spark')) {
      return "spark"
    } else {
      return ""
    }
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(s => s.unsubscribe())
  }

}
