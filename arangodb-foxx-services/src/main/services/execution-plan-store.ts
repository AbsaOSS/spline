/*
 * Copyright 2020 ABSA Group Limited
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


import { ExecutionPlanPersistentModel } from '../../external/api.model'


export function storeExecutionPlan(execPlanModel: ExecutionPlanPersistentModel): void {
    console.log('STORE PLAN ---> ', typeof execPlanModel, execPlanModel.executionPlan._key)
    // todo: implement it

    /*createTxBuilder()
      // execution plan
      .addQuery(InsertQuery(NodeDef.ExecutionPlan, eppm.executionPlan))
      .addQuery(InsertQuery(EdgeDef.Executes, eppm.executes))
      .addQuery(InsertQuery(EdgeDef.Depends, eppm.depends))
      .addQuery(InsertQuery(EdgeDef.Affects, eppm.affects))

      // operation
      .addQuery(InsertQuery(NodeDef.Operation, eppm.operations))
      .addQuery(InsertQuery(EdgeDef.Follows, eppm.follows))
      .addQuery(InsertQuery(EdgeDef.ReadsFrom, eppm.readsFrom))
      .addQuery(InsertQuery(EdgeDef.WritesTo, eppm.writesTo))
      .addQuery(InsertQuery(EdgeDef.Emits, eppm.emits))
      .addQuery(InsertQuery(EdgeDef.Uses, eppm.uses))
      .addQuery(InsertQuery(EdgeDef.Produces, eppm.produces))

      // schema
      .addQuery(InsertQuery(NodeDef.Schema, eppm.schemas))
      .addQuery(InsertQuery(EdgeDef.ConsistsOf, eppm.consistsOf))

      // attribute
      .addQuery(InsertQuery(NodeDef.Attribute, eppm.attributes))
      .addQuery(InsertQuery(EdgeDef.ComputedBy, eppm.computedBy))
      .addQuery(InsertQuery(EdgeDef.DerivesFrom, eppm.derivesFrom))

      // expression
      .addQuery(InsertQuery(NodeDef.Expression, eppm.expressions))
      .addQuery(InsertQuery(EdgeDef.Takes, eppm.takes))

      .buildTx()*/
}

