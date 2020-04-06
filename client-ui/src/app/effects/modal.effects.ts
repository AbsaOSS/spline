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

import { Injectable, TemplateRef } from '@angular/core'
import { ofType, Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import * as ModalAction from '../store/actions/modal.actions'


@Injectable()
export class ModalEffects {

    @Effect()
    openModal$: Observable<Action> = this.actions$.pipe(
      ofType(ModalAction.ModalActionTypes.MODAL_OPEN),
      map((action: { content: string | TemplateRef<any> | any; config?: ModalOptions }) => {
        this.modalService.show(action.content, action.config)
        return new ModalAction.OpenSuccess()
      })
    )

    @Effect()
    closeModal$: Observable<Action> = this.actions$.pipe(
      ofType(ModalAction.ModalActionTypes.MODAL_CLOSE),
      map(_ => {
        this.modalService.hide(1)
        return new ModalAction.CloseSuccess()
      })
    )

    constructor(
        private actions$: Actions,
        private modalService: BsModalService,
    ) { }
}
