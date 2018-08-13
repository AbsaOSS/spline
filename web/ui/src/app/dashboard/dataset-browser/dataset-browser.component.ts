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
import {FormControl, FormGroup} from '@angular/forms';
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

    searchValue = new FormGroup({
        text: new FormControl(),
        interval: new FormControl(),
        from: new FormControl(),
        until: new FormControl(),
    })

    private searchRequest$ = new BehaviorSubject<SearchRequest>(null)
    private static readonly TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm"

    constructor(private dsBrowserService: DatasetBrowserService) {}

    ngOnInit(): void {
        this.searchValue.valueChanges
            .debounce(v => timer(v ? 300 : 0))
            .subscribe(this.newSearch.bind(this))

        this.searchRequest$
            .distinct()
            .filter(<any>identity)
            .subscribe(sr =>
                this.dsBrowserService
                    .getLineageDescriptors(sr)
                    .then(descriptors => this.descriptors = descriptors))

        this.init()
    }

    newSearch(value:  {[key: string]: string}): void {
        if (!value.interval) {
            let asAt = DatasetBrowserComponent.parseTimestamp(value.until).valueOf()
            this.searchRequest$.next(new SearchRequest(value.text, asAt))
        } else {
            // FIXME implement interval search
        }
    }

    onScroll(e: ScrollEvent) {
        if (!e.isWindowEvent && e.isReachingBottom)
            this.searchRequest$.next(
                this.searchRequest$.getValue().withOffset(this.descriptors.length))
    }

    toDateString(timestamp: number): string {
        return new Date(timestamp).toUTCString()
    }

    clearText() {
        this.searchValue.get("text").setValue("")
    }

    private init() {
        this.searchValue.reset({
            text: "",
            // FIXME level2 ensure utc
            from: moment().format(DatasetBrowserComponent.TIMESTAMP_FORMAT),
            until: moment().format(DatasetBrowserComponent.TIMESTAMP_FORMAT),
            interval: false
        })
    }

    private static parseTimestamp(timestamp: string): moment.Moment {
        return moment(timestamp, DatasetBrowserComponent.TIMESTAMP_FORMAT)
    }
}