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
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/model/app-state';
import * as RouterAction from 'src/app/store/actions/router.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'lineage-overview',
  templateUrl: './lineage-overview.component.html',
  styleUrls: ['./lineage-overview.component.less']
})
export class LineageOverviewComponent {

  constructor(
    private store: Store<AppState>
  ) { }

  public onHomeClick = (): void => {
    this.store.dispatch(
      new RouterAction.Go({ url: "/app/dashboard" })
    )
  }

  public getTargetName = (): Observable<any> => {
    return this.store.select("lineageOverview", "lineageInfo", "targetNodeName")
  }

  public getFormatedTimestamp = (): Observable<any> => {
    return this.store.select("lineageOverview", "lineageInfo", "timestamp")
  }
}
