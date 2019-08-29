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
(operationId) => {
    'use strict';
    const db = require('@arangodb').db;
    const AQL_FUNCTION = db._query;

    const operation = AQL_FUNCTION(
        `FOR ope IN operation
            FILTER ope._key == @operationId
        
            LET readsFrom = (
                FOR v IN 1..1
                OUTBOUND ope readsFrom
                RETURN { "source" : v.uri, "sourceType" : ope.properties.sourceType }
            )
        
            LET writesTo = FIRST(
                FOR v IN 1..1
                    OUTBOUND ope writesTo
                    RETURN { "source" : v.uri, "sourceType" : ope.properties.destinationType }
            )
        
            LET inputs = (
                FOR v IN 1..1
                    OUTBOUND ope follows
                    RETURN v.outputSchema
            )
        
            LET output = ope.outputSchema == null ? [] : [ope.outputSchema]
        
            LET pairAttributesDataTypes = FIRST(
                FOR v IN 1..9999
                    INBOUND ope follows, executes
                    FILTER IS_SAME_COLLECTION("execution", v)
                    RETURN { "attributes":  v.extra.attributes, "dataTypes" : v.extra.dataTypes }
            )
        
            LET schemas = (
                FOR s in APPEND(inputs, output)
                    LET attributeList = (
                        FOR a IN pairAttributesDataTypes.attributes
                            FILTER CONTAINS(s, a.id)
                            RETURN KEEP(a, "dataTypeId", "name")
                    )
                    RETURN attributeList
            )
        
        
            LET dataTypesFormatted = (
                FOR d IN pairAttributesDataTypes.dataTypes
                    RETURN MERGE(
                        KEEP(d,  "id", "name", "fields", "nullable", "elementDataTypeId"),
                        {
                            "_class": d._typeHint == "Simple" ? "za.co.absa.spline.persistence.model.SimpleDataType" 
                                    : d._typeHint == "Array" ? "za.co.absa.spline.persistence.model.ArrayDataType" 
                                    : "za.co.absa.spline.persistence.model.StructDataType"
                        }
                    )
            )
        
        
            RETURN {
                "operation" : MERGE(KEEP(ope, "_type", "name"), {"_id": ope._key }, {"readsFrom" : readsFrom}, {"writesTo" : writesTo}),
                "dataTypes": dataTypesFormatted,
                "schemas" : schemas,
                "inputs": LENGTH(inputs) > 0 ? RANGE(0, LENGTH(inputs)-1) : [],
                "output": LENGTH(schemas)-1
            }`
        , {
            operationId: operationId
        }
    );
    return operation.toArray()[0];
}