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

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {IAttribute, IDataLineage, IOperation} from "../../generated-ts/lineage-model";
import {LineageStore} from "./lineage.store";
import {typeOfOperation} from "./types";
import * as _ from "lodash";
import {MatTabChangeEvent} from "@angular/material";
import {Tab} from "./tabs";
// import {MatTabChangeEvent} from "@angular/material";
// import {Icon} from "icon";

declare const __APP_VERSION__: string

@Component({
    templateUrl: 'lineage.component.html',
    styleUrls: ['lineage.component.less'],
    providers: [LineageStore]
})
export class LineageComponent implements OnInit {
    appVersion: string = __APP_VERSION__

    lineage: IDataLineage
    selectedTabIndex: Tab = Tab.Summary
    selectedOperation?: IOperation
    attributeToShowFullSchemaFor?: IAttribute

    // selectedAttrIDs: string[]
    // highlightedNodeIDs: string[]

    constructor(private router: Router,
                private route: ActivatedRoute,
                private lineageStore: LineageStore) {
        lineageStore.lineage$.subscribe(lineage => {
            this.lineage = lineage
        })
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: { lineage: IDataLineage }) => {
            this.lineageStore.lineage = data.lineage
        })

        this.route.paramMap.subscribe(pm => {
            let opId = pm.get("operationId")
            this.selectedOperation = opId && _.find(this.lineage.operations, <any>{mainProps: {id: opId}})
        })

        this.route.queryParams.subscribe(qps => {
            let attrId = qps["attrSchema"]
            this.attributeToShowFullSchemaFor = this.lineageStore.getAttribute(attrId)
        })

        this.route.fragment.subscribe(fragment => {
            this.selectedTabIndex = Tab.fromFragment(fragment).valueOr(this.selectedTabIndex)
        })

        /*let cancelPendingRefresh: () => void = undefined
         this.route.paramMap.subscribe((ps: ParamMap) => {
         if (cancelPendingRefresh) cancelPendingRefresh()

         new Promise((resolve, reject) => {
         this.fetching = true
         cancelPendingRefresh = reject

         // this.clearData()

         // let ps = this.route.snapshot.params


         // this.lineageService.getLineage(lineageId).then(resolve, reject)

         }).then((lineage: IDataLineage) => {
         this.fetching = false
         let ps = this.route.snapshot.params,
         operationId = ps['operationId']

         /!*let qps = this.route.snapshot.queryParams,
         attrVals: string | string[] | undefined = qps["attr"],
         attrIDs = attrVals && (_.isString(attrVals) ? [attrVals] : attrVals).map(parseInt),
         showSchemaForAttrVal: string | undefined = qps["attrSchema"],
         showSchemaForAttrID = showSchemaForAttrVal && parseInt(showSchemaForAttrVal)*!/

         this.setData(lineage, operationId/!*, attrIDs, showSchemaForAttrID*!/)
         // this.updateSelectedTabIndex()

         }).catch(err => {
         if (err) {
         this.fetching = false
         // todo: handle the error
         }
         })
         })*/
    }

    getDataSourceCount() {
        return _.sumBy(this.lineage.operations, node => +(typeOfOperation(node) == 'Source'))
    }

    // private setData(lineage: IDataLineage, operationId: string/*, attrIDs: string[], showFullSchemaForAttrID: string | undefined*/) {
    // this.selectedOperationId = operationId
    // this.selectedAttrIDs = attrIDs

    // this.attributeToShowFullSchemaFor = this.findAttrByID(showFullSchemaForAttrID)

    // this.highlightedNodeIDs =
    //     _.flatMap(this.lineage.operations, (node, i) => {
    //         let nodeProps = node.mainProps
    //         let inputAttrs: IAttribute[] = _.flatMap(nodeProps.inputs, (input => input.seq))
    //         let outputAttrs: IAttribute[] = nodeProps.output ? nodeProps.output.seq : []
    //         let allAttrIDs = _.union(inputAttrs, outputAttrs).map(attr => attr.id).filter(id => id != null)
    //         return !_.isEmpty(_.intersection(allAttrIDs, this.selectedAttrIDs)) ? [i] : []
    //     })
    // }

    onOperationSelected(opId: string) {
        this.router.navigate((opId)
                ? ["op", opId]
                : ["."],
            {
                relativeTo: this.route.parent,
                fragment: Tab.toFragment(Tab.Operation),
                /*queryParams: {
                 'attr': this.selectedAttrIDs
                 }*/
            }
        )
    }

    onTabChanged(e: MatTabChangeEvent) {
        this.router.navigate([], {
            fragment: Tab.toFragment(e.index),
            preserveQueryParams: true
        })

    }

    onFullAttributeSchemaRequested(attr: IAttribute) {
        this.router.navigate([], {
            queryParams: {
                // 'attr': this.selectedAttrIDs,
                'attrSchema': attr.id
            },
            fragment: Tab.toFragment(Tab.Attribute)
        })
    }

    /*getSelectedNode() {
     return (this.selectedOperationId >= 0)
     ? this.lineage.operations[this.selectedOperationId]
     : undefined
     }

     getSelectedNodeIcon() {
     let selectedNode = this.getSelectedNode()
     return selectedNode && Icon.getIconForNodeType(typeOfOperation(selectedNode)).name
     }

     onAttributeSelected(attr: IAttribute) {
     this.router.navigate([], {
     queryParams: {
     'attr': attr.id
     }
     })
     }
     */
}