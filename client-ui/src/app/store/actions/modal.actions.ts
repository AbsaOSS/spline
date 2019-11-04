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

import { Action } from '@ngrx/store';
import { TemplateRef } from '@angular/core';
import { ModalOptions } from 'ngx-bootstrap/modal';

export enum ModalActionTypes {
    MODAL_OPEN = '[MODAL] OPEN',
    MODAL_OPEN_SUCCESS = '[MODAL] OPEN SUCCESS',
    MODAL_CLOSE = '[MODAL] CLOSE',
    MODAL_CLOSE_SUCCESS = '[MODAL] CLOSE SUCESS',
}

export class Open implements Action {
    public readonly type = ModalActionTypes.MODAL_OPEN
    constructor(public content: string | TemplateRef<any> | any, public config?: ModalOptions) { }
}

export class OpenSuccess implements Action {
    public readonly type = ModalActionTypes.MODAL_OPEN_SUCCESS
}

export class Close implements Action {
    public readonly type = ModalActionTypes.MODAL_CLOSE
}

export class CloseSuccess implements Action {
    public readonly type = ModalActionTypes.MODAL_CLOSE_SUCCESS
}

export type ModalActions
    = Open
    | OpenSuccess
    | Close
    | CloseSuccess
