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
import {Http, Response} from "@angular/http";
import "rxjs";
import {IDataLineage} from "../../generated-ts/lineage-model";

@Injectable()
export class LineageService {
    private lineagePromiseCache: { [id: string]: Promise<IDataLineage>; } = {}

    constructor(private http: Http) {
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