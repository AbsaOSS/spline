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
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap'
import moment from 'moment'

import { DateRange, Timestamp } from './time-frame-picker.model'


type ViewModel = [LocalDateTimeModel, LocalDateTimeModel]

interface LocalDateTimeModel {
    time: NgbTimeStructWithMillis
    date: NgbDateStruct
}

interface NgbTimeStructWithMillis extends NgbTimeStruct {
    millis: number
}

@Component({
    selector: 'time-frame-picker',
    templateUrl: './time-frame-picker.component.html'
})
export class TimeFramePickerComponent {
    model: ViewModel
    modelBoundaries: ViewModel
    @Output()
    rangeChange = new EventEmitter<DateRange>()

    @Input()
    set range(range: DateRange) {
        this.model = <ViewModel>range.map(TimeFramePickerComponent.timestampToLdt)
    }

    @Input()
    set rangeBoundaries(boundaries: DateRange | undefined) {
        this.modelBoundaries = boundaries
            ? <ViewModel>boundaries.map(TimeFramePickerComponent.timestampToLdt)
            : this.model
    }

    private static timestampToLdt(t: Timestamp): LocalDateTimeModel {
        const m = moment(t)
        return {
            time: {
                hour: m.hour(),
                minute: m.minute(),
                second: m.second(),
                millis: m.millisecond()
            },
            date: {
                year: m.year(),
                month: m.month() + 1,
                day: m.date()
            }
        }
    }

    private static ldtToTimestamp(wt: LocalDateTimeModel): Timestamp {
        return +moment([
            wt.date.year,
            wt.date.month - 1,
            wt.date.day,
            wt.time.hour,
            wt.time.minute,
            wt.time.second,
            wt.time.millis
        ])
    }

    onTimeFromChange(time: NgbTimeStruct): void {
        const [from, till] = this.model
        this.onModelChange([{ ...from, time: { ...time, second: 0, millis: 0 } }, till])
    }

    onTimeTillChange(time: NgbTimeStruct): void {
        const [from, till] = this.model
        this.onModelChange([from, { ...till, time: { ...time, second: 59, millis: 999 } }])
    }

    onSelectedDatesChange([dateFrom, dateTill]: NgbDateStruct[]): void {
        this.onModelChange([
            { date: dateFrom, time: { hour: 0, minute: 0, second: 0, millis: 0 } },
            { date: dateTill, time: { hour: 23, minute: 59, second: 59, millis: 999 } }
        ])
    }

    private onModelChange(model: ViewModel): void {
        this.rangeChange.emit(
            model.map(TimeFramePickerComponent.ldtToTimestamp) as DateRange)
    }
}

