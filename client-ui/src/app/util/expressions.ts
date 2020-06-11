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

import { IExpression, IBinary, IUDF, IAttrRef, IAlias, IGenericLeaf, IGeneric, ILiteral } from 'src/app/model/expression-model'
import { ExpressionType } from 'src/app/model/types/expressionType'
import * as _ from 'lodash'

export function getName(expr: IExpression, attributeList: any): string {
    switch (getType(expr)) {
        case ExpressionType.Literal: {
            return (<ILiteral>expr).value
        }
        case ExpressionType.Binary: {
            return (<IBinary>expr).symbol
        }
        case ExpressionType.Alias: {
            return (<IAlias>expr).alias
        }
        case ExpressionType.UDF: {
            return `UDF:${(<IUDF>expr).name}`
        }
        case ExpressionType.AttrRef: {
            const ar = <IAttrRef>expr
            return getText(ar, attributeList)
        }
        case ExpressionType.Generic:
        case ExpressionType.GenericLeaf: {
            const e = <{ name: string }>expr
            return e.name
        }
    }
}

export function getText(expr: IExpression, attributeList: any): string {
    switch (getType(expr)) {
        case ExpressionType.Literal: {
            return (expr as ILiteral).value
        }
        case ExpressionType.Binary: {
            const binaryExpr = expr as IBinary
            const leftOperand = getText(binaryExpr.children[0], attributeList)
            const rightOperand = getText(binaryExpr.children[1], attributeList)
            return `${leftOperand} ${binaryExpr.symbol} ${rightOperand}`
        }
        case ExpressionType.Alias: {
            const ae = <IAlias>expr
            return `${getText(ae.child, attributeList)} AS  ${ae.alias}`
        }
        case ExpressionType.UDF: {
            const udf = <IUDF>expr
            const paramList = _.map(udf.children, child => getText(child, attributeList))
            return `UDF:${udf.name}(${_.join(paramList, ", ")})`
        }
        case ExpressionType.AttrRef: {
            const attrRef = expr as IAttrRef
            return attributeList.find(a => a.id == attrRef.refId).name
        }
        case ExpressionType.GenericLeaf: {
            return renderAsGenericLeafExpr(expr as IGenericLeaf, attributeList)
        }
        case ExpressionType.Generic: {
            const leafText = renderAsGenericLeafExpr(expr as IGenericLeaf, attributeList)
            const childrenTexts = (expr as IGeneric).children.map(child => getText(child, attributeList))
            return leafText + _.join(childrenTexts, ", ")
        }
    }
}

export function getType(attribute: any): ExpressionType {
    return attribute._typeHint
}

function renderAsGenericLeafExpr(gle: IGenericLeaf, attributeList: any): string {
    const paramList = _.map(gle.params, (value, name) => `${name}=${renderValue(value, attributeList)}`)
    return _.isEmpty(paramList)
        ? gle.name
        : `${gle.name}[${paramList.join(", ")}]`
}

function renderValue(obj: any, attributeList: any): string {
    switch (obj) {
        case getType(obj): return getText(obj as IExpression, attributeList)
        case obj.isArray: return `[${obj.map(o => renderValue(o, attributeList)).join(", ")}]`
        case _.isPlainObject(obj): {
            const renderedPairs = _.toPairs(obj).map(([k, v]) => `${k}: ${renderValue(v, attributeList)}`)
            return `{${renderedPairs.join(", ")}}`
        }
        default: return obj.toString()
    }
}
