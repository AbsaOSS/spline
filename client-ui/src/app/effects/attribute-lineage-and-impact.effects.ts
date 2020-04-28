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

import * as _ from "lodash";
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {AttributeLineageAndImpact} from '../generated/models';
import {LineageService} from '../generated/services';
import {AppState} from '../model/app-state';
import {handleException} from '../rxjs/operators/handleException';
import * as AttributeLineageAndImpactActions from '../store/actions/attribute-lineage-and-impact.actions';
import {ROUTER_NAVIGATED} from "@ngrx/router-store";

@Injectable()
export class AttributeLineageAndImpactEffects {

  constructor(
    private lineageService: LineageService,
    private store: Store<AppState>,
    private actions$: Actions) {
  }

  @Effect()
  public getAttributeLineageAndImpact$: Observable<Action> =
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map(({payload: {routerState: {params: {uid: execPlanId}, queryParams: {attribute: attrId}}}}) => [execPlanId, attrId]),
      distinctUntilChanged(_.isEqual),
      switchMap(([execPlanId, attrId]) => attrId
        ? this.getAttributeLineageAndImpact(execPlanId, attrId)
        : of(undefined)),
      map(linAndImp =>
        new AttributeLineageAndImpactActions.Set(linAndImp))
    )

  private getAttributeLineageAndImpact = (execId: string, attributeId: string): Observable<AttributeLineageAndImpact> => {
    return this.lineageService.attributeLineageAndImpactUsingGET({execId, attributeId}).pipe(
      handleException(this.store)
    )
  }
}
