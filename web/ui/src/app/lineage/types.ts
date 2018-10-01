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

import {IOperation} from "../../generated-ts/lineage-model";
import {IExpression} from "../../generated-ts/expression-model";
import {IDataType} from "../../generated-ts/datatype-model";

export type OperationType =
    ("Projection"
        | "Read"
        | "Join"
        | "Union"
        | "Generic"
        | "Filter"
        | "Sort"
        | "Aggregate"
        | "Write"
        | "Alias"
        | "Composite"
        )

export type ExpressionType =
    ("Binary"
        | "Literal"
        | "Alias"
        | "UDF"
        | "Generic"
        | "GenericLeaf"
        | "AttrRef"
        )

export type DataTypeType =
    ("Struct"
        | "Array"
        | "Simple"
        )


export function typeOfOperation(node: IOperation): OperationType | undefined {
    return typeOfAnyAssumingPrefix(node, "op") as OperationType
}

export function typeOfExpr(expr: IExpression): ExpressionType | undefined {
    return typeOfAnyAssumingPrefix(expr, "expr") as ExpressionType
}

export function typeOfDataType(dataType: IDataType): DataTypeType | undefined {
    return typeOfAnyAssumingPrefix(dataType, "dt") as DataTypeType
}

function typeOfAnyAssumingPrefix(obj: any, expectedPrefix: string): string | undefined {
    let typeSuffix = getNthLastIndexOf(obj._typeHint, ".", 2)
    let prefixWithType = typeSuffix && typeSuffix.split(".")
    if (prefixWithType && prefixWithType.length == 2) {
        const [prefix, type] = prefixWithType
        return (prefix == expectedPrefix && type) || undefined
    }
    else
        return undefined
}

function getNthLastIndexOf(str: string, search: string, n: number): string | undefined {
    if(!str)
        return undefined
    else {
        let pos = str.length
        for (let i = 0; i < n; i++) {
            pos = str.lastIndexOf(search, pos - 1)
        }
        return str.substring(pos + 1) || undefined
    }
}