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
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';
import { CustomStepDefinition, LabelType, Options } from 'ng5-slider';
import { FormGroupState, NgrxValueConverter } from 'ngrx-forms';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
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
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(
    private store: Store<AppState>
  ) {
    this.formState$ = store.select('dashboardForm')
  }

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent


  public rows: any[] = []
  public loading: boolean = false
  public offset: number = 0
  public totalCount: number = 0
  public timestampStart: number = 0
  public timestampEnd: number = 0
  public sortName: string = "timestamp"
  public sortDirection: string = "asc"
  public searchTerm: string = ""
  public asAtTime = moment().valueOf()
  public formState$: Observable<FormGroupState<any>>
  public maxRange: Moment = moment().add(1, 'M')
  options: Options = {
    stepsArray: this.createStepArray(),
    translate: (value: number, label: LabelType): string => {
      return moment(value).format('DD/MM/YYYY, h:mm:ss A')
    },
    showTicks: true,
    precisionLimit: 100
  }

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
    this.store
      .select('router', 'state', 'queryParams')
      .subscribe((queryParams: any) => {
        if (!_.isEmpty(queryParams)) {
          this.timestampStart = queryParams.timestampStart
          this.timestampEnd = queryParams.timestampEnd
          this.asAtTime = this.asAtTime = Number(queryParams.asAtTime) || this.asAtTime
          this.offset = Number(queryParams.offset)
          this.sortName = queryParams.sortName
          this.sortDirection = queryParams.sortDirection
          this.searchTerm = queryParams.searchTerm
          this.updateDateRange(moment(Number(queryParams.timestampStart)).toDate(), moment(Number(queryParams.timestampEnd)).toDate())
          this.store.dispatch(new ExecutionEventsActions.Get(queryParams))
          this.store.dispatch(new DashboardFormActions.InitializeForm({ minDate: this.timestampStart, maxDate: this.timestampEnd }))
        } else {
          this.store.dispatch(new ExecutionEventsActions.GetDefault({}))
        }
      })

    this.store
      .select('dashboardForm', 'dashboardFilters', 'value', 'dateRange')
      .pipe(
        filter(state => state != null)
      )
      .subscribe(dateRange => {
        this.updateDateRange(moment(dateRange[0]).toDate(), moment(dateRange[1]).toDate())
      })

    this.store
      .select('dashboardForm', 'dashboardFilters', 'value', 'minDate')
      .pipe(
        switchMap(minDate => {
          return this.store
            .select('dashboardForm', 'dashboardFilters', 'value', 'sliderRange')
            .pipe(
              map(sliderRange => {
                return { sliderRange: sliderRange, minDate: minDate }
              })
            )
        }),
        switchMap(state => {
          return this.store
            .select('dashboardForm', 'dashboardFilters', 'value', 'maxDate')
            .pipe(
              map(maxDate => {
                return { sliderRange: state.sliderRange, minDate: state.minDate, maxDate: maxDate }
              })
            )
        })
      )
      .subscribe(state => {
        this.updateTimestamp(state.sliderRange[0], state.minDate) 
        this.updateTimestamp(state.sliderRange[1], state.maxDate)
        this.timestampStart = state.sliderRange[0]
        this.timestampEnd = state.sliderRange[1]
        const params: RouterStateUrl = this.createParams()
        this.store.dispatch(new ExecutionEventsActions.Get(params.queryParams))
        this.store.dispatch(new RouterAction.ReplaceUrlState(params.queryParams))
      })

    this.store.select('executionEvents')
      .pipe(
        filter(state => state != null)
      ).subscribe(executionEvents => {
        this.rows = executionEvents.elements[1]
        this.offset = executionEvents.offset
        this.totalCount = executionEvents.totalCount
      })
  }

  ngAfterViewInit(): void {

    this.table.page.pipe(
      tap(_ => this.loading = true),
    ).subscribe(
      page => {
        this.offset = page.offset
        const params = this.createParams()
        this.store.dispatch(new RouterAction.Go(params))
        this.loading = false
      }
    )

    this.table.sort.pipe(
      tap(_ => this.loading = true),
      map(event => event.sorts[0]),
    ).subscribe(
      sort => {
        this.sortName = sort.prop
        this.sortDirection = sort.dir
        this.offset = 0
        const params = this.createParams()
        this.store.dispatch(new RouterAction.Go(params))
        this.loading = false
      }
    )

    fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        tap(_ => this.loading = true),
        map(event => event.target.value),
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(
        searchTerm => {
          this.offset = 0
          this.searchTerm = searchTerm
          let params = this.createParams()
          this.store.dispatch(new RouterAction.Go(params))
          this.loading = false
        }
      )

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

  private createParams(): RouterStateUrl {
    const routerStateParams = {} as RouterStateUrl
    routerStateParams.queryParams = {
      timestampStart: this.timestampStart,
      timestampEnd: this.timestampEnd,
      asAtTime: this.asAtTime,
      offset: this.offset,
      sortName: this.sortName,
      sortDirection: this.sortDirection,
      searchTerm: this.searchTerm
    }
    return routerStateParams
  }


  private createStepArray(startDate?: Date, endDate?: Date): CustomStepDefinition[] {
    const timestampSteps: number[] = []
    const start: Moment = startDate ? moment(startDate) : moment()
    const end: Moment = endDate ? startDate.valueOf() == endDate.valueOf() ? moment(endDate).add(2, 'days') : moment(endDate).add(1, 'days') : this.maxRange
    for (let m = start; m.isBefore(end); m.add(1, 'days')) {
      timestampSteps.push(m.valueOf())
    }

    const stepArray = timestampSteps.map((timestamp: number) => {
      if (moment(timestamp).format('DD') == "01") {
        return { value: timestamp, legend: `${moment(timestamp).format('DD')} \n ${moment(timestamp).format('MMMM')} ` }
      }
      if (timestampSteps.length < 120) {
        return { value: timestamp, legend: moment(timestamp).format('DD') }
      } else {
        return { value: timestamp }
      }
    })
    return stepArray
  }

  private updateTimestamp(timestampStepValue: number, newTimestamp: number): void {
    const indexToChange: number = this.options.stepsArray.findIndex(x => moment(x.value).format('LL') === moment(timestampStepValue).format('LL'))
    if (this.options.stepsArray[indexToChange]) {
      const replacementItem: CustomStepDefinition = { value: newTimestamp, legend: this.options.stepsArray[indexToChange].legend }
      const newSteps = Object.assign([], this.options.stepsArray, { [indexToChange]: replacementItem })
      const newOptions: Options = Object.assign({}, this.options)
      newOptions.stepsArray = newSteps
      this.options = newOptions
    }
  }

  private updateDateRange(startDate: Date, endDate: Date): void {
    const newOptions: Options = Object.assign({}, this.options)
    newOptions.stepsArray = this.createStepArray(startDate, endDate)
    this.options = newOptions
  }

}
