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

import {IAttribute, IDataLineage, IMetaDataset, IOperation} from "../../../generated-ts/lineage-model";
import {RegularVisNode, VisEdge, VisModel, VisNode} from "./vis/vis-model";
import * as vis from "vis";
import * as _ from "lodash";
import {typeOfOperation} from "../types";

export function lineageToGraph(lineage: IDataLineage): VisModel {
    let operationVisibilityPredicate = (op: IOperation) => typeOfOperation(op) != "Alias",
        operationsByVisibility = _.groupBy(lineage.operations, operationVisibilityPredicate),
        visibleOperations: IOperation[] = operationsByVisibility.true,
        hiddenOperations: IOperation[] = operationsByVisibility.false,
        hiddenOpIds: string[] = _.map(hiddenOperations, "mainProps.id"),
        visibleNodes = visibleOperations.map(op => new RegularVisNode(op)),
        visibleEdges = createVisibleEdges(lineage, hiddenOpIds)

    return new VisModel(
        new vis.DataSet<VisNode>(visibleNodes),
        new vis.DataSet<VisEdge>(visibleEdges))
}

function createVisibleEdges(lineage: IDataLineage, hiddenOpIds: string[]): VisEdge[] {
    let opIdsByInDsId: { [key: string]: string[] } = {},
        opIdByOutDsId: { [key: string]: string } = {}

    // group operations by their input & output
    lineage.operations.forEach(op => {
        let opId = op.mainProps.id
        opIdByOutDsId[op.mainProps.output] = opId
        op.mainProps.inputs.forEach(inDsId => {
            let opsForInput = opIdsByInDsId[inDsId] || []
            opIdsByInDsId[inDsId] = opsForInput
            opsForInput.push(opId)
        })
    })

    // create edges
    let attrsById: { [id: string]: IAttribute } = _.mapValues(_.groupBy(lineage.attributes, "id"), _.first),
        datasetsById: { [id: string]: IMetaDataset } = _.mapValues(_.groupBy(lineage.datasets, "id"), _.first),
        datasetIdsThatFormEdges = _.intersection(_.keys(opIdsByInDsId), _.keys(opIdByOutDsId)),
        edges: { from: string, to: string, dsId: string }[] = _.flatMap(datasetIdsThatFormEdges, dsId => {
            let fromOperationId = opIdByOutDsId[dsId]
            return opIdsByInDsId[dsId]
                .filter(toOperationId => fromOperationId != toOperationId)
                .map(toOperationId => ({
                    from: fromOperationId,
                    to: toOperationId,
                    dsId: dsId
                }))
        })

    // reduce edges by visibility
    hiddenOpIds.forEach(hiddenOpId => {
        let hiddenInputEdges = _.remove(edges, e => e.to == hiddenOpId)
        if (hiddenInputEdges.length != 1)
            throw Error("Unexpected number of input edges (" + hiddenInputEdges.length + ") for operation (" + hiddenOpId + ") that should be unary")
        let parentOpId = hiddenInputEdges[0].from
        edges.filter(e => e.from == hiddenOpId).forEach(e => e.from = parentOpId)
    })

    // convert to vis.Edge
    return edges.map(e => {
        let attrNames = datasetsById[e.dsId].schema.attrs.map(attrId => attrsById[attrId].name),
            edgeTitle = '[' + attrNames.join(', ') + ']'
        return new VisEdge(e.from, e.to, edgeTitle)
    })
}
