/*
 * Copyright 2017 ABSA Group Limited
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

import {
    IAlias,
    IAttrRef,
    IBinary,
    IExpression,
    IGeneric,
    IGenericLeaf,
    ILiteral,
    IUDF
} from "../../../../generated-ts/expression-model";
import {typeOfExpr} from "../../types";
import {Injectable} from "@angular/core";
import {LineageStore} from "../../lineage.store";
import * as _ from "lodash"

@Injectable()
export class ExpressionRenderService {

    constructor(private lineageStore: LineageStore) {
    }

    public getName(expr: IExpression): string {
        switch (typeOfExpr(expr)) {
            case "Literal": {
                return "literal"
            }
            case "Binary": {
                return (<IBinary>expr).symbol
            }
            case "Alias": {
                return "alias"
            }
            case "UDF": {
                return `UDF:${(<IUDF>expr).name}`
            }
            case "AttrRef": {
                const ar = <IAttrRef>expr
                return this.lineageStore.lineageAccessors.getAttribute(ar.refId).name
            }
            case "Generic":
            case "GenericLeaf": {
                const e = <{ name: string }>expr
                return e.name
            }
        }
    }

    public getText(expr: IExpression): string {
        switch (typeOfExpr(expr)) {
            case "Literal": {
                return (expr as ILiteral).value
            }
            case "Binary": {
                const binaryExpr = <IBinary>expr
                const leftOperand = binaryExpr.children[0]
                const rightOperand = binaryExpr.children[1]
                const render = (operand: IExpression) => {
                    const text = this.getText(operand)
                    return typeOfExpr(operand) == "Binary" ? `(${text})` : text
                }
                return `${render(leftOperand)} ${binaryExpr.symbol} ${render(rightOperand)}`
            }
            case "Alias": {
                const ae = <IAlias>expr
                return `${this.getText(ae.child)} AS ${ae.alias}`
            }
            case "UDF": {
                const udf = <IUDF>expr
                const paramList = _.map(udf.children, child => this.getText(child))
                return `UDF:${udf.name}(${paramList.join(", ")})`
            }
            case "AttrRef": {
                const ar = <IAttrRef>expr
                return this.lineageStore.lineageAccessors.getAttribute(ar.refId).name
            }
            case "GenericLeaf": {
                return this.renderAsGenericLeafExpr(expr as IGenericLeaf)
            }
            case "Generic": {
                const leafText = this.renderAsGenericLeafExpr(expr as IGenericLeaf)
                const childrenTexts = (expr as IGeneric).children.map(child => this.getText(child))
                return leafText+`(${childrenTexts.join(", ")})`
            }
        }
    }

    private renderAsGenericLeafExpr(gle: IGenericLeaf): string {
        const paramList = _.map(gle.params, (value, name) => `${name}=${this.renderValue(value)}`)
        return _.isEmpty(paramList)
            ? gle.name
            : `${gle.name}[${paramList.join(", ")}]`
    }

    private renderValue(obj: any): string {
        if (typeOfExpr(obj)) {
            return this.getText(obj as IExpression)
        } else if (_.isArray(obj)) {
            return`[${obj.map(o => this.renderValue(o)).join(", ")}]`
        } else if (_.isPlainObject(obj)) {
            const renderedPairs = _.toPairs(obj).map(([k, v]) => `${k}: ${this.renderValue(v)}`)
            return`{${renderedPairs.join(", ")}}`
        } else
            return obj.toString()
    }
}

