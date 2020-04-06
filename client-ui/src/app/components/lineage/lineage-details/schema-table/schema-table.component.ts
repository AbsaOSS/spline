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
import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core'
import { DataTypeType } from 'src/app/model/types/dataTypeType'
import { StructFieldVM } from 'src/app/model/viewModels/attributeVM'

import { DataTypeVM } from '../../../../model/viewModels/dataTypeVM'


@Component({
  selector: 'schema-table',
  templateUrl: './schema-table.component.html',
  styleUrls: ['./schema-table.component.scss']
})
export class SchemaTableComponent implements OnChanges {

  @ViewChild('table', { static: true })
  table: any

  @Input()
  schema: StructFieldVM[]

  @Input()
  selectable = true

  @Input()
  selectedField: StructFieldVM
  @Output()
  selectedFieldChanged = new EventEmitter<StructFieldVM>()

  ngOnChanges(): void {
    this.table.selected = this.selectedField ? [this.selectedField] : []
    this.table.cd.markForCheck()
  }

  getArrayInnermostElementTypeWithNestingLevel = (dt: DataTypeVM, level = 1): [DataTypeVM, number] => {
    return dt.elementDataType.dataType._type === DataTypeType.Array
      ? this.getArrayInnermostElementTypeWithNestingLevel(dt.elementDataType.dataType, level + 1)
      : [dt.elementDataType.dataType, level]
  }

  selectCheck = (): boolean => this.selectable

  onSelect = ({ selected }): void => {
    this.selectedFieldChanged.emit(selected[0])
  }

  onStructTypeClick = (e: Event, row: any) => {
    e.stopPropagation()
    this.table.rowDetail.toggleExpandRow(row)
  }

}
