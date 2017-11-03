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

import {Component} from "@angular/core";

declare const __APP_VERSION__: string

@Component({
    selector: "version",
    template: `
        <span class="small text-muted">Spline v{{ appVersion }}</span>
    `,
    styles: [`span {
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 2px 6px
    }`]
})
export class VersionComponent {
    appVersion: string = __APP_VERSION__
}