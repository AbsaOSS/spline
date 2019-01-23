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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OperationType } from 'src/app/types/operationTypes';


@Injectable({
  providedIn: 'root'
})

export class GraphService {

  graph = {
    nodes: [
      { data: { id: 'op-uuid-1', name: 'op-uuid-1', } },
      { data: { id: 'op-uuid-2', name: 'op-uuid-2', operationType: 'Alias' } },
      { data: { id: 'op-uuid-3', name: 'op-uuid-3', operationType: 'Projection' } },
      { data: { id: 'op-uuid-5', name: 'op-uuid-5', operationType: 'Projection' } },
      { data: { id: 'op-uuid-7', name: 'op-uuid-7', operationType: 'Projection' } },
      { data: { id: 'op-uuid-8', name: 'op-uuid-8', operationType: 'Projection' } },
      { data: { id: 'op-uuid-9', name: 'op-uuid-9', operationType: 'Join' } },
      { data: { id: 'op-uuid-10', name: 'op-uuid-10', operationType: 'Projection' } },
      { data: { id: 'op-uuid-12', name: 'op-uuid-12', operationType: 'Join' } },
      { data: { id: 'op-uuid-14', name: 'op-uuid-14', operationType: 'Projection' } },
      { data: { id: 'op-uuid-15', name: 'op-uuid-15', operationType: 'Projection' } },
      { data: { id: 'op-uuid-17', name: 'op-uuid-17', operationType: 'Join' } },
      { data: { id: 'op-uuid-21', name: 'op-uuid-21', nativeRoot: 'true' } },
      { data: { id: 'op-uuid-23', name: 'op-uuid-23', operationType: 'Projection' } },
      { data: { id: 'op-uuid-24', name: 'op-uuid-24', operationType: 'Projection' } },
      { data: { id: 'op-uuid-26', name: 'op-uuid-26', nativeRoot: 'true' } },
      { data: { id: 'op-uuid-28', name: 'op-uuid-28', operationType: 'Projection' } },
      { data: { id: 'op-uuid-30', name: 'op-uuid-30', nativeRoot: 'true' } },
      { data: { id: 'op-uuid-32', name: 'op-uuid-32', operationType: 'Aggregate' } },
      { data: { id: 'op-uuid-18', name: 'op-uuid-18', operationType: 'Projection' } },
      { data: { id: '57767d87-909b-49dd-9800-e7dc59e95340', name: '57767d87-909b-49dd-9800-e7dc59e95340', operationType: 'Filter' } },
      { data: { id: 'c0ec33fd-aaaa-41f6-8aa2-e610e899fb75', name: 'c0ec33fd-aaaa-41f6-8aa2-e610e899fb75', operationType: 'Sort' } }
    ],
    edges: [
      { data: { source: 'op-uuid-2', target: 'op-uuid-1' } },
      { data: { source: 'op-uuid-3', target: 'op-uuid-2' } },
      { data: { source: 'op-uuid-5', target: 'op-uuid-3' } },
      { data: { source: 'op-uuid-7', target: 'op-uuid-5' } },
      { data: { source: 'op-uuid-32', target: 'op-uuid-5' } },
      { data: { source: 'op-uuid-8', target: 'op-uuid-7' } },
      { data: { source: 'op-uuid-9', target: 'op-uuid-8' } },
      { data: { source: 'op-uuid-9', target: 'op-uuid-18' } },
      { data: { source: 'op-uuid-10', target: 'op-uuid-9' } },
      { data: { source: 'op-uuid-12', target: 'op-uuid-10' } },
      { data: { source: 'op-uuid-14', target: 'op-uuid-12' } },
      { data: { source: 'op-uuid-28', target: 'op-uuid-12' } },
      { data: { source: 'op-uuid-15', target: 'op-uuid-14' } },
      { data: { source: 'op-uuid-17', target: 'op-uuid-15' } },
      { data: { source: 'op-uuid-21', target: 'op-uuid-17' } },
      { data: { source: 'op-uuid-23', target: 'op-uuid-17' } },
      { data: { source: 'op-uuid-24', target: 'op-uuid-23' } },
      { data: { source: 'op-uuid-26', target: 'op-uuid-24' } },
      { data: { source: 'op-uuid-30', target: 'op-uuid-28' } },
      { data: { source: 'c0ec33fd-aaaa-41f6-8aa2-e610e899fb75', target: 'op-uuid-32' } },
      { data: { source: 'op-uuid-18', target: '57767d87-909b-49dd-9800-e7dc59e95340' } },
      { data: { source: '57767d87-909b-49dd-9800-e7dc59e95340', target: 'c0ec33fd-aaaa-41f6-8aa2-e610e899fb75' } }
    ]
  }

