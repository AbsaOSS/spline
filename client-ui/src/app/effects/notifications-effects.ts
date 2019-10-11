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
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as ErrorAction from '../store/actions/error.actions';
import { AppState } from '../model/app-state';

@Injectable()
export class NotificationsEffects {

    constructor(
        private actions$: Actions,
        private toastrService: ToastrService,
        private store: Store<AppState>
    ) { }


    @Effect({ dispatch: false })
    public sendNotification$: Observable<Action> = this.actions$.pipe(
        ofType(ErrorAction.ErrorActionTypes.SERVICE_ERROR_GET),
        tap((action: any) => {
            this.toastrService.error(action.payload, 'ERROR', { progressBar: true, positionClass: "toast-bottom-full-width" })
            this.store.dispatch(new ErrorAction.ServiceErrorReset())
        })
    )
}