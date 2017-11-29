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

import {OperationType} from "../../types";
export class Icon {
    name: string;
    code: string;
    font: string;

    constructor(name: string, code: string, font: string) {
        this.name = name;
        this.code = code;
        this.font = font;
    }

    public static getIconForNodeType(nodeType: OperationType): Icon {
        let font = "FontAwesome";

        switch (nodeType) {
            case "Write":
                return new Icon("fa-floppy-o", "\uf0c7", font);

            case "Filter":
                return new Icon("fa-filter", "\uf0b0", font);

            case "Sort":
                return new Icon("fa-sort-amount-desc", "\uf161", font);

            case "Join":
                return new Icon("fa-code-fork", "\uf126", font);

            case "Projection":
                return new Icon("fa-chevron-circle-down", "\uf13a", font);

            case "Read":
                return new Icon("fa-database", "\uf1c0", font);

            case "Alias":
                return new Icon("fa-circle-thin", "\uf1db", font);

            case "Composite":
                return new Icon("fa-cogs", "\uf085", font);

            case "Generic":
                return new Icon("fa-question-circle", "\uf059", font);
                
            default:
                return null;
        }
    }
}
