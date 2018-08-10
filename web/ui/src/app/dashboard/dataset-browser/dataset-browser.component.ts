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
import {SearchRequest} from "./dataset-browser.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ScrollEvent} from "ngx-scroll-event";
import {timer} from "rxjs/observable/timer";
import {identity} from "rxjs/util/identity";
import moment = require('moment');

@Component({
    selector: "dataset-browser",
    templateUrl: "dataset-browser.component.html",
    styleUrls: ["dataset-browser.component.less"]
})
export class DatasetBrowserComponent implements OnInit {

    descriptors: IPersistedDatasetDescriptor[]

    searchText = new FormControl()

    searchTimestamp = new FormControl()

    private searchRequest$ = new BehaviorSubject<SearchRequest>(null)

    constructor(private dsBrowserService: DatasetBrowserService) {
    }

    ngOnInit(): void {
        this.searchText.valueChanges
            .debounce(v => timer(v ? 300 : 0))
            .forEach(this.newSearch.bind(this))

        this.searchRequest$
            .distinct()
            .filter(<any>identity)
            .subscribe(sr =>
                this.dsBrowserService
                    .getLineageDescriptors(sr)
                    .then(descriptors => this.descriptors = descriptors))

        // set initial values
        this.searchText.setValue("")
        // FIXME ensure utc
        const now = moment().format('YYYY-MM-DD HH:mm')
        this.searchTimestamp.setValue(now)
    }

    newSearch(text: string) {
        this.searchRequest$.next(new SearchRequest(text))
    }

    onScroll(e: ScrollEvent) {
        if (!e.isWindowEvent && e.isReachingBottom)
            this.searchRequest$.next(
                this.searchRequest$.getValue().withOffset(this.descriptors.length))
    }

    toDateString(timestamp: number): string {
        return new Date(timestamp).toUTCString()
    }
}