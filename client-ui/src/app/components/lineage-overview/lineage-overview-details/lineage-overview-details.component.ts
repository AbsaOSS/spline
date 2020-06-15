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
import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { filter, map, switchMap, take } from 'rxjs/operators'
import { AppState } from 'src/app/model/app-state'
import { OperationDetailsVM } from 'src/app/model/viewModels/operationDetailsVM'
import { LineageOverviewNodeType } from '../../../model/types/lineageOverviewNodeType'
import { ExecutedLogicalPlanVM } from '../../../model/viewModels/executedLogicalPlanVM'


@Component({
  selector: 'lineage-overview-details',
  templateUrl: './lineage-overview-details.component.html',
  styleUrls: ['./lineage-overview-details.component.less']
})
export class LineageOverviewDetailsComponent {

  @Input() embeddedMode: boolean

  readonly selectedNodeUrl$: Observable<string | null>

  readonly operationDetails$: Observable<OperationDetailsVM>

  readonly executedLogicalPlan$: Observable<ExecutedLogicalPlanVM>

  readonly lineageInfo$: Observable<{
    targetURI: string
    executionEventId: string
    [key: string]: any
  }>

  constructor(private readonly store: Store<AppState>,) {

    this.lineageInfo$ = this.store.select('lineageOverview', 'lineageInfo')
    this.operationDetails$ = this.store.select('detailsInfos')
    this.executedLogicalPlan$ = this.store.select('executedLogicalPlan')

    this.selectedNodeUrl$ = this.store.select('router', 'state', 'queryParams', 'selectedNodeId')
      .pipe(
        switchMap((selectedNodeId) =>
          this.store.select('lineageOverview', 'lineage')
            .pipe(
              filter(x => !!x),
              take(1),
              map(lineage => [selectedNodeId, lineage])
            )),
        map(([selectedNodeId, lineage]) => {
          const node = lineage.nodes.find(x => x.data.id === selectedNodeId)
          // node not fount || node is not DataSourceNode => no URL can be defined
          if (!node || node.data._type !== LineageOverviewNodeType.DataSource) {
            return null
          }
          return node.data._id
        })
      )
  }

}
