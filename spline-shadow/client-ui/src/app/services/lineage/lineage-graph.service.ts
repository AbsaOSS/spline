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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OperationType } from 'src/app/types/operationType';
import { ExecutedLogicalPlan, Operation } from 'src/app/generated/models';
import { CytoscapeGraphVM } from 'src/app/viewModels/cytoscape/cytoscapeGraphVM';
import { ExecutedLogicalPlanVM } from 'src/app/viewModels/executedLogicalPlanVM';
import { CytoscapeOperationVM } from 'src/app/viewModels/cytoscape/cytoscapeOperationVM';
import * as _ from 'lodash';
import { ExecutionPlanControllerService } from 'src/app/generated/services';
import { StrictHttpResponse } from 'src/app/generated/strict-http-response';
import { ConfigService } from '../config/config.service';


@Injectable({
  providedIn: 'root'
})

export class LineageGraphService {

  // TODO : Define constants to the whole app in a seperated file with a service accessor
  private mockRestApiDetails = 'http://localhost:3000/details/';

  private detailsInfoSubject = new BehaviorSubject<any>(null)
  detailsInfo = this.detailsInfoSubject.asObservable()

  constructor(
    private http: HttpClient,
    private executionPlanControllerService: ExecutionPlanControllerService
  ) {
    executionPlanControllerService.rootUrl = ConfigService.settings.apiUrl
  }

  public getExecutedLogicalPlan(executionPlanId: string): Observable<ExecutedLogicalPlanVM> {
    let that = this
    return that.executionPlanControllerService.lineageUsingGETResponse(executionPlanId).pipe(
      map(response => {
        return that.convertFromExecutedLogicalPlanToFromExecutedLogicalPlanViewModel(response)
      }),
      catchError(this.handleError)
    );
  }

  private convertFromExecutedLogicalPlanToFromExecutedLogicalPlanViewModel(executedLogicalPlanHttpResponse: StrictHttpResponse<ExecutedLogicalPlan>): ExecutedLogicalPlanVM {
    const lineageGraphService = this
    const cytoscapeGraphVM = {} as CytoscapeGraphVM
    cytoscapeGraphVM.nodes = []
    cytoscapeGraphVM.edges = []
    _.each(executedLogicalPlanHttpResponse.body.plan.nodes, function (node: Operation) {
      let cytoscapeOperation = {} as CytoscapeOperationVM
      cytoscapeOperation.operationType = node.operationType
      cytoscapeOperation.id = node.id
      cytoscapeOperation.name = node.name
      cytoscapeOperation.color = lineageGraphService.getColorFromOperationType(node.name)
      cytoscapeOperation.icon = lineageGraphService.getIconFromOperationType(node.name)
      cytoscapeGraphVM.nodes.push({ data: cytoscapeOperation })
    })
    _.each(executedLogicalPlanHttpResponse.body.plan.edges, function (edge) {
      cytoscapeGraphVM.edges.push({ data: edge })
    })
    const executedLogicalPlanVM = {} as ExecutedLogicalPlanVM
    executedLogicalPlanVM.execution = executedLogicalPlanHttpResponse.body.execution
    executedLogicalPlanVM.plan = cytoscapeGraphVM
    return executedLogicalPlanVM
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

  public getIconFromOperationType(operation: string): number {
    switch (operation) {
      case OperationType.Projection: return 0xf13a
      case OperationType.BatchRead: return 0xf085
      case OperationType.LogicalRelation: return 0xf1c0
      case OperationType.StreamRead: return 0xf085
      case OperationType.Join: return 0xf126
      case OperationType.Union: return 0xf0c9
      case OperationType.Generic: return 0xf0c8
      case OperationType.Filter: return 0xf0b0
      case OperationType.Sort: return 0xf161
      case OperationType.Aggregate: return 0xf1ec
      case OperationType.WriteCommand: return 0xf0c7
      case OperationType.BatchWrite: return 0xf0c7
      case OperationType.StreamWrite: return 0xf0c7
      case OperationType.Alias: return 0xf111
      default: return 0xf15b
    }
  }

  public getColorFromOperationType(operation: string): string {
    switch (operation) {
      case OperationType.Projection: return "#337AB7"
      case OperationType.BatchRead: return "#337AB7"
      case OperationType.LogicalRelation: return "#e39255"
      case OperationType.StreamRead: return "#337AB7"
      case OperationType.Join: return "#e39255"
      case OperationType.Union: return "#337AB7"
      case OperationType.Generic: return "#337AB7"
      case OperationType.Filter: return "#F04100"
      case OperationType.Sort: return "#E0E719"
      case OperationType.Aggregate: return "#008000"
      case OperationType.BatchWrite: return "#e39255"
      case OperationType.WriteCommand: return "#e39255"
      case OperationType.StreamWrite: return "#e39255"
      case OperationType.Alias: return "#337AB7"
      default: return "#808080"
    }
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = ''
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
