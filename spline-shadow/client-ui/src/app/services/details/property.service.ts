import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PropertyType } from 'src/app/types/propertyType';

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

  public buildPropertyGraph(property: any): any {

    if (!property) return null

    let graph = {
      nodes: [],
      edges: []
    }

    //retrieves the parent node
    let node = { data: { id: property.id, name: property.name } }
    graph.nodes.push(node)

    // TODO: build graph according to the type

    return graph
  }
}
