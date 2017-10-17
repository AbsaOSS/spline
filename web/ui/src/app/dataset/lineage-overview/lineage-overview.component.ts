/*
 * Copyright 2017 Barclays Africa Group Limited
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

import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {IDataLineage} from "../../../generated-ts/lineage-model";
import {Observable} from "rxjs/Observable";
import {GraphNode} from "./lienage-overview-graph.component";

@Component({
    templateUrl: "lineage-overview.component.html",
    styleUrls: ["lineage-overview.component.less"]
})

export class DatasetLineageOverviewComponent {

    lineage$: Observable<IDataLineage>

    selectedNode$: Observable<GraphNode>

    constructor(private route: ActivatedRoute, private router: Router) {
        this.lineage$ = route.data.map((data: { lineage: IDataLineage }) => data.lineage)

        this.selectedNode$ =
            Observable.combineLatest(
                route.fragment,
                route.parent.data
            ).map(args => {
                let [fragment, data] = args
                return <GraphNode>{
                    type: fragment,
                    id: data.dataset.datasetId
                }
            })
    }

    onNodeSelected(node: GraphNode) {
        this.router.navigate(
            ["dataset", node.id, "lineage", "overview"], {
                relativeTo: this.route.parent.parent.parent,
                fragment: node.type
            })
    }
}

