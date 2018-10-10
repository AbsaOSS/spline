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

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, flatMap} from "rxjs/operators";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {RetryPopupDialogComponent} from "./retry-popup-dialog.component";

@Injectable()
export class XHRTimeoutInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const self = this
        return next
            .handle(req)
            .pipe(catchError((res: HttpErrorResponse) => {
                if (res.status == 598) {
                    const dialogConfig = new MatDialogConfig()
                    dialogConfig.disableClose = true
                    return self.dialog
                        .open(RetryPopupDialogComponent, dialogConfig)
                        .afterClosed()
                        .pipe(flatMap(result =>
                            result
                                ? next.handle(req.clone({setHeaders: {"X-SPLINE-TIMEOUT": "-1"}}))
                                : throwError(res)))
                } else {
                    return throwError(res)
                }
            }))
    }
}