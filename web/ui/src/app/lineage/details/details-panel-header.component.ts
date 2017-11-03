/*
 * Copyright 2017 Barclays Africa Group Limited
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

import {Component, Input} from "@angular/core";

@Component({
    selector: 'details-panel-header',
    template: `
        <i class="fa fa-2x"
           [ngClass]="faIcon"
           [ngStyle]="{color: iconColor}"></i>
        <b>{{caption}}</b>
    `,
    styles: [`
        :host {
            display: block;
            height: 48px;
        }
        i {
            position: absolute; 
            top: 11px; 
            left: 12px; 
            text-shadow: 1px 1px white;
        }
        b {
            text-align: center; 
            display: block; 
            padding-top: 15px;
        }
    `]
})
export class DetailsPanelHeaderComponent {
    @Input() caption: string
    @Input() faIcon: string
    @Input() iconColor: string
}