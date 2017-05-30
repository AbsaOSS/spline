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
import {IDataLineageDescriptor, IDataLineage} from "../../generated-ts/lineage-model";
import {Http, Response} from "@angular/http";
import "rxjs";

@Injectable()
export class LineageService {
    private lineageDescriptors: Promise<IDataLineageDescriptor[]>

    private lineagePromiseCache: {[id: string]: Promise<IDataLineage>;} = {}

    constructor(private http: Http) {
        this.lineageDescriptors = http.get("rest/lineage/descriptors").map(res => res.json()).toPromise()
    }

    getLineageDescriptors(): Promise<IDataLineageDescriptor[]> {
        return this.lineageDescriptors
    }

    getLineage(id: string): Promise<IDataLineage> {
        let fetchAndCache = (id: string) => {
            let lp = this.http.get(`rest/lineage/${id}`).map((res: Response) => res.json()).toPromise()
            this.lineagePromiseCache[id] = lp
            return lp
        }

        let cachedPromise = this.lineagePromiseCache[id]
        return (cachedPromise) ? cachedPromise : fetchAndCache(id)
    }
}