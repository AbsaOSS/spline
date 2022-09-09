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


import { Progress } from '../../external/api.model'


export function storeExecutionEvent(execEvent: Progress): void {
    console.log('STORE EVENT ---> ', typeof execEvent, execEvent._key)
    // todo: implement it

    /*
       val progressEdge = EdgeDef.ProgressOf.edge(p._key, p.planKey).copy(_key = p._key)
       txBuilder.addQuery(NativeQuery(
         query =
           """
             |const {_class, ...p} = params.progress;
             |const planKey = params.planKey;
             |const ep = db._document(`executionPlan/${planKey}`);
             |const {
             |   targetDsSelector,
             |   lastWriteTimestamp,
             |   dataSourceName,
             |   dataSourceUri,
             |   dataSourceType,
             |   append
             |} = db._query(`
             |   WITH executionPlan, executes, operation, affects, dataSource
             |   LET wo = FIRST(FOR v IN 1 OUTBOUND '${ep._id}' executes RETURN v)
             |   LET ds = FIRST(FOR v IN 1 OUTBOUND '${ep._id}' affects RETURN v)
             |   RETURN {
             |       "targetDsSelector"   : KEEP(ds, ['_id', '_rev']),
             |       "lastWriteTimestamp" : ds.lastWriteDetails.timestamp,
             |       "dataSourceName"     : ds.name,
             |       "dataSourceUri"      : ds.uri,
             |       "dataSourceType"     : wo.extra.destinationType,
             |       "append"             : wo.append
             |   }
             |`).next();
             |
             |const execPlanDetails = {
             |  "executionPlanKey" : ep._key,
             |  "frameworkName"    : `${ep.systemInfo.name} ${ep.systemInfo.version}`,
             |  "applicationName"  : ep.name,
             |  "dataSourceUri"    : dataSourceUri,
             |  "dataSourceName"   : dataSourceName,
             |  "dataSourceType"   : dataSourceType,
             |  "append"           : append
             |}
             |
             |if (ep.discriminator != p.discriminator) {
             |  // nobody should ever see this happening, but just in case the universe goes crazy...
             |  throw new Error(`UUID collision detected !!! Execution event ID: ${p._key}, discriminator: ${p.discriminator}`)
             |}
             |
             |const {_id, _rev, ...pRefined} = p;
             |const progressWithPlanDetails = {...pRefined, execPlanDetails};
             |
             |if (lastWriteTimestamp < p.timestamp) {
             |  db._update( <-------------------------------------------------------------- GET RID OF THIS
             |   targetDsSelector,
             |   {lastWriteDetails: progressWithPlanDetails}
             |  );
             |}
             |
             |return [progressWithPlanDetails];
             |""".stripMargin,
         params = Map(
           "progress" -> p,
           "planKey" -> p.planKey,
         ),
         collectionDefs = Seq(NodeDef.Progress, NodeDef.ExecutionPlan, EdgeDef.Executes, NodeDef.Operation, EdgeDef.Affects, NodeDef.DataSource))
       )
       txBuilder.addQuery(InsertQuery(NodeDef.Progress, Query.LastResultPlaceholder))
       txBuilder.addQuery(InsertQuery(EdgeDef.ProgressOf, progressEdge))
       */
}

