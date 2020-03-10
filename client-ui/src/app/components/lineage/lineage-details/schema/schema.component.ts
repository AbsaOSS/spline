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

import * as _ from 'lodash';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SchemaType} from 'src/app/model/types/schemaType';
import {AttributeVM, StructFieldVM} from "../../../../model/viewModels/attributeVM";

@Component({
  selector: 'schema',
  templateUrl: './schema.component.html'
})
export class SchemaComponent {

  @Input()
  public schemaType: SchemaType

  @Input()
  public set schema(schema: AttributeVM[]) {
    this._schema = schema
    this.attrById = _.keyBy(schema, attr => attr.id)
  }

  public get schema(): AttributeVM[] {
    return this._schema
  }

  private _schema: AttributeVM[]
  private attrById: { [key: string]: AttributeVM } = {}

  @Input()
  public selectedAttributeId: string

  @Output()
  public selectedAttributeIdChanged = new EventEmitter<string>()

  public selectedAttribute(): AttributeVM {
    return this.attrById[this.selectedAttributeId]
  }

  public onAttributeSelected(attr: StructFieldVM) {
    this.selectedAttributeIdChanged.emit((attr as AttributeVM).id)
  }
}
