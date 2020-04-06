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

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core'
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnChanges {

  @Input()
  model: NgbTimeStruct

  @Output()
  modelChange = new EventEmitter<NgbTimeStruct>()

  valid: boolean

  ngOnChanges(): void {
    this.valid = true
  }

  onModelChange(updatedModel: NgbTimeStruct): void {
    this.valid = !!updatedModel
    if (this.valid) {
      this.modelChange.emit(updatedModel)
    }
  }
}
