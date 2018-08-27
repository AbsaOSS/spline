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

import {IAlias, IAttrRef, IBinary, IExpression, IGeneric, IUDF} from "../../../../generated-ts/expression-model";
import {typeOfExpr} from "../../types";
import {Injectable} from "@angular/core";
import {LineageStore} from "../../lineage.store";

@Injectable()
export class ExpressionRenderService {

    constructor(private lineageStore: LineageStore) {
    }

    public getText(expr: IExpression): string {
        switch (typeOfExpr(expr)) {
            case "Binary":
                return this.getBinaryExprText(<IBinary>expr)
            case "Alias":
                return this.getAliasExprText(<IAlias>expr)
            case "UDF":
                return this.getUDFExprText(<IUDF>expr)
            case "AttrRef":
                return this.getAttrRefExprText(<IAttrRef>expr)
            case "Generic":
                return this.getGenericExprText(<IGeneric>expr)
        }
    }

    private getBinaryExprText(e: IBinary) {
        return `${this.getText(e.children[0])} ${e.symbol} ${this.getText(e.children[1])}`
    }

    private getAliasExprText(e: IAlias) {
        return `${this.getText(e.child)} AS ${e.alias}`
    }

    private getUDFExprText(e: IUDF) {
        return `??? UDF:${e.name} ???`;
    }

    private getAttrRefExprText(e: IAttrRef) {
        return this.lineageStore.lineageAccessors.getAttribute(e.refId).name
    }

    private getGenericExprText(e: IGeneric) {
        return `??? ${e.exprType} ???`;
    }
}

