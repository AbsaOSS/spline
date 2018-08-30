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

module.exports = function () {
    return {

        // --------------------------------------------
        //   CUSTOM ROUTE RESOURCES (See routes.json)
        // --------------------------------------------

        "_lineages": [
            {
                "id": "ln_ds-uuid-1",
                "appId": "ln_ds-uuid-1",
                "appName": "Sample - FrontCache Conformance",
                "sparkVer": "2.2.1",
                "attributes": [{
                    "id": "attr-uuid-0",
                    "name": "TradeScalar",
                    "dataTypeId": "20"
                }, {
                    "id": "attr-uuid-1",
                    "name": "TradeStatic",
                    "dataTypeId": "22"
                }, {
                    "id": "attr-uuid-2",
                    "name": "Instrument",
                    "dataTypeId": "14"
                }, {
                    "id": "attr-uuid-3",
                    "name": "Moneyflows",
                    "dataTypeId": "24"
                }, {
                    "id": "attr-uuid-4",
                    "name": "SalesCredits",
                    "dataTypeId": "10"
                }, {
                    "id": "attr-uuid-5",
                    "name": "Feed",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-6",
                    "name": "IsEoD",
                    "dataTypeId": "3"
                }, {
                    "id": "attr-uuid-7",
                    "name": "ReportDate",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-34",
                    "name": "ProductMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-35",
                    "name": "ProductSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-74",
                    "name": "EnterpriseProduct",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-106",
                    "name": "ProductCategory",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-352",
                    "name": "Balance",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-111",
                    "name": "MappingMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-72",
                    "name": "FundingInstrumentType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-71",
                    "name": "AdditionalInstrumentOverride",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-86",
                    "name": "MappingSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-85",
                    "name": "MappingMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-49",
                    "name": "SourceSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-32",
                    "name": "SourceMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-33",
                    "name": "SourceSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-30",
                    "name": "ProductMainSubTypeMappingId",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-31",
                    "name": "SourceSystem",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-67",
                    "name": "EnterpriseProductMappingId",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-68",
                    "name": "ProductMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-69",
                    "name": "ProductSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-70",
                    "name": "MoneyMarketInstrumentType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-73",
                    "name": "OTCOverride",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-105",
                    "name": "MainType",
                    "dataTypeId": "1"
                }],
                "datasets": [{
                    "id": "ds-uuid-1",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-74", "attr-uuid-106", "attr-uuid-352"]}
                }, {
                    "id": "ds-uuid-2",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-74", "attr-uuid-106"]}
                }, {
                    "id": "ds-uuid-3",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-74", "attr-uuid-111", "attr-uuid-106"]}
                }, {
                    "id": "ds-uuid-4",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-74", "attr-uuid-111", "attr-uuid-106"]}
                }, {
                    "id": "ds-uuid-5",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-74"]}
                }, {
                    "id": "ds-uuid-6",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-74"]}
                }, {
                    "id": "ds-uuid-7",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-72", "attr-uuid-74"]}
                }, {
                    "id": "ds-uuid-8",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-71", "attr-uuid-72", "attr-uuid-74"]}
                }, {
                    "id": "ds-uuid-9",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-86", "attr-uuid-71", "attr-uuid-72", "attr-uuid-74"]}
                }, {
                    "id": "ds-uuid-10",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-85", "attr-uuid-86", "attr-uuid-71", "attr-uuid-72", "attr-uuid-74"]}
                }, {
                    "id": "ds-uuid-11",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-85", "attr-uuid-86", "attr-uuid-71", "attr-uuid-72", "attr-uuid-74"]}
                }, {
                    "id": "ds-uuid-12",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35"]}
                }, {
                    "id": "ds-uuid-13",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35"]}
                }, {
                    "id": "ds-uuid-14",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-49", "attr-uuid-34", "attr-uuid-35"]}
                }, {
                    "id": "ds-uuid-15",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-32", "attr-uuid-49", "attr-uuid-34", "attr-uuid-35"]}
                }, {
                    "id": "ds-uuid-16",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-32", "attr-uuid-49", "attr-uuid-34", "attr-uuid-35"]}
                }, {
                    "id": "ds-uuid-17",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7"]}
                }, {
                    "id": "ds-uuid-18",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7"]}
                }, {
                    "id": "ds-uuid-19",
                    "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7"]}
                }, {
                    "id": "ds-uuid-20",
                    "schema": {"attrs": ["attr-uuid-32", "attr-uuid-49", "attr-uuid-34", "attr-uuid-35"]}
                }, {
                    "id": "ds-uuid-21",
                    "schema": {"attrs": ["attr-uuid-32", "attr-uuid-49", "attr-uuid-34", "attr-uuid-35"]}
                }, {
                    "id": "ds-uuid-22",
                    "schema": {"attrs": ["attr-uuid-32", "attr-uuid-33", "attr-uuid-34", "attr-uuid-35"]}
                }, {
                    "id": "ds-uuid-23",
                    "schema": {"attrs": ["attr-uuid-30", "attr-uuid-31", "attr-uuid-32", "attr-uuid-33", "attr-uuid-34", "attr-uuid-35"]}
                }, {
                    "id": "ds-uuid-24",
                    "schema": {"attrs": ["attr-uuid-30", "attr-uuid-31", "attr-uuid-32", "attr-uuid-33", "attr-uuid-34", "attr-uuid-35"]}
                }, {
                    "id": "ds-uuid-25",
                    "schema": {"attrs": ["attr-uuid-85", "attr-uuid-86", "attr-uuid-71", "attr-uuid-72", "attr-uuid-74"]}
                }, {
                    "id": "ds-uuid-26",
                    "schema": {"attrs": ["attr-uuid-85", "attr-uuid-86", "attr-uuid-71", "attr-uuid-72", "attr-uuid-74"]}
                }, {
                    "id": "ds-uuid-27",
                    "schema": {"attrs": ["attr-uuid-67", "attr-uuid-68", "attr-uuid-69", "attr-uuid-70", "attr-uuid-71", "attr-uuid-72", "attr-uuid-73", "attr-uuid-74"]}
                }, {
                    "id": "ds-uuid-28",
                    "schema": {"attrs": ["attr-uuid-67", "attr-uuid-68", "attr-uuid-69", "attr-uuid-70", "attr-uuid-71", "attr-uuid-72", "attr-uuid-73", "attr-uuid-74"]}
                }, {"id": "ds-uuid-29", "schema": {"attrs": ["attr-uuid-111", "attr-uuid-106"]}}, {
                    "id": "ds-uuid-30",
                    "schema": {"attrs": ["attr-uuid-111", "attr-uuid-106"]}
                }, {"id": "ds-uuid-31", "schema": {"attrs": ["attr-uuid-105", "attr-uuid-106"]}}, {
                    "id": "ds-uuid-32",
                    "schema": {"attrs": ["attr-uuid-105", "attr-uuid-106"]}
                }, {
                    "id": "ds-uuid-33",
                    "schema": {"attrs": ["attr-uuid-105", "attr-uuid-106"]}
                }, {
                    "id": "ds-uuid-34",
                    "schema": {"attrs": ["attr-uuid-105", "attr-uuid-106"]}
                }],
                "operations": [{
                    "_typeHint": "za.co.absa.spline.model.op.Write",
                    "mainProps": {
                        "id": "op-uuid-1",
                        "name": "SaveIntoDataSourceCommand",
                        "inputs": ["ds-uuid-1"],
                        "output": "ds-uuid-1"
                    },
                    "destinationType": "parquet",
                    "path": "data/Conformance/ConformedData"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-2",
                        "name": "Project",
                        "inputs": ["ds-uuid-2"],
                        "output": "ds-uuid-1"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.model.expr.Generic",
                        "name": "some_cool",
                        "exprType": "SomeCoolExpression",
                        "params": {
                            "a": "foo",
                            "b": ["bar", ["baz", 42]],
                            "c": true,
                            "d": {"x": 1, "y": [2, 3]},
                            "otherExpression": {
                                "_typeHint": "za.co.absa.spline.model.expr.Literal",
                                "value": "777",
                                "dataTypeId": 6
                            }
                        },
                        // "text": "UDF:selectBalance(ProductCategory#106, TradeScalar#0.NominalRepCcy, TradeScalar#0.CashBalanceRepCcy) AS Balance#352",
                        "dataTypeId": "1",
                        "children": [{
                            "_typeHint": "za.co.absa.spline.model.expr.UDF",
                            "name": "selectBalance",
                            // "text": "UDF:selectBalance(ProductCategory#106, TradeScalar#0.NominalRepCcy, TradeScalar#0.CashBalanceRepCcy)",
                            "dataTypeId": "1",
                            "children": [{
                                "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                "refId": "attr-uuid-106"
                            }, {
                                "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                "name": "getstructfield",
                                "exprType": "GetStructField",
                                // "text": "TradeScalar#0.NominalRepCcy",
                                "dataTypeId": "1",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                    "refId": "attr-uuid-0"
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                "name": "getstructfield",
                                "exprType": "GetStructField",
                                // "text": "TradeScalar#0.CashBalanceRepCcy",
                                "dataTypeId": "1",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                    "refId": "attr-uuid-0"
                                }]
                            }]
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-3",
                        "name": "Project",
                        "inputs": ["ds-uuid-3"],
                        "output": "ds-uuid-2"
                    },
                    "transformations": []
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-4",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-4"],
                        "output": "ds-uuid-3"
                    },
                    "alias": "SourceData"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Join",
                    "mainProps": {
                        "id": "op-uuid-5",
                        "name": "Join",
                        "inputs": ["ds-uuid-5", "ds-uuid-29"],
                        "output": "ds-uuid-4"
                    },
                    "condition": {
                        "_typeHint": "za.co.absa.spline.model.expr.Binary",
                        "symbol": "<=>",
                        // "text": "(ProductMainType#34 <=> MappingMainType#111)",
                        "dataTypeId": "4",
                        "children": [{
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "attr-uuid-34"}, {
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "attr-uuid-111"}]
                    },
                    "joinType": "LeftOuter"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-6",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-6"],
                        "output": "ds-uuid-5"
                    },
                    "alias": "main"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-7",
                        "name": "Project",
                        "inputs": ["ds-uuid-7"],
                        "output": "ds-uuid-6"
                    },
                    "transformations": []
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-8",
                        "name": "Project",
                        "inputs": ["ds-uuid-8"],
                        "output": "ds-uuid-7"
                    },
                    "transformations": []
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-9",
                        "name": "Project",
                        "inputs": ["ds-uuid-9"],
                        "output": "ds-uuid-8"
                    },
                    "transformations": []
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-10",
                        "name": "Project",
                        "inputs": ["ds-uuid-10"],
                        "output": "ds-uuid-9"
                    },
                    "transformations": []
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-11",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-11"],
                        "output": "ds-uuid-10"
                    },
                    "alias": "SourceData"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Join",
                    "mainProps": {
                        "id": "op-uuid-12",
                        "name": "Join",
                        "inputs": ["ds-uuid-12", "ds-uuid-25"],
                        "output": "ds-uuid-11"
                    },
                    "condition": {
                        "_typeHint": "za.co.absa.spline.model.expr.Binary",
                        "symbol": "&&",
                        // "text": "((((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86)) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71))) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)) <=> UDF:toLower(FundingInstrumentType#72)))",
                        "dataTypeId": "4",
                        "children": [{
                            "_typeHint": "za.co.absa.spline.model.expr.Binary",
                            "symbol": "&&",
                            // "text": "(((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86)) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71)))",
                            "dataTypeId": "4",
                            "children": [{
                                "_typeHint": "za.co.absa.spline.model.expr.Binary",
                                "symbol": "&&",
                                // "text": "((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86))",
                                "dataTypeId": "4",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.Binary",
                                    "symbol": "<=>",
                                    // "text": "(ProductMainType#34 <=> MappingMainType#85)",
                                    "dataTypeId": "4",
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                        "refId": "attr-uuid-34"}, {
                                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                        "refId": "attr-uuid-85"}]
                                }, {
                                    "_typeHint": "za.co.absa.spline.model.expr.Binary",
                                    "symbol": "<=>",
                                    // "text": "(ProductSubType#35 <=> MappingSubType#86)",
                                    "dataTypeId": "4",
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                        "refId": "attr-uuid-35"}, {
                                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                        "refId": "attr-uuid-86"}]
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.model.expr.Binary",
                                "symbol": "<=>",
                                // "text": "(UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71))",
                                "dataTypeId": "4",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                    "name": "toLower",
                                    // "text": "UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName))",
                                    "dataTypeId": "1",
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                        "name": "replaceNullsWithNotApplicable",
                                        // "text": "UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)",
                                        "dataTypeId": "1",
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                            "name": "getstructfield",
                                            "exprType": "GetStructField",
                                            // "text": "TradeStatic#1.InsTypeOverrideName",
                                            "dataTypeId": "1",
                                            "children": [{
                                                "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                                "refId": "attr-uuid-1"}]
                                        }]
                                    }]
                                }, {
                                    "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                    "name": "toLower",
                                    // "text": "UDF:toLower(AdditionalInstrumentOverride#71)",
                                    "dataTypeId": "1",
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                        "refId": "attr-uuid-71"}]
                                }]
                            }]
                        }, {
                            "_typeHint": "za.co.absa.spline.model.expr.Binary",
                            "symbol": "<=>",
                            // "text": "(UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)) <=> UDF:toLower(FundingInstrumentType#72))",
                            "dataTypeId": "4",
                            "children": [{
                                "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                "name": "toLower",
                                // "text": "UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType))",
                                "dataTypeId": "1",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                    "name": "replaceNullsWithNotApplicable",
                                    // "text": "UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)",
                                    "dataTypeId": "1",
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                        "name": "getstructfield",
                                        "exprType": "GetStructField",
                                        // "text": "TradeStatic#1.FundingInsType",
                                        "dataTypeId": "1",
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                            "refId": "attr-uuid-1"}]
                                    }]
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                "name": "toLower",
                                // "text": "UDF:toLower(FundingInstrumentType#72)",
                                "dataTypeId": "1",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                    "refId": "attr-uuid-72"}]
                            }]
                        }]
                    },
                    "joinType": "LeftOuter"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-13",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-13"],
                        "output": "ds-uuid-12"
                    },
                    "alias": "main"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-14",
                        "name": "Project",
                        "inputs": ["ds-uuid-14"],
                        "output": "ds-uuid-13"
                    },
                    "transformations": []
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-15",
                        "name": "Project",
                        "inputs": ["ds-uuid-15"],
                        "output": "ds-uuid-14"
                    },
                    "transformations": []
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-16",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-16"],
                        "output": "ds-uuid-15"
                    },
                    "alias": "SourceData"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Join",
                    "mainProps": {
                        "id": "op-uuid-17",
                        "name": "Join",
                        "inputs": ["ds-uuid-17", "ds-uuid-20"],
                        "output": "ds-uuid-16"
                    },
                    "condition": {
                        "_typeHint": "za.co.absa.spline.model.expr.Binary",
                        "symbol": "&&",
                        // "text": "((UDF:toLower(Instrument#2.InstrumentType) <=> UDF:toLower(SourceMainType#32)) && (UDF:toLower(UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType)) <=> UDF:toLower(SourceSubType#49)))",
                        "dataTypeId": "4",
                        "children": [{
                            "_typeHint": "za.co.absa.spline.model.expr.Binary",
                            "symbol": "<=>",
                            // "text": "(UDF:toLower(Instrument#2.InstrumentType) <=> UDF:toLower(SourceMainType#32))",
                            "dataTypeId": "4",
                            "children": [{
                                "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                "name": "toLower",
                                // "text": "UDF:toLower(Instrument#2.InstrumentType)",
                                "dataTypeId": "1",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                    "name": "getstructfield",
                                    "exprType": "GetStructField",
                                    // "text": "Instrument#2.InstrumentType",
                                    "dataTypeId": "1",
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                        "refId": "attr-uuid-2"}]
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                "name": "toLower",
                                // "text": "UDF:toLower(SourceMainType#32)",
                                "dataTypeId": "1",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                    "refId": "attr-uuid-32"}]
                            }]
                        }, {
                            "_typeHint": "za.co.absa.spline.model.expr.Binary",
                            "symbol": "<=>",
                            // "text": "(UDF:toLower(UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType)) <=> UDF:toLower(SourceSubType#49))",
                            "dataTypeId": "4",
                            "children": [{
                                "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                "name": "toLower",
                                // "text": "UDF:toLower(UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType))",
                                "dataTypeId": "1",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                    "name": "selectSubtype",
                                    // "text": "UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType)",
                                    "dataTypeId": "1",
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                        "name": "getstructfield",
                                        "exprType": "GetStructField",
                                        // "text": "Instrument#2.InstrumentType",
                                        "dataTypeId": "1",
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                            "refId": "attr-uuid-2"}]
                                    }, {
                                        "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                        "name": "getstructfield",
                                        "exprType": "GetStructField",
                                        // "text": "TradeStatic#1.FxSubType",
                                        "dataTypeId": "1",
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                            "refId": "attr-uuid-1"}]
                                    }, {
                                        "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                        "name": "getstructfield",
                                        "exprType": "GetStructField",
                                        // "text": "Instrument#2.UnderlyingInstrumentType",
                                        "dataTypeId": "1",
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                            "refId": "attr-uuid-2"}]
                                    }]
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.model.expr.UDF",
                                "name": "toLower",
                                // "text": "UDF:toLower(SourceSubType#49)",
                                "dataTypeId": "1",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                    "refId": "attr-uuid-49"}]
                            }]
                        }]
                    },
                    "joinType": "LeftOuter"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-19",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-18"],
                        "output": "ds-uuid-17"
                    },
                    "alias": "main"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-20",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-19"],
                        "output": "ds-uuid-18"
                    },
                    "alias": "SourceData"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Read",
                    "mainProps": {
                        "id": "op-uuid-21",
                        "name": "LogicalRelation",
                        "inputs": [],
                        "output": "ds-uuid-19"
                    },
                    "sourceType": "Parquet",
                    "sources": [{"path": "file:/C:/git/lineage/sample/data/Conformance/SourceData"}]
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-22",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-21"],
                        "output": "ds-uuid-20"
                    },
                    "alias": "ms"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-23",
                        "name": "Project",
                        "inputs": ["ds-uuid-22"],
                        "output": "ds-uuid-21"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.model.expr.Alias",
                        "alias": "SourceSubType",
                        // "text": "UDF:removeEmptyStrings(SourceSubType#33) AS SourceSubType#49",
                        "dataTypeId": "1",
                        "child": {
                            "_typeHint": "za.co.absa.spline.model.expr.UDF",
                            "name": "removeEmptyStrings",
                            // "text": "UDF:removeEmptyStrings(SourceSubType#33)",
                            "dataTypeId": "1",
                            "children": [{
                                "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                "refId": "attr-uuid-33"}]
                        }
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-24",
                        "name": "Project",
                        "inputs": ["ds-uuid-23"],
                        "output": "ds-uuid-22"
                    },
                    "transformations": []
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-25",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-24"],
                        "output": "ds-uuid-23"
                    },
                    "alias": "MainSubTypeMapping"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Read",
                    "mainProps": {
                        "id": "op-uuid-26",
                        "name": "LogicalRelation",
                        "inputs": [],
                        "output": "ds-uuid-24"
                    },
                    "sourceType": "CSV",
                    "sources": [{"path": "file:/C:/git/lineage/sample/data/Conformance/ProductMainSubTypeMapping.txt"}]
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-27",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-26"],
                        "output": "ds-uuid-25"
                    },
                    "alias": "ep"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-28",
                        "name": "Project",
                        "inputs": ["ds-uuid-27"],
                        "output": "ds-uuid-26"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.model.expr.Alias",
                        "alias": "MappingMainType",
                        // "text": "ProductMainType#68 AS MappingMainType#85",
                        "dataTypeId": "1",
                        "child": {
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "attr-uuid-68"}
                    }, {
                        "_typeHint": "za.co.absa.spline.model.expr.Alias",
                        "alias": "MappingSubType",
                        // "text": "ProductSubType#69 AS MappingSubType#86",
                        "dataTypeId": "1",
                        "child": {
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "attr-uuid-69"}
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-29",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-28"],
                        "output": "ds-uuid-27"
                    },
                    "alias": "EnterpriseProductMapping"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Read",
                    "mainProps": {
                        "id": "op-uuid-30",
                        "name": "LogicalRelation",
                        "inputs": [],
                        "output": "ds-uuid-28"
                    },
                    "sourceType": "CSV",
                    "sources": [{"path": "file:/C:/git/lineage/sample/data/Conformance/EnterpriseProductMapping.txt"}]
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-31",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-30"],
                        "output": "ds-uuid-29"
                    },
                    "alias": "pc"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-32",
                        "name": "Project",
                        "inputs": ["ds-uuid-31"],
                        "output": "ds-uuid-30"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.model.expr.Alias",
                        "alias": "MappingMainType",
                        // "text": "MainType#105 AS MappingMainType#111",
                        "dataTypeId": "1",
                        "child": {
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "attr-uuid-105"}
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-33",
                        "name": "SubqueryAlias",
                        "inputs": ["ds-uuid-34"],
                        "output": "ds-uuid-31"
                    },
                    "alias": "CategoryMapping"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Filter",
                    "mainProps": {
                        "id": "op-uuid-18",
                        "name": "Filter",
                        "inputs": ["ds-uuid-8"],
                        "output": "ds-uuid-32"
                    },
                    "condition": {
                        "_typeHint": "za.co.absa.spline.model.expr.Binary",
                        "symbol": "<=>",
                        // "text": "(ProductMainType#34 <=> MappingMainType#111)",
                        "dataTypeId": "4",
                        "children": [{
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "attr-uuid-34"}, {
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "attr-uuid-111"}]
                    }
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Sort",
                    "mainProps": {
                        "id": "57767d87-909b-49dd-9800-e7dc59e95340",
                        "name": "Sort",
                        "inputs": ["ds-uuid-32"],
                        "output": "ds-uuid-33"
                    },
                    "orders": [{
                        "expression": {
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "bbf488a0-9ea0-43f6-8d7a-7eda9d4a6151"
                        }, "direction": "DESC", "nullOrder": "NULLS LAST"
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Aggregate",
                    "mainProps": {
                        "id": "c0ec33fd-aaaa-41f6-8aa2-e610e899fb75",
                        "name": "Aggregate",
                        "inputs": ["ds-uuid-33"],
                        "output": "ds-uuid-34"
                    },
                    "groupings": [{
                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                        "refId": "bed05b03-276f-4861-99d9-0970c0936079"
                    }, {
                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                        "refId": "5cada60b-10d0-45c8-8590-957cca18c53e"
                    }],
                    "aggregations": {
                        "id": {
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "bed05b03-276f-4861-99d9-0970c0936079"
                        },
                        "title": {
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "5cada60b-10d0-45c8-8590-957cca18c53e"
                        },
                        "authors": {
                            "_typeHint": "za.co.absa.spline.model.expr.Alias",
                            "alias": "authors",
                            "dataTypeId": "13",
                            "child": {
                                "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                "name": "aggregateexpression",
                                "exprType": "AggregateExpression",
                                // "text": "collect_list(author#134, 0, 0)",
                                "dataTypeId": "13",
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                    "name": "collect_list",
                                    "exprType": "CollectList",
                                    // "text": "collect_list(author#134, 0, 0)",
                                    "dataTypeId": "13",
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                                        "refId": "53ec6b8f-20f4-48fb-9935-25971cedd009"
                                    }]
                                }]
                            }
                        }
                    }
                }],
                "dataTypes": [
                    {id:1, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true},
                    {id:2, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "decimal(38,10)", "nullable": true},
                    {id:3, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "boolean", "nullable": true},
                    {id:4, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "boolean", "nullable": false},
                    {id:5, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true},
                    {id:6, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "long", "nullable": false},
                    {id:7,
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{"name": "salescreditsubteamname", "dataTypeId": "1"}, {
                            "name": "salespersonname",
                            "dataTypeId": "1"
                        }, {"name": "standardsalescredit", "dataTypeId": "1"}, {
                            "name": "totalvalueaddsalescredit",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:8,
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "Isin",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentAddress", "dataTypeId": "1"}, {
                            "name": "InstrumentName",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentType", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "ParentInstrumentAddress",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:9,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "1", "nullable": true},
                    {id:10,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "7", "nullable": true},
                    {id:11,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "8", "nullable": true},
                    {id:12,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "initial", "dataTypeId": "9"}, {"name": "lastName", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:13,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "12", "nullable": true},
                    {id:14,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "Barrier", "dataTypeId": "1"}, {
                            "name": "BarrierEndDate",
                            "dataTypeId": "1"
                        }, {"name": "BarrierMonitoring", "dataTypeId": "1"}, {
                            "name": "BarrierOptionType",
                            "dataTypeId": "1"
                        }, {"name": "BarrierStartDate", "dataTypeId": "1"}, {
                            "name": "CallPut",
                            "dataTypeId": "1"
                        }, {"name": "ContractSize", "dataTypeId": "1"}, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "CommoditySubAssetsChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "Digital", "dataTypeId": "1"}, {
                            "name": "DomesticCurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "DoubleBarrier", "dataTypeId": "1"}, {
                            "name": "EndDateTime",
                            "dataTypeId": "1"
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataTypeId": "1"
                        }, {"name": "ExoticDigitalBarrierType", "dataTypeId": "1"}, {
                            "name": "ExoticRebateName",
                            "dataTypeId": "1"
                        }, {"name": "ExoticRebateNumber", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "ExternalId1",
                            "dataTypeId": "1"
                        }, {"name": "ForeignCurrencyName", "dataTypeId": "1"}, {
                            "name": "FxOptionType",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentAddress",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentName", "dataTypeId": "1"}, {
                            "name": "InstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "IsCurrency", "dataTypeId": "1"}, {
                            "name": "IsExpired",
                            "dataTypeId": "1"
                        }, {"name": "Isin", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "Legs",
                            "dataTypeId": "16"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "OptionExerciseType", "dataTypeId": "1"}, {
                            "name": "OptionExoticType",
                            "dataTypeId": "1"
                        }, {"name": "Otc", "dataTypeId": "1"}, {
                            "name": "PayDayOffset",
                            "dataTypeId": "1"
                        }, {"name": "PayOffsetMethod", "dataTypeId": "1"}, {
                            "name": "PayType",
                            "dataTypeId": "1"
                        }, {"name": "QuoteType", "dataTypeId": "1"}, {
                            "name": "Rate",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RefValue",
                            "dataTypeId": "1"
                        }, {"name": "Rebate", "dataTypeId": "1"}, {
                            "name": "ReferencePrice",
                            "dataTypeId": "1"
                        }, {"name": "SettlementType", "dataTypeId": "1"}, {
                            "name": "SettlementDateTime",
                            "dataTypeId": "1"
                        }, {"name": "SpotBankingDayOffset", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "StrikeCurrencyName", "dataTypeId": "1"}, {
                            "name": "StrikeCurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "TxnMaturityPeriod", "dataTypeId": "1"}, {
                            "name": "UnderlyingInstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingInstruments", "dataTypeId": "18"}, {
                            "name": "ValuationGroupName",
                            "dataTypeId": "1"
                        }, {"name": "FixingSourceName", "dataTypeId": "1"}, {
                            "name": "Seniority",
                            "dataTypeId": "1"
                        }, {"name": "VersionId", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:15,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "Barrier", "dataTypeId": "1"}, {
                            "name": "BarrierEndDate",
                            "dataTypeId": "1"
                        }, {"name": "BarrierMonitoring", "dataTypeId": "1"}, {
                            "name": "BarrierOptionType",
                            "dataTypeId": "1"
                        }, {"name": "BarrierStartDate", "dataTypeId": "1"}, {
                            "name": "CallPut",
                            "dataTypeId": "1"
                        }, {"name": "ContractSize", "dataTypeId": "1"}, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "CommoditySubAssetsChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "Digital", "dataTypeId": "1"}, {
                            "name": "DomesticCurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "DoubleBarrier", "dataTypeId": "1"}, {
                            "name": "EndDateTime",
                            "dataTypeId": "1"
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataTypeId": "1"
                        }, {"name": "ExoticDigitalBarrierType", "dataTypeId": "1"}, {
                            "name": "ExoticRebateName",
                            "dataTypeId": "1"
                        }, {"name": "ExoticRebateNumber", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "ExternalId1",
                            "dataTypeId": "1"
                        }, {"name": "ForeignCurrencyName", "dataTypeId": "1"}, {
                            "name": "FxOptionType",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentAddress",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentName", "dataTypeId": "1"}, {
                            "name": "InstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "IsCurrency", "dataTypeId": "1"}, {
                            "name": "IsExpired",
                            "dataTypeId": "1"
                        }, {"name": "Isin", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "Legs",
                            "dataTypeId": "16"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "OptionExerciseType", "dataTypeId": "1"}, {
                            "name": "OptionExoticType",
                            "dataTypeId": "1"
                        }, {"name": "Otc", "dataTypeId": "1"}, {
                            "name": "PayDayOffset",
                            "dataTypeId": "1"
                        }, {"name": "PayOffsetMethod", "dataTypeId": "1"}, {
                            "name": "PayType",
                            "dataTypeId": "1"
                        }, {"name": "QuoteType", "dataTypeId": "1"}, {
                            "name": "Rate",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RefValue",
                            "dataTypeId": "1"
                        }, {"name": "Rebate", "dataTypeId": "1"}, {
                            "name": "ReferencePrice",
                            "dataTypeId": "1"
                        }, {"name": "SettlementType", "dataTypeId": "1"}, {
                            "name": "SettlementDateTime",
                            "dataTypeId": "1"
                        }, {"name": "SpotBankingDayOffset", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "StrikeCurrencyName", "dataTypeId": "1"}, {
                            "name": "StrikeCurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "TxnMaturityPeriod", "dataTypeId": "1"}, {
                            "name": "UnderlyingInstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingInstruments", "dataTypeId": "11"}, {
                            "name": "ValuationGroupName",
                            "dataTypeId": "1"
                        }, {"name": "FixingSourceName", "dataTypeId": "1"}, {
                            "name": "Seniority",
                            "dataTypeId": "1"
                        }, {"name": "VersionId", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:16,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "17", "nullable": true},
                    {id:17,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "AccruedDiscountBalanceRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "Carry",
                            "dataTypeId": "1"
                        }, {"name": "CleanConsideration", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "CurrentRate", "dataTypeId": "1"}, {
                            "name": "CurrentSpread",
                            "dataTypeId": "1"
                        }, {"name": "DayCountMethod", "dataTypeId": "1"}, {
                            "name": "EndDate",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FixedRate", "dataTypeId": "1"}, {
                            "name": "FloatRateReferenceName",
                            "dataTypeId": "1"
                        }, {"name": "FloatRateSpread", "dataTypeId": "1"}, {
                            "name": "IsPayLeg",
                            "dataTypeId": "1"
                        }, {"name": "LastResetDate", "dataTypeId": "1"}, {
                            "name": "LegFloatRateFactor",
                            "dataTypeId": "1"
                        }, {"name": "LegNumber", "dataTypeId": "1"}, {
                            "name": "LegStartDate",
                            "dataTypeId": "1"
                        }, {"name": "LegType", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Price",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "RepoRate", "dataTypeId": "1"}, {"name": "RollingPeriod", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:18,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "19", "nullable": true},
                    {id:19,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "Isin",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentAddress", "dataTypeId": "1"}, {
                            "name": "InstrumentName",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentType", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "ParentInstrumentAddress",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:20,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "2"
                        }, {"name": "AccruedInterestRepCcy", "dataTypeId": "2"}, {
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "2"
                        }, {"name": "BaseCostDirty", "dataTypeId": "1"}, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesSettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesUnsettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerageNonVatable",
                            "dataTypeId": "1"
                        }, {"name": "BrokerageVatable", "dataTypeId": "1"}, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CallAccruedInterestTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashBalanceTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashPerCurrencyZAR",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashflowRealDivRepCcyAmt", "dataTypeId": "1"}, {
                            "name": "DailyExecutionFee",
                            "dataTypeId": "1"
                        }, {"name": "DailyExecutionFeeNoVAT", "dataTypeId": "1"}, {
                            "name": "DailyVAT",
                            "dataTypeId": "1"
                        }, {"name": "DealAmount", "dataTypeId": "1"}, {
                            "name": "DividendDivPayDay",
                            "dataTypeId": "1"
                        }, {"name": "Dividends", "dataTypeId": "1"}, {
                            "name": "EndCash",
                            "dataTypeId": "1"
                        }, {"name": "ExecutionCost", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "Fees",
                            "dataTypeId": "1"
                        }, {"name": "FeesSettled", "dataTypeId": "1"}, {
                            "name": "FeesUnsettled",
                            "dataTypeId": "1"
                        }, {"name": "Interest", "dataTypeId": "1"}, {
                            "name": "InvestorProtectionLevy",
                            "dataTypeId": "1"
                        }, {"name": "IsMidasSettlement", "dataTypeId": "1"}, {
                            "name": "ManufacturedDividendValue",
                            "dataTypeId": "1"
                        }, {"name": "NetConsideration", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Premium",
                            "dataTypeId": "1"
                        }, {"name": "PriceEndDate", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvUnsettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RegulatoryNotional",
                            "dataTypeId": "1"
                        }, {"name": "SecurityTransferTax", "dataTypeId": "1"}, {
                            "name": "SettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "StartCash", "dataTypeId": "1"}, {
                            "name": "StrikePrice",
                            "dataTypeId": "1"
                        }, {"name": "StrikeRate", "dataTypeId": "1"}, {
                            "name": "SweepingPosition",
                            "dataTypeId": "1"
                        }, {"name": "TotalLastDividendAmount", "dataTypeId": "1"}, {
                            "name": "TotalProfitLoss",
                            "dataTypeId": "1"
                        }, {"name": "TradedCleanPrice", "dataTypeId": "1"}, {
                            "name": "TradedDirtyPrice",
                            "dataTypeId": "1"
                        }, {"name": "TradedInterestInRepCcy", "dataTypeId": "1"}, {
                            "name": "TradedInterestInTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingForwardPrice", "dataTypeId": "1"}, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnsettledPremiumTxnCcy", "dataTypeId": "1"}, {
                            "name": "Vat",
                            "dataTypeId": "1"
                        }, {"name": "YieldToMaturity", "dataTypeId": "1"}, {
                            "name": "SecuritiesTransferTax",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:21,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "AccruedInterestRepCcy", "dataTypeId": "1"}, {
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "BaseCostDirty", "dataTypeId": "1"}, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesSettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesUnsettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerageNonVatable",
                            "dataTypeId": "1"
                        }, {"name": "BrokerageVatable", "dataTypeId": "1"}, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CallAccruedInterestTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashBalanceTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashPerCurrencyZAR",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashflowRealDivRepCcyAmt", "dataTypeId": "1"}, {
                            "name": "DailyExecutionFee",
                            "dataTypeId": "1"
                        }, {"name": "DailyExecutionFeeNoVAT", "dataTypeId": "1"}, {
                            "name": "DailyVAT",
                            "dataTypeId": "1"
                        }, {"name": "DealAmount", "dataTypeId": "1"}, {
                            "name": "DividendDivPayDay",
                            "dataTypeId": "1"
                        }, {"name": "Dividends", "dataTypeId": "1"}, {
                            "name": "EndCash",
                            "dataTypeId": "1"
                        }, {"name": "ExecutionCost", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "Fees",
                            "dataTypeId": "1"
                        }, {"name": "FeesSettled", "dataTypeId": "1"}, {
                            "name": "FeesUnsettled",
                            "dataTypeId": "1"
                        }, {"name": "Interest", "dataTypeId": "1"}, {
                            "name": "InvestorProtectionLevy",
                            "dataTypeId": "1"
                        }, {"name": "IsMidasSettlement", "dataTypeId": "1"}, {
                            "name": "ManufacturedDividendValue",
                            "dataTypeId": "1"
                        }, {"name": "NetConsideration", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Premium",
                            "dataTypeId": "1"
                        }, {"name": "PriceEndDate", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvUnsettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RegulatoryNotional",
                            "dataTypeId": "1"
                        }, {"name": "SecurityTransferTax", "dataTypeId": "1"}, {
                            "name": "SettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "StartCash", "dataTypeId": "1"}, {
                            "name": "StrikePrice",
                            "dataTypeId": "1"
                        }, {"name": "StrikeRate", "dataTypeId": "1"}, {
                            "name": "SweepingPosition",
                            "dataTypeId": "1"
                        }, {"name": "TotalLastDividendAmount", "dataTypeId": "1"}, {
                            "name": "TotalProfitLoss",
                            "dataTypeId": "1"
                        }, {"name": "TradedCleanPrice", "dataTypeId": "1"}, {
                            "name": "TradedDirtyPrice",
                            "dataTypeId": "1"
                        }, {"name": "TradedInterestInRepCcy", "dataTypeId": "1"}, {
                            "name": "TradedInterestInTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingForwardPrice", "dataTypeId": "1"}, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnsettledPremiumTxnCcy", "dataTypeId": "1"}, {
                            "name": "Vat",
                            "dataTypeId": "1"
                        }, {"name": "YieldToMaturity", "dataTypeId": "1"}, {
                            "name": "SecuritiesTransferTax",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:22,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "AcquireDate", "dataTypeId": "1"}, {
                            "name": "AcquirerName",
                            "dataTypeId": "1"
                        }, {"name": "AcquirerNumber", "dataTypeId": "1"}, {
                            "name": "AgriSiloLocation",
                            "dataTypeId": "1"
                        }, {"name": "AgriStatus", "dataTypeId": "1"}, {
                            "name": "AgriTransportDifferential",
                            "dataTypeId": "1"
                        }, {
                            "name": "ApproximateLoadDescription",
                            "dataTypeId": "1"
                        }, {"name": "ApproximateLoadIndicator", "dataTypeId": "1"}, {
                            "name": "ApproximateLoadPrice",
                            "dataTypeId": "1"
                        }, {"name": "ApproximateLoadQuantity", "dataTypeId": "1"}, {
                            "name": "BrokerBIC",
                            "dataTypeId": "1"
                        }, {"name": "BrokerName", "dataTypeId": "1"}, {
                            "name": "BrokerStatus",
                            "dataTypeId": "1"
                        }, {"name": "BuySell", "dataTypeId": "1"}, {
                            "name": "ClientFundName",
                            "dataTypeId": "1"
                        }, {"name": "ClsStatus", "dataTypeId": "1"}, {
                            "name": "ConnectedTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "ContractTradeNumber", "dataTypeId": "1"}, {
                            "name": "CorrectionTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterpartyName", "dataTypeId": "1"}, {
                            "name": "CounterpartyNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterPortfolioName", "dataTypeId": "1"}, {
                            "name": "CounterPortfolioNumber",
                            "dataTypeId": "1"
                        }, {"name": "CountryPortfolio", "dataTypeId": "1"}, {
                            "name": "CreateDateTime",
                            "dataTypeId": "1"
                        }, {"name": "CurrencyName", "dataTypeId": "1"}, {
                            "name": "DiscountType",
                            "dataTypeId": "1"
                        }, {"name": "DiscountingTypeChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "ExecutionDateTime",
                            "dataTypeId": "1"
                        }, {"name": "ExternalId", "dataTypeId": "1"}, {
                            "name": "FundingInsType",
                            "dataTypeId": "1"
                        }, {"name": "FullyFunded", "dataTypeId": "1"}, {
                            "name": "FxSubType",
                            "dataTypeId": "1"
                        }, {"name": "InsTypeOverrideName", "dataTypeId": "1"}, {
                            "name": "IsInternalSettlement",
                            "dataTypeId": "1"
                        }, {"name": "LastModifiedUserID", "dataTypeId": "1"}, {
                            "name": "MaturityDate",
                            "dataTypeId": "1"
                        }, {"name": "MentisProjectNumber", "dataTypeId": "1"}, {
                            "name": "MirrorTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "PortfolioName",
                            "dataTypeId": "1"
                        }, {"name": "PortfolioNumber", "dataTypeId": "1"}, {
                            "name": "Price",
                            "dataTypeId": "1"
                        }, {"name": "Quantity", "dataTypeId": "1"}, {
                            "name": "RelationshipPartyName",
                            "dataTypeId": "1"
                        }, {"name": "RwaCounterpartyName", "dataTypeId": "1"}, {
                            "name": "SourceCounterpartyName",
                            "dataTypeId": "1"
                        }, {"name": "SourceCounterpartyNumber", "dataTypeId": "1"}, {
                            "name": "SourceCounterpartySystem",
                            "dataTypeId": "1"
                        }, {"name": "SourceTradeId", "dataTypeId": "1"}, {
                            "name": "SourceTradeType",
                            "dataTypeId": "1"
                        }, {"name": "ShadowRevenueType", "dataTypeId": "1"}, {
                            "name": "SwiftMessageStatus",
                            "dataTypeId": "1"
                        }, {"name": "TerminatedTradeNumber", "dataTypeId": "1"}, {
                            "name": "TradeDateTime",
                            "dataTypeId": "1"
                        }, {"name": "TradeKey2ChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "TradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "TradePhase", "dataTypeId": "1"}, {
                            "name": "TradeType",
                            "dataTypeId": "1"
                        }, {"name": "TraderABNo", "dataTypeId": "1"}, {
                            "name": "TraderName",
                            "dataTypeId": "1"
                        }, {"name": "TraderNumber", "dataTypeId": "1"}, {
                            "name": "TradeStatus",
                            "dataTypeId": "1"
                        }, {"name": "TransactionTradeNumber", "dataTypeId": "1"}, {
                            "name": "UpdateUserABNo",
                            "dataTypeId": "1"
                        }, {"name": "UpdateUserName", "dataTypeId": "1"}, {
                            "name": "UpdateDateTime",
                            "dataTypeId": "1"
                        }, {"name": "ValueDate", "dataTypeId": "1"}, {
                            "name": "VersionId",
                            "dataTypeId": "1"
                        }, {"name": "VolatilityStrike", "dataTypeId": "1"}, {
                            "name": "XtpJseRef",
                            "dataTypeId": "1"
                        }, {"name": "XtpTradeTypeValue", "dataTypeId": "1"}, {
                            "name": "YourRef",
                            "dataTypeId": "1"
                        }, {"name": "ReferencePrice", "dataTypeId": "1"}, {
                            "name": "ClearedTrade",
                            "dataTypeId": "1"
                        }, {"name": "ClrClearingBroker", "dataTypeId": "1"}, {
                            "name": "ClrBrokerTradeId",
                            "dataTypeId": "1"
                        }, {"name": "ClearingMemberCode", "dataTypeId": "1"}, {
                            "name": "ClearingHouseId",
                            "dataTypeId": "1"
                        }, {"name": "CentralCounterparty", "dataTypeId": "1"}, {
                            "name": "CcpStatus",
                            "dataTypeId": "1"
                        }, {"name": "CcpClearingStatus", "dataTypeId": "1"}, {
                            "name": "CcpClearingHouseId",
                            "dataTypeId": "1"
                        }, {"name": "OriginalMarkitWireTradeId", "dataTypeId": "1"}, {
                            "name": "OriginalCounterparty",
                            "dataTypeId": "1"
                        }, {"name": "MarkitWireTradeId", "dataTypeId": "1"}, {
                            "name": "CounterpartySdsId",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:23,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "CreateDateTime", "dataTypeId": "1"}, {
                            "name": "CashflowNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterpartyName", "dataTypeId": "1"}, {
                            "name": "CounterpartyNumber",
                            "dataTypeId": "1"
                        }, {"name": "CurrencyName", "dataTypeId": "1"}, {
                            "name": "CurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "FixedRate",
                            "dataTypeId": "1"
                        }, {"name": "ForwardRate", "dataTypeId": "1"}, {
                            "name": "LegNumber",
                            "dataTypeId": "1"
                        }, {"name": "NominalFactor", "dataTypeId": "1"}, {
                            "name": "PayDate",
                            "dataTypeId": "1"
                        }, {"name": "ProjectedTxnCcy", "dataTypeId": "1"}, {
                            "name": "ProjectedRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "SourceObjectUpdateUserName", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "Text", "dataTypeId": "1"}, {
                            "name": "Type",
                            "dataTypeId": "1"
                        }, {"name": "UpdateTime", "dataTypeId": "1"}, {"name": "UpdateUserName", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:24,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "23", "nullable": true}
                ]
            },
            {
                "id": "ln_ds-uuid-28",
                "sparkVer": "2.2.1",
                "appId": "ln_ds-uuid-28",
                appName: "Foo Bar Application",
                attributes: [{
                    "id": "attr-uuid-67",
                    "name": "EnterpriseProductMappingId",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-68",
                    "name": "ProductMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-69",
                    "name": "ProductSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-70",
                    "name": "MoneyMarketInstrumentType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-73",
                    "name": "OTCOverride",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-71",
                    "name": "AdditionalInstrumentOverride",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-72",
                    "name": "FundingInstrumentType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-74",
                    "name": "EnterpriseProduct",
                    "dataTypeId": "1"
                }],
                datasets: [{
                    "id": "ds-uuid-28",
                    "schema": {"attrs": ["attr-uuid-67", "attr-uuid-68", "attr-uuid-69", "attr-uuid-70", "attr-uuid-71", "attr-uuid-72", "attr-uuid-73", "attr-uuid-74"]}
                }],
                operations: [{
                    "_typeHint": "za.co.absa.spline.model.op.Write",
                    "mainProps": {
                        "id": "op-uuid-1-a4",
                        "name": "SaveIntoDataSourceCommand",
                        "inputs": ["ds-uuid-28"],
                        "output": "ds-uuid-28"
                    },
                    "destinationType": "parquet",
                    "path": "data/Conformance/ConformedData"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Read",
                    "mainProps": {
                        "id": "op-uuid-30-a4",
                        "name": "LogicalRelation",
                        "inputs": [],
                        "output": "ds-uuid-28"
                    },
                    "sourceType": "CSV",
                    "sources": [{"path": "file:/C:/git/lineage/sample/data/Conformance/EnterpriseProductMapping.txt"}]
                }],
                dataTypes: [
                    {id:1, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true},
                    {id:2, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "decimal(38,10)", "nullable": true},
                    {id:3, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "boolean", "nullable": true},
                    {id:4, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "boolean", "nullable": false},
                    {id:5, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true},
                    {id:6, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "long", "nullable": false},
                    {id:7,
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{"name": "salescreditsubteamname", "dataTypeId": "1"}, {
                            "name": "salespersonname",
                            "dataTypeId": "1"
                        }, {"name": "standardsalescredit", "dataTypeId": "1"}, {
                            "name": "totalvalueaddsalescredit",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:8,
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "Isin",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentAddress", "dataTypeId": "1"}, {
                            "name": "InstrumentName",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentType", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "ParentInstrumentAddress",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:9,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "1", "nullable": true},
                    {id:10,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "7", "nullable": true},
                    {id:11,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "8", "nullable": true},
                    {id:12,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "initial", "dataTypeId": "9"}, {"name": "lastName", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:13,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "12", "nullable": true},
                    {id:14,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "Barrier", "dataTypeId": "1"}, {
                            "name": "BarrierEndDate",
                            "dataTypeId": "1"
                        }, {"name": "BarrierMonitoring", "dataTypeId": "1"}, {
                            "name": "BarrierOptionType",
                            "dataTypeId": "1"
                        }, {"name": "BarrierStartDate", "dataTypeId": "1"}, {
                            "name": "CallPut",
                            "dataTypeId": "1"
                        }, {"name": "ContractSize", "dataTypeId": "1"}, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "CommoditySubAssetsChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "Digital", "dataTypeId": "1"}, {
                            "name": "DomesticCurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "DoubleBarrier", "dataTypeId": "1"}, {
                            "name": "EndDateTime",
                            "dataTypeId": "1"
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataTypeId": "1"
                        }, {"name": "ExoticDigitalBarrierType", "dataTypeId": "1"}, {
                            "name": "ExoticRebateName",
                            "dataTypeId": "1"
                        }, {"name": "ExoticRebateNumber", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "ExternalId1",
                            "dataTypeId": "1"
                        }, {"name": "ForeignCurrencyName", "dataTypeId": "1"}, {
                            "name": "FxOptionType",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentAddress",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentName", "dataTypeId": "1"}, {
                            "name": "InstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "IsCurrency", "dataTypeId": "1"}, {
                            "name": "IsExpired",
                            "dataTypeId": "1"
                        }, {"name": "Isin", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "Legs",
                            "dataTypeId": "16"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "OptionExerciseType", "dataTypeId": "1"}, {
                            "name": "OptionExoticType",
                            "dataTypeId": "1"
                        }, {"name": "Otc", "dataTypeId": "1"}, {
                            "name": "PayDayOffset",
                            "dataTypeId": "1"
                        }, {"name": "PayOffsetMethod", "dataTypeId": "1"}, {
                            "name": "PayType",
                            "dataTypeId": "1"
                        }, {"name": "QuoteType", "dataTypeId": "1"}, {
                            "name": "Rate",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RefValue",
                            "dataTypeId": "1"
                        }, {"name": "Rebate", "dataTypeId": "1"}, {
                            "name": "ReferencePrice",
                            "dataTypeId": "1"
                        }, {"name": "SettlementType", "dataTypeId": "1"}, {
                            "name": "SettlementDateTime",
                            "dataTypeId": "1"
                        }, {"name": "SpotBankingDayOffset", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "StrikeCurrencyName", "dataTypeId": "1"}, {
                            "name": "StrikeCurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "TxnMaturityPeriod", "dataTypeId": "1"}, {
                            "name": "UnderlyingInstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingInstruments", "dataTypeId": "18"}, {
                            "name": "ValuationGroupName",
                            "dataTypeId": "1"
                        }, {"name": "FixingSourceName", "dataTypeId": "1"}, {
                            "name": "Seniority",
                            "dataTypeId": "1"
                        }, {"name": "VersionId", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:15,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "Barrier", "dataTypeId": "1"}, {
                            "name": "BarrierEndDate",
                            "dataTypeId": "1"
                        }, {"name": "BarrierMonitoring", "dataTypeId": "1"}, {
                            "name": "BarrierOptionType",
                            "dataTypeId": "1"
                        }, {"name": "BarrierStartDate", "dataTypeId": "1"}, {
                            "name": "CallPut",
                            "dataTypeId": "1"
                        }, {"name": "ContractSize", "dataTypeId": "1"}, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "CommoditySubAssetsChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "Digital", "dataTypeId": "1"}, {
                            "name": "DomesticCurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "DoubleBarrier", "dataTypeId": "1"}, {
                            "name": "EndDateTime",
                            "dataTypeId": "1"
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataTypeId": "1"
                        }, {"name": "ExoticDigitalBarrierType", "dataTypeId": "1"}, {
                            "name": "ExoticRebateName",
                            "dataTypeId": "1"
                        }, {"name": "ExoticRebateNumber", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "ExternalId1",
                            "dataTypeId": "1"
                        }, {"name": "ForeignCurrencyName", "dataTypeId": "1"}, {
                            "name": "FxOptionType",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentAddress",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentName", "dataTypeId": "1"}, {
                            "name": "InstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "IsCurrency", "dataTypeId": "1"}, {
                            "name": "IsExpired",
                            "dataTypeId": "1"
                        }, {"name": "Isin", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "Legs",
                            "dataTypeId": "16"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "OptionExerciseType", "dataTypeId": "1"}, {
                            "name": "OptionExoticType",
                            "dataTypeId": "1"
                        }, {"name": "Otc", "dataTypeId": "1"}, {
                            "name": "PayDayOffset",
                            "dataTypeId": "1"
                        }, {"name": "PayOffsetMethod", "dataTypeId": "1"}, {
                            "name": "PayType",
                            "dataTypeId": "1"
                        }, {"name": "QuoteType", "dataTypeId": "1"}, {
                            "name": "Rate",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RefValue",
                            "dataTypeId": "1"
                        }, {"name": "Rebate", "dataTypeId": "1"}, {
                            "name": "ReferencePrice",
                            "dataTypeId": "1"
                        }, {"name": "SettlementType", "dataTypeId": "1"}, {
                            "name": "SettlementDateTime",
                            "dataTypeId": "1"
                        }, {"name": "SpotBankingDayOffset", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "StrikeCurrencyName", "dataTypeId": "1"}, {
                            "name": "StrikeCurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "TxnMaturityPeriod", "dataTypeId": "1"}, {
                            "name": "UnderlyingInstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingInstruments", "dataTypeId": "11"}, {
                            "name": "ValuationGroupName",
                            "dataTypeId": "1"
                        }, {"name": "FixingSourceName", "dataTypeId": "1"}, {
                            "name": "Seniority",
                            "dataTypeId": "1"
                        }, {"name": "VersionId", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:16,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "17", "nullable": true},
                    {id:17,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "AccruedDiscountBalanceRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "Carry",
                            "dataTypeId": "1"
                        }, {"name": "CleanConsideration", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "CurrentRate", "dataTypeId": "1"}, {
                            "name": "CurrentSpread",
                            "dataTypeId": "1"
                        }, {"name": "DayCountMethod", "dataTypeId": "1"}, {
                            "name": "EndDate",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FixedRate", "dataTypeId": "1"}, {
                            "name": "FloatRateReferenceName",
                            "dataTypeId": "1"
                        }, {"name": "FloatRateSpread", "dataTypeId": "1"}, {
                            "name": "IsPayLeg",
                            "dataTypeId": "1"
                        }, {"name": "LastResetDate", "dataTypeId": "1"}, {
                            "name": "LegFloatRateFactor",
                            "dataTypeId": "1"
                        }, {"name": "LegNumber", "dataTypeId": "1"}, {
                            "name": "LegStartDate",
                            "dataTypeId": "1"
                        }, {"name": "LegType", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Price",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "RepoRate", "dataTypeId": "1"}, {"name": "RollingPeriod", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:18,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "19", "nullable": true},
                    {id:19,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "Isin",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentAddress", "dataTypeId": "1"}, {
                            "name": "InstrumentName",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentType", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "ParentInstrumentAddress",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:20,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "2"
                        }, {"name": "AccruedInterestRepCcy", "dataTypeId": "2"}, {
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "2"
                        }, {"name": "BaseCostDirty", "dataTypeId": "1"}, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesSettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesUnsettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerageNonVatable",
                            "dataTypeId": "1"
                        }, {"name": "BrokerageVatable", "dataTypeId": "1"}, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CallAccruedInterestTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashBalanceTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashPerCurrencyZAR",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashflowRealDivRepCcyAmt", "dataTypeId": "1"}, {
                            "name": "DailyExecutionFee",
                            "dataTypeId": "1"
                        }, {"name": "DailyExecutionFeeNoVAT", "dataTypeId": "1"}, {
                            "name": "DailyVAT",
                            "dataTypeId": "1"
                        }, {"name": "DealAmount", "dataTypeId": "1"}, {
                            "name": "DividendDivPayDay",
                            "dataTypeId": "1"
                        }, {"name": "Dividends", "dataTypeId": "1"}, {
                            "name": "EndCash",
                            "dataTypeId": "1"
                        }, {"name": "ExecutionCost", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "Fees",
                            "dataTypeId": "1"
                        }, {"name": "FeesSettled", "dataTypeId": "1"}, {
                            "name": "FeesUnsettled",
                            "dataTypeId": "1"
                        }, {"name": "Interest", "dataTypeId": "1"}, {
                            "name": "InvestorProtectionLevy",
                            "dataTypeId": "1"
                        }, {"name": "IsMidasSettlement", "dataTypeId": "1"}, {
                            "name": "ManufacturedDividendValue",
                            "dataTypeId": "1"
                        }, {"name": "NetConsideration", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Premium",
                            "dataTypeId": "1"
                        }, {"name": "PriceEndDate", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvUnsettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RegulatoryNotional",
                            "dataTypeId": "1"
                        }, {"name": "SecurityTransferTax", "dataTypeId": "1"}, {
                            "name": "SettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "StartCash", "dataTypeId": "1"}, {
                            "name": "StrikePrice",
                            "dataTypeId": "1"
                        }, {"name": "StrikeRate", "dataTypeId": "1"}, {
                            "name": "SweepingPosition",
                            "dataTypeId": "1"
                        }, {"name": "TotalLastDividendAmount", "dataTypeId": "1"}, {
                            "name": "TotalProfitLoss",
                            "dataTypeId": "1"
                        }, {"name": "TradedCleanPrice", "dataTypeId": "1"}, {
                            "name": "TradedDirtyPrice",
                            "dataTypeId": "1"
                        }, {"name": "TradedInterestInRepCcy", "dataTypeId": "1"}, {
                            "name": "TradedInterestInTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingForwardPrice", "dataTypeId": "1"}, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnsettledPremiumTxnCcy", "dataTypeId": "1"}, {
                            "name": "Vat",
                            "dataTypeId": "1"
                        }, {"name": "YieldToMaturity", "dataTypeId": "1"}, {
                            "name": "SecuritiesTransferTax",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:21,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "AccruedInterestRepCcy", "dataTypeId": "1"}, {
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "BaseCostDirty", "dataTypeId": "1"}, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesSettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesUnsettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerageNonVatable",
                            "dataTypeId": "1"
                        }, {"name": "BrokerageVatable", "dataTypeId": "1"}, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CallAccruedInterestTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashBalanceTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashPerCurrencyZAR",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashflowRealDivRepCcyAmt", "dataTypeId": "1"}, {
                            "name": "DailyExecutionFee",
                            "dataTypeId": "1"
                        }, {"name": "DailyExecutionFeeNoVAT", "dataTypeId": "1"}, {
                            "name": "DailyVAT",
                            "dataTypeId": "1"
                        }, {"name": "DealAmount", "dataTypeId": "1"}, {
                            "name": "DividendDivPayDay",
                            "dataTypeId": "1"
                        }, {"name": "Dividends", "dataTypeId": "1"}, {
                            "name": "EndCash",
                            "dataTypeId": "1"
                        }, {"name": "ExecutionCost", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "Fees",
                            "dataTypeId": "1"
                        }, {"name": "FeesSettled", "dataTypeId": "1"}, {
                            "name": "FeesUnsettled",
                            "dataTypeId": "1"
                        }, {"name": "Interest", "dataTypeId": "1"}, {
                            "name": "InvestorProtectionLevy",
                            "dataTypeId": "1"
                        }, {"name": "IsMidasSettlement", "dataTypeId": "1"}, {
                            "name": "ManufacturedDividendValue",
                            "dataTypeId": "1"
                        }, {"name": "NetConsideration", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Premium",
                            "dataTypeId": "1"
                        }, {"name": "PriceEndDate", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvUnsettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RegulatoryNotional",
                            "dataTypeId": "1"
                        }, {"name": "SecurityTransferTax", "dataTypeId": "1"}, {
                            "name": "SettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "StartCash", "dataTypeId": "1"}, {
                            "name": "StrikePrice",
                            "dataTypeId": "1"
                        }, {"name": "StrikeRate", "dataTypeId": "1"}, {
                            "name": "SweepingPosition",
                            "dataTypeId": "1"
                        }, {"name": "TotalLastDividendAmount", "dataTypeId": "1"}, {
                            "name": "TotalProfitLoss",
                            "dataTypeId": "1"
                        }, {"name": "TradedCleanPrice", "dataTypeId": "1"}, {
                            "name": "TradedDirtyPrice",
                            "dataTypeId": "1"
                        }, {"name": "TradedInterestInRepCcy", "dataTypeId": "1"}, {
                            "name": "TradedInterestInTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingForwardPrice", "dataTypeId": "1"}, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnsettledPremiumTxnCcy", "dataTypeId": "1"}, {
                            "name": "Vat",
                            "dataTypeId": "1"
                        }, {"name": "YieldToMaturity", "dataTypeId": "1"}, {
                            "name": "SecuritiesTransferTax",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:22,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "AcquireDate", "dataTypeId": "1"}, {
                            "name": "AcquirerName",
                            "dataTypeId": "1"
                        }, {"name": "AcquirerNumber", "dataTypeId": "1"}, {
                            "name": "AgriSiloLocation",
                            "dataTypeId": "1"
                        }, {"name": "AgriStatus", "dataTypeId": "1"}, {
                            "name": "AgriTransportDifferential",
                            "dataTypeId": "1"
                        }, {
                            "name": "ApproximateLoadDescription",
                            "dataTypeId": "1"
                        }, {"name": "ApproximateLoadIndicator", "dataTypeId": "1"}, {
                            "name": "ApproximateLoadPrice",
                            "dataTypeId": "1"
                        }, {"name": "ApproximateLoadQuantity", "dataTypeId": "1"}, {
                            "name": "BrokerBIC",
                            "dataTypeId": "1"
                        }, {"name": "BrokerName", "dataTypeId": "1"}, {
                            "name": "BrokerStatus",
                            "dataTypeId": "1"
                        }, {"name": "BuySell", "dataTypeId": "1"}, {
                            "name": "ClientFundName",
                            "dataTypeId": "1"
                        }, {"name": "ClsStatus", "dataTypeId": "1"}, {
                            "name": "ConnectedTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "ContractTradeNumber", "dataTypeId": "1"}, {
                            "name": "CorrectionTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterpartyName", "dataTypeId": "1"}, {
                            "name": "CounterpartyNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterPortfolioName", "dataTypeId": "1"}, {
                            "name": "CounterPortfolioNumber",
                            "dataTypeId": "1"
                        }, {"name": "CountryPortfolio", "dataTypeId": "1"}, {
                            "name": "CreateDateTime",
                            "dataTypeId": "1"
                        }, {"name": "CurrencyName", "dataTypeId": "1"}, {
                            "name": "DiscountType",
                            "dataTypeId": "1"
                        }, {"name": "DiscountingTypeChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "ExecutionDateTime",
                            "dataTypeId": "1"
                        }, {"name": "ExternalId", "dataTypeId": "1"}, {
                            "name": "FundingInsType",
                            "dataTypeId": "1"
                        }, {"name": "FullyFunded", "dataTypeId": "1"}, {
                            "name": "FxSubType",
                            "dataTypeId": "1"
                        }, {"name": "InsTypeOverrideName", "dataTypeId": "1"}, {
                            "name": "IsInternalSettlement",
                            "dataTypeId": "1"
                        }, {"name": "LastModifiedUserID", "dataTypeId": "1"}, {
                            "name": "MaturityDate",
                            "dataTypeId": "1"
                        }, {"name": "MentisProjectNumber", "dataTypeId": "1"}, {
                            "name": "MirrorTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "PortfolioName",
                            "dataTypeId": "1"
                        }, {"name": "PortfolioNumber", "dataTypeId": "1"}, {
                            "name": "Price",
                            "dataTypeId": "1"
                        }, {"name": "Quantity", "dataTypeId": "1"}, {
                            "name": "RelationshipPartyName",
                            "dataTypeId": "1"
                        }, {"name": "RwaCounterpartyName", "dataTypeId": "1"}, {
                            "name": "SourceCounterpartyName",
                            "dataTypeId": "1"
                        }, {"name": "SourceCounterpartyNumber", "dataTypeId": "1"}, {
                            "name": "SourceCounterpartySystem",
                            "dataTypeId": "1"
                        }, {"name": "SourceTradeId", "dataTypeId": "1"}, {
                            "name": "SourceTradeType",
                            "dataTypeId": "1"
                        }, {"name": "ShadowRevenueType", "dataTypeId": "1"}, {
                            "name": "SwiftMessageStatus",
                            "dataTypeId": "1"
                        }, {"name": "TerminatedTradeNumber", "dataTypeId": "1"}, {
                            "name": "TradeDateTime",
                            "dataTypeId": "1"
                        }, {"name": "TradeKey2ChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "TradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "TradePhase", "dataTypeId": "1"}, {
                            "name": "TradeType",
                            "dataTypeId": "1"
                        }, {"name": "TraderABNo", "dataTypeId": "1"}, {
                            "name": "TraderName",
                            "dataTypeId": "1"
                        }, {"name": "TraderNumber", "dataTypeId": "1"}, {
                            "name": "TradeStatus",
                            "dataTypeId": "1"
                        }, {"name": "TransactionTradeNumber", "dataTypeId": "1"}, {
                            "name": "UpdateUserABNo",
                            "dataTypeId": "1"
                        }, {"name": "UpdateUserName", "dataTypeId": "1"}, {
                            "name": "UpdateDateTime",
                            "dataTypeId": "1"
                        }, {"name": "ValueDate", "dataTypeId": "1"}, {
                            "name": "VersionId",
                            "dataTypeId": "1"
                        }, {"name": "VolatilityStrike", "dataTypeId": "1"}, {
                            "name": "XtpJseRef",
                            "dataTypeId": "1"
                        }, {"name": "XtpTradeTypeValue", "dataTypeId": "1"}, {
                            "name": "YourRef",
                            "dataTypeId": "1"
                        }, {"name": "ReferencePrice", "dataTypeId": "1"}, {
                            "name": "ClearedTrade",
                            "dataTypeId": "1"
                        }, {"name": "ClrClearingBroker", "dataTypeId": "1"}, {
                            "name": "ClrBrokerTradeId",
                            "dataTypeId": "1"
                        }, {"name": "ClearingMemberCode", "dataTypeId": "1"}, {
                            "name": "ClearingHouseId",
                            "dataTypeId": "1"
                        }, {"name": "CentralCounterparty", "dataTypeId": "1"}, {
                            "name": "CcpStatus",
                            "dataTypeId": "1"
                        }, {"name": "CcpClearingStatus", "dataTypeId": "1"}, {
                            "name": "CcpClearingHouseId",
                            "dataTypeId": "1"
                        }, {"name": "OriginalMarkitWireTradeId", "dataTypeId": "1"}, {
                            "name": "OriginalCounterparty",
                            "dataTypeId": "1"
                        }, {"name": "MarkitWireTradeId", "dataTypeId": "1"}, {
                            "name": "CounterpartySdsId",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:23,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "CreateDateTime", "dataTypeId": "1"}, {
                            "name": "CashflowNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterpartyName", "dataTypeId": "1"}, {
                            "name": "CounterpartyNumber",
                            "dataTypeId": "1"
                        }, {"name": "CurrencyName", "dataTypeId": "1"}, {
                            "name": "CurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "FixedRate",
                            "dataTypeId": "1"
                        }, {"name": "ForwardRate", "dataTypeId": "1"}, {
                            "name": "LegNumber",
                            "dataTypeId": "1"
                        }, {"name": "NominalFactor", "dataTypeId": "1"}, {
                            "name": "PayDate",
                            "dataTypeId": "1"
                        }, {"name": "ProjectedTxnCcy", "dataTypeId": "1"}, {
                            "name": "ProjectedRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "SourceObjectUpdateUserName", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "Text", "dataTypeId": "1"}, {
                            "name": "Type",
                            "dataTypeId": "1"
                        }, {"name": "UpdateTime", "dataTypeId": "1"}, {"name": "UpdateUserName", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:24,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "23", "nullable": true}
                ]
            }
        ],

        "_dataset-lineage-overview": [
            {
                "id": "a38e44ec-bfea-4048-bf21-a9060dbbbb25",
                "appId": "",
                "appName": "",
                "timestamp": 0,
                "sparkVer": "",
                "operations": [
                    {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        "mainProps": {
                            "id": "5fc0b171-94c4-4ab4-93a5-0658c9560622",
                            "name": "Jan's Beer Job",
                            "inputs": [],
                            "output": "5fc0b171-94c4-4ab4-93a5-0658c9560622"
                        },
                        "sources": [{
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/beerConsum.csv",
                            "datasetsIds": []
                        }, {
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/population.csv",
                            "datasetsIds": []
                        }],
                        "destination": {
                            "type": "parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                            "datasetsIds": ["5fc0b171-94c4-4ab4-93a5-0658c9560622"]
                        },
                        "timestamp": 1520949141083,
                        "sparkVer": "2.2.1",
                        "appId": "local-1520949132164",
                        "appName": "Jan's Beer Job"
                    },
                    {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        "mainProps": {
                            "id": "f7e1e9d3-5d34-4778-9071-0e1967facdc6",
                            "name": "Crazy Job",
                            "inputs": ["ba86ac19-e211-4469-97f2-8efa6bc83806", "68da2924-4b5f-4e7f-9abe-f38c6b567659", "030ab235-01a0-45c4-b08b-3e60b5fa1542", "96a20517-0e25-4a96-af75-4131422b3964"],
                            "output": "f7e1e9d3-5d34-4778-9071-0e1967facdc6"
                        },
                        "sources": [{
                            "type": "Parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                            "datasetsIds": ["ba86ac19-e211-4469-97f2-8efa6bc83806", "68da2924-4b5f-4e7f-9abe-f38c6b567659", "030ab235-01a0-45c4-b08b-3e60b5fa1542"]
                        }, {
                            "type": "Parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/gdpPerCapitaUSD",
                            "datasetsIds": ["96a20517-0e25-4a96-af75-4131422b3964"]
                        }],
                        "destination": {
                            "type": "parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/crazyJobResults",
                            "datasetsIds": ["f7e1e9d3-5d34-4778-9071-0e1967facdc6"]
                        },
                        "sparkVer": "2.2.1",
                        "timestamp": 1520942324401,
                        "appId": "local-1520942314349",
                        "appName": "Crazy Job"
                    },
                    {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        "mainProps": {
                            "id": "030ab235-01a0-45c4-b08b-3e60b5fa1542",
                            "name": "Jan's Beer Job",
                            "inputs": [],
                            "output": "030ab235-01a0-45c4-b08b-3e60b5fa1542"
                        },
                        "sources": [{
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/beerConsum.csv",
                            "datasetsIds": []
                        }, {
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/population.csv",
                            "datasetsIds": []
                        }],
                        "destination": {
                            "type": "parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                            "datasetsIds": ["030ab235-01a0-45c4-b08b-3e60b5fa1542"]
                        },
                        "sparkVer": "2.2.1",
                        "timestamp": 1520942288616,
                        "appId": "local-1520942279474",
                        "appName": "Jan's Beer Job"
                    },
                    {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        "mainProps": {
                            "id": "96a20517-0e25-4a96-af75-4131422b3964",
                            "name": "Marek's Job",
                            "inputs": ["ba86ac19-e211-4469-97f2-8efa6bc83806", "68da2924-4b5f-4e7f-9abe-f38c6b567659"],
                            "output": "96a20517-0e25-4a96-af75-4131422b3964"
                        },
                        "sources": [{
                            "type": "Parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                            "datasetsIds": ["ba86ac19-e211-4469-97f2-8efa6bc83806", "68da2924-4b5f-4e7f-9abe-f38c6b567659"]
                        }, {
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/devIndicators.csv",
                            "datasetsIds": []
                        }],
                        "destination": {
                            "type": "parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/gdpPerCapitaUSD",
                            "datasetsIds": ["96a20517-0e25-4a96-af75-4131422b3964"]
                        },
                        "sparkVer": "2.2.1",
                        "timestamp": 1520942263099,
                        "appId": "local-1520942252952",
                        "appName": "Marek's Job"
                    },
                    {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        "mainProps": {
                            "id": "5c43a06f-4e0f-4809-af30-f2177949e405",
                            "name": "Jan's Beer Job",
                            "inputs": [],
                            "output": "5c43a06f-4e0f-4809-af30-f2177949e405"
                        },
                        "sources": [{
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/beerConsum.csv",
                            "datasetsIds": []
                        }, {
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/population.csv",
                            "datasetsIds": []
                        }],
                        "destination": {
                            "type": "parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                            "datasetsIds": ["5c43a06f-4e0f-4809-af30-f2177949e405"]
                        },
                        "sparkVer": "2.2.1",
                        "timestamp": 1520949075188,
                        "appId": "local-1520949065741",
                        "appName": "Jan's Beer Job"
                    },
                    {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        "mainProps": {
                            "id": "a38e44ec-bfea-4048-bf21-a9060dbbbb25",
                            "name": "Crazy Job",
                            "inputs": ["5c43a06f-4e0f-4809-af30-f2177949e405", "5fc0b171-94c4-4ab4-93a5-0658c9560622", "96a20517-0e25-4a96-af75-4131422b3964"],
                            "output": "a38e44ec-bfea-4048-bf21-a9060dbbbb25"
                        },
                        "sources": [{
                            "type": "Parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                            "datasetsIds": ["5c43a06f-4e0f-4809-af30-f2177949e405", "5fc0b171-94c4-4ab4-93a5-0658c9560622"]
                        }, {
                            "type": "Parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/gdpPerCapitaUSD",
                            "datasetsIds": ["96a20517-0e25-4a96-af75-4131422b3964"]
                        }],
                        "destination": {
                            "type": "parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/crazyJobResults",
                            "datasetsIds": ["a38e44ec-bfea-4048-bf21-a9060dbbbb25"]
                        },
                        "sparkVer": "2.2.1",
                        "timestamp": 1520949162367,
                        "appId": "local-1520949152836",
                        "appName": "Crazy Job"
                    },
                    {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        "mainProps": {
                            "id": "ba86ac19-e211-4469-97f2-8efa6bc83806",
                            "name": "Jan's Beer Job",
                            "inputs": [],
                            "output": "ba86ac19-e211-4469-97f2-8efa6bc83806"
                        },
                        "sources": [{
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/beerConsum.csv",
                            "datasetsIds": []
                        }, {
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/population.csv",
                            "datasetsIds": []
                        }],
                        "destination": {
                            "type": "parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                            "datasetsIds": ["ba86ac19-e211-4469-97f2-8efa6bc83806"]
                        },
                        "sparkVer": "2.2.1",
                        "timestamp": 1520942201317,
                        "appId": "local-1520942190577",
                        "appName": "Jan's Beer Job"
                    },
                    {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        "mainProps": {
                            "id": "68da2924-4b5f-4e7f-9abe-f38c6b567659",
                            "name": "Jan's Beer Job",
                            "inputs": [],
                            "output": "68da2924-4b5f-4e7f-9abe-f38c6b567659"
                        },
                        "sources": [{
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/beerConsum.csv",
                            "datasetsIds": []
                        }, {
                            "type": "CSV",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/population.csv",
                            "datasetsIds": []
                        }],
                        "destination": {
                            "type": "parquet",
                            "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                            "datasetsIds": ["68da2924-4b5f-4e7f-9abe-f38c6b567659"]
                        },
                        "sparkVer": "2.2.1",
                        "timestamp": 1520942214734,
                        "appId": "local-1520942202977",
                        "appName": "Jan's Beer Job"
                    }
                ],
                "datasets": [
                    {
                        "id": "a38e44ec-bfea-4048-bf21-a9060dbbbb25",
                        "schema": {"attrs": ["66ca6862-f0ef-478b-b458-29515e9bd3be", "6b13f128-08d1-4baf-8cee-79e4bbbbf6d7"]}
                    },
                    {
                        "id": "68da2924-4b5f-4e7f-9abe-f38c6b567659",
                        "schema": {"attrs": ["224ae7ac-50f4-4d59-8e0e-431e4c857d91", "013ed171-7c6a-47c0-aedd-40d1024b06ad", "199565d4-7bb3-424d-97f2-57cf5efe58c6", "49cc3f95-d7ea-4928-a7d0-736b3a0fd6e0", "6253012b-16fb-417d-b35b-6ef35140f8c1", "1a53028b-faf2-4015-8f80-b425d68ddb0c", "9b962f2e-c627-4800-a4c5-9eef7ab4ea0f", "a735eedc-7c05-485d-8bc3-4d3832e7b39e", "6bc3da76-11b1-4848-9b0e-b88bb7e0f19b", "7a7e36a6-b33d-4ce9-96cd-4cde130bf29b", "b7ebc914-bd03-4e2d-8ca5-e28c85c16c58"]}
                    },
                    {
                        "id": "f7e1e9d3-5d34-4778-9071-0e1967facdc6",
                        "schema": {"attrs": ["8999badb-abbb-4d54-bc25-b69494245536", "eec00683-4f45-48a9-9e7c-b13b5ba3b85c"]}
                    },
                    {
                        "id": "5fc0b171-94c4-4ab4-93a5-0658c9560622",
                        "schema": {"attrs": ["714c09c4-95d5-4096-a5ce-187533038df9", "d862aae5-516f-4a26-a7a6-3ba58d7abdc4", "5f50782f-e228-4ff3-a887-f42e60f50ba4", "5f368b7a-cfdf-4948-b70c-ad29a8196040", "2475916b-3389-4b74-8819-565971aaf8ba", "5080e23c-8815-4154-8c14-71ffe6dc8eea", "6d2ce22f-d65c-4d81-98de-3cbf3fa6a20a", "b44aa868-b04b-48aa-8a27-4fee5f80baa2", "80e2b551-a00e-49f9-aeb9-5f833ea3e371", "4894fc0d-6293-4e61-9363-a7f5e0b4b353", "6fd56356-1673-4ec2-9803-12f2c2a28c9c"]}
                    },
                    {
                        "id": "96a20517-0e25-4a96-af75-4131422b3964",
                        "schema": {"attrs": ["91826bf9-676f-45da-aa2e-495f0b53e064", "c66dfea6-b57a-4b33-9aaa-9869f9075107", "94db3e82-eadd-46f3-a2ab-a3ef5bcf166a"]}
                    },
                    {
                        "id": "5c43a06f-4e0f-4809-af30-f2177949e405",
                        "schema": {"attrs": ["e9fac386-5ebb-4ef0-9645-d90dd91c5abd", "ea076a99-5375-4053-a14a-f6c69443d17f", "2c87271a-072a-4590-a49c-9e46f464a259", "cc01482f-eede-4105-9e7a-154dcd916c2e", "0571f1c9-6d5d-4036-9b95-0e9a9deb4ccd", "589d5edc-6633-45fa-af33-a6f7bdf22e13", "ebee3c8a-8ec2-4388-be06-6f410c22aa39", "0b89ed15-3edd-4e58-8ada-ad8ac94018e3", "174d87bf-dbc9-4cae-8764-728c009e5bd7", "87d906bd-fe80-4119-a88a-2fe84add729d", "df0e200b-7fbe-4864-8e3d-3c6582397dc7"]}
                    },
                    {
                        "id": "030ab235-01a0-45c4-b08b-3e60b5fa1542",
                        "schema": {"attrs": ["c2f83cff-dde5-43b7-8a75-2c5f074571e4", "b4ba24d7-bd89-483a-8423-d14a50b589da", "c8bd501a-1789-473c-8b8d-84ed3ad59711", "7efc76c2-b9ff-4317-a774-884d67d19a1d", "05d2415a-39b8-4857-8b35-265f9502a759", "e7314dea-5383-491b-bdee-2323d9721e35", "4f3fd2d8-5fb2-46e0-88be-bf80761e9fc2", "6f5e4334-a8aa-4328-bf2a-856373bb9bc6", "c89499ed-32e9-4397-b5c3-1f0662541586", "6ee059d0-3d43-4d2a-989b-071a8797548a", "13c4236a-171c-4ae5-aca7-6ea260c301ea"]}
                    },
                    {
                        "id": "ba86ac19-e211-4469-97f2-8efa6bc83806",
                        "schema": {"attrs": ["a8679379-1a3b-4855-8b19-2aba9f7c9ad6", "a08d35d0-7223-4fb2-a15c-005355433299", "0f81a9c5-286c-4183-b749-bd5ec3acc91f", "bc0a9dbc-16e8-4a05-9f96-49f5f061b6f5", "bcd11947-2050-41ef-b94b-03ba9c73be7d", "bb0fc532-8df9-403c-ba9f-79e96c617de5", "feca15b7-2f13-4f33-bb93-8a7832b4dc4b", "e18badb8-b1d4-4bbf-bc92-9775e344e6d9", "e1fca62a-7d66-46b8-ab1a-70fd6ac4b28d", "284ab060-dc88-41b7-a376-ce49fc9ac36e", "ccfbc1c8-e25f-4f7a-a4da-bb86e3fb0cb9"]}
                    }
                ],
                "attributes": [
                    {
                        "id": "013ed171-7c6a-47c0-aedd-40d1024b06ad",
                        "name": "Code",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "e9fac386-5ebb-4ef0-9645-d90dd91c5abd",
                        "name": "Country",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "b44aa868-b04b-48aa-8a27-4fee5f80baa2",
                        "name": "Year2008",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "87d906bd-fe80-4119-a88a-2fe84add729d",
                        "name": "Year2010",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "174d87bf-dbc9-4cae-8764-728c009e5bd7",
                        "name": "Year2009",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "284ab060-dc88-41b7-a376-ce49fc9ac36e",
                        "name": "Year2010",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "9b962f2e-c627-4800-a4c5-9eef7ab4ea0f",
                        "name": "Year2007",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "0571f1c9-6d5d-4036-9b95-0e9a9deb4ccd",
                        "name": "Year2005",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "a08d35d0-7223-4fb2-a15c-005355433299",
                        "name": "Code",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "49cc3f95-d7ea-4928-a7d0-736b3a0fd6e0",
                        "name": "Year2004",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "c8bd501a-1789-473c-8b8d-84ed3ad59711",
                        "name": "Year2003",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "e7314dea-5383-491b-bdee-2323d9721e35",
                        "name": "Year2006",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "6fd56356-1673-4ec2-9803-12f2c2a28c9c",
                        "name": "Year2011",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "d862aae5-516f-4a26-a7a6-3ba58d7abdc4",
                        "name": "Code",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "91826bf9-676f-45da-aa2e-495f0b53e064",
                        "name": "country_name",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "199565d4-7bb3-424d-97f2-57cf5efe58c6",
                        "name": "Year2003",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "0b89ed15-3edd-4e58-8ada-ad8ac94018e3",
                        "name": "Year2008",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "df0e200b-7fbe-4864-8e3d-3c6582397dc7",
                        "name": "Year2011",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "6d2ce22f-d65c-4d81-98de-3cbf3fa6a20a",
                        "name": "Year2007",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "bb0fc532-8df9-403c-ba9f-79e96c617de5",
                        "name": "Year2006",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "589d5edc-6633-45fa-af33-a6f7bdf22e13",
                        "name": "Year2006",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "7efc76c2-b9ff-4317-a774-884d67d19a1d",
                        "name": "Year2004",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "6bc3da76-11b1-4848-9b0e-b88bb7e0f19b",
                        "name": "Year2009",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "cc01482f-eede-4105-9e7a-154dcd916c2e",
                        "name": "Year2004",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "bcd11947-2050-41ef-b94b-03ba9c73be7d",
                        "name": "Year2005",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "4894fc0d-6293-4e61-9363-a7f5e0b4b353",
                        "name": "Year2010",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "feca15b7-2f13-4f33-bb93-8a7832b4dc4b",
                        "name": "Year2007",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "0f81a9c5-286c-4183-b749-bd5ec3acc91f",
                        "name": "Year2003",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "b7ebc914-bd03-4e2d-8ca5-e28c85c16c58",
                        "name": "Year2011",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "94db3e82-eadd-46f3-a2ab-a3ef5bcf166a",
                        "name": "gdp_per_capita",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "b4ba24d7-bd89-483a-8423-d14a50b589da",
                        "name": "Code",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "13c4236a-171c-4ae5-aca7-6ea260c301ea",
                        "name": "Year2011",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "a8679379-1a3b-4855-8b19-2aba9f7c9ad6",
                        "name": "Country",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "80e2b551-a00e-49f9-aeb9-5f833ea3e371",
                        "name": "Year2009",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "bc0a9dbc-16e8-4a05-9f96-49f5f061b6f5",
                        "name": "Year2004",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "4f3fd2d8-5fb2-46e0-88be-bf80761e9fc2",
                        "name": "Year2007",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "c89499ed-32e9-4397-b5c3-1f0662541586",
                        "name": "Year2009",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "714c09c4-95d5-4096-a5ce-187533038df9",
                        "name": "Country",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "c2f83cff-dde5-43b7-8a75-2c5f074571e4",
                        "name": "Country",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "c66dfea6-b57a-4b33-9aaa-9869f9075107",
                        "name": "beer_consumption",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "e1fca62a-7d66-46b8-ab1a-70fd6ac4b28d",
                        "name": "Year2009",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "6b13f128-08d1-4baf-8cee-79e4bbbbf6d7",
                        "name": "BeerConsumption2011",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "a735eedc-7c05-485d-8bc3-4d3832e7b39e",
                        "name": "Year2008",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "ebee3c8a-8ec2-4388-be06-6f410c22aa39",
                        "name": "Year2007",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "7a7e36a6-b33d-4ce9-96cd-4cde130bf29b",
                        "name": "Year2010",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "224ae7ac-50f4-4d59-8e0e-431e4c857d91",
                        "name": "Country",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "5f50782f-e228-4ff3-a887-f42e60f50ba4",
                        "name": "Year2003",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "ccfbc1c8-e25f-4f7a-a4da-bb86e3fb0cb9",
                        "name": "Year2011",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "05d2415a-39b8-4857-8b35-265f9502a759",
                        "name": "Year2005",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "5080e23c-8815-4154-8c14-71ffe6dc8eea",
                        "name": "Year2006",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "6253012b-16fb-417d-b35b-6ef35140f8c1",
                        "name": "Year2005",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "5f368b7a-cfdf-4948-b70c-ad29a8196040",
                        "name": "Year2004",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "ea076a99-5375-4053-a14a-f6c69443d17f",
                        "name": "Code",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "1a53028b-faf2-4015-8f80-b425d68ddb0c",
                        "name": "Year2006",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "6f5e4334-a8aa-4328-bf2a-856373bb9bc6",
                        "name": "Year2008",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "8999badb-abbb-4d54-bc25-b69494245536",
                        "name": "Country",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "6ee059d0-3d43-4d2a-989b-071a8797548a",
                        "name": "Year2010",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "2475916b-3389-4b74-8819-565971aaf8ba",
                        "name": "Year2005",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "66ca6862-f0ef-478b-b458-29515e9bd3be",
                        "name": "Country",
                        "dataTypeId": "1"
                    },
                    {
                        "id": "e18badb8-b1d4-4bbf-bc92-9775e344e6d9",
                        "name": "Year2008",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "eec00683-4f45-48a9-9e7c-b13b5ba3b85c",
                        "name": "BeerConsumption2011",
                        "dataTypeId": "5"
                    },
                    {
                        "id": "2c87271a-072a-4590-a49c-9e46f464a259",
                        "name": "Year2003",
                        "dataTypeId": "5"
                    }
                ],
                "dataTypes": [
                    {id:1, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true},
                    {id:2, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "decimal(38,10)", "nullable": true},
                    {id:3, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "boolean", "nullable": true},
                    {id:4, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "boolean", "nullable": false},
                    {id:5, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true},
                    {id:6, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "long", "nullable": false},
                    {id:7,
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{"name": "salescreditsubteamname", "dataTypeId": "1"}, {
                            "name": "salespersonname",
                            "dataTypeId": "1"
                        }, {"name": "standardsalescredit", "dataTypeId": "1"}, {
                            "name": "totalvalueaddsalescredit",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:8,
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "Isin",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentAddress", "dataTypeId": "1"}, {
                            "name": "InstrumentName",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentType", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "ParentInstrumentAddress",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:9,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "1", "nullable": true},
                    {id:10,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "7", "nullable": true},
                    {id:11,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "8", "nullable": true},
                    {id:12,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "initial", "dataTypeId": "9"}, {"name": "lastName", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:13,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "12", "nullable": true},
                    {id:14,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "Barrier", "dataTypeId": "1"}, {
                            "name": "BarrierEndDate",
                            "dataTypeId": "1"
                        }, {"name": "BarrierMonitoring", "dataTypeId": "1"}, {
                            "name": "BarrierOptionType",
                            "dataTypeId": "1"
                        }, {"name": "BarrierStartDate", "dataTypeId": "1"}, {
                            "name": "CallPut",
                            "dataTypeId": "1"
                        }, {"name": "ContractSize", "dataTypeId": "1"}, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "CommoditySubAssetsChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "Digital", "dataTypeId": "1"}, {
                            "name": "DomesticCurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "DoubleBarrier", "dataTypeId": "1"}, {
                            "name": "EndDateTime",
                            "dataTypeId": "1"
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataTypeId": "1"
                        }, {"name": "ExoticDigitalBarrierType", "dataTypeId": "1"}, {
                            "name": "ExoticRebateName",
                            "dataTypeId": "1"
                        }, {"name": "ExoticRebateNumber", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "ExternalId1",
                            "dataTypeId": "1"
                        }, {"name": "ForeignCurrencyName", "dataTypeId": "1"}, {
                            "name": "FxOptionType",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentAddress",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentName", "dataTypeId": "1"}, {
                            "name": "InstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "IsCurrency", "dataTypeId": "1"}, {
                            "name": "IsExpired",
                            "dataTypeId": "1"
                        }, {"name": "Isin", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "Legs",
                            "dataTypeId": "16"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "OptionExerciseType", "dataTypeId": "1"}, {
                            "name": "OptionExoticType",
                            "dataTypeId": "1"
                        }, {"name": "Otc", "dataTypeId": "1"}, {
                            "name": "PayDayOffset",
                            "dataTypeId": "1"
                        }, {"name": "PayOffsetMethod", "dataTypeId": "1"}, {
                            "name": "PayType",
                            "dataTypeId": "1"
                        }, {"name": "QuoteType", "dataTypeId": "1"}, {
                            "name": "Rate",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RefValue",
                            "dataTypeId": "1"
                        }, {"name": "Rebate", "dataTypeId": "1"}, {
                            "name": "ReferencePrice",
                            "dataTypeId": "1"
                        }, {"name": "SettlementType", "dataTypeId": "1"}, {
                            "name": "SettlementDateTime",
                            "dataTypeId": "1"
                        }, {"name": "SpotBankingDayOffset", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "StrikeCurrencyName", "dataTypeId": "1"}, {
                            "name": "StrikeCurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "TxnMaturityPeriod", "dataTypeId": "1"}, {
                            "name": "UnderlyingInstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingInstruments", "dataTypeId": "18"}, {
                            "name": "ValuationGroupName",
                            "dataTypeId": "1"
                        }, {"name": "FixingSourceName", "dataTypeId": "1"}, {
                            "name": "Seniority",
                            "dataTypeId": "1"
                        }, {"name": "VersionId", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:15,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "Barrier", "dataTypeId": "1"}, {
                            "name": "BarrierEndDate",
                            "dataTypeId": "1"
                        }, {"name": "BarrierMonitoring", "dataTypeId": "1"}, {
                            "name": "BarrierOptionType",
                            "dataTypeId": "1"
                        }, {"name": "BarrierStartDate", "dataTypeId": "1"}, {
                            "name": "CallPut",
                            "dataTypeId": "1"
                        }, {"name": "ContractSize", "dataTypeId": "1"}, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "CommoditySubAssetsChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "Digital", "dataTypeId": "1"}, {
                            "name": "DomesticCurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "DoubleBarrier", "dataTypeId": "1"}, {
                            "name": "EndDateTime",
                            "dataTypeId": "1"
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataTypeId": "1"
                        }, {"name": "ExoticDigitalBarrierType", "dataTypeId": "1"}, {
                            "name": "ExoticRebateName",
                            "dataTypeId": "1"
                        }, {"name": "ExoticRebateNumber", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "ExternalId1",
                            "dataTypeId": "1"
                        }, {"name": "ForeignCurrencyName", "dataTypeId": "1"}, {
                            "name": "FxOptionType",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentAddress",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentName", "dataTypeId": "1"}, {
                            "name": "InstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "IsCurrency", "dataTypeId": "1"}, {
                            "name": "IsExpired",
                            "dataTypeId": "1"
                        }, {"name": "Isin", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "Legs",
                            "dataTypeId": "16"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "OptionExerciseType", "dataTypeId": "1"}, {
                            "name": "OptionExoticType",
                            "dataTypeId": "1"
                        }, {"name": "Otc", "dataTypeId": "1"}, {
                            "name": "PayDayOffset",
                            "dataTypeId": "1"
                        }, {"name": "PayOffsetMethod", "dataTypeId": "1"}, {
                            "name": "PayType",
                            "dataTypeId": "1"
                        }, {"name": "QuoteType", "dataTypeId": "1"}, {
                            "name": "Rate",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RefValue",
                            "dataTypeId": "1"
                        }, {"name": "Rebate", "dataTypeId": "1"}, {
                            "name": "ReferencePrice",
                            "dataTypeId": "1"
                        }, {"name": "SettlementType", "dataTypeId": "1"}, {
                            "name": "SettlementDateTime",
                            "dataTypeId": "1"
                        }, {"name": "SpotBankingDayOffset", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "StrikeCurrencyName", "dataTypeId": "1"}, {
                            "name": "StrikeCurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "TxnMaturityPeriod", "dataTypeId": "1"}, {
                            "name": "UnderlyingInstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingInstruments", "dataTypeId": "11"}, {
                            "name": "ValuationGroupName",
                            "dataTypeId": "1"
                        }, {"name": "FixingSourceName", "dataTypeId": "1"}, {
                            "name": "Seniority",
                            "dataTypeId": "1"
                        }, {"name": "VersionId", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:16,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "17", "nullable": true},
                    {id:17,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "AccruedDiscountBalanceRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "Carry",
                            "dataTypeId": "1"
                        }, {"name": "CleanConsideration", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "CurrentRate", "dataTypeId": "1"}, {
                            "name": "CurrentSpread",
                            "dataTypeId": "1"
                        }, {"name": "DayCountMethod", "dataTypeId": "1"}, {
                            "name": "EndDate",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FixedRate", "dataTypeId": "1"}, {
                            "name": "FloatRateReferenceName",
                            "dataTypeId": "1"
                        }, {"name": "FloatRateSpread", "dataTypeId": "1"}, {
                            "name": "IsPayLeg",
                            "dataTypeId": "1"
                        }, {"name": "LastResetDate", "dataTypeId": "1"}, {
                            "name": "LegFloatRateFactor",
                            "dataTypeId": "1"
                        }, {"name": "LegNumber", "dataTypeId": "1"}, {
                            "name": "LegStartDate",
                            "dataTypeId": "1"
                        }, {"name": "LegType", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Price",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "RepoRate", "dataTypeId": "1"}, {"name": "RollingPeriod", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:18,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "19", "nullable": true},
                    {id:19,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "Isin",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentAddress", "dataTypeId": "1"}, {
                            "name": "InstrumentName",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentType", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "ParentInstrumentAddress",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:20,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "2"
                        }, {"name": "AccruedInterestRepCcy", "dataTypeId": "2"}, {
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "2"
                        }, {"name": "BaseCostDirty", "dataTypeId": "1"}, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesSettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesUnsettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerageNonVatable",
                            "dataTypeId": "1"
                        }, {"name": "BrokerageVatable", "dataTypeId": "1"}, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CallAccruedInterestTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashBalanceTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashPerCurrencyZAR",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashflowRealDivRepCcyAmt", "dataTypeId": "1"}, {
                            "name": "DailyExecutionFee",
                            "dataTypeId": "1"
                        }, {"name": "DailyExecutionFeeNoVAT", "dataTypeId": "1"}, {
                            "name": "DailyVAT",
                            "dataTypeId": "1"
                        }, {"name": "DealAmount", "dataTypeId": "1"}, {
                            "name": "DividendDivPayDay",
                            "dataTypeId": "1"
                        }, {"name": "Dividends", "dataTypeId": "1"}, {
                            "name": "EndCash",
                            "dataTypeId": "1"
                        }, {"name": "ExecutionCost", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "Fees",
                            "dataTypeId": "1"
                        }, {"name": "FeesSettled", "dataTypeId": "1"}, {
                            "name": "FeesUnsettled",
                            "dataTypeId": "1"
                        }, {"name": "Interest", "dataTypeId": "1"}, {
                            "name": "InvestorProtectionLevy",
                            "dataTypeId": "1"
                        }, {"name": "IsMidasSettlement", "dataTypeId": "1"}, {
                            "name": "ManufacturedDividendValue",
                            "dataTypeId": "1"
                        }, {"name": "NetConsideration", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Premium",
                            "dataTypeId": "1"
                        }, {"name": "PriceEndDate", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvUnsettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RegulatoryNotional",
                            "dataTypeId": "1"
                        }, {"name": "SecurityTransferTax", "dataTypeId": "1"}, {
                            "name": "SettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "StartCash", "dataTypeId": "1"}, {
                            "name": "StrikePrice",
                            "dataTypeId": "1"
                        }, {"name": "StrikeRate", "dataTypeId": "1"}, {
                            "name": "SweepingPosition",
                            "dataTypeId": "1"
                        }, {"name": "TotalLastDividendAmount", "dataTypeId": "1"}, {
                            "name": "TotalProfitLoss",
                            "dataTypeId": "1"
                        }, {"name": "TradedCleanPrice", "dataTypeId": "1"}, {
                            "name": "TradedDirtyPrice",
                            "dataTypeId": "1"
                        }, {"name": "TradedInterestInRepCcy", "dataTypeId": "1"}, {
                            "name": "TradedInterestInTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingForwardPrice", "dataTypeId": "1"}, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnsettledPremiumTxnCcy", "dataTypeId": "1"}, {
                            "name": "Vat",
                            "dataTypeId": "1"
                        }, {"name": "YieldToMaturity", "dataTypeId": "1"}, {
                            "name": "SecuritiesTransferTax",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:21,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "AccruedInterestRepCcy", "dataTypeId": "1"}, {
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "BaseCostDirty", "dataTypeId": "1"}, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesSettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesUnsettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerageNonVatable",
                            "dataTypeId": "1"
                        }, {"name": "BrokerageVatable", "dataTypeId": "1"}, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CallAccruedInterestTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashBalanceTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashPerCurrencyZAR",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashflowRealDivRepCcyAmt", "dataTypeId": "1"}, {
                            "name": "DailyExecutionFee",
                            "dataTypeId": "1"
                        }, {"name": "DailyExecutionFeeNoVAT", "dataTypeId": "1"}, {
                            "name": "DailyVAT",
                            "dataTypeId": "1"
                        }, {"name": "DealAmount", "dataTypeId": "1"}, {
                            "name": "DividendDivPayDay",
                            "dataTypeId": "1"
                        }, {"name": "Dividends", "dataTypeId": "1"}, {
                            "name": "EndCash",
                            "dataTypeId": "1"
                        }, {"name": "ExecutionCost", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "Fees",
                            "dataTypeId": "1"
                        }, {"name": "FeesSettled", "dataTypeId": "1"}, {
                            "name": "FeesUnsettled",
                            "dataTypeId": "1"
                        }, {"name": "Interest", "dataTypeId": "1"}, {
                            "name": "InvestorProtectionLevy",
                            "dataTypeId": "1"
                        }, {"name": "IsMidasSettlement", "dataTypeId": "1"}, {
                            "name": "ManufacturedDividendValue",
                            "dataTypeId": "1"
                        }, {"name": "NetConsideration", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Premium",
                            "dataTypeId": "1"
                        }, {"name": "PriceEndDate", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvUnsettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RegulatoryNotional",
                            "dataTypeId": "1"
                        }, {"name": "SecurityTransferTax", "dataTypeId": "1"}, {
                            "name": "SettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "StartCash", "dataTypeId": "1"}, {
                            "name": "StrikePrice",
                            "dataTypeId": "1"
                        }, {"name": "StrikeRate", "dataTypeId": "1"}, {
                            "name": "SweepingPosition",
                            "dataTypeId": "1"
                        }, {"name": "TotalLastDividendAmount", "dataTypeId": "1"}, {
                            "name": "TotalProfitLoss",
                            "dataTypeId": "1"
                        }, {"name": "TradedCleanPrice", "dataTypeId": "1"}, {
                            "name": "TradedDirtyPrice",
                            "dataTypeId": "1"
                        }, {"name": "TradedInterestInRepCcy", "dataTypeId": "1"}, {
                            "name": "TradedInterestInTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingForwardPrice", "dataTypeId": "1"}, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnsettledPremiumTxnCcy", "dataTypeId": "1"}, {
                            "name": "Vat",
                            "dataTypeId": "1"
                        }, {"name": "YieldToMaturity", "dataTypeId": "1"}, {
                            "name": "SecuritiesTransferTax",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:22,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "AcquireDate", "dataTypeId": "1"}, {
                            "name": "AcquirerName",
                            "dataTypeId": "1"
                        }, {"name": "AcquirerNumber", "dataTypeId": "1"}, {
                            "name": "AgriSiloLocation",
                            "dataTypeId": "1"
                        }, {"name": "AgriStatus", "dataTypeId": "1"}, {
                            "name": "AgriTransportDifferential",
                            "dataTypeId": "1"
                        }, {
                            "name": "ApproximateLoadDescription",
                            "dataTypeId": "1"
                        }, {"name": "ApproximateLoadIndicator", "dataTypeId": "1"}, {
                            "name": "ApproximateLoadPrice",
                            "dataTypeId": "1"
                        }, {"name": "ApproximateLoadQuantity", "dataTypeId": "1"}, {
                            "name": "BrokerBIC",
                            "dataTypeId": "1"
                        }, {"name": "BrokerName", "dataTypeId": "1"}, {
                            "name": "BrokerStatus",
                            "dataTypeId": "1"
                        }, {"name": "BuySell", "dataTypeId": "1"}, {
                            "name": "ClientFundName",
                            "dataTypeId": "1"
                        }, {"name": "ClsStatus", "dataTypeId": "1"}, {
                            "name": "ConnectedTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "ContractTradeNumber", "dataTypeId": "1"}, {
                            "name": "CorrectionTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterpartyName", "dataTypeId": "1"}, {
                            "name": "CounterpartyNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterPortfolioName", "dataTypeId": "1"}, {
                            "name": "CounterPortfolioNumber",
                            "dataTypeId": "1"
                        }, {"name": "CountryPortfolio", "dataTypeId": "1"}, {
                            "name": "CreateDateTime",
                            "dataTypeId": "1"
                        }, {"name": "CurrencyName", "dataTypeId": "1"}, {
                            "name": "DiscountType",
                            "dataTypeId": "1"
                        }, {"name": "DiscountingTypeChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "ExecutionDateTime",
                            "dataTypeId": "1"
                        }, {"name": "ExternalId", "dataTypeId": "1"}, {
                            "name": "FundingInsType",
                            "dataTypeId": "1"
                        }, {"name": "FullyFunded", "dataTypeId": "1"}, {
                            "name": "FxSubType",
                            "dataTypeId": "1"
                        }, {"name": "InsTypeOverrideName", "dataTypeId": "1"}, {
                            "name": "IsInternalSettlement",
                            "dataTypeId": "1"
                        }, {"name": "LastModifiedUserID", "dataTypeId": "1"}, {
                            "name": "MaturityDate",
                            "dataTypeId": "1"
                        }, {"name": "MentisProjectNumber", "dataTypeId": "1"}, {
                            "name": "MirrorTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "PortfolioName",
                            "dataTypeId": "1"
                        }, {"name": "PortfolioNumber", "dataTypeId": "1"}, {
                            "name": "Price",
                            "dataTypeId": "1"
                        }, {"name": "Quantity", "dataTypeId": "1"}, {
                            "name": "RelationshipPartyName",
                            "dataTypeId": "1"
                        }, {"name": "RwaCounterpartyName", "dataTypeId": "1"}, {
                            "name": "SourceCounterpartyName",
                            "dataTypeId": "1"
                        }, {"name": "SourceCounterpartyNumber", "dataTypeId": "1"}, {
                            "name": "SourceCounterpartySystem",
                            "dataTypeId": "1"
                        }, {"name": "SourceTradeId", "dataTypeId": "1"}, {
                            "name": "SourceTradeType",
                            "dataTypeId": "1"
                        }, {"name": "ShadowRevenueType", "dataTypeId": "1"}, {
                            "name": "SwiftMessageStatus",
                            "dataTypeId": "1"
                        }, {"name": "TerminatedTradeNumber", "dataTypeId": "1"}, {
                            "name": "TradeDateTime",
                            "dataTypeId": "1"
                        }, {"name": "TradeKey2ChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "TradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "TradePhase", "dataTypeId": "1"}, {
                            "name": "TradeType",
                            "dataTypeId": "1"
                        }, {"name": "TraderABNo", "dataTypeId": "1"}, {
                            "name": "TraderName",
                            "dataTypeId": "1"
                        }, {"name": "TraderNumber", "dataTypeId": "1"}, {
                            "name": "TradeStatus",
                            "dataTypeId": "1"
                        }, {"name": "TransactionTradeNumber", "dataTypeId": "1"}, {
                            "name": "UpdateUserABNo",
                            "dataTypeId": "1"
                        }, {"name": "UpdateUserName", "dataTypeId": "1"}, {
                            "name": "UpdateDateTime",
                            "dataTypeId": "1"
                        }, {"name": "ValueDate", "dataTypeId": "1"}, {
                            "name": "VersionId",
                            "dataTypeId": "1"
                        }, {"name": "VolatilityStrike", "dataTypeId": "1"}, {
                            "name": "XtpJseRef",
                            "dataTypeId": "1"
                        }, {"name": "XtpTradeTypeValue", "dataTypeId": "1"}, {
                            "name": "YourRef",
                            "dataTypeId": "1"
                        }, {"name": "ReferencePrice", "dataTypeId": "1"}, {
                            "name": "ClearedTrade",
                            "dataTypeId": "1"
                        }, {"name": "ClrClearingBroker", "dataTypeId": "1"}, {
                            "name": "ClrBrokerTradeId",
                            "dataTypeId": "1"
                        }, {"name": "ClearingMemberCode", "dataTypeId": "1"}, {
                            "name": "ClearingHouseId",
                            "dataTypeId": "1"
                        }, {"name": "CentralCounterparty", "dataTypeId": "1"}, {
                            "name": "CcpStatus",
                            "dataTypeId": "1"
                        }, {"name": "CcpClearingStatus", "dataTypeId": "1"}, {
                            "name": "CcpClearingHouseId",
                            "dataTypeId": "1"
                        }, {"name": "OriginalMarkitWireTradeId", "dataTypeId": "1"}, {
                            "name": "OriginalCounterparty",
                            "dataTypeId": "1"
                        }, {"name": "MarkitWireTradeId", "dataTypeId": "1"}, {
                            "name": "CounterpartySdsId",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:23,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "CreateDateTime", "dataTypeId": "1"}, {
                            "name": "CashflowNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterpartyName", "dataTypeId": "1"}, {
                            "name": "CounterpartyNumber",
                            "dataTypeId": "1"
                        }, {"name": "CurrencyName", "dataTypeId": "1"}, {
                            "name": "CurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "FixedRate",
                            "dataTypeId": "1"
                        }, {"name": "ForwardRate", "dataTypeId": "1"}, {
                            "name": "LegNumber",
                            "dataTypeId": "1"
                        }, {"name": "NominalFactor", "dataTypeId": "1"}, {
                            "name": "PayDate",
                            "dataTypeId": "1"
                        }, {"name": "ProjectedTxnCcy", "dataTypeId": "1"}, {
                            "name": "ProjectedRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "SourceObjectUpdateUserName", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "Text", "dataTypeId": "1"}, {
                            "name": "Type",
                            "dataTypeId": "1"
                        }, {"name": "UpdateTime", "dataTypeId": "1"}, {"name": "UpdateUserName", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:24,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "23", "nullable": true}
                ]
            },
            {
                id: "ds-uuid-1",
                operations: [
                    {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App A",
                        appId: "my.app.a",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-a"],
                            path: "/some/path/a",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: [],
                            path: "/some/path/a.csv",
                            type: "CSV"
                        }],
                        mainProps: {
                            "id": "ds-uuid-a",
                            "name": "A",
                            "inputs": [],
                            "output": "ds-uuid-a"
                        }
                    }, {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App B",
                        appId: "my.app.b",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-b"],
                            path: "/some/path/b",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: [],
                            path: "/some/path/data.csv",
                            type: "CSV"
                        }],
                        mainProps: {
                            "id": "ds-uuid-b",
                            "name": "B",
                            "inputs": [],
                            "output": "ds-uuid-b"
                        }
                    }, {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App C",
                        appId: "my.app.c",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-c"],
                            path: "/some/path/c",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: ["ds-uuid-a"],
                            path: "/some/path/a",
                            type: "Parquet"
                        }, {
                            datasetsIds: ["ds-uuid-b"],
                            path: "/some/path/b",
                            type: "Parquet"
                        }, {
                            datasetsIds: [],
                            path: "/some/path/b.csv",
                            type: "CSV"
                        }],
                        mainProps: {
                            "id": "ds-uuid-c",
                            "name": "C",
                            "inputs": ["ds-uuid-a", "ds-uuid-b"],
                            "output": "ds-uuid-c"
                        }
                    }, {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App D",
                        appId: "my.app.d",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-d"],
                            path: "/some/path/d",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: ["ds-uuid-a"],
                            path: "/some/path/a",
                            type: "Parquet"
                        }, {
                            datasetsIds: ["ds-uuid-b"],
                            path: "/some/path/b",
                            type: "Parquet"
                        }, {
                            datasetsIds: [],
                            path: "/some/path/b.csv",
                            type: "CSV"
                        }],
                        mainProps: {
                            "id": "ds-uuid-d",
                            "name": "D",
                            "inputs": ["ds-uuid-a", "ds-uuid-b"],
                            "output": "ds-uuid-d"
                        }
                    }, {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App E",
                        appId: "my.app.e",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-1"],
                            path: "/some/path/e",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: ["ds-uuid-c"],
                            path: "/some/path/c",
                            type: "Parquet"
                        }, {
                            datasetsIds: ["ds-uuid-d"],
                            path: "/some/path/d",
                            type: "Parquet"
                        }, {
                            datasetsIds: [],
                            path: "/some/path/e.csv",
                            type: "CSV"
                        }, {
                            datasetsIds: [],
                            path: "/some/path/e.json",
                            type: "JSON"
                        }, {
                            datasetsIds: [],
                            path: "/some/path/e.txt",
                            type: "Text"
                        }, {
                            datasetsIds: [],
                            path: "/some/path/e.parquet",
                            type: "Parquet"
                        }],
                        mainProps: {
                            "id": "ds-uuid-1",
                            "name": "E",
                            "inputs": ["ds-uuid-c", "ds-uuid-d"],
                            "output": "ds-uuid-1"
                        }
                    }
                ],
                datasets: [
                    {"id": "ds-uuid-a", "schema": {"attrs": ["attr-uuid-1", "attr-uuid-2", "attr-uuid-3"]}},
                    {"id": "ds-uuid-b", "schema": {"attrs": ["attr-uuid-4", "attr-uuid-5", "attr-uuid-6"]}},
                    {"id": "ds-uuid-c", "schema": {"attrs": ["attr-uuid-1", "attr-uuid-3", "attr-uuid-6"]}},
                    {"id": "ds-uuid-d", "schema": {"attrs": ["attr-uuid-1", "attr-uuid-3", "attr-uuid-6"]}},
                    {
                        "id": "ds-uuid-1",
                        "schema": {"attrs": ["attr-uuid-0", "attr-uuid-1", "attr-uuid-2", "attr-uuid-3", "attr-uuid-4", "attr-uuid-5", "attr-uuid-6", "attr-uuid-7", "attr-uuid-34", "attr-uuid-35", "attr-uuid-74", "attr-uuid-106", "attr-uuid-352", "attr-uuid-111", "attr-uuid-72", "attr-uuid-71", "attr-uuid-86", "attr-uuid-85", "attr-uuid-49", "attr-uuid-32", "attr-uuid-33", "attr-uuid-30", "attr-uuid-31", "attr-uuid-67", "attr-uuid-68", "attr-uuid-69", "attr-uuid-70", "attr-uuid-73", "attr-uuid-105"]}
                    }
                ],
                attributes: [{
                    "id": "attr-uuid-0",
                    "name": "TradeScalar",
                    "dataTypeId": "20"
                }, {
                    "id": "attr-uuid-1",
                    "name": "TradeStatic",
                    "dataTypeId": "22"
                }, {
                    "id": "attr-uuid-2",
                    "name": "Instrument",
                    "dataTypeId": "14"
                }, {
                    "id": "attr-uuid-3",
                    "name": "Moneyflows",
                    "dataTypeId": "24"
                }, {
                    "id": "attr-uuid-4",
                    "name": "SalesCredits",
                    "dataTypeId": "10"
                }, {
                    "id": "attr-uuid-5",
                    "name": "Feed",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-6",
                    "name": "IsEoD",
                    "dataTypeId": "3"
                }, {
                    "id": "attr-uuid-7",
                    "name": "ReportDate",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-34",
                    "name": "ProductMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-35",
                    "name": "ProductSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-74",
                    "name": "EnterpriseProduct",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-106",
                    "name": "ProductCategory",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-352",
                    "name": "Balance",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-111",
                    "name": "MappingMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-72",
                    "name": "FundingInstrumentType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-71",
                    "name": "AdditionalInstrumentOverride",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-86",
                    "name": "MappingSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-85",
                    "name": "MappingMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-49",
                    "name": "SourceSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-32",
                    "name": "SourceMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-33",
                    "name": "SourceSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-30",
                    "name": "ProductMainSubTypeMappingId",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-31",
                    "name": "SourceSystem",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-67",
                    "name": "EnterpriseProductMappingId",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-68",
                    "name": "ProductMainType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-69",
                    "name": "ProductSubType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-70",
                    "name": "MoneyMarketInstrumentType",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-73",
                    "name": "OTCOverride",
                    "dataTypeId": "1"
                }, {
                    "id": "attr-uuid-105",
                    "name": "MainType",
                    "dataTypeId": "1"
                }],
                dataTypes: [
                    {id:1, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true},
                    {id:2, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "decimal(38,10)", "nullable": true},
                    {id:3, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "boolean", "nullable": true},
                    {id:4, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "boolean", "nullable": false},
                    {id:5, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true},
                    {id:6, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "long", "nullable": false},
                    {id:7,
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{"name": "salescreditsubteamname", "dataTypeId": "1"}, {
                            "name": "salespersonname",
                            "dataTypeId": "1"
                        }, {"name": "standardsalescredit", "dataTypeId": "1"}, {
                            "name": "totalvalueaddsalescredit",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:8,
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "Isin",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentAddress", "dataTypeId": "1"}, {
                            "name": "InstrumentName",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentType", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "ParentInstrumentAddress",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:9,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "1", "nullable": true},
                    {id:10,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "7", "nullable": true},
                    {id:11,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "8", "nullable": true},
                    {id:12,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "initial", "dataTypeId": "9"}, {"name": "lastName", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:13,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "12", "nullable": true},
                    {id:14,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "Barrier", "dataTypeId": "1"}, {
                            "name": "BarrierEndDate",
                            "dataTypeId": "1"
                        }, {"name": "BarrierMonitoring", "dataTypeId": "1"}, {
                            "name": "BarrierOptionType",
                            "dataTypeId": "1"
                        }, {"name": "BarrierStartDate", "dataTypeId": "1"}, {
                            "name": "CallPut",
                            "dataTypeId": "1"
                        }, {"name": "ContractSize", "dataTypeId": "1"}, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "CommoditySubAssetsChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "Digital", "dataTypeId": "1"}, {
                            "name": "DomesticCurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "DoubleBarrier", "dataTypeId": "1"}, {
                            "name": "EndDateTime",
                            "dataTypeId": "1"
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataTypeId": "1"
                        }, {"name": "ExoticDigitalBarrierType", "dataTypeId": "1"}, {
                            "name": "ExoticRebateName",
                            "dataTypeId": "1"
                        }, {"name": "ExoticRebateNumber", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "ExternalId1",
                            "dataTypeId": "1"
                        }, {"name": "ForeignCurrencyName", "dataTypeId": "1"}, {
                            "name": "FxOptionType",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentAddress",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentName", "dataTypeId": "1"}, {
                            "name": "InstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "IsCurrency", "dataTypeId": "1"}, {
                            "name": "IsExpired",
                            "dataTypeId": "1"
                        }, {"name": "Isin", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "Legs",
                            "dataTypeId": "16"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "OptionExerciseType", "dataTypeId": "1"}, {
                            "name": "OptionExoticType",
                            "dataTypeId": "1"
                        }, {"name": "Otc", "dataTypeId": "1"}, {
                            "name": "PayDayOffset",
                            "dataTypeId": "1"
                        }, {"name": "PayOffsetMethod", "dataTypeId": "1"}, {
                            "name": "PayType",
                            "dataTypeId": "1"
                        }, {"name": "QuoteType", "dataTypeId": "1"}, {
                            "name": "Rate",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RefValue",
                            "dataTypeId": "1"
                        }, {"name": "Rebate", "dataTypeId": "1"}, {
                            "name": "ReferencePrice",
                            "dataTypeId": "1"
                        }, {"name": "SettlementType", "dataTypeId": "1"}, {
                            "name": "SettlementDateTime",
                            "dataTypeId": "1"
                        }, {"name": "SpotBankingDayOffset", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "StrikeCurrencyName", "dataTypeId": "1"}, {
                            "name": "StrikeCurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "TxnMaturityPeriod", "dataTypeId": "1"}, {
                            "name": "UnderlyingInstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingInstruments", "dataTypeId": "18"}, {
                            "name": "ValuationGroupName",
                            "dataTypeId": "1"
                        }, {"name": "FixingSourceName", "dataTypeId": "1"}, {
                            "name": "Seniority",
                            "dataTypeId": "1"
                        }, {"name": "VersionId", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:15,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "Barrier", "dataTypeId": "1"}, {
                            "name": "BarrierEndDate",
                            "dataTypeId": "1"
                        }, {"name": "BarrierMonitoring", "dataTypeId": "1"}, {
                            "name": "BarrierOptionType",
                            "dataTypeId": "1"
                        }, {"name": "BarrierStartDate", "dataTypeId": "1"}, {
                            "name": "CallPut",
                            "dataTypeId": "1"
                        }, {"name": "ContractSize", "dataTypeId": "1"}, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "CommoditySubAssetsChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "Digital", "dataTypeId": "1"}, {
                            "name": "DomesticCurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "DoubleBarrier", "dataTypeId": "1"}, {
                            "name": "EndDateTime",
                            "dataTypeId": "1"
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataTypeId": "1"
                        }, {"name": "ExoticDigitalBarrierType", "dataTypeId": "1"}, {
                            "name": "ExoticRebateName",
                            "dataTypeId": "1"
                        }, {"name": "ExoticRebateNumber", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "ExternalId1",
                            "dataTypeId": "1"
                        }, {"name": "ForeignCurrencyName", "dataTypeId": "1"}, {
                            "name": "FxOptionType",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentAddress",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentName", "dataTypeId": "1"}, {
                            "name": "InstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "IsCurrency", "dataTypeId": "1"}, {
                            "name": "IsExpired",
                            "dataTypeId": "1"
                        }, {"name": "Isin", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "Legs",
                            "dataTypeId": "16"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "OptionExerciseType", "dataTypeId": "1"}, {
                            "name": "OptionExoticType",
                            "dataTypeId": "1"
                        }, {"name": "Otc", "dataTypeId": "1"}, {
                            "name": "PayDayOffset",
                            "dataTypeId": "1"
                        }, {"name": "PayOffsetMethod", "dataTypeId": "1"}, {
                            "name": "PayType",
                            "dataTypeId": "1"
                        }, {"name": "QuoteType", "dataTypeId": "1"}, {
                            "name": "Rate",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RefValue",
                            "dataTypeId": "1"
                        }, {"name": "Rebate", "dataTypeId": "1"}, {
                            "name": "ReferencePrice",
                            "dataTypeId": "1"
                        }, {"name": "SettlementType", "dataTypeId": "1"}, {
                            "name": "SettlementDateTime",
                            "dataTypeId": "1"
                        }, {"name": "SpotBankingDayOffset", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "StrikeCurrencyName", "dataTypeId": "1"}, {
                            "name": "StrikeCurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "TxnMaturityPeriod", "dataTypeId": "1"}, {
                            "name": "UnderlyingInstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingInstruments", "dataTypeId": "11"}, {
                            "name": "ValuationGroupName",
                            "dataTypeId": "1"
                        }, {"name": "FixingSourceName", "dataTypeId": "1"}, {
                            "name": "Seniority",
                            "dataTypeId": "1"
                        }, {"name": "VersionId", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:16,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "17", "nullable": true},
                    {id:17,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "AccruedDiscountBalanceRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "Carry",
                            "dataTypeId": "1"
                        }, {"name": "CleanConsideration", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "CurrentRate", "dataTypeId": "1"}, {
                            "name": "CurrentSpread",
                            "dataTypeId": "1"
                        }, {"name": "DayCountMethod", "dataTypeId": "1"}, {
                            "name": "EndDate",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FixedRate", "dataTypeId": "1"}, {
                            "name": "FloatRateReferenceName",
                            "dataTypeId": "1"
                        }, {"name": "FloatRateSpread", "dataTypeId": "1"}, {
                            "name": "IsPayLeg",
                            "dataTypeId": "1"
                        }, {"name": "LastResetDate", "dataTypeId": "1"}, {
                            "name": "LegFloatRateFactor",
                            "dataTypeId": "1"
                        }, {"name": "LegNumber", "dataTypeId": "1"}, {
                            "name": "LegStartDate",
                            "dataTypeId": "1"
                        }, {"name": "LegType", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Price",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "RepoRate", "dataTypeId": "1"}, {"name": "RollingPeriod", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:18,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "19", "nullable": true},
                    {id:19,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "Isin",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentAddress", "dataTypeId": "1"}, {
                            "name": "InstrumentName",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentType", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "ParentInstrumentAddress",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:20,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "2"
                        }, {"name": "AccruedInterestRepCcy", "dataTypeId": "2"}, {
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "2"
                        }, {"name": "BaseCostDirty", "dataTypeId": "1"}, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesSettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesUnsettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerageNonVatable",
                            "dataTypeId": "1"
                        }, {"name": "BrokerageVatable", "dataTypeId": "1"}, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CallAccruedInterestTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashBalanceTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashPerCurrencyZAR",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashflowRealDivRepCcyAmt", "dataTypeId": "1"}, {
                            "name": "DailyExecutionFee",
                            "dataTypeId": "1"
                        }, {"name": "DailyExecutionFeeNoVAT", "dataTypeId": "1"}, {
                            "name": "DailyVAT",
                            "dataTypeId": "1"
                        }, {"name": "DealAmount", "dataTypeId": "1"}, {
                            "name": "DividendDivPayDay",
                            "dataTypeId": "1"
                        }, {"name": "Dividends", "dataTypeId": "1"}, {
                            "name": "EndCash",
                            "dataTypeId": "1"
                        }, {"name": "ExecutionCost", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "Fees",
                            "dataTypeId": "1"
                        }, {"name": "FeesSettled", "dataTypeId": "1"}, {
                            "name": "FeesUnsettled",
                            "dataTypeId": "1"
                        }, {"name": "Interest", "dataTypeId": "1"}, {
                            "name": "InvestorProtectionLevy",
                            "dataTypeId": "1"
                        }, {"name": "IsMidasSettlement", "dataTypeId": "1"}, {
                            "name": "ManufacturedDividendValue",
                            "dataTypeId": "1"
                        }, {"name": "NetConsideration", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Premium",
                            "dataTypeId": "1"
                        }, {"name": "PriceEndDate", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvUnsettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RegulatoryNotional",
                            "dataTypeId": "1"
                        }, {"name": "SecurityTransferTax", "dataTypeId": "1"}, {
                            "name": "SettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "StartCash", "dataTypeId": "1"}, {
                            "name": "StrikePrice",
                            "dataTypeId": "1"
                        }, {"name": "StrikeRate", "dataTypeId": "1"}, {
                            "name": "SweepingPosition",
                            "dataTypeId": "1"
                        }, {"name": "TotalLastDividendAmount", "dataTypeId": "1"}, {
                            "name": "TotalProfitLoss",
                            "dataTypeId": "1"
                        }, {"name": "TradedCleanPrice", "dataTypeId": "1"}, {
                            "name": "TradedDirtyPrice",
                            "dataTypeId": "1"
                        }, {"name": "TradedInterestInRepCcy", "dataTypeId": "1"}, {
                            "name": "TradedInterestInTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingForwardPrice", "dataTypeId": "1"}, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnsettledPremiumTxnCcy", "dataTypeId": "1"}, {
                            "name": "Vat",
                            "dataTypeId": "1"
                        }, {"name": "YieldToMaturity", "dataTypeId": "1"}, {
                            "name": "SecuritiesTransferTax",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:21,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "AccruedInterestRepCcy", "dataTypeId": "1"}, {
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "BaseCostDirty", "dataTypeId": "1"}, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesSettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesUnsettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerageNonVatable",
                            "dataTypeId": "1"
                        }, {"name": "BrokerageVatable", "dataTypeId": "1"}, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CallAccruedInterestTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashBalanceTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashPerCurrencyZAR",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashflowRealDivRepCcyAmt", "dataTypeId": "1"}, {
                            "name": "DailyExecutionFee",
                            "dataTypeId": "1"
                        }, {"name": "DailyExecutionFeeNoVAT", "dataTypeId": "1"}, {
                            "name": "DailyVAT",
                            "dataTypeId": "1"
                        }, {"name": "DealAmount", "dataTypeId": "1"}, {
                            "name": "DividendDivPayDay",
                            "dataTypeId": "1"
                        }, {"name": "Dividends", "dataTypeId": "1"}, {
                            "name": "EndCash",
                            "dataTypeId": "1"
                        }, {"name": "ExecutionCost", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "Fees",
                            "dataTypeId": "1"
                        }, {"name": "FeesSettled", "dataTypeId": "1"}, {
                            "name": "FeesUnsettled",
                            "dataTypeId": "1"
                        }, {"name": "Interest", "dataTypeId": "1"}, {
                            "name": "InvestorProtectionLevy",
                            "dataTypeId": "1"
                        }, {"name": "IsMidasSettlement", "dataTypeId": "1"}, {
                            "name": "ManufacturedDividendValue",
                            "dataTypeId": "1"
                        }, {"name": "NetConsideration", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Premium",
                            "dataTypeId": "1"
                        }, {"name": "PriceEndDate", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvUnsettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RegulatoryNotional",
                            "dataTypeId": "1"
                        }, {"name": "SecurityTransferTax", "dataTypeId": "1"}, {
                            "name": "SettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "StartCash", "dataTypeId": "1"}, {
                            "name": "StrikePrice",
                            "dataTypeId": "1"
                        }, {"name": "StrikeRate", "dataTypeId": "1"}, {
                            "name": "SweepingPosition",
                            "dataTypeId": "1"
                        }, {"name": "TotalLastDividendAmount", "dataTypeId": "1"}, {
                            "name": "TotalProfitLoss",
                            "dataTypeId": "1"
                        }, {"name": "TradedCleanPrice", "dataTypeId": "1"}, {
                            "name": "TradedDirtyPrice",
                            "dataTypeId": "1"
                        }, {"name": "TradedInterestInRepCcy", "dataTypeId": "1"}, {
                            "name": "TradedInterestInTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingForwardPrice", "dataTypeId": "1"}, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnsettledPremiumTxnCcy", "dataTypeId": "1"}, {
                            "name": "Vat",
                            "dataTypeId": "1"
                        }, {"name": "YieldToMaturity", "dataTypeId": "1"}, {
                            "name": "SecuritiesTransferTax",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:22,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "AcquireDate", "dataTypeId": "1"}, {
                            "name": "AcquirerName",
                            "dataTypeId": "1"
                        }, {"name": "AcquirerNumber", "dataTypeId": "1"}, {
                            "name": "AgriSiloLocation",
                            "dataTypeId": "1"
                        }, {"name": "AgriStatus", "dataTypeId": "1"}, {
                            "name": "AgriTransportDifferential",
                            "dataTypeId": "1"
                        }, {
                            "name": "ApproximateLoadDescription",
                            "dataTypeId": "1"
                        }, {"name": "ApproximateLoadIndicator", "dataTypeId": "1"}, {
                            "name": "ApproximateLoadPrice",
                            "dataTypeId": "1"
                        }, {"name": "ApproximateLoadQuantity", "dataTypeId": "1"}, {
                            "name": "BrokerBIC",
                            "dataTypeId": "1"
                        }, {"name": "BrokerName", "dataTypeId": "1"}, {
                            "name": "BrokerStatus",
                            "dataTypeId": "1"
                        }, {"name": "BuySell", "dataTypeId": "1"}, {
                            "name": "ClientFundName",
                            "dataTypeId": "1"
                        }, {"name": "ClsStatus", "dataTypeId": "1"}, {
                            "name": "ConnectedTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "ContractTradeNumber", "dataTypeId": "1"}, {
                            "name": "CorrectionTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterpartyName", "dataTypeId": "1"}, {
                            "name": "CounterpartyNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterPortfolioName", "dataTypeId": "1"}, {
                            "name": "CounterPortfolioNumber",
                            "dataTypeId": "1"
                        }, {"name": "CountryPortfolio", "dataTypeId": "1"}, {
                            "name": "CreateDateTime",
                            "dataTypeId": "1"
                        }, {"name": "CurrencyName", "dataTypeId": "1"}, {
                            "name": "DiscountType",
                            "dataTypeId": "1"
                        }, {"name": "DiscountingTypeChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "ExecutionDateTime",
                            "dataTypeId": "1"
                        }, {"name": "ExternalId", "dataTypeId": "1"}, {
                            "name": "FundingInsType",
                            "dataTypeId": "1"
                        }, {"name": "FullyFunded", "dataTypeId": "1"}, {
                            "name": "FxSubType",
                            "dataTypeId": "1"
                        }, {"name": "InsTypeOverrideName", "dataTypeId": "1"}, {
                            "name": "IsInternalSettlement",
                            "dataTypeId": "1"
                        }, {"name": "LastModifiedUserID", "dataTypeId": "1"}, {
                            "name": "MaturityDate",
                            "dataTypeId": "1"
                        }, {"name": "MentisProjectNumber", "dataTypeId": "1"}, {
                            "name": "MirrorTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "PortfolioName",
                            "dataTypeId": "1"
                        }, {"name": "PortfolioNumber", "dataTypeId": "1"}, {
                            "name": "Price",
                            "dataTypeId": "1"
                        }, {"name": "Quantity", "dataTypeId": "1"}, {
                            "name": "RelationshipPartyName",
                            "dataTypeId": "1"
                        }, {"name": "RwaCounterpartyName", "dataTypeId": "1"}, {
                            "name": "SourceCounterpartyName",
                            "dataTypeId": "1"
                        }, {"name": "SourceCounterpartyNumber", "dataTypeId": "1"}, {
                            "name": "SourceCounterpartySystem",
                            "dataTypeId": "1"
                        }, {"name": "SourceTradeId", "dataTypeId": "1"}, {
                            "name": "SourceTradeType",
                            "dataTypeId": "1"
                        }, {"name": "ShadowRevenueType", "dataTypeId": "1"}, {
                            "name": "SwiftMessageStatus",
                            "dataTypeId": "1"
                        }, {"name": "TerminatedTradeNumber", "dataTypeId": "1"}, {
                            "name": "TradeDateTime",
                            "dataTypeId": "1"
                        }, {"name": "TradeKey2ChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "TradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "TradePhase", "dataTypeId": "1"}, {
                            "name": "TradeType",
                            "dataTypeId": "1"
                        }, {"name": "TraderABNo", "dataTypeId": "1"}, {
                            "name": "TraderName",
                            "dataTypeId": "1"
                        }, {"name": "TraderNumber", "dataTypeId": "1"}, {
                            "name": "TradeStatus",
                            "dataTypeId": "1"
                        }, {"name": "TransactionTradeNumber", "dataTypeId": "1"}, {
                            "name": "UpdateUserABNo",
                            "dataTypeId": "1"
                        }, {"name": "UpdateUserName", "dataTypeId": "1"}, {
                            "name": "UpdateDateTime",
                            "dataTypeId": "1"
                        }, {"name": "ValueDate", "dataTypeId": "1"}, {
                            "name": "VersionId",
                            "dataTypeId": "1"
                        }, {"name": "VolatilityStrike", "dataTypeId": "1"}, {
                            "name": "XtpJseRef",
                            "dataTypeId": "1"
                        }, {"name": "XtpTradeTypeValue", "dataTypeId": "1"}, {
                            "name": "YourRef",
                            "dataTypeId": "1"
                        }, {"name": "ReferencePrice", "dataTypeId": "1"}, {
                            "name": "ClearedTrade",
                            "dataTypeId": "1"
                        }, {"name": "ClrClearingBroker", "dataTypeId": "1"}, {
                            "name": "ClrBrokerTradeId",
                            "dataTypeId": "1"
                        }, {"name": "ClearingMemberCode", "dataTypeId": "1"}, {
                            "name": "ClearingHouseId",
                            "dataTypeId": "1"
                        }, {"name": "CentralCounterparty", "dataTypeId": "1"}, {
                            "name": "CcpStatus",
                            "dataTypeId": "1"
                        }, {"name": "CcpClearingStatus", "dataTypeId": "1"}, {
                            "name": "CcpClearingHouseId",
                            "dataTypeId": "1"
                        }, {"name": "OriginalMarkitWireTradeId", "dataTypeId": "1"}, {
                            "name": "OriginalCounterparty",
                            "dataTypeId": "1"
                        }, {"name": "MarkitWireTradeId", "dataTypeId": "1"}, {
                            "name": "CounterpartySdsId",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:23,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "CreateDateTime", "dataTypeId": "1"}, {
                            "name": "CashflowNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterpartyName", "dataTypeId": "1"}, {
                            "name": "CounterpartyNumber",
                            "dataTypeId": "1"
                        }, {"name": "CurrencyName", "dataTypeId": "1"}, {
                            "name": "CurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "FixedRate",
                            "dataTypeId": "1"
                        }, {"name": "ForwardRate", "dataTypeId": "1"}, {
                            "name": "LegNumber",
                            "dataTypeId": "1"
                        }, {"name": "NominalFactor", "dataTypeId": "1"}, {
                            "name": "PayDate",
                            "dataTypeId": "1"
                        }, {"name": "ProjectedTxnCcy", "dataTypeId": "1"}, {
                            "name": "ProjectedRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "SourceObjectUpdateUserName", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "Text", "dataTypeId": "1"}, {
                            "name": "Type",
                            "dataTypeId": "1"
                        }, {"name": "UpdateTime", "dataTypeId": "1"}, {"name": "UpdateUserName", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:24,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "23", "nullable": true}
                ]
            },
            {
                id: "ds-uuid-28",
                operations: [
                    {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App A",
                        appId: "my.app.a",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-a"],
                            path: "/some/path/a",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: [],
                            path: "/some/path/a.csv",
                            type: "CSV"
                        }],
                        mainProps: {
                            "id": "ds-uuid-a",
                            "name": "A",
                            "inputs": [],
                            "output": "ds-uuid-a"
                        }
                    }, {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App B",
                        appId: "my.app.b",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-b"],
                            path: "/some/path/b",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: [],
                            path: "/some/path/data.csv",
                            type: "CSV"
                        }],
                        mainProps: {
                            "id": "ds-uuid-b",
                            "name": "B",
                            "inputs": [],
                            "output": "ds-uuid-b"
                        }
                    }, {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App C",
                        appId: "my.app.c",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-c"],
                            path: "/some/path/c",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: ["ds-uuid-a"],
                            path: "/some/path/a",
                            type: "Parquet"
                        }, {
                            datasetsIds: ["ds-uuid-b"],
                            path: "/some/path/b",
                            type: "Parquet"
                        }, {
                            datasetsIds: [],
                            path: "/some/path/b.csv",
                            type: "CSV"
                        }],
                        mainProps: {
                            "id": "ds-uuid-c",
                            "name": "C",
                            "inputs": ["ds-uuid-a", "ds-uuid-b"],
                            "output": "ds-uuid-c"
                        }
                    }, {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App D",
                        appId: "my.app.d",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-d"],
                            path: "/some/path/d",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: ["ds-uuid-a"],
                            path: "/some/path/a",
                            type: "Parquet"
                        }, {
                            datasetsIds: ["ds-uuid-b"],
                            path: "/some/path/b",
                            type: "Parquet"
                        }, {
                            datasetsIds: [],
                            path: "/some/path/b.csv",
                            type: "CSV"
                        }],
                        mainProps: {
                            "id": "ds-uuid-d",
                            "name": "D",
                            "inputs": ["ds-uuid-a", "ds-uuid-b"],
                            "output": "ds-uuid-d"
                        }
                    }, {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App E",
                        appId: "my.app.e",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-1"],
                            path: "/some/path/e",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: ["ds-uuid-c"],
                            path: "/some/path/c",
                            type: "Parquet"
                        }, {
                            datasetsIds: ["ds-uuid-d"],
                            path: "/some/path/d",
                            type: "Parquet"
                        }, {
                            datasetsIds: [],
                            path: "/some/path/e.csv",
                            type: "CSV"
                        }],
                        mainProps: {
                            "id": "ds-uuid-1",
                            "name": "E",
                            "inputs": ["ds-uuid-c", "ds-uuid-d"],
                            "output": "ds-uuid-1"
                        }
                    }, {
                        "_typeHint": "za.co.absa.spline.model.op.Composite",
                        appName: "App F",
                        appId: "my.app.f",
                        timestamp: 1506696404000,
                        destination: {
                            datasetsIds: ["ds-uuid-28"],
                            path: "/some/path/f",
                            type: "parquet"
                        },
                        sources: [{
                            datasetsIds: ["ds-uuid-1"],
                            path: "/some/path/1",
                            type: "Parquet"
                        }, {
                            datasetsIds: ["ds-uuid-d"],
                            path: "/some/path/d",
                            type: "Parquet"
                        }, {
                            datasetsIds: [],
                            path: "/some/path/e.csv",
                            type: "CSV"
                        }],
                        mainProps: {
                            "id": "ds-uuid-28",
                            "name": "F",
                            "inputs": ["ds-uuid-1", "ds-uuid-d"],
                            "output": "ds-uuid-28"
                        }
                    }
                ],
                datasets: [
                    {"id": "ds-uuid-a", "schema": {"attrs": ["attr-uuid-1", "attr-uuid-2", "attr-uuid-3"]}},
                    {"id": "ds-uuid-b", "schema": {"attrs": ["attr-uuid-4", "attr-uuid-5", "attr-uuid-6"]}},
                    {"id": "ds-uuid-c", "schema": {"attrs": ["attr-uuid-1", "attr-uuid-3", "attr-uuid-6"]}},
                    {"id": "ds-uuid-d", "schema": {"attrs": ["attr-uuid-1", "attr-uuid-3", "attr-uuid-6"]}},
                    {"id": "ds-uuid-1", "schema": {"attrs": ["attr-uuid-7", "attr-uuid-8", "attr-uuid-9"]}},
                    {"id": "ds-uuid-28", "schema": {"attrs": ["attr-uuid-7", "attr-uuid-8", "attr-uuid-9"]}}
                ],
                attributes: [
                    {
                        "id": "attr-uuid-1",
                        "name": "attribute 1",
                        "dataTypeId": "1"
                    }, {
                        "id": "attr-uuid-2",
                        "name": "attribute 2",
                        "dataTypeId": "1"
                    }, {
                        "id": "attr-uuid-3",
                        "name": "attribute 3",
                        "dataTypeId": "1"
                    }, {
                        "id": "attr-uuid-4",
                        "name": "attribute 4",
                        "dataTypeId": "1"
                    }, {
                        "id": "attr-uuid-5",
                        "name": "attribute 5",
                        "dataTypeId": "1"
                    }, {
                        "id": "attr-uuid-6",
                        "name": "attribute 6",
                        "dataTypeId": "1"
                    }, {
                        "id": "attr-uuid-7",
                        "name": "attribute 7",
                        "dataTypeId": "1"
                    }, {
                        "id": "attr-uuid-8",
                        "name": "attribute 8",
                        "dataTypeId": "1"
                    }, {
                        "id": "attr-uuid-9",
                        "name": "attribute 9",
                        "dataTypeId": "1"
                    }
                ],
                dataTypes: [
                    {id:1, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true},
                    {id:2, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "decimal(38,10)", "nullable": true},
                    {id:3, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "boolean", "nullable": true},
                    {id:4, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "boolean", "nullable": false},
                    {id:5, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true},
                    {id:6, "_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "long", "nullable": false},
                    {id:7,
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{"name": "salescreditsubteamname", "dataTypeId": "1"}, {
                            "name": "salespersonname",
                            "dataTypeId": "1"
                        }, {"name": "standardsalescredit", "dataTypeId": "1"}, {
                            "name": "totalvalueaddsalescredit",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:8,
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "Isin",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentAddress", "dataTypeId": "1"}, {
                            "name": "InstrumentName",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentType", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "ParentInstrumentAddress",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:9,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "1", "nullable": true},
                    {id:10,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "7", "nullable": true},
                    {id:11,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "8", "nullable": true},
                    {id:12,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "initial", "dataTypeId": "9"}, {"name": "lastName", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:13,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "12", "nullable": true},
                    {id:14,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "Barrier", "dataTypeId": "1"}, {
                            "name": "BarrierEndDate",
                            "dataTypeId": "1"
                        }, {"name": "BarrierMonitoring", "dataTypeId": "1"}, {
                            "name": "BarrierOptionType",
                            "dataTypeId": "1"
                        }, {"name": "BarrierStartDate", "dataTypeId": "1"}, {
                            "name": "CallPut",
                            "dataTypeId": "1"
                        }, {"name": "ContractSize", "dataTypeId": "1"}, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "CommoditySubAssetsChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "Digital", "dataTypeId": "1"}, {
                            "name": "DomesticCurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "DoubleBarrier", "dataTypeId": "1"}, {
                            "name": "EndDateTime",
                            "dataTypeId": "1"
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataTypeId": "1"
                        }, {"name": "ExoticDigitalBarrierType", "dataTypeId": "1"}, {
                            "name": "ExoticRebateName",
                            "dataTypeId": "1"
                        }, {"name": "ExoticRebateNumber", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "ExternalId1",
                            "dataTypeId": "1"
                        }, {"name": "ForeignCurrencyName", "dataTypeId": "1"}, {
                            "name": "FxOptionType",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentAddress",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentName", "dataTypeId": "1"}, {
                            "name": "InstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "IsCurrency", "dataTypeId": "1"}, {
                            "name": "IsExpired",
                            "dataTypeId": "1"
                        }, {"name": "Isin", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "Legs",
                            "dataTypeId": "16"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "OptionExerciseType", "dataTypeId": "1"}, {
                            "name": "OptionExoticType",
                            "dataTypeId": "1"
                        }, {"name": "Otc", "dataTypeId": "1"}, {
                            "name": "PayDayOffset",
                            "dataTypeId": "1"
                        }, {"name": "PayOffsetMethod", "dataTypeId": "1"}, {
                            "name": "PayType",
                            "dataTypeId": "1"
                        }, {"name": "QuoteType", "dataTypeId": "1"}, {
                            "name": "Rate",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RefValue",
                            "dataTypeId": "1"
                        }, {"name": "Rebate", "dataTypeId": "1"}, {
                            "name": "ReferencePrice",
                            "dataTypeId": "1"
                        }, {"name": "SettlementType", "dataTypeId": "1"}, {
                            "name": "SettlementDateTime",
                            "dataTypeId": "1"
                        }, {"name": "SpotBankingDayOffset", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "StrikeCurrencyName", "dataTypeId": "1"}, {
                            "name": "StrikeCurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "TxnMaturityPeriod", "dataTypeId": "1"}, {
                            "name": "UnderlyingInstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingInstruments", "dataTypeId": "18"}, {
                            "name": "ValuationGroupName",
                            "dataTypeId": "1"
                        }, {"name": "FixingSourceName", "dataTypeId": "1"}, {
                            "name": "Seniority",
                            "dataTypeId": "1"
                        }, {"name": "VersionId", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:15,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "Barrier", "dataTypeId": "1"}, {
                            "name": "BarrierEndDate",
                            "dataTypeId": "1"
                        }, {"name": "BarrierMonitoring", "dataTypeId": "1"}, {
                            "name": "BarrierOptionType",
                            "dataTypeId": "1"
                        }, {"name": "BarrierStartDate", "dataTypeId": "1"}, {
                            "name": "CallPut",
                            "dataTypeId": "1"
                        }, {"name": "ContractSize", "dataTypeId": "1"}, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataTypeId": "1"
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "CommoditySubAssetsChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "Digital", "dataTypeId": "1"}, {
                            "name": "DomesticCurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "DoubleBarrier", "dataTypeId": "1"}, {
                            "name": "EndDateTime",
                            "dataTypeId": "1"
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataTypeId": "1"
                        }, {"name": "ExoticDigitalBarrierType", "dataTypeId": "1"}, {
                            "name": "ExoticRebateName",
                            "dataTypeId": "1"
                        }, {"name": "ExoticRebateNumber", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "ExternalId1",
                            "dataTypeId": "1"
                        }, {"name": "ForeignCurrencyName", "dataTypeId": "1"}, {
                            "name": "FxOptionType",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentAddress",
                            "dataTypeId": "1"
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentName", "dataTypeId": "1"}, {
                            "name": "InstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "IsCurrency", "dataTypeId": "1"}, {
                            "name": "IsExpired",
                            "dataTypeId": "1"
                        }, {"name": "Isin", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "Legs",
                            "dataTypeId": "16"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataTypeId": "1"
                        }, {"name": "OptionExerciseType", "dataTypeId": "1"}, {
                            "name": "OptionExoticType",
                            "dataTypeId": "1"
                        }, {"name": "Otc", "dataTypeId": "1"}, {
                            "name": "PayDayOffset",
                            "dataTypeId": "1"
                        }, {"name": "PayOffsetMethod", "dataTypeId": "1"}, {
                            "name": "PayType",
                            "dataTypeId": "1"
                        }, {"name": "QuoteType", "dataTypeId": "1"}, {
                            "name": "Rate",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RefValue",
                            "dataTypeId": "1"
                        }, {"name": "Rebate", "dataTypeId": "1"}, {
                            "name": "ReferencePrice",
                            "dataTypeId": "1"
                        }, {"name": "SettlementType", "dataTypeId": "1"}, {
                            "name": "SettlementDateTime",
                            "dataTypeId": "1"
                        }, {"name": "SpotBankingDayOffset", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "StrikeCurrencyName", "dataTypeId": "1"}, {
                            "name": "StrikeCurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "TxnMaturityPeriod", "dataTypeId": "1"}, {
                            "name": "UnderlyingInstrumentType",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingInstruments", "dataTypeId": "11"}, {
                            "name": "ValuationGroupName",
                            "dataTypeId": "1"
                        }, {"name": "FixingSourceName", "dataTypeId": "1"}, {
                            "name": "Seniority",
                            "dataTypeId": "1"
                        }, {"name": "VersionId", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:16,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "17", "nullable": true},
                    {id:17,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "AccruedDiscountBalanceRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "Carry",
                            "dataTypeId": "1"
                        }, {"name": "CleanConsideration", "dataTypeId": "1"}, {
                            "name": "CurrencyName",
                            "dataTypeId": "1"
                        }, {"name": "CurrentRate", "dataTypeId": "1"}, {
                            "name": "CurrentSpread",
                            "dataTypeId": "1"
                        }, {"name": "DayCountMethod", "dataTypeId": "1"}, {
                            "name": "EndDate",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FixedRate", "dataTypeId": "1"}, {
                            "name": "FloatRateReferenceName",
                            "dataTypeId": "1"
                        }, {"name": "FloatRateSpread", "dataTypeId": "1"}, {
                            "name": "IsPayLeg",
                            "dataTypeId": "1"
                        }, {"name": "LastResetDate", "dataTypeId": "1"}, {
                            "name": "LegFloatRateFactor",
                            "dataTypeId": "1"
                        }, {"name": "LegNumber", "dataTypeId": "1"}, {
                            "name": "LegStartDate",
                            "dataTypeId": "1"
                        }, {"name": "LegType", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Price",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "RepoRate", "dataTypeId": "1"}, {"name": "RollingPeriod", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:18,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "19", "nullable": true},
                    {id:19,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "ExpiryDate",
                            "dataTypeId": "1"
                        }, {"name": "ExpiryTime", "dataTypeId": "1"}, {
                            "name": "Isin",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentAddress", "dataTypeId": "1"}, {
                            "name": "InstrumentName",
                            "dataTypeId": "1"
                        }, {"name": "InstrumentType", "dataTypeId": "1"}, {
                            "name": "IssuerName",
                            "dataTypeId": "1"
                        }, {"name": "IssuerNumber", "dataTypeId": "1"}, {
                            "name": "ParentInstrumentAddress",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:20,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "2"
                        }, {"name": "AccruedInterestRepCcy", "dataTypeId": "2"}, {
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "2"
                        }, {"name": "BaseCostDirty", "dataTypeId": "1"}, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesSettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesUnsettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerageNonVatable",
                            "dataTypeId": "1"
                        }, {"name": "BrokerageVatable", "dataTypeId": "1"}, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CallAccruedInterestTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashBalanceTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashPerCurrencyZAR",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashflowRealDivRepCcyAmt", "dataTypeId": "1"}, {
                            "name": "DailyExecutionFee",
                            "dataTypeId": "1"
                        }, {"name": "DailyExecutionFeeNoVAT", "dataTypeId": "1"}, {
                            "name": "DailyVAT",
                            "dataTypeId": "1"
                        }, {"name": "DealAmount", "dataTypeId": "1"}, {
                            "name": "DividendDivPayDay",
                            "dataTypeId": "1"
                        }, {"name": "Dividends", "dataTypeId": "1"}, {
                            "name": "EndCash",
                            "dataTypeId": "1"
                        }, {"name": "ExecutionCost", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "Fees",
                            "dataTypeId": "1"
                        }, {"name": "FeesSettled", "dataTypeId": "1"}, {
                            "name": "FeesUnsettled",
                            "dataTypeId": "1"
                        }, {"name": "Interest", "dataTypeId": "1"}, {
                            "name": "InvestorProtectionLevy",
                            "dataTypeId": "1"
                        }, {"name": "IsMidasSettlement", "dataTypeId": "1"}, {
                            "name": "ManufacturedDividendValue",
                            "dataTypeId": "1"
                        }, {"name": "NetConsideration", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Premium",
                            "dataTypeId": "1"
                        }, {"name": "PriceEndDate", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvUnsettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RegulatoryNotional",
                            "dataTypeId": "1"
                        }, {"name": "SecurityTransferTax", "dataTypeId": "1"}, {
                            "name": "SettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "StartCash", "dataTypeId": "1"}, {
                            "name": "StrikePrice",
                            "dataTypeId": "1"
                        }, {"name": "StrikeRate", "dataTypeId": "1"}, {
                            "name": "SweepingPosition",
                            "dataTypeId": "1"
                        }, {"name": "TotalLastDividendAmount", "dataTypeId": "1"}, {
                            "name": "TotalProfitLoss",
                            "dataTypeId": "1"
                        }, {"name": "TradedCleanPrice", "dataTypeId": "1"}, {
                            "name": "TradedDirtyPrice",
                            "dataTypeId": "1"
                        }, {"name": "TradedInterestInRepCcy", "dataTypeId": "1"}, {
                            "name": "TradedInterestInTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingForwardPrice", "dataTypeId": "1"}, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnsettledPremiumTxnCcy", "dataTypeId": "1"}, {
                            "name": "Vat",
                            "dataTypeId": "1"
                        }, {"name": "YieldToMaturity", "dataTypeId": "1"}, {
                            "name": "SecuritiesTransferTax",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:21,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "AccruedInterestRepCcy", "dataTypeId": "1"}, {
                            "name": "AccruedInterestTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "BaseCostDirty", "dataTypeId": "1"}, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesSettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "BrokerFeesUnsettledTxnCcy", "dataTypeId": "1"}, {
                            "name": "BrokerageNonVatable",
                            "dataTypeId": "1"
                        }, {"name": "BrokerageVatable", "dataTypeId": "1"}, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CallAccruedInterestTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashBalanceRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashBalanceTxnCcy", "dataTypeId": "1"}, {
                            "name": "CashPerCurrencyZAR",
                            "dataTypeId": "1"
                        }, {"name": "CashRepCcy", "dataTypeId": "1"}, {
                            "name": "CashTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "CashflowRealDivRepCcyAmt", "dataTypeId": "1"}, {
                            "name": "DailyExecutionFee",
                            "dataTypeId": "1"
                        }, {"name": "DailyExecutionFeeNoVAT", "dataTypeId": "1"}, {
                            "name": "DailyVAT",
                            "dataTypeId": "1"
                        }, {"name": "DealAmount", "dataTypeId": "1"}, {
                            "name": "DividendDivPayDay",
                            "dataTypeId": "1"
                        }, {"name": "Dividends", "dataTypeId": "1"}, {
                            "name": "EndCash",
                            "dataTypeId": "1"
                        }, {"name": "ExecutionCost", "dataTypeId": "1"}, {
                            "name": "FaceValueRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "FaceValueTxnCcy", "dataTypeId": "1"}, {
                            "name": "Fees",
                            "dataTypeId": "1"
                        }, {"name": "FeesSettled", "dataTypeId": "1"}, {
                            "name": "FeesUnsettled",
                            "dataTypeId": "1"
                        }, {"name": "Interest", "dataTypeId": "1"}, {
                            "name": "InvestorProtectionLevy",
                            "dataTypeId": "1"
                        }, {"name": "IsMidasSettlement", "dataTypeId": "1"}, {
                            "name": "ManufacturedDividendValue",
                            "dataTypeId": "1"
                        }, {"name": "NetConsideration", "dataTypeId": "1"}, {
                            "name": "NominalRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "NominalTxnCcy", "dataTypeId": "1"}, {
                            "name": "Premium",
                            "dataTypeId": "1"
                        }, {"name": "PriceEndDate", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvUnsettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "RealDividendValue", "dataTypeId": "1"}, {
                            "name": "RegulatoryNotional",
                            "dataTypeId": "1"
                        }, {"name": "SecurityTransferTax", "dataTypeId": "1"}, {
                            "name": "SettledDividends",
                            "dataTypeId": "1"
                        }, {"name": "StartCash", "dataTypeId": "1"}, {
                            "name": "StrikePrice",
                            "dataTypeId": "1"
                        }, {"name": "StrikeRate", "dataTypeId": "1"}, {
                            "name": "SweepingPosition",
                            "dataTypeId": "1"
                        }, {"name": "TotalLastDividendAmount", "dataTypeId": "1"}, {
                            "name": "TotalProfitLoss",
                            "dataTypeId": "1"
                        }, {"name": "TradedCleanPrice", "dataTypeId": "1"}, {
                            "name": "TradedDirtyPrice",
                            "dataTypeId": "1"
                        }, {"name": "TradedInterestInRepCcy", "dataTypeId": "1"}, {
                            "name": "TradedInterestInTxnCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnderlyingForwardPrice", "dataTypeId": "1"}, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "UnsettledPremiumTxnCcy", "dataTypeId": "1"}, {
                            "name": "Vat",
                            "dataTypeId": "1"
                        }, {"name": "YieldToMaturity", "dataTypeId": "1"}, {
                            "name": "SecuritiesTransferTax",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:22,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "AcquireDate", "dataTypeId": "1"}, {
                            "name": "AcquirerName",
                            "dataTypeId": "1"
                        }, {"name": "AcquirerNumber", "dataTypeId": "1"}, {
                            "name": "AgriSiloLocation",
                            "dataTypeId": "1"
                        }, {"name": "AgriStatus", "dataTypeId": "1"}, {
                            "name": "AgriTransportDifferential",
                            "dataTypeId": "1"
                        }, {
                            "name": "ApproximateLoadDescription",
                            "dataTypeId": "1"
                        }, {"name": "ApproximateLoadIndicator", "dataTypeId": "1"}, {
                            "name": "ApproximateLoadPrice",
                            "dataTypeId": "1"
                        }, {"name": "ApproximateLoadQuantity", "dataTypeId": "1"}, {
                            "name": "BrokerBIC",
                            "dataTypeId": "1"
                        }, {"name": "BrokerName", "dataTypeId": "1"}, {
                            "name": "BrokerStatus",
                            "dataTypeId": "1"
                        }, {"name": "BuySell", "dataTypeId": "1"}, {
                            "name": "ClientFundName",
                            "dataTypeId": "1"
                        }, {"name": "ClsStatus", "dataTypeId": "1"}, {
                            "name": "ConnectedTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "ContractTradeNumber", "dataTypeId": "1"}, {
                            "name": "CorrectionTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterpartyName", "dataTypeId": "1"}, {
                            "name": "CounterpartyNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterPortfolioName", "dataTypeId": "1"}, {
                            "name": "CounterPortfolioNumber",
                            "dataTypeId": "1"
                        }, {"name": "CountryPortfolio", "dataTypeId": "1"}, {
                            "name": "CreateDateTime",
                            "dataTypeId": "1"
                        }, {"name": "CurrencyName", "dataTypeId": "1"}, {
                            "name": "DiscountType",
                            "dataTypeId": "1"
                        }, {"name": "DiscountingTypeChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "ExecutionDateTime",
                            "dataTypeId": "1"
                        }, {"name": "ExternalId", "dataTypeId": "1"}, {
                            "name": "FundingInsType",
                            "dataTypeId": "1"
                        }, {"name": "FullyFunded", "dataTypeId": "1"}, {
                            "name": "FxSubType",
                            "dataTypeId": "1"
                        }, {"name": "InsTypeOverrideName", "dataTypeId": "1"}, {
                            "name": "IsInternalSettlement",
                            "dataTypeId": "1"
                        }, {"name": "LastModifiedUserID", "dataTypeId": "1"}, {
                            "name": "MaturityDate",
                            "dataTypeId": "1"
                        }, {"name": "MentisProjectNumber", "dataTypeId": "1"}, {
                            "name": "MirrorTradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "MmInstrumentType", "dataTypeId": "1"}, {
                            "name": "PortfolioName",
                            "dataTypeId": "1"
                        }, {"name": "PortfolioNumber", "dataTypeId": "1"}, {
                            "name": "Price",
                            "dataTypeId": "1"
                        }, {"name": "Quantity", "dataTypeId": "1"}, {
                            "name": "RelationshipPartyName",
                            "dataTypeId": "1"
                        }, {"name": "RwaCounterpartyName", "dataTypeId": "1"}, {
                            "name": "SourceCounterpartyName",
                            "dataTypeId": "1"
                        }, {"name": "SourceCounterpartyNumber", "dataTypeId": "1"}, {
                            "name": "SourceCounterpartySystem",
                            "dataTypeId": "1"
                        }, {"name": "SourceTradeId", "dataTypeId": "1"}, {
                            "name": "SourceTradeType",
                            "dataTypeId": "1"
                        }, {"name": "ShadowRevenueType", "dataTypeId": "1"}, {
                            "name": "SwiftMessageStatus",
                            "dataTypeId": "1"
                        }, {"name": "TerminatedTradeNumber", "dataTypeId": "1"}, {
                            "name": "TradeDateTime",
                            "dataTypeId": "1"
                        }, {"name": "TradeKey2ChoiceListEntry", "dataTypeId": "1"}, {
                            "name": "TradeNumber",
                            "dataTypeId": "1"
                        }, {"name": "TradePhase", "dataTypeId": "1"}, {
                            "name": "TradeType",
                            "dataTypeId": "1"
                        }, {"name": "TraderABNo", "dataTypeId": "1"}, {
                            "name": "TraderName",
                            "dataTypeId": "1"
                        }, {"name": "TraderNumber", "dataTypeId": "1"}, {
                            "name": "TradeStatus",
                            "dataTypeId": "1"
                        }, {"name": "TransactionTradeNumber", "dataTypeId": "1"}, {
                            "name": "UpdateUserABNo",
                            "dataTypeId": "1"
                        }, {"name": "UpdateUserName", "dataTypeId": "1"}, {
                            "name": "UpdateDateTime",
                            "dataTypeId": "1"
                        }, {"name": "ValueDate", "dataTypeId": "1"}, {
                            "name": "VersionId",
                            "dataTypeId": "1"
                        }, {"name": "VolatilityStrike", "dataTypeId": "1"}, {
                            "name": "XtpJseRef",
                            "dataTypeId": "1"
                        }, {"name": "XtpTradeTypeValue", "dataTypeId": "1"}, {
                            "name": "YourRef",
                            "dataTypeId": "1"
                        }, {"name": "ReferencePrice", "dataTypeId": "1"}, {
                            "name": "ClearedTrade",
                            "dataTypeId": "1"
                        }, {"name": "ClrClearingBroker", "dataTypeId": "1"}, {
                            "name": "ClrBrokerTradeId",
                            "dataTypeId": "1"
                        }, {"name": "ClearingMemberCode", "dataTypeId": "1"}, {
                            "name": "ClearingHouseId",
                            "dataTypeId": "1"
                        }, {"name": "CentralCounterparty", "dataTypeId": "1"}, {
                            "name": "CcpStatus",
                            "dataTypeId": "1"
                        }, {"name": "CcpClearingStatus", "dataTypeId": "1"}, {
                            "name": "CcpClearingHouseId",
                            "dataTypeId": "1"
                        }, {"name": "OriginalMarkitWireTradeId", "dataTypeId": "1"}, {
                            "name": "OriginalCounterparty",
                            "dataTypeId": "1"
                        }, {"name": "MarkitWireTradeId", "dataTypeId": "1"}, {
                            "name": "CounterpartySdsId",
                            "dataTypeId": "1"
                        }],
                        "nullable": true
                    },
                    {id:23,
                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                        "fields": [{"name": "CreateDateTime", "dataTypeId": "1"}, {
                            "name": "CashflowNumber",
                            "dataTypeId": "1"
                        }, {"name": "CounterpartyName", "dataTypeId": "1"}, {
                            "name": "CounterpartyNumber",
                            "dataTypeId": "1"
                        }, {"name": "CurrencyName", "dataTypeId": "1"}, {
                            "name": "CurrencyNumber",
                            "dataTypeId": "1"
                        }, {"name": "EndDate", "dataTypeId": "1"}, {
                            "name": "FixedRate",
                            "dataTypeId": "1"
                        }, {"name": "ForwardRate", "dataTypeId": "1"}, {
                            "name": "LegNumber",
                            "dataTypeId": "1"
                        }, {"name": "NominalFactor", "dataTypeId": "1"}, {
                            "name": "PayDate",
                            "dataTypeId": "1"
                        }, {"name": "ProjectedTxnCcy", "dataTypeId": "1"}, {
                            "name": "ProjectedRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "PvTxnCcy", "dataTypeId": "1"}, {
                            "name": "PvRepCcy",
                            "dataTypeId": "1"
                        }, {"name": "SourceObjectUpdateUserName", "dataTypeId": "1"}, {
                            "name": "StartDate",
                            "dataTypeId": "1"
                        }, {"name": "Text", "dataTypeId": "1"}, {
                            "name": "Type",
                            "dataTypeId": "1"
                        }, {"name": "UpdateTime", "dataTypeId": "1"}, {"name": "UpdateUserName", "dataTypeId": "1"}],
                        "nullable": true
                    },
                    {id:24,"_typeHint": "za.co.absa.spline.model.dt.Array", "elementDataTypeId": "23", "nullable": true}
                ]
            }
        ],

        "_persisted-dataset-descriptors": [
            {
                id: "a38e44ec-bfea-4048-bf21-a9060dbbbb25",
                datasetId: "a38e44ec-bfea-4048-bf21-a9060dbbbb25",
                appId: "APPENDS",
                appName: "APPENDS",
                path: "hdfs://APPENDS",
                timestamp: 1520949162367
            },
            {
                id: "ds-uuid-1",
                datasetId: "ds-uuid-1",
                appId: "dlkjfghlskdhfjlksd",
                appName: "Foo Bar Application",
                path: "hdfs://foo/bar/baz",
                timestamp: 1506696404000
            }, {
                id: "ds-uuid-28",
                datasetId: "ds-uuid-28",
                appId: "dlkjfghlskdhfjlksd",
                appName: "Sample - FrontCache Conformance",
                path: "hdfs://foo/bar/baz",
                timestamp: 1506696404000
            }, {
                datasetId: "ds-uuid-988",
                appId: "dlkjfghlskdhfjlksd",
                appName: "Sample - FrontCache Conformance",
                path: "hdfs://foo/bar/baz",
                timestamp: 1506696404000
            }, {
                datasetId: "ds-uuid-989",
                appId: "dlkjfghlskdhfjlksd",
                appName: "Sample - FrontCache Conformance",
                path: "hdfs://foo/bar/baz",
                timestamp: 1506696404000
            }, {
                datasetId: "ds-uuid-990",
                appId: "dlkjfghlskdhfjlksd",
                appName: "Sample - FrontCache Conformance",
                path: "hdfs://foo/bar/baz",
                timestamp: 1506696404000
            }, {
                datasetId: "ds-uuid-991",
                appId: "dlkjfghlskdhfjlksd",
                appName: "Sample - FrontCache Conformance",
                path: "hdfs://foo/bar/baz",
                timestamp: 1506696404000
            }, {
                datasetId: "ds-uuid-992",
                appId: "dlkjfghlskdhfjlksd",
                appName: "Sample - FrontCache Conformance",
                path: "hdfs://foo/bar/baz",
                timestamp: 1506696404000
            }, {
                datasetId: "ds-uuid-993",
                appId: "dlkjfghlskdhfjlksd",
                appName: "Sample - FrontCache Conformance",
                path: "hdfs://foo/bar/baz",
                timestamp: 1506696404000
            }, {
                datasetId: "ds-uuid-994",
                appId: "dlkjfghlskdhfjlksd",
                appName: "Sample - FrontCache Conformance",
                path: "hdfs://foo/bar/baz",
                timestamp: 1506696404000
            }]
    } // jshint ignore:line
};