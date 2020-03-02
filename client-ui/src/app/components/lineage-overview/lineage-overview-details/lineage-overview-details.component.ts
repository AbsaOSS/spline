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
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/model/app-state';
import {Observable} from 'rxjs';
import {OperationDetailsVM} from 'src/app/model/viewModels/operationDetailsVM';
import {AttributeVM} from 'src/app/model/viewModels/attributeVM';
import {AdaptiveComponent} from '../../adaptive/adaptive.component';

@Component({
  selector: 'lineage-overview-details',
  templateUrl: './lineage-overview-details.component.html',
  styleUrls: ['./lineage-overview-details.component.less']
})
export class LineageOverviewDetailsComponent extends AdaptiveComponent {

  constructor(
    private store: Store<AppState>
  ) {
    super(store)
  }

  public getLineageOverviewInfo = (): Observable<{ [key: string]: {} }> => {
    return this.store.select('lineageOverview', "lineageInfo")
  }

  public getDetailsInfo = (): Observable<OperationDetailsVM> => {
    return this.store.select('detailsInfos')
  }

  public getOutputSchema = (operationDetails: OperationDetailsVM): AttributeVM[] => {
    // console.log(operationDetails.schemas[operationDetails.output])
    return operationDetails.schemas[operationDetails.output]
  }

  public getTargetName = (): Observable<any> => {
    return this.store.select("lineageOverview", "lineageInfo", "targetNodeName")
  }

  public getFormatedTimestamp = (): Observable<any> => {
    return this.store.select("lineageOverview", "lineageInfo", "timestamp")
  }

}
