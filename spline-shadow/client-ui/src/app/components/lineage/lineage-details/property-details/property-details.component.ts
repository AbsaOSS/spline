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
import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/details/property.service';
import { PropertyType } from 'src/app/types/propertyType';

@Component({
  selector: 'property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.less']
})
export class PropertyDetailsComponent implements OnInit {

  property: any

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.propertyService.currentProperty.subscribe(property => {
      this.property = property
      console.log("received property", property)
    })
  }

  isTypeSimple(): boolean {
    return this.property && this.property.dataType._typeHint === PropertyType.Simple
  }

  getProperties(): any {
    if (!this.property) return null
    if (this.property.dataType._typeHint === PropertyType.Struct) return this.property.dataType.fields
    if (this.property.dataType._typeHint === PropertyType.Array) return this.property.dataType.elementDataType.fields
    return null
  }

  getPropertyType(propertyType: any): any {
    switch (propertyType.dataType._typeHint) {
      case PropertyType.Struct: return "{[...]}"
      case PropertyType.Array: return "[...]"
      case PropertyType.Simple: return propertyType.dataType.name
      default: return ""
    }
  }

}
