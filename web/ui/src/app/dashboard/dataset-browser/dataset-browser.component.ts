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

import {Component, OnInit} from "@angular/core";
import {FormControl} from '@angular/forms';
import {DatasetBrowserService} from "./dataset-browser.service";
import {IPersistedDatasetDescriptor} from "../../../generated-ts/lineage-model";

@Component({
    selector: "dataset-browser",
    templateUrl: "dataset-browser.component.html",
    styleUrls: ["dataset-browser.component.less"]
})
export class DatasetBrowserComponent implements OnInit {

    descriptors: IPersistedDatasetDescriptor[]

    searchText = new FormControl("")

    constructor(private dsBrowserService: DatasetBrowserService) {
    }

    ngOnInit(): void {
        this.searchText.valueChanges.forEach((text:string) => {
            console.log("FIND: " + text)
            this.dsBrowserService.getLineageDescriptors(text).then(descriptors => this.descriptors = descriptors)
        })
        this.searchText.setValue("")
    }
}