import { ExecutedLogicalPlanVM } from "./viewModels/executedLogicalPlanVM";
import { OperationDetailsVM } from "./viewModels/operationDetailsVM";
import { CytoscapeGraphVM } from "./viewModels/cytoscape/cytoscapeGraphVM";
import { RouterStateUrl } from "./routerStateUrl";

export interface AppState {
    config: {
        apiUrl: string
    },
    executedLogicalPlan: ExecutedLogicalPlanVM,
    detailsInfos: OperationDetailsVM,
    attributes: CytoscapeGraphVM,
    router: RouterStateUrl,
    layout: any,
    contextMenu: any,
    error: string
}