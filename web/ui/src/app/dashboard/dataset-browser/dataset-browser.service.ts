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

import {Injectable} from "@angular/core";
import {IPersistedDatasetDescriptor} from "../../../generated-ts/lineage-model";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Injectable()
export class DatasetBrowserService {
    private datasetDescriptors: Promise<IPersistedDatasetDescriptor[]>

    constructor(private http: Http) {
        this.datasetDescriptors = http.get("rest/dataset/descriptors").map(res => res.json()).toPromise()
    }

    getLineageDescriptors(): Promise<IPersistedDatasetDescriptor[]> {
        return this.datasetDescriptors
    }
}