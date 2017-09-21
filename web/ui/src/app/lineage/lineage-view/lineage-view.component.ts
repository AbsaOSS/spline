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
import {IAttribute, IDataLineage, IOperationNode} from "../../../generated-ts/lineage-model";
import * as _ from "lodash";
import {typeOfNode} from "../types";
import {LineageService} from "../lineage.service";
import {Observable} from "rxjs";
import {MdTabChangeEvent} from "@angular/material";
import {Icon} from "../icon";

@Component({
    templateUrl: 'lineage-view.component.html',
    styleUrls: ['lineage-view.component.less']
})
export class LineageViewComponent implements OnInit {
    constructor(private router: Router,
                private route: ActivatedRoute,
                private lineageService: LineageService) {
    }

    lineage: IDataLineage
    selectedNodeID: number
    selectedAttrIDs: number[]
    attributeToShowFullSchemaFor: IAttribute
    highlightedNodeIDs: number[]

    selectedTabIndex: number = 0

    fetching: boolean

    ngOnInit(): void {
        let cancelPendingRefresh: () => void = undefined
        Observable.combineLatest(this.route.params, this.route.queryParams)
            .subscribe(() => {
                if (cancelPendingRefresh) cancelPendingRefresh()

                new Promise((resolve, reject) => {
                    this.fetching = true
                    cancelPendingRefresh = reject
                    this.clearData()
                    let ps = this.route.snapshot.params
                    let lineageId = ps['lineageId']
                    this.lineageService.getLineage(lineageId).then(resolve, reject)

                }).then((lineage: IDataLineage) => {
                    this.fetching = false
                    let ps = this.route.snapshot.params,
                        lineageId = ps['lineageId'],
                        nodeId = ps['nodeId']
                    let qps = this.route.snapshot.queryParams,
                        attrVals: string | string[] | undefined = qps["attr"],
                        attrIDs = attrVals && (_.isString(attrVals) ? [attrVals] : attrVals).map(parseInt),
                        showSchemaForAttrVal: string | undefined = qps["attrSchema"],
                        showSchemaForAttrID = showSchemaForAttrVal && parseInt(showSchemaForAttrVal)
                    this.setData(lineage, nodeId, attrIDs, showSchemaForAttrID)
                    this.updateSelectedTabIndex()

                }).catch(err => {
                    if (err) {
                        this.fetching = false
                        // todo: handle the error
                    }
                })
            })
    }

    getSelectedNode() {
        return (this.selectedNodeID >= 0)
            ? this.lineage.nodes[this.selectedNodeID]
            : undefined
    }

    getSelectedNodeIcon() {
        let selectedNode = this.getSelectedNode()
        return selectedNode && Icon.GetIconForNodeType(typeOfNode(selectedNode)).name
    }

    getDataSourceCount() {
        return this.lineage.nodes.filter(node => typeOfNode(node) == 'SourceNode').length
    }

    private clearData() {
        delete this.lineage
        delete this.selectedNodeID
        delete this.attributeToShowFullSchemaFor
        this.selectedAttrIDs = []
        this.highlightedNodeIDs = []
    }

    private setData(lineage: IDataLineage, nodeId: number, attrIDs: number[], showFullSchemaForAttrID: number | undefined) {
        this.lineage = lineage
        this.selectedNodeID = nodeId
        this.selectedAttrIDs = attrIDs

        this.attributeToShowFullSchemaFor = this.findAttrByID(showFullSchemaForAttrID)

        this.highlightedNodeIDs =
            _.flatMap(this.lineage.nodes, (node, i) => {
                let nodeProps = node.mainProps
                let inputAttrs: IAttribute[] = _.flatMap(nodeProps.inputs, (input => input.seq))
                let outputAttrs: IAttribute[] = nodeProps.output ? nodeProps.output.seq : []
                let allAttrIDs = _.union(inputAttrs, outputAttrs).map(attr => attr.id).filter(id => id != null)
                return !_.isEmpty(_.intersection(allAttrIDs, this.selectedAttrIDs)) ? [i] : []
            })
    }

    private findAttrByID(attrID: number | undefined) {
        if (_.isUndefined(attrID))
            return undefined
        else {
            for (let node of this.lineage.nodes) {
                let attr = _(node.mainProps.inputs.concat(node.mainProps.output || []))
                    .flatMap(input => input.seq)
                    .find(attr => attr.id == attrID)
                if (attr) return attr
            }
            return undefined
        }
    }

    updateSelectedTabIndex() {
        this.selectedTabIndex = this.attributeToShowFullSchemaFor ? 2 : this.getSelectedNode() ? 1 : 0
    }

    onTabChanged(e: MdTabChangeEvent) {
        this.selectedTabIndex = e.index
    }

    onNodeSelected(node: IOperationNode) {
        this.router.navigate(
            (node)
                ? [this.lineage.id, "node", this.lineage.nodes.indexOf(node)]
                : [this.lineage.id],
            {
                relativeTo: this.route.parent,
                queryParams: {
                    'attr': this.selectedAttrIDs
                }
            }
        )
    }

    onAttributeSelected(attr: IAttribute) {
        this.router.navigate([], {
            queryParams: {
                'attr': attr.id
            }
        })
    }

    onFullAttributeSchemaRequested(attr: IAttribute) {
        this.router.navigate([], {
            queryParams: {
                'attr': this.selectedAttrIDs,
                'attrSchema': attr.id
            }
        })
    }
}