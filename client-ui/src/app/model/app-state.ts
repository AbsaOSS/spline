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

import {AttributeGraph, PageableExecutionEventsResponse} from "../generated/models";
import {RouterStateUrl} from "./routerStateUrl";
import {CytoscapeGraphVM} from "./viewModels/cytoscape/cytoscapeGraphVM";
import {ExecutedLogicalPlanVM} from "./viewModels/executedLogicalPlanVM";
import {OperationDetailsVM} from "./viewModels/operationDetailsVM";
import {LineageOverviewVM} from './viewModels/lineageOverview';
import {DashboardVM} from "./viewModels/dashboardVM";

export interface AppState {
    config: {
        apiUrl: string
    },
    executionEvents: PageableExecutionEventsResponse,
    dashboard: DashboardVM,
    lineageOverview: LineageOverviewVM,
    executedLogicalPlan: ExecutedLogicalPlanVM,
    attributeLineageGraph: AttributeGraph,
    detailsInfos: OperationDetailsVM,
    attributes: CytoscapeGraphVM,
    router: RouterStateUrl,
    layout: any,
    contextMenu: any,
    error: string
}
