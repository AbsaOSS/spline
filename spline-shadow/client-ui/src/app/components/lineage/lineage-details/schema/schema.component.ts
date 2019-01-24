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
import { Component, OnInit, Input } from '@angular/core';
import { SchemaType } from 'src/app/types/schemaType';
import { PropertyType } from 'src/app/types/propertyType';;
import * as $ from 'jquery';

@Component({
  selector: 'schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.less']
})
export class SchemaComponent implements OnInit {

  @Input()
  schemaId: string

  @Input()
  schemaType: SchemaType

  @Input()
  schema: any

  constructor() { }

  ngOnInit() {
    console.log(this.schema)
  }

  getSchemaTypeLabel(): any {
    switch (this.schemaType) {
      case SchemaType.Input: return "<i class='fa fa-arrow-circle-right text-success'></i> Input"
      case SchemaType.Output: return "<i class='fa fa-arrow-circle-left text-danger'></i> Output"
      default: return "<i class='fa fa-arrow-circle-right'></i> Schema"
    }
  }


  getPropertyType(propertyType: any): any {
    switch (propertyType.dataType._typeHint) {
      case PropertyType.Struct: return "{[...]}"
      case PropertyType.Array: return "[...]"
      case PropertyType.Simple: return propertyType.dataType.name
      default: return ""
    }
  }

  getPropertyDetails(property: any, event: any) {
    console.log(property)
    $("tr").removeClass("selected")
    $(event.currentTarget).addClass('selected')
  }
}
