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

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'
import * as _ from 'lodash'
import moment from 'moment'
import { dateToStruct, structToDate } from 'src/app/util/date-converter'


const MODEL_UPDATE_DELAY_ON_TYPING = 500 // millis

@Component({
    selector: 'date-picker',
    templateUrl: './date-picker.component.html'
})
export class DatePickerComponent {

    bsModel: Date
    bsMinDate: Date
    bsMaxDate: Date
    @Output() modelChange = new EventEmitter<NgbDateStruct>()
    valid = true
    readonly onModelChange: (_: Date) => void = _.debounce(
        (updatedModel: Date) => {
            this.valid = moment(updatedModel).isValid()
            if (this.valid && !_.isEqual(this.bsModel, updatedModel)) {
                this.modelChange.emit(dateToStruct(updatedModel))
            }
        },
        MODEL_UPDATE_DELAY_ON_TYPING)

    constructor() {
    }

    @Input()
    set model(date: NgbDateStruct) {
        this.bsModel = moment(structToDate(date)).toDate()
    }

    @Input()
    set minDate(minDate: NgbDateStruct) {
        this.bsMinDate = structToDate(minDate)
    }

    @Input()
    set maxDate(maxDate: NgbDateStruct) {
        this.bsMaxDate = structToDate(maxDate)
    }

}
