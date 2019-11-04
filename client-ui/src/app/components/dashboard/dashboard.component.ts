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
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Params} from "@angular/router";
import {Store} from '@ngrx/store';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import * as _ from 'lodash';
import * as moment from 'moment';
import {FormGroupState, NgrxValueConverter} from 'ngrx-forms';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime, filter, map, switchMap, tap} from 'rxjs/operators';
import {AppState} from 'src/app/model/app-state';
import {RouterStateUrl} from 'src/app/model/routerStateUrl';
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

  private subscriptions: Subscription[] = []
  public rows: any[] = []
  public loading: boolean = false
  public totalCount: number = 0
  public limit: number = 10
  public formState$: Observable<FormGroupState<any>>
  public asAtTime: number = moment().valueOf()
  public queryParams: Params = {
    timestampStart: 0,
    timestampEnd: undefined,
    offset: 0,
    sortName: "timestamp",
    sortDirection: "desc",
    searchTerm: ""
  }
  public useDateRange: boolean = false

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
    this.subscriptions.push(
      this.store.select('router', 'state', 'queryParams')
        .subscribe((queryParams: any) => {
          if (!_.isEmpty(queryParams)) {
            this.queryParams = queryParams
            if (queryParams.timestampStart != 0) {
              this.useDateRange = true
            }
            this.store.dispatch(new ExecutionEventsActions.Get({ ...this.queryParams, asAtTime: this.asAtTime }))
          }
          if (!this.useDateRange) {
            this.store.dispatch(new ExecutionEventsActions.GetDefault({}))
          }
          this.store.dispatch(new DashboardFormActions.InitializeForm({ minDate: this.queryParams.timestampStart, maxDate: this.queryParams.timestampEnd }))
        })
    )

    this.subscriptions.push(
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
          if (this.useDateRange) {
            this.queryParams = { ...this.queryParams, timestampStart: state.minDate, timestampEnd: state.maxDate }
            this.store.dispatch(new RouterAction.ReplaceUrlState(this.queryParams))
            this.store.dispatch(new ExecutionEventsActions.Get({ ...this.queryParams, asAtTime: this.asAtTime }))
          }
        })
    )

    this.subscriptions.push(
      this.store.select('executionEvents')
        .pipe(
          filter(state => state != null)
        ).subscribe(executionEvents => {
          this.rows = executionEvents.elements
          this.queryParams = { ...this.queryParams, offset: executionEvents.offset }
          this.totalCount = executionEvents.totalCount
        })
    )
  }

  ngAfterViewInit(): void {

    this.subscriptions.push(
      this.table.page.pipe(
        tap(_ => this.loading = true),
      ).subscribe(
        page => {
          this.queryParams = { ...this.queryParams, offset: page.offset }
          this.applyFilters()
        }
      )
    )

    this.subscriptions.push(
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

    this.subscriptions.push(
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

  private applyFilters(): void {
    if (this.useDateRange) {
      this.store.dispatch(new RouterAction.ReplaceUrlState(this.queryParams))
    }
    this.store.dispatch(new ExecutionEventsActions.Get({ ...this.queryParams, asAtTime: this.asAtTime }))
    this.loading = false
  }

  public onUseDateRangeChange(value): void {
    this.useDateRange = value
    this.queryParams = !this.useDateRange && {}
    this.store.dispatch(new RouterAction.ReplaceUrlState(this.queryParams))
  }

  public onSelect(event): void {
    const executionEventId = event.selected[0].executionEventId
    const params = {} as RouterStateUrl
    params.queryParams = { "executionEventId": executionEventId }
    params.url = "/app/lineage-overview/"
    this.store.dispatch(new RouterAction.Go(params))
  }


  public getFrameworkImg(frameworkName: String): String {
    if (frameworkName.toLowerCase().includes('spark')) {
      return "spark"
    } else {
      return ""
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

}
