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

import { Location } from '@angular/common'
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ofType, Actions, Effect } from '@ngrx/effects'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import * as RouterAction from 'src/app/store/actions/router.actions'

import { RouterStateUrl } from '../model/routerStateUrl'


@Injectable()
export class RouterEffects {

    @Effect({ dispatch: false })
    go$: Observable<RouterAction.Go> = this.actions$.pipe(
      ofType(RouterAction.RouterActionTypes.GO),
      tap((action: RouterAction.Go) => {
        const params: RouterStateUrl = action.payload
        const command = params.url !== null ? [params.url] : []
        const queryParamsHandling = params.url !== null ? '' : 'merge'

        const url = this.router.createUrlTree(command, {
          relativeTo: this.activatedRoute,
          queryParams: params.queryParams,
          queryParamsHandling: queryParamsHandling
        }).toString()
        this.router.navigateByUrl(url)
      })
    )

    @Effect({ dispatch: false })
    replaceUrlState$: Observable<RouterAction.ReplaceUrlState> = this.actions$.pipe(
      ofType(RouterAction.RouterActionTypes.REPLACE_URL_STATE),
      tap((action: RouterAction.ReplaceUrlState) => {
        const url = this.router.createUrlTree([], {
          relativeTo: this.activatedRoute,
          queryParams: action.payload,
          queryParamsHandling: 'merge'
        }).toString()
        this.location.replaceState(url)
      })
    )

    constructor(
    private actions$: Actions,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
    ) { }
}
