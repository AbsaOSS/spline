/*
 * Copyright 2017 ABSA Group Limited
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
import { Component, Input, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { PropertyService } from 'src/app/services/details/property.service';
import { RouterService } from 'src/app/services/router/router.service';
import * as _ from 'lodash';


@Component({
  selector: 'schema-table',
  templateUrl: './schema-table.component.html',
  styleUrls: ['./schema-table.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SchemaTableComponent implements AfterViewInit {

  @ViewChild('table')
  table: any

  expanded: any = {}

  @Input()
  schema: any

  @Input()
  schemaId: string

  tablePageSize: number = 5

  constructor(
    private propertyService: PropertyService,
    private routerService: RouterService
  ) { }

  ngAfterViewInit(): void {
    const self = this
    this.routerService.getParams().subscribe(config => {
      const that = this
      const schemaIdParam = config.get("schemaId")
      const tablesWithSelection = schemaIdParam ? schemaIdParam.split(".") : []
      if (that.table.rows && that.schemaId.includes(tablesWithSelection[0])) {
        for (let i = 0; i < tablesWithSelection.length + 1; i++) {
          //The property ID can be nested to several data structures, the last one is the selected property itself
          let propertyIdParam = (i < tablesWithSelection.length) ? tablesWithSelection[i + 1] : config.get("property")
          let selectedRow = that.getSelectedRowFromName(propertyIdParam)
          if (selectedRow) {
            that.propertyService.changeCurrentProperty(selectedRow[1])
            that.table.selected.push(selectedRow[1])
            let page = Math.floor(selectedRow[0] / that.tablePageSize)
            that.table.offset = page
            // TODO : Remove the setTimeout as soon as this issue is fixed :https://github.com/swimlane/ngx-datatable/issues/1204
            setTimeout(function () {
              if (selectedRow[1].dataType._typeHint != 'za.co.absa.spline.core.model.dt.Simple') {
                that.table.rowDetail.toggleExpandRow(selectedRow[1])
              }
            })
          }
        }
      }
    })
  }

  /**
   * Gets selected row from name
   * @param name the name of the property
   * @returns a tuple containing the row itself and it's index in case the table is pageable
   */
  getSelectedRowFromName(name) {
    let selectedRow = null
    _.each(this.table.rows, function (row, index) {
      if (row.name === name) {
        selectedRow = [index, row]
        return
      }
    })
    return selectedRow
  }


  getChildSchemaId(parentSchemaId, rowName) {
    return parentSchemaId + "." + rowName
  }

  onSelect({ selected }) {
    const selectedProperty = selected[0]
    this.routerService.mergeParam({ schemaId: this.schemaId, property: selectedProperty.name })
    this.propertyService.changeCurrentProperty(selectedProperty)
    if (selectedProperty.dataType._typeHint != 'za.co.absa.spline.core.model.dt.Simple') {
      this.table.rowDetail.toggleExpandRow(selectedProperty)
    }
  }

  getPropertyType(propertyType: any): any {
    return this.propertyService.getPropertyType(propertyType)
  }


}
