import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
