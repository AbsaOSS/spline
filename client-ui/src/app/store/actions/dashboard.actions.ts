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

import {Action} from '@ngrx/store';
import {DashboardVM} from "../../model/viewModels/dashboardVM";

export enum DashboardActionTypes {
  SET_STATE = '[Dashboard] Set state',
  SET_DATE_RANGE = '[Dashboard][Filters] Set date range',
  SET_SEARCH_QUERY = '[Dashboard][Filters] Set search query',
  SET_PAGE_NUMBER = '[Dashboard][Pagination] Set page number',
  SET_SORT_ORDER = '[Dashboard] Set sort order',
}

export class SetState implements Action {
  public readonly type = DashboardActionTypes.SET_STATE

  constructor(public state: DashboardVM) {
  }
}

export class SetDateRange implements Action {
  public readonly type = DashboardActionTypes.SET_DATE_RANGE

  constructor(public range: [number, number]) {
  }
}

export class SetSearchQuery implements Action {
  public readonly type = DashboardActionTypes.SET_SEARCH_QUERY

  constructor(public query: string) {
  }
}

export class SetPageNumber implements Action {
  public readonly type = DashboardActionTypes.SET_PAGE_NUMBER

  constructor(public page: number) {
  }
}

export class SetSortOrder implements Action {
  public readonly type = DashboardActionTypes.SET_SORT_ORDER

  constructor(public field: string,
              public direction: string) {
  }
}

export type DashboardActions
  = SetState
  | SetDateRange
  | SetSearchQuery
  | SetPageNumber
  | SetSortOrder
