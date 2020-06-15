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
import * as LineageOverviewAction from '../actions/lineage-overview.actions';
import {LineageOverviewNodeType} from 'src/app/model/types/lineageOverviewNodeType';
import {LineageOverviewVM} from "../../model/viewModels/lineageOverview";

export type Action = LineageOverviewAction.LineageOverviewActions

export function lineageOverviewReducer(state: LineageOverviewVM, action: Action): LineageOverviewVM {
  switch (action.type) {
    case LineageOverviewAction.LineageOverviewActionTypes.OVERVIEW_LINEAGE_GET_GET_SUCCESS:
      return (action as LineageOverviewAction.GetSuccess).payload
    default:
      return state
  }
}

export const lineageOverviewIconCodes: Map<string, number> = new Map([
  [LineageOverviewNodeType.Execution, 0xf085],
  [LineageOverviewNodeType.DataSource, 0xf15b]
])


export const lineageOverviewColorCodes: Map<string, string> = new Map([
  [LineageOverviewNodeType.Root, "#ffffff"],
  [LineageOverviewNodeType.Execution, "#e39255"],
  [LineageOverviewNodeType.DataSource, "#337AB7"]
])
