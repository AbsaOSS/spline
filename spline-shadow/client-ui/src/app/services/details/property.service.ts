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
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PropertyType } from 'src/app/types/propertyType';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {


  private propertySource = new BehaviorSubject<any>("")
  currentProperty = this.propertySource.asObservable()

  constructor() { }

  public changeCurrentProperty(property: any) {
    this.propertySource.next(property)
  }

  public buildPropertyGraph(property: any, parentProperty: any, graph: any): any {

    if (!property) return null

    if (graph == null) {
      graph = {
        nodes: [],
        edges: []
      }
    }
    if (property.name) {
      let node = { data: { id: property.name, name: property.name + " : " + this.getPropertyType(property), icon: "f111", color: this.getPropertyColor(property) } }
      graph.nodes.push(node)

      if (parentProperty != null) {
        let edge = { data: { source: parentProperty.name, target: property.name, id: property.name + parentProperty.name } }
        graph.edges.push(edge)
      }
    }
    let childrenProperties = this.getChildrenProperties(property)
    _.each(childrenProperties, item => this.buildPropertyGraph(item, property, graph))

    return graph
  }

  public getPropertyColor(property: any): any {
    switch (property.dataType._typeHint) {
      case PropertyType.Struct:
      case PropertyType.Array: return '#e39255'
      default: return '#337AB7'
    }
  }

  public getPropertyType(property: any): any {
    switch (property.dataType._typeHint) {
      case PropertyType.Struct: return '{ ... }'
      case PropertyType.Array:
        if (property.dataType.elementDataType.fields) {
          return '[{ ... }]'
        }
        return '[' + property.dataType.elementDataType.dataType.name + ']'
      case PropertyType.Simple: return property.dataType.name
      default: return ''
    }
  }


  public getChildrenProperties(property: any): any {
    switch (property.dataType._typeHint) {
      case PropertyType.Array:
        return property.dataType.elementDataType.fields ? property.dataType.elementDataType.fields : { 0: property.dataType.elementDataType }
      case PropertyType.Struct:
        return property.dataType.fields
      default:
        return null
    }
  }
}
