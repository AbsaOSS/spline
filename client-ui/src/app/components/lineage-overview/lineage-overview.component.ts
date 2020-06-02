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

import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { AppState } from '../../model/app-state'
import * as LineageOverviewAction from '../../store/actions/lineage-overview.actions'


@Component({
  selector: 'lineage-overview',
  templateUrl: './lineage-overview.component.html',
  styleUrls: ['./lineage-overview.component.less']
})
export class LineageOverviewComponent {

  public lineageState$: Observable<{ depthRequested: number; hasMoreNodes: boolean; }>
  public embeddedMode$: Observable<boolean>

  constructor(private store: Store<AppState>) {

    this.embeddedMode$ = this.store.select('config', 'embeddedMode')

    this.lineageState$ = this.store.select('lineageOverview')
      .pipe(
        filter(x => !!x),
        map(lineageOverview => ({
          depthRequested: lineageOverview.depthRequested,
          hasMoreNodes: lineageOverview.hasMoreNodes,
        }))
      )
  }

  public onLoadOlderNodesBtnClicked(): void {
    this.store.dispatch(new LineageOverviewAction.GetMoreNodes())
  }
}
