import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PropertyType } from 'src/app/types/propertyType';
import * as _ from 'lodash';
import { enableDebugTools } from '@angular/platform-browser';

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
    let node = { data: { id: property.name, name: property.name + " : " + this.getPropertyType(property), icon: "f111", color: this.getPropertyColor(property) } }
    graph.nodes.push(node)

    if (parentProperty != null) {
      let edge = { data: { source: parentProperty.name, target: property.name, id: property.name + parentProperty.name } }
      graph.edges.push(edge)
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
      case PropertyType.Array: return '[ ... ]'
      case PropertyType.Simple: return property.dataType.name
      default: return ''
    }
  }


  public getChildrenProperties(property: any): any {
    switch (property.dataType._typeHint) {
      case PropertyType.Array:
        return property.dataType.elementDataType.fields
      case PropertyType.Struct:
        return property.dataType.fields
      default:
        return null
    }
  }
}
