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
import { AfterViewInit, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { AppState } from 'src/app/model/app-state';
import { AttributeType } from 'src/app/model/types/attributeType';
import { AttributeVM } from 'src/app/model/viewModels/attributeVM';
import * as AttributesAction from 'src/app/store/actions/attributes.actions';
import * as RouterAction from 'src/app/store/actions/router.actions';
import * as attributeReducer from 'src/app/store/reducers/attribute.reducer';

@Component({
  selector: 'schema-table',
  templateUrl: './schema-table.component.html'
})
export class SchemaTableComponent implements AfterViewInit {

  @ViewChild('table', { static: true })
  table: any

  @Input()
  schema: AttributeVM[]

  @Input()
  schemaId: string

  tablePageSize: number = 5

  constructor(
    private store: Store<AppState>
  ) { }

  public ngAfterViewInit(): void {
    this.store
      .select('router', 'state', 'queryParams')
      .subscribe((queryParams: any) => {
        if (queryParams) {
          const paramsSubscriber = this
          const schemaIdParam = queryParams.schemaId
          const tablesWithSelection = schemaIdParam ? schemaIdParam.split(".") : []
          if (paramsSubscriber.table.rows && paramsSubscriber.schemaId.includes(tablesWithSelection[0])) {
            for (let i = 0; i < tablesWithSelection.length + 1; i++) {
              //The attribute ID can be nested to several data structures, the last one is the selected attribute itself
              const attributeIdParam = (i < tablesWithSelection.length) ? tablesWithSelection[i + 1] : queryParams.attribute
              const selectedRow = paramsSubscriber.getSelectedRowFromName(attributeIdParam)
              const selectedRowIndex = selectedRow[0]
              const selectedRowContent = selectedRow[1]

              if (selectedRowIndex > -1) {
                this.store.dispatch(new AttributesAction.Get(selectedRowContent))
                paramsSubscriber.table.selected.push(selectedRowContent)
                const page = Math.floor(selectedRowIndex / paramsSubscriber.tablePageSize)
                paramsSubscriber.table.offset = page
                // TODO : Remove the setTimeout as soon as this issue is fixed :https://github.com/swimlane/ngx-datatable/issues/1204
                setTimeout(function () {
                  if (selectedRowContent.dataType._type != AttributeType.Simple) {
                    paramsSubscriber.table.rowDetail.toggleExpandRow(selectedRowContent)
                  }
                })
              }
            }
          }
        }
      })
  }

  /**
   * Gets selected row from name
   * @param name the name of the attribute
   * @returns a tuple containing the AttributeVM of the row and its index in case the table is pageable
   */
  private getSelectedRowFromName = (name: string): [number, AttributeVM] => {
    const index = _.findIndex(this.table.rows, { name: name })
    return [index, this.table.rows[index]]
  }


  public getChildSchemaId = (parentSchemaId: string, rowName: string): string => {
    return parentSchemaId + "." + rowName
  }

  public onSelect = ({ selected }): void => {
    const selectedAttribute = selected[0]
    this.store.dispatch(new RouterAction.MergeParams({ schemaId: this.schemaId, attribute: selectedAttribute.name }))
    this.store.dispatch(new AttributesAction.Get(selectedAttribute))
    if (selectedAttribute.dataType._type != AttributeType.Simple) {
      this.table.rowDetail.toggleExpandRow(selectedAttribute)
    }
  }

  public getAttributeType = (AttributeType: AttributeVM): string => {
    return attributeReducer.getAttributeType(AttributeType)
  }

}
