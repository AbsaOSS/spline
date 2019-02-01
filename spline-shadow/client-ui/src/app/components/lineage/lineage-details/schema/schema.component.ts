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
import { PropertyService } from 'src/app/services/details/property.service';

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

  property: any

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.propertyService.currentProperty.subscribe(property => this.property = property)
  }

  getSchemaTypeLabel(): any {
    switch (this.schemaType) {
      case SchemaType.Input: return "&nbsp;<i class='fa fa-lg fa-arrow-circle-right text-success'></i> Input"
      case SchemaType.Output: return "&nbsp;<i class='fa fa-lg fa-arrow-circle-left text-danger'></i> Output"
      default: return "&nbsp;<i class='fa fa-arrow-circle-right'></i> Schema"
    }
  }

}
