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
import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DataTypeType} from 'src/app/model/types/dataTypeType';
import {StructFieldVM} from 'src/app/model/viewModels/attributeVM';
import {DataTypeVM} from "../../../../model/viewModels/dataTypeVM";

@Component({
  selector: 'schema-table',
  templateUrl: './schema-table.component.html',
  styleUrls: ['./schema-table.component.less']
})
export class SchemaTableComponent {

  @ViewChild('table', {static: true})
  public table: any

  @Input()
  public schema: StructFieldVM[]

  @Input()
  public selectable: boolean = true

  @Input()
  public set selectedField(field: StructFieldVM) {
    this.table.selected = field ? [field] : []
    this.table.cd.markForCheck()
  }

  @Output()
  public selectedFieldChanged = new EventEmitter<StructFieldVM>()

  public getArrayInnermostElementTypeWithNestingLevel = (dt: DataTypeVM, level = 1): [DataTypeVM, number] => {
    return dt.elementDataType.dataType._type == DataTypeType.Array
      ? this.getArrayInnermostElementTypeWithNestingLevel(dt.elementDataType.dataType, level + 1)
      : [dt.elementDataType.dataType, level]
  }

  public selectCheck = (): boolean => this.selectable

  public onSelect = ({selected}): void => {
    const selectedAttribute = selected[0]
    this.selectedFieldChanged.emit(selectedAttribute)
  }

  public onStructTypeClick = (e: Event, row: any) => {
    e.stopPropagation()
    this.table.rowDetail.toggleExpandRow(row)
  }

}
