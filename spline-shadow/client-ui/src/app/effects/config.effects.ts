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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, EffectNotification, ofType, OnRunEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { exhaustMap, map, switchMap, takeUntil } from 'rxjs/operators';
import * as ConfigAction from '../store/actions/config.actions';


export type Action = ConfigAction.ConfigActions

@Injectable()
export class ConfigEffects implements OnRunEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) { }

    @Effect()
    public getConfig$: Observable<Action> = this.actions$.pipe(
        ofType(ConfigAction.ConfigActionTypes.CONFIG_GET),
        switchMap((action: any) => this.load(action.payload)),
        map(res => new ConfigAction.GetSuccess(res))
    )

    public ngrxOnRunEffects = (resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> => {
        return this.actions$.pipe(
            ofType(ConfigAction.ConfigActionTypes.START_APP_INITIALIZER),
            exhaustMap(() =>
                resolvedEffects$.pipe(
                    takeUntil(this.actions$.pipe(
                        ofType(ConfigAction.ConfigActionTypes.FINISH_APP_INITIALIZER))
                    )
                )
            )
        )
    }

    private load = (environment: any): Observable<any> => {
        if (window["SplineConfiguration"]) {
            return of(window["SplineConfiguration"])
        }
        const jsonFile = `${environment.configFile}`
        return this.http.get(jsonFile)
    }
}