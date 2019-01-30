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

@Component({
  selector: 'schema-table',
  templateUrl: './schema-table.component.html',
  styleUrls: ['./schema-table.component.less']
})
export class SchemaTableComponent implements OnInit {

  @ViewChild('detailsLine', { read: ViewContainerRef })
  private _detailsLine: ViewContainerRef;

  dtOptions: DataTables.Settings = {};

  detailRows = [];

  @Input()
  schema: any

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      lengthChange: false,
      searching: false,
      info: false,
      order: [[1, 'asc']],
      createdRow: function (nRow, aData, iDataIndex) {
        $(nRow).attr('id', aData[1]);
      },
      preDrawCallback: function (settings: any) {
        var api = new $.fn.dataTable.Api(settings)
        var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate')
        pagination.toggle(api.page.info().pages > 1)
      },
      drawCallback: function (settings: any) {
        $('.dataTables_paginate > .pagination').addClass('pagination-sm')
      },


    };
  }

  detailsControlClick(item: any, event: any) {
    let button = $(event.currentTarget)
    let table = event.currentTarget.closest('table')
    let tr = event.currentTarget.closest('tr')
    let row = $(table).DataTable().row(tr)
    var idx = $.inArray(tr.id, this.detailRows)
    button.removeClass('btn-warning').addClass('btn-secondary')
    button.find('i').removeClass('fa-minus').addClass('fa-plus')

    if (row.child.isShown()) {
      $(tr).removeClass('details')
      row.child.hide()
      this.detailRows.splice(idx, 1)
    }
    else {
      let factory = this.componentFactoryResolver.resolveComponentFactory(SchemaTableComponent);
      let cmp = this._detailsLine.createComponent(factory);

      if (item.dataType._typeHint === PropertyType.Struct) {
        cmp.instance.schema = item.dataType.fields;
      }

      if (item.dataType._typeHint === PropertyType.Array) {
        cmp.instance.schema = item.dataType.elementDataType.fields;
      }
      row.child(cmp.location.nativeElement).show()

      button.removeClass('btn-secondary').addClass('btn-warning')
      button.find('i').removeClass('fa-plus').addClass('fa-minus')
      $(tr).addClass('details')

      if (idx === -1) {
        this.detailRows.push(tr.id)
      }
    }

  }

  getPropertyType(propertyType: any): any {
    switch (propertyType.dataType._typeHint) {
      case PropertyType.Struct: return '{[ ... ]}'
      case PropertyType.Array: return '[ ... ]'
      case PropertyType.Simple: return propertyType.dataType.name
      default: return ''
    }
  }


}
