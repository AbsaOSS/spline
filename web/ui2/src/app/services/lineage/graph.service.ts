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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OperationType } from 'src/app/types/operationTypes';


@Injectable({
  providedIn: 'root'
})

export class GraphService {

  constructor(private http: HttpClient) { }

  // TODO : Define constants to the whole app in a seperated file with a service accessor
  private mockRestApi = 'http://localhost:3000/lineage/datasourceId/timestamp';

  /**
   * Get the graph data from the API
   * TODO : Specify the return type when the API will be finished
   */
  public getGraphData(nodeFocus: string = null, depth: number = null): Observable<any> {
    // TODO : Use a Url Builder Service 
    let url = this.mockRestApi;
    if (nodeFocus && depth) {
      url = url + "/" + nodeFocus + "/" + depth;
    }
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
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
