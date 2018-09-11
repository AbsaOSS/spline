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
import {getProcessingIconCode, ProcessingType} from "./operation-icon.utils";

@Component({
    selector: "processing-type-icon",
    template: "<i class='fa'>{{faIconCode}}</i>",
    styles: ["i { color: steelblue; }"]
})
export class ProcessingTypeIconComponent {
    faIconCode: string

    @Input() set processingType(pt: ProcessingType) {
        if (pt) {
            this.faIconCode = getProcessingIconCode(pt)
        }
    }

}
