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

import * as _ from 'lodash'
import {Injectable} from '@angular/core';
import {Effect} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {AttributeGraph} from '../generated/models';
import {LineageService} from '../generated/services';
import {AppState} from '../model/app-state';
import {handleException} from '../rxjs/operators/handleException';
import * as AttributeLineageGraphActions from '../store/actions/attribute-lineage-graph.actions';

@Injectable()
export class AttributeLineageGraphEffects {

  constructor(
    private lineageService: LineageService,
    private store: Store<AppState>) {
  }

  @Effect()
  public getAttributeLineageGraph$: Observable<Action> =

    this.store.select('executedLogicalPlan').pipe(
      filter(_.identity),
      switchMap(({executionPlan}) =>
        this.store.select('router', 'state', 'queryParams', 'attribute').pipe(map(attrId => [executionPlan._id, attrId]))
      ),
      switchMap(([execPlanId, attrId]) => attrId
        ? this.getAttributeLineageGraph(execPlanId, attrId)
        : of(undefined)),
      map(graph =>
        new AttributeLineageGraphActions.Set(graph))
    )

  private getAttributeLineageGraph = (execId: string, attributeId: string): Observable<AttributeGraph> => {
    return this.lineageService.attributeDependenciesUsingGET({execId, attributeId}).pipe(
      handleException(this.store)
    )
  }
}
