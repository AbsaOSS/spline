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

import {
    IAlias,
    IAttributeReference,
    IAttributeRemoval,
    IBinary,
    IExpression,
    IGeneric,
    IUserDefinedFunction
} from "../../../../generated-ts/expression-model";
import {typeOfExpr} from "../../types";

export module ExpressionUtils {
    export function getText(expr: IExpression): string {
        switch (typeOfExpr(expr)) {
            case "Binary":
                return (<IBinary>expr).text
            case "Alias":
                let aliasExpr = <IAlias>expr
                return `${getText(aliasExpr.children[0])} AS ${aliasExpr.alias}`
            case "AttributeRemoval":
                return (<IAttributeRemoval>expr).text
            case "UserDefinedFunction":
                return (<IUserDefinedFunction>expr).text
            case "AttributeReference":
                return (<IAttributeReference>expr).text
            case "Generic":
                return (<IGeneric>expr).text
        }
    }
}

