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
import { AppState } from 'src/app/model/app-state'
import { AttributeVM } from 'src/app/model/viewModels/attributeVM'
import { OperationDetailsVM } from 'src/app/model/viewModels/operationDetailsVM'


@Component({
  selector: 'lineage-overview-details',
  templateUrl: './lineage-overview-details.component.html',
  styleUrls: ['./lineage-overview-details.component.scss']
})
export class LineageOverviewDetailsComponent {

  @Input()
  embeddedMode: boolean

  constructor(private store: Store<AppState>) {
  }

  getLineageOverviewInfo = (): Observable<{ [key: string]: {} }> => {
    return this.store.select('lineageOverview', 'lineageInfo')
  }

  getDetailsInfo = (): Observable<OperationDetailsVM> => {
    return this.store.select('detailsInfos')
  }

  getOutputSchema = (operationDetails: OperationDetailsVM): AttributeVM[] => {
    return operationDetails.schemas[operationDetails.output]
  }

  getTargetName = (): Observable<any> => {
    return this.store.select('lineageOverview', 'lineageInfo', 'targetNodeName')
  }
}