  // TODO : Define constants to the whole app in a seperated file with a service accessor
  private mockRestApiGraph = 'http://localhost:3000/lineage/datasourceId/timestamp';

  // TODO : Define constants to the whole app in a seperated file with a service accessor
  private mockRestApiDetails = 'http://localhost:3000/details/';

  private detailsInfoSubject = new BehaviorSubject<any>(null)
  detailsInfo = this.detailsInfoSubject.asObservable()

  constructor(private http: HttpClient) { }

  /**
   * Get the graph data from the API
   * TODO : Specify the return type when the API will be finished
   */
  public getGraphData(nodeFocus: string = null, depth: number = null): Observable<any> {
    // TODO : Use a Url Builder Service 
    // let url = this.mockRestApiGraph;
    // if (nodeFocus && depth) {
    //   url = url + "/" + nodeFocus + "/" + depth;
    // }
    // return this.http.get(url).pipe(
    //   catchError(this.handleError)
    // );
    // TODO : This code is just for testing the integration with menas. It should be replace by a normal call to the api
    let that = this;
    let observable = Observable.create(observer => {
      setTimeout(() => {
        observer.next(that.graph); // This method same as resolve() method from Angular 1
        observer.complete();//to show we are done with our processing
        // observer.error(new Error("error message"));
      }, 1000);

    })

    return observable
  }

  /**
   * Get the details of a node and push it to the behavior subject
   */
  public getDetailsInfo(nodeId: string) {
    // TODO : Use a Url Builder Service
    let url = this.mockRestApiDetails + nodeId
    this.http.get(url).pipe(
      catchError(this.handleError)
    ).subscribe(res => {
      this.detailsInfoSubject.next(res)
    });
  }

  public getIconFromOperationType(operation: OperationType): string {
    switch (operation) {
      case OperationType.Projection: return "f13a"
      case OperationType.BatchRead: return "f085"
      case OperationType.StreamRead: return "f085"
      case OperationType.Join: return "f126"
      case OperationType.Union: return "f0c9"
      case OperationType.Generic: return "f0c8"
      case OperationType.Filter: return "f0b0"
      case OperationType.Sort: return "f161"
      case OperationType.Aggregate: return "f0e8"
      case OperationType.BatchWrite: return "f085"
      case OperationType.StreamWrite: return "f085"
      case OperationType.Alias: return "f111"
      default: return "f15b"
    }
  }

  public getColorFromOperationType(operation: OperationType): string {
    switch (operation) {
      case OperationType.Projection: return "#337AB7"
      case OperationType.BatchRead: return "#337AB7"
      case OperationType.StreamRead: return "#337AB7"
      case OperationType.Join: return "#FFA500"
      case OperationType.Union: return "#337AB7"
      case OperationType.Generic: return "#337AB7"
      case OperationType.Filter: return "#F04100"
      case OperationType.Sort: return "#E0E719"
      case OperationType.Aggregate: return "#008000"
      case OperationType.BatchWrite: return "#337AB7"
      case OperationType.StreamWrite: return "#337AB7"
      case OperationType.Alias: return "#337AB7"
      default: return "#808080"
    }
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }
    return throwError(errorMessage)
  }

}
