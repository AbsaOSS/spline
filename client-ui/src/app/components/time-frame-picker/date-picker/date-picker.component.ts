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

import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import * as _ from "lodash";

const MODEL_UPDATE_DELAY_ON_TYPING = 500 //millis

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnChanges {

  @Input() public model: NgbDateStruct
  @Input() public minDate: NgbDateStruct
  @Input() public maxDate: NgbDateStruct

  @Output() public modelChange = new EventEmitter<NgbDateStruct>()

  constructor(private calendar: NgbCalendar) {
  }

  public valid: boolean

  public ngOnChanges(): void {
    this.valid = true
  }

  public readonly onModelChange: (_: NgbDateStruct) => void = _.debounce(
    (updatedModel: NgbDateStruct) => {
      this.valid = _.isObject(updatedModel)
      if (this.valid)
        this.modelChange.emit(updatedModel)
    },
    MODEL_UPDATE_DELAY_ON_TYPING)

  public onTodayClick(): void {
    this.modelChange.emit(this.calendar.getToday())
  }
}
