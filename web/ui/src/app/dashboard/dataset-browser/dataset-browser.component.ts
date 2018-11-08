/*
 * Copyright 2017 ABSA Group Limited
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
import {IntervalRequest, PageRequest, SearchRequest} from "./dataset-browser.model";
import {BehaviorSubject, identity, timer} from "rxjs";
import {ScrollEvent} from "ngx-scroll-event";
import {debounce, distinct, filter} from "rxjs/operators";
import moment = require('moment');
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: "dataset-browser",
    templateUrl: "dataset-browser.component.html",
    styleUrls: ["dataset-browser.component.less"]
})
export class DatasetBrowserComponent implements OnInit {

    descriptors: IPersistedDatasetDescriptor[]

    set selectedIndex(selectedIndex: number) {
        this.searchValue.get('interval').setValue(selectedIndex == 1)
    }

    get selectedIndex(): number {
        if (this.searchValue.get('interval').value) {
            return 1
        } else {
            return 0
        }
    }

    searchValue = new FormGroup({
        text: new FormControl(),
        interval: new FormControl(),
        from: new FormControl(),
        until: new FormControl(),
    })

    private searchRequest$ = new BehaviorSubject<SearchRequest>(null)
    private static readonly TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm"

    constructor(
        private dsBrowserService: DatasetBrowserService,
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.searchValue.valueChanges
            .pipe(debounce(v => timer(v ? 300 : 0)))
            .subscribe(this.newSearch.bind(this))

        this.searchRequest$
            .pipe(
                distinct(),
                filter(<any>identity))
            .subscribe((sr:SearchRequest) =>
                this.dsBrowserService
                    .getLineageDescriptors(sr)
                    .then(descriptors => {
                        if (sr == this.searchRequest$.getValue()) {
                            if (sr.offset == 0){
                                this.descriptors = descriptors
                            } else {
                                this.descriptors.push(...descriptors)
                            }
                        }
                    }))

        this.init()
    }

    newSearch(value:  {[key: string]: string}): void {
        if (!value.interval) {
            let asAt = DatasetBrowserComponent.parseTimestamp(value.until).valueOf()
            this.searchRequest$.next(new PageRequest(value.text, asAt))
        } else {
            let to = DatasetBrowserComponent.parseTimestamp(value.until).valueOf()
            let from = DatasetBrowserComponent.parseTimestamp(value.from).valueOf()
            this.searchRequest$.next(new IntervalRequest(value.text, from, to))
        }
    }

    onScroll(e: ScrollEvent): void {
        if (!e.isWindowEvent && e.isReachingBottom)
            this.searchRequest$.next(
                this.searchRequest$.getValue().withOffset(this.descriptors.length))
    }

    clearText(): void {
        this.searchValue.get("text").setValue("")
    }

    selectLineage(datasetId: string): void {
        if (!this.searchValue.get("interval").value) {
            this.router.navigate(["dashboard", "dataset", datasetId, "lineage", "overview"], {
                fragment: "datasource",
                relativeTo: this.route.parent
            })
        } else {
            let to = DatasetBrowserComponent.parseTimestamp(this.searchValue.get("until").value).valueOf()
            let from = DatasetBrowserComponent.parseTimestamp(this.searchValue.get("from").value).valueOf()
            this.router.navigate(["dashboard", "dataset", datasetId, "lineage", "interval"], {
                queryParams: {'from': from, 'to': to},
                queryParamsHandling: "merge",
                fragment: "datasource",
                relativeTo: this.route.parent
            })
        }
    }

    private init() {
        this.searchValue.reset(this.resetFilterValue())
    }


    // FIXME extract this to a service with this, graph view and partial view code
    resetFilterValue(): any {
        let paramMap = new Map<string, string>()
        this.router.url
            .replace(/.*\?/, "")
            .replace(/#.*/, "")
            .split("&")
            .map(pair => pair.split("="))
            .forEach(pair => paramMap[pair[0]] = pair[1])
        let from: string = moment(+paramMap['from'])
            .format(DatasetBrowserComponent.TIMESTAMP_FORMAT)
        let until: string = moment(!!paramMap['to'] ? +paramMap['to']: +paramMap['asAt'])
            .format(DatasetBrowserComponent.TIMESTAMP_FORMAT)
        let interval: boolean = from != 'Invalid date' && until != 'Invalid date'
        return {
            text: "",
            from: from != 'Invalid date' ? from: moment().format(DatasetBrowserComponent.TIMESTAMP_FORMAT),
            until: until != 'Invalid date' ? until: moment().format(DatasetBrowserComponent.TIMESTAMP_FORMAT),
            interval: interval
        }
    }

    private static parseTimestamp(timestamp: string): moment.Moment {
        return moment(timestamp, DatasetBrowserComponent.TIMESTAMP_FORMAT)
    }
}