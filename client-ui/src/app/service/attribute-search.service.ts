/*
 * Copyright 2020 ABSA Group Limited
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

import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../model/app-state";
import {AttributeService} from "../generated/services/attribute.service";
import {Observable} from "rxjs";
import {FoundAttribute} from "../generated/models/found-attribute";

@Injectable({
  providedIn: 'root'
})
export class AttributeSearchService {

  constructor(
    private store: Store<AppState>,
    private attributeService: AttributeService
  ) {
    this.store
      .select('config', 'apiUrl')
      .subscribe(apiUrl => this.attributeService.rootUrl = apiUrl);
  }

  public search(searchTerm: string): Observable<FoundAttribute[]> {
    return this.attributeService.attributeSearchUsingGET(searchTerm);
  }
}
