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
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/model/app-state';
import { RouterStateUrl } from 'src/app/model/routerStateUrl';
import * as DashboardActions from 'src/app/store/actions/dashboard.actions';
import * as ExecutionEventsActions from 'src/app/store/actions/execution-events.actions';
import * as RouterAction from 'src/app/store/actions/router.actions';
import { DashboardVM } from "../../model/viewModels/dashboardVM";
import { DateRange, Timestamp } from "../time-frame-picker/time-frame-picker.model";
import { PageableExecutionEventsResponse } from "../../generated/models/pageable-execution-events-response";
import { TablePage, TableSort } from "./dashboard.model";
import { DashboardLoadingIndicator } from "./dashboard.loading-indicator";
import { MatSlideToggleChange } from '@angular/material';

const SEARCH_TERM_UPDATE_DELAY = 300 //millis

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnDestroy {
  private readonly subscriptions: Subscription[] = []
  private readonly asAtTime: Timestamp = +moment()

  public readonly loadingIndicator = new DashboardLoadingIndicator

  public executionEvents: PageableExecutionEventsResponse = {}
  public dashboardState: DashboardVM
  public sort: TableSort

  constructor(private store: Store<AppState>) {
    this.subscriptions.push(
      this.store.select('dashboard')
        .subscribe((dashboardState) => {
          this.dashboardState = dashboardState
          this.sort = {
            prop: dashboardState.sort.field,
            dir: dashboardState.sort.order
          }
          this.loadExecutionEvents(dashboardState)
          this.loadingIndicator.activate()
        }),

      this.store.select('executionEvents')
        .pipe(filter(_.identity))
        .subscribe(executionEvents => {
          this.executionEvents = executionEvents
          this.loadingIndicator.deactivate()
        })
    )
  }

  private loadExecutionEvents(dashboardState: DashboardVM): void {
    const dateRange = dashboardState.filters.dateRange
    this.store.dispatch(new ExecutionEventsActions.Get(
      {
        asAtTime: this.asAtTime,
        timestampStart: dateRange && dateRange[0],
        timestampEnd: dateRange && dateRange[1],
        pageNum: dashboardState.pagination.page,
        sortField: dashboardState.sort.field,
        sortOrder: dashboardState.sort.order,
        searchTerm: dashboardState.filters.searchQuery,
      }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  public onSelect(event): void {
    const executionEventId = event.selected[0].executionEventId
    const params = {} as RouterStateUrl
    params.queryParams = { "executionEventId": executionEventId }
    params.url = "/app/lineage-overview/"
    this.store.dispatch(new RouterAction.Go(params))
  }

  public onFilterByDateSwitchToggle(switchOn: MatSlideToggleChange): void {
    const dateRange = switchOn.checked
      ? this.executionEvents.totalDateRange as DateRange
      : undefined;
    this.store.dispatch(new DashboardActions.SetDateRange(dateRange))
  }

  public onDateRangeSelected(range: DateRange): void {
    this.store.dispatch(new DashboardActions.SetDateRange(range))
  }

  public onPageChange(page: TablePage): void {
    this.store.dispatch(new DashboardActions.SetPageNumber(page.offset+1))
  }

  public onSortChange(sort: TableSort): void {
    this.store.dispatch(new DashboardActions.SetSortOrder(sort.prop, sort.dir))
  }

  public readonly onSearchTermChange: (_: KeyboardEvent) => void = _.debounce(
    (input: KeyboardEvent) =>
      this.store.dispatch(new DashboardActions.SetSearchQuery((input.target as HTMLInputElement).value)),
    SEARCH_TERM_UPDATE_DELAY)

  public getFrameworkImg(frameworkName: string): string {
    if (frameworkName.toLowerCase().includes('spark')) {
      return "spark"
    } else {
      return ""
    }
  }
}
