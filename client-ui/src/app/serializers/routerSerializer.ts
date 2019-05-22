/*
 * Copyright 2019 ABSA Group Limited
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

import {RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {RouterStateSerializer} from "@ngrx/router-store";
import {RouterStateUrl} from "../model/routerStateUrl";

@Injectable()
export class RouterSerializer implements RouterStateSerializer<RouterStateUrl> {
    public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams }
        } = routerState;
        const { params } = route;

        return { url, params, queryParams };
    }
}
