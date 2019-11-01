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
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { empty, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from 'src/app/model/app-state';
import * as ErrorActions from '../../store/actions/error.actions';

export const handleException = (store: Store<AppState>) => (source: Observable<any>) => {
    return source.pipe(
        catchError(err => {
            store.dispatch(new ErrorActions.ServiceErrorGet(handleError(err)))
            return empty()
        })
    )
}

function handleError(err: HttpErrorResponse): string {
    return (err.error instanceof ErrorEvent)
        ? `An error occurred: ${err.error.message}`
        : `Server returned code: ${err.status}, error message is: ${err.message}`
}