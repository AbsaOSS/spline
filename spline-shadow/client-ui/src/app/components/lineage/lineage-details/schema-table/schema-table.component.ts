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
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { PropertyType } from 'src/app/types/propertyType';
import { PropertyService } from 'src/app/services/details/property.service';

@Component({
  selector: 'schema-table',
  templateUrl: './schema-table.component.html',
  styleUrls: ['./schema-table.component.less']
})
export class SchemaTableComponent implements OnInit {

  @ViewChild('detailsLine', { read: ViewContainerRef })
  private _detailsLine: ViewContainerRef

  dtOptions: DataTables.Settings = {}

  selectedItemName: any

  expandedRows: Set<any> = new Set()

  @Input()
  schema: any

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      lengthChange: false,
      searching: false,
      info: false,
      order: [[1, 'asc']],
      preDrawCallback: function (settings: any) {
        let api = new $.fn.dataTable.Api(settings)
        let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate')
        pagination.toggle(api.page.info().pages > 1)
      }
    }
  }

  rowClick(item: any) {
    this.propertyService.changeCurrentProperty(item)
    this.selectedItemName = item.name
  }

  detailsControlClick(item: any, event: any) {
    event.stopPropagation()
    this.rowClick(item)
    let table = event.currentTarget.closest('table')
    let tr = event.currentTarget.closest('tr')
    let row = $(table).DataTable().row(tr)

    if (row.child.isShown()) {
      row.child.hide()
      this.expandedRows.delete(item)
    } else {
      this.expandRow(item, row)
      this.expandedRows.add(item)
    }

  }

  expandRow(item, row) {
    let factory = this.componentFactoryResolver.resolveComponentFactory(SchemaTableComponent)
    let cmp = this._detailsLine.createComponent(factory)
    cmp.instance.schema = this.propertyService.getChildrenProperties(item)
    row.child(cmp.location.nativeElement).show()
  }

  getPropertyType(propertyType: any): any {
    switch (propertyType.dataType._typeHint) {
      case PropertyType.Struct: return '{ ... }'
      case PropertyType.Array: return '[ ... ]'
      case PropertyType.Simple: return propertyType.dataType.name
      default: return ''
    }
  }


}
