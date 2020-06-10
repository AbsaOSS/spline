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
import { Action } from '@ngrx/store'

import { DashboardVM } from '../../model/viewModels/dashboardVM'
import { DashboardActionTypes, SetDateRange, SetPageNumber, SetSearchQuery, SetSortOrder, SetState } from '../actions/dashboard.actions'


const initialState: DashboardVM = {
    filters: {
        dateRange: undefined,
        searchQuery: undefined
    },
    pagination: {
        page: 1,
        size: 10
    },
    sort: {
        field: 'timestamp',
        order: 'desc',
    }
}

export function dashboardReducer(state: DashboardVM = initialState, action: Action): DashboardVM {
    switch (action.type) {
        case DashboardActionTypes.SET_STATE:
            return (action as SetState).state

        case DashboardActionTypes.SET_DATE_RANGE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    dateRange: (action as SetDateRange).range
                },
                pagination: {
                    ...state.pagination,
                    page: 1
                }
            }

        case DashboardActionTypes.SET_SEARCH_QUERY:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    searchQuery: (action as SetSearchQuery).query || undefined
                },
                pagination: {
                    ...state.pagination,
                    page: 1
                }
            }

        case DashboardActionTypes.SET_PAGE_NUMBER:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: (action as SetPageNumber).page
                }
            }


        case DashboardActionTypes.SET_SORT_ORDER:
            const sortAction = (action as SetSortOrder)
            return {
                ...state,
                sort: {
                    field: sortAction.field,
                    order: sortAction.order
                }
            }

        default:
            return state
    }

}
