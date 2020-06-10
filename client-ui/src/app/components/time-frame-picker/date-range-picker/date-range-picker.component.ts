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
import { dateToStruct, structToDate } from 'src/app/util/date-converter'


type Model = [NgbDateStruct, NgbDateStruct]
type BsModel = [Date, Date]

@Component({
    selector: 'date-range-picker',
    templateUrl: './date-range-picker.component.html'
})
export class DateRangePickerComponent {

    @Output()
    modelChange = new EventEmitter<NgbDateStruct[]>()
    bsMinDate: Date
    bsMaxDate: Date
    bsModel: BsModel

    @Input()
    set minDate(ngbDate: NgbDateStruct) {
        this.bsMinDate = structToDate(ngbDate)
    }

    @Input()
    set maxDate(ngbDate: NgbDateStruct) {
        this.bsMaxDate = structToDate(ngbDate)
    }

    @Input()
    set model(dates: Model) {
        this.bsModel = dates.map(structToDate) as BsModel
    }

    onBsModelChange(updatedBsModel: BsModel): void {
        if (!_.isEqual(this.bsModel, updatedBsModel)) {
            const newDates = updatedBsModel.map(dateToStruct)
            this.modelChange.emit(newDates)
        }
    }
}
