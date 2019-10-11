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
import { Action } from '@ngrx/store';
import * as moment from 'moment';
import { createFormGroupState, formGroupReducer, SetValueAction, unbox } from 'ngrx-forms';
import { DashboardFormActionTypes } from '../actions/dashboard-form.actions';

const FORM_ID = 'dashboardFilter'

const initialFormState = createFormGroupState<any>(FORM_ID, {
    minDate: moment().valueOf(),
    maxDate: moment().add(1, 'd').valueOf(),
    range: [moment().valueOf(), moment().add(1, 'M').valueOf()]
})

const initialState: any = {
    dashboardFilters: initialFormState,
}

export function dashboardFiltersReducer(state = initialState, action: Action): any {

    switch (action.type) {
        case DashboardFormActionTypes.DASHBOARD_FORM_INITIALIZE: {
            const minDate = Number(action['payload']['minDate'])
            const maxDate = Number(action['payload']['maxDate'])
            if (minDate && maxDate) {
                let newState = state
                newState.dashboardFilters.value.minDate = minDate
                newState.dashboardFilters.controls.minDate.value = minDate
                newState.dashboardFilters.value.maxDate = maxDate
                newState.dashboardFilters.controls.maxDate.value = maxDate
                newState.dashboardFilters.value.range = [minDate, maxDate]
                newState.dashboardFilters.controls.range.value = newState.dashboardFilters.value.range
                return newState
            } else {
                return state
            }
        }
        case SetValueAction.TYPE: {
            let dashboardFilters = formGroupReducer(state.dashboardFilters, action)
            state = { ...state, dashboardFilters }

            if (action['controlId'] == "dashboardFilter.minDate") {
                state.dashboardFilters.value.range = [action['value'], state.dashboardFilters.value.maxDate]
                state.dashboardFilters.controls.range.value = state.dashboardFilters.value.range
            }
            if (action['controlId'] == "dashboardFilter.maxDate") {
                state.dashboardFilters.value.range = [state.dashboardFilters.value.minDate, action['value']]
                state.dashboardFilters.controls.range.value = state.dashboardFilters.value.range
            }
            if (action['controlId'] == "dashboardFilter.range") {
                state.dashboardFilters.value.minDate = action['value'][0]
                state.dashboardFilters.controls.minDate.value = state.dashboardFilters.value.minDate
                state.dashboardFilters.value.maxDate = action['value'][1]
                state.dashboardFilters.controls.maxDate.value = state.dashboardFilters.value.maxDate
            }
            return state
        }
        default: return state
    }

}