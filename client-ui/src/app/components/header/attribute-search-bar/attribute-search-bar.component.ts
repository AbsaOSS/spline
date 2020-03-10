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

import {Component, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../model/app-state";
import {AttributeService} from "../../../generated/services/attribute.service";
import {FoundAttribute} from "../../../generated/models/found-attribute";
import {Observable} from "rxjs";
import {debounceTime, switchMap} from "rxjs/operators";
import * as RouterAction from "../../../store/actions/router.actions";

@Component({
  selector: 'app-attribute-search-bar',
  templateUrl: './attribute-search-bar.component.html',
  styleUrls: ['./attribute-search-bar.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AttributeSearchBarComponent {

  constructor(
    private store: Store<AppState>,
    private attributeService: AttributeService
  ) {
    this.store
      .select('config', 'apiUrl')
      .subscribe(apiUrl => this.attributeService.rootUrl = apiUrl);
  }

  public model: any;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      switchMap(term => term === ''
        ? <FoundAttribute[]>[]
        : this.attributeService.attributeSearchUsingGET(term))
    )

  onItemSelected = (selectedAttribute: FoundAttribute) => {
    this.store.dispatch(new RouterAction.Go({
      url: "/app/lineage-detailed/" + selectedAttribute.executionEventId,
      queryParams: {'attribute': selectedAttribute.id}
    }))

    return ""
  }

  getTypeString(attribute: FoundAttribute) {
    switch (attribute.attributeType["_typeHint"]) {
      case 'dt.Struct': return 'struct {...}'
      case 'dt.Array': return 'array [...]'
      default: return attribute.attributeType.name
    }
  }
}
