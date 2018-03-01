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
                "attributes": [{
                    "id": "attr-uuid-0",
                    "name": "TradeScalar",
                    "dataType": {
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{
                            "name": "AccruedDiscountBalanceRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "AccruedDiscountBalanceTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "decimal(38,10)", "nullable": true}
                        }, {
                            "name": "AccruedInterestRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "decimal(38,10)", "nullable": true}
                        }, {
                            "name": "AccruedInterestTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "decimal(38,10)", "nullable": true}
                        }, {
                            "name": "BaseCostDirty",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BrokerFeesSettledRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BrokerFeesSettledTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BrokerFeesUnsettledRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BrokerFeesUnsettledTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BrokerageNonVatable",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BrokerageVatable",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CallAccruedInterestRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CallAccruedInterestTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CashBalanceRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CashBalanceTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CashPerCurrencyZAR",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CashRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CashTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CashflowRealDivRepCcyAmt",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "DailyExecutionFee",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "DailyExecutionFeeNoVAT",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "DailyVAT",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "DealAmount",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "DividendDivPayDay",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Dividends",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "EndCash",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ExecutionCost",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "FaceValueRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "FaceValueTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Fees",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "FeesSettled",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "FeesUnsettled",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Interest",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "InvestorProtectionLevy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "IsMidasSettlement",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ManufacturedDividendValue",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "NetConsideration",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "NominalRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "NominalTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Premium",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PriceEndDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PvRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PvTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PvUnsettledDividends",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "RealDividendValue",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "RegulatoryNotional",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SecurityTransferTax",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SettledDividends",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "StartCash",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "StrikePrice",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "StrikeRate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SweepingPosition",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TotalLastDividendAmount",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TotalProfitLoss",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TradedCleanPrice",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TradedDirtyPrice",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TradedInterestInRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TradedInterestInTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "UnderlyingForwardPrice",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "UnsettledPremiumRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "UnsettledPremiumTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Vat",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "YieldToMaturity",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SecuritiesTransferTax",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }],
                        "nullable": true
                    }
                }, {
                    "id": "attr-uuid-1",
                    "name": "TradeStatic",
                    "dataType": {
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{
                            "name": "AcquireDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "AcquirerName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "AcquirerNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "AgriSiloLocation",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "AgriStatus",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "AgriTransportDifferential",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ApproximateLoadDescription",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ApproximateLoadIndicator",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ApproximateLoadPrice",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ApproximateLoadQuantity",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BrokerBIC",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BrokerName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BrokerStatus",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BuySell",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ClientFundName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ClsStatus",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ConnectedTradeNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ContractTradeNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CorrectionTradeNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CounterpartyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CounterpartyNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CounterPortfolioName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CounterPortfolioNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CountryPortfolio",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CreateDateTime",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CurrencyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "DiscountType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "DiscountingTypeChoiceListEntry",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ExecutionDateTime",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ExternalId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "FundingInsType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "FullyFunded",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "FxSubType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "InsTypeOverrideName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "IsInternalSettlement",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "LastModifiedUserID",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "MaturityDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "MentisProjectNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "MirrorTradeNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "MmInstrumentType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PortfolioName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PortfolioNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Price",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Quantity",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "RelationshipPartyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "RwaCounterpartyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SourceCounterpartyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SourceCounterpartyNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SourceCounterpartySystem",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SourceTradeId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SourceTradeType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ShadowRevenueType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SwiftMessageStatus",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TerminatedTradeNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TradeDateTime",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TradeKey2ChoiceListEntry",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TradeNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TradePhase",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TradeType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TraderABNo",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TraderName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TraderNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TradeStatus",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TransactionTradeNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "UpdateUserABNo",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "UpdateUserName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "UpdateDateTime",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ValueDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "VersionId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "VolatilityStrike",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "XtpJseRef",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "XtpTradeTypeValue",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "YourRef",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ReferencePrice",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ClearedTrade",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ClrClearingBroker",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ClrBrokerTradeId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ClearingMemberCode",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ClearingHouseId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CentralCounterparty",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CcpStatus",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CcpClearingStatus",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CcpClearingHouseId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "OriginalMarkitWireTradeId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "OriginalCounterparty",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "MarkitWireTradeId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CounterpartySdsId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }],
                        "nullable": true
                    }
                }, {
                    "id": "attr-uuid-2",
                    "name": "Instrument",
                    "dataType": {
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{
                            "name": "Barrier",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BarrierEndDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BarrierMonitoring",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BarrierOptionType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "BarrierStartDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CallPut",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ContractSize",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CommodityDeliverableChoiceListEntry",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CommodityDescriptionChoiceListEntry",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CommodityLabelChoiceListEntry",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CommoditySubAssetsChoiceListEntry",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CurrencyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Digital",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "DomesticCurrencyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "DoubleBarrier",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "EndDateTime",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ExoticBarrierRebateOnExpiry",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ExoticDigitalBarrierType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ExoticRebateName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ExoticRebateNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ExpiryDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ExpiryTime",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ExternalId1",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ForeignCurrencyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "FxOptionType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "InstrumentAddress",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "InstrumentExoticBarrierCrossedStatus",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "InstrumentName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "InstrumentType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "IsCurrency",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "IsExpired",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Isin",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "IssuerName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "IssuerNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Legs",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                "elementDataType": {
                                    "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                    "fields": [{
                                        "name": "AccruedInterestTxnCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "AccruedInterestRepCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "AccruedDiscountBalanceTxnCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "AccruedDiscountBalanceRepCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "CashTxnCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "CashRepCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "Carry",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "CleanConsideration",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "CurrencyName",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "CurrentRate",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "CurrentSpread",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "DayCountMethod",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "EndDate",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "FaceValueTxnCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "FaceValueRepCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "FixedRate",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "FloatRateReferenceName",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "FloatRateSpread",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "IsPayLeg",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "LastResetDate",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "LegFloatRateFactor",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "LegNumber",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "LegStartDate",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "LegType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "NominalRepCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "NominalTxnCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "Price",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "PvTxnCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "PvRepCcy",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "RepoRate",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "RollingPeriod",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }],
                                    "nullable": true
                                },
                                "nullable": true
                            }
                        }, {
                            "name": "MmInstrumentType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "OpenLinkUnitChoiceListEntry",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "OptionExerciseType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "OptionExoticType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Otc",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PayDayOffset",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PayOffsetMethod",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PayType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "QuoteType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Rate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "RealDividendValue",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "RefValue",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Rebate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ReferencePrice",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SettlementType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SettlementDateTime",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SpotBankingDayOffset",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "StartDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "StrikeCurrencyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "StrikeCurrencyNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TxnMaturityPeriod",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "UnderlyingInstrumentType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "UnderlyingInstruments",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                "elementDataType": {
                                    "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                    "fields": [{
                                        "name": "EndDate",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "ExpiryDate",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "ExpiryTime",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "Isin",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "InstrumentAddress",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "InstrumentName",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "InstrumentType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "IssuerName",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "IssuerNumber",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }, {
                                        "name": "ParentInstrumentAddress",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                    }],
                                    "nullable": true
                                },
                                "nullable": true
                            }
                        }, {
                            "name": "ValuationGroupName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "FixingSourceName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Seniority",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "VersionId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }],
                        "nullable": true
                    }
                }, {
                    "id": "attr-uuid-3",
                    "name": "Moneyflows",
                    "dataType": {
                        "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                        "elementDataType": {
                            "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                            "fields": [{
                                "name": "CreateDateTime",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "CashflowNumber",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "CounterpartyName",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "CounterpartyNumber",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "CurrencyName",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "CurrencyNumber",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "EndDate",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "FixedRate",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "ForwardRate",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "LegNumber",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "NominalFactor",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "PayDate",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "ProjectedTxnCcy",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "ProjectedRepCcy",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "PvTxnCcy",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "PvRepCcy",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "SourceObjectUpdateUserName",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "StartDate",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "Text",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "Type",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "UpdateTime",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "UpdateUserName",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }],
                            "nullable": true
                        },
                        "nullable": true
                    }
                }, {
                    "id": "attr-uuid-4",
                    "name": "SalesCredits",
                    "dataType": {
                        "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                        "elementDataType": {
                            "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                            "fields": [{
                                "name": "SalesCreditSubTeamName",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "SalesPersonName",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "StandardSalesCredit",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }, {
                                "name": "TotalValueAddSalesCredit",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                            }],
                            "nullable": true
                        },
                        "nullable": true
                    }
                }, {
                    "id": "attr-uuid-5",
                    "name": "Feed",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-6",
                    "name": "IsEoD",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": true}
                }, {
                    "id": "attr-uuid-7",
                    "name": "ReportDate",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-34",
                    "name": "ProductMainType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-35",
                    "name": "ProductSubType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-74",
                    "name": "EnterpriseProduct",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-106",
                    "name": "ProductCategory",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-352",
                    "name": "Balance",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-111",
                    "name": "MappingMainType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-72",
                    "name": "FundingInstrumentType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-71",
                    "name": "AdditionalInstrumentOverride",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-86",
                    "name": "MappingSubType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-85",
                    "name": "MappingMainType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-49",
                    "name": "SourceSubType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-32",
                    "name": "SourceMainType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-33",
                    "name": "SourceSubType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-30",
                    "name": "ProductMainSubTypeMappingId",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-31",
                    "name": "SourceSystem",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-67",
                    "name": "EnterpriseProductMappingId",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-68",
                    "name": "ProductMainType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-69",
                    "name": "ProductSubType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-70",
                    "name": "MoneyMarketInstrumentType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-73",
                    "name": "OTCOverride",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-105",
                    "name": "MainType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
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
                }, {"id": "ds-uuid-20", "schema": {"attrs": ["attr-uuid-32", "attr-uuid-49", "attr-uuid-34", "attr-uuid-35"]}}, {
                    "id": "ds-uuid-21",
                    "schema": {"attrs": ["attr-uuid-32", "attr-uuid-49", "attr-uuid-34", "attr-uuid-35"]}
                }, {"id": "ds-uuid-22", "schema": {"attrs": ["attr-uuid-32", "attr-uuid-33", "attr-uuid-34", "attr-uuid-35"]}}, {
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
                    "_typeHint": "za.co.absa.spline.core.model.op.Write",
                    "mainProps": {
                        "id": "op-uuid-1",
                        "name": "SaveIntoDataSourceCommand",
                        "rawString": "SaveIntoDataSourceCommand parquet, Map(path -> data/Conformance/ConformedData, Overwrite",
                        "inputs": ["ds-uuid-1"],
                        "output": "ds-uuid-1"
                    },
                    "destinationType": "parquet",
                    "path": "data/Conformance/ConformedData"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-2",
                        "name": "Project",
                        "rawString": "Project [TradeScalar#0, TradeStatic#1, Instrument#2, Moneyflows#3, SalesCredits#4, Feed#5, IsEoD#6, ReportDate#7, ProductMainType#34, ProductSubType#35, EnterpriseProduct#74, ProductCategory#106, UDF:selectBalance(ProductCategory#106, TradeScalar#0.NominalRepCcy, TradeScalar#0.CashBalanceRepCcy) AS Balance#352]",
                        "inputs": ["ds-uuid-2"],
                        "output": "ds-uuid-1"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                        "exprType": "Alias",
                        "text": "UDF:selectBalance(ProductCategory#106, TradeScalar#0.NominalRepCcy, TradeScalar#0.CashBalanceRepCcy) AS Balance#352",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                            "name": "selectBalance",
                            "exprType": "UserDefinedFunction",
                            "text": "UDF:selectBalance(ProductCategory#106, TradeScalar#0.NominalRepCcy, TradeScalar#0.CashBalanceRepCcy)",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                "attributeId": 106,
                                "name": "ProductCategory",
                                "exprType": "AttributeReference",
                                "text": "ProductCategory",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": []
                            }, {
                                "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                "exprType": "GetStructField",
                                "text": "TradeScalar#0.NominalRepCcy",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                    "attributeId": 0,
                                    "name": "TradeScalar",
                                    "exprType": "AttributeReference",
                                    "text": "TradeScalar",
                                    "dataType": {
                                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                        "fields": [{
                                            "name": "AccruedDiscountBalanceRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "AccruedDiscountBalanceTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "AccruedInterestRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "AccruedInterestTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BaseCostDirty",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerFeesSettledRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerFeesSettledTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerFeesUnsettledRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerFeesUnsettledTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerageNonVatable",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerageVatable",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CallAccruedInterestRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CallAccruedInterestTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashBalanceRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashBalanceTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashPerCurrencyZAR",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashflowRealDivRepCcyAmt",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "DailyExecutionFee",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "DailyExecutionFeeNoVAT",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "DailyVAT",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "DealAmount",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "DividendDivPayDay",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "Dividends",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "EndCash",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "ExecutionCost",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "FaceValueRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "FaceValueTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "Fees",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "FeesSettled",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "FeesUnsettled",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "Interest",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "InvestorProtectionLevy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "IsMidasSettlement",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "ManufacturedDividendValue",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "NetConsideration",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "NominalRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "NominalTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "Premium",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "PriceEndDate",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "PvRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "PvTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "PvUnsettledDividends",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "RealDividendValue",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "RegulatoryNotional",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "SecurityTransferTax",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "SettledDividends",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "StartCash",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "StrikePrice",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "StrikeRate",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "SweepingPosition",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TotalLastDividendAmount",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TotalProfitLoss",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TradedCleanPrice",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TradedDirtyPrice",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TradedInterestInRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TradedInterestInTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "UnderlyingForwardPrice",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "UnsettledPremiumRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "UnsettledPremiumTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "Vat",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "YieldToMaturity",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "SecuritiesTransferTax",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }],
                                        "nullable": true
                                    },
                                    "children": []
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                "exprType": "GetStructField",
                                "text": "TradeScalar#0.CashBalanceRepCcy",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                    "attributeId": 0,
                                    "name": "TradeScalar",
                                    "exprType": "AttributeReference",
                                    "text": "TradeScalar",
                                    "dataType": {
                                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                        "fields": [{
                                            "name": "AccruedDiscountBalanceRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "AccruedDiscountBalanceTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "AccruedInterestRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "AccruedInterestTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BaseCostDirty",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerFeesSettledRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerFeesSettledTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerFeesUnsettledRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerFeesUnsettledTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerageNonVatable",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "BrokerageVatable",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CallAccruedInterestRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CallAccruedInterestTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashBalanceRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashBalanceTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashPerCurrencyZAR",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "CashflowRealDivRepCcyAmt",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "DailyExecutionFee",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "DailyExecutionFeeNoVAT",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "DailyVAT",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "DealAmount",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "DividendDivPayDay",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "Dividends",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "EndCash",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "ExecutionCost",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "FaceValueRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "FaceValueTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "Fees",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "FeesSettled",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "FeesUnsettled",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "Interest",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "InvestorProtectionLevy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "IsMidasSettlement",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "ManufacturedDividendValue",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "NetConsideration",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "NominalRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "NominalTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "Premium",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "PriceEndDate",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "PvRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "PvTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "PvUnsettledDividends",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "RealDividendValue",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "RegulatoryNotional",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "SecurityTransferTax",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "SettledDividends",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "StartCash",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "StrikePrice",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "StrikeRate",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "SweepingPosition",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TotalLastDividendAmount",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TotalProfitLoss",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TradedCleanPrice",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TradedDirtyPrice",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TradedInterestInRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "TradedInterestInTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "UnderlyingForwardPrice",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "UnsettledPremiumRepCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "UnsettledPremiumTxnCcy",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "Vat",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "YieldToMaturity",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }, {
                                            "name": "SecuritiesTransferTax",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                        }],
                                        "nullable": true
                                    },
                                    "children": []
                                }]
                            }]
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-3",
                        "name": "Project",
                        "rawString": "Project [TradeScalar#0, TradeStatic#1, Instrument#2, Moneyflows#3, SalesCredits#4, Feed#5, IsEoD#6, ReportDate#7, ProductMainType#34, ProductSubType#35, EnterpriseProduct#74, ProductCategory#106]",
                        "inputs": ["ds-uuid-3"],
                        "output": "ds-uuid-2"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- MappingMainType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 111,
                            "name": "MappingMainType",
                            "exprType": "AttributeReference",
                            "text": "MappingMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-4",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias SourceData",
                        "inputs": ["ds-uuid-4"],
                        "output": "ds-uuid-3"
                    },
                    "alias": "SourceData"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Join",
                    "mainProps": {
                        "id": "op-uuid-5",
                        "name": "Join",
                        "rawString": "Join LeftOuter, (ProductMainType#34 <=> MappingMainType#111)",
                        "inputs": ["ds-uuid-5", "ds-uuid-29"],
                        "output": "ds-uuid-4"
                    },
                    "condition": {
                        "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                        "exprType": "EqualNullSafe",
                        "symbol": "<=>",
                        "text": "(ProductMainType#34 <=> MappingMainType#111)",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 34,
                            "name": "ProductMainType",
                            "exprType": "AttributeReference",
                            "text": "ProductMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }, {
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 111,
                            "name": "MappingMainType",
                            "exprType": "AttributeReference",
                            "text": "MappingMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    },
                    "joinType": "LeftOuter"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-6",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias main",
                        "inputs": ["ds-uuid-6"],
                        "output": "ds-uuid-5"
                    },
                    "alias": "main"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-7",
                        "name": "Project",
                        "rawString": "Project [TradeScalar#0, TradeStatic#1, Instrument#2, Moneyflows#3, SalesCredits#4, Feed#5, IsEoD#6, ReportDate#7, ProductMainType#34, ProductSubType#35, EnterpriseProduct#74]",
                        "inputs": ["ds-uuid-7"],
                        "output": "ds-uuid-6"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- FundingInstrumentType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 72,
                            "name": "FundingInstrumentType",
                            "exprType": "AttributeReference",
                            "text": "FundingInstrumentType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-8",
                        "name": "Project",
                        "rawString": "Project [TradeScalar#0, TradeStatic#1, Instrument#2, Moneyflows#3, SalesCredits#4, Feed#5, IsEoD#6, ReportDate#7, ProductMainType#34, ProductSubType#35, FundingInstrumentType#72, EnterpriseProduct#74]",
                        "inputs": ["ds-uuid-8"],
                        "output": "ds-uuid-7"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- AdditionalInstrumentOverride",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 71,
                            "name": "AdditionalInstrumentOverride",
                            "exprType": "AttributeReference",
                            "text": "AdditionalInstrumentOverride",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-9",
                        "name": "Project",
                        "rawString": "Project [TradeScalar#0, TradeStatic#1, Instrument#2, Moneyflows#3, SalesCredits#4, Feed#5, IsEoD#6, ReportDate#7, ProductMainType#34, ProductSubType#35, AdditionalInstrumentOverride#71, FundingInstrumentType#72, EnterpriseProduct#74]",
                        "inputs": ["ds-uuid-9"],
                        "output": "ds-uuid-8"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- MappingSubType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 86,
                            "name": "MappingSubType",
                            "exprType": "AttributeReference",
                            "text": "MappingSubType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-10",
                        "name": "Project",
                        "rawString": "Project [TradeScalar#0, TradeStatic#1, Instrument#2, Moneyflows#3, SalesCredits#4, Feed#5, IsEoD#6, ReportDate#7, ProductMainType#34, ProductSubType#35, MappingSubType#86, AdditionalInstrumentOverride#71, FundingInstrumentType#72, EnterpriseProduct#74]",
                        "inputs": ["ds-uuid-10"],
                        "output": "ds-uuid-9"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- MappingMainType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 85,
                            "name": "MappingMainType",
                            "exprType": "AttributeReference",
                            "text": "MappingMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-11",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias SourceData",
                        "inputs": ["ds-uuid-11"],
                        "output": "ds-uuid-10"
                    },
                    "alias": "SourceData"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Join",
                    "mainProps": {
                        "id": "op-uuid-12",
                        "name": "Join",
                        "rawString": "Join LeftOuter, ((((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86)) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71))) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)) <=> UDF:toLower(FundingInstrumentType#72)))",
                        "inputs": ["ds-uuid-12", "ds-uuid-25"],
                        "output": "ds-uuid-11"
                    },
                    "condition": {
                        "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                        "exprType": "And",
                        "symbol": "&&",
                        "text": "((((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86)) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71))) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)) <=> UDF:toLower(FundingInstrumentType#72)))",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                            "exprType": "And",
                            "symbol": "&&",
                            "text": "(((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86)) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71)))",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                "exprType": "And",
                                "symbol": "&&",
                                "text": "((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86))",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                    "exprType": "EqualNullSafe",
                                    "symbol": "<=>",
                                    "text": "(ProductMainType#34 <=> MappingMainType#85)",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                        "attributeId": 34,
                                        "name": "ProductMainType",
                                        "exprType": "AttributeReference",
                                        "text": "ProductMainType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": []
                                    }, {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                        "attributeId": 85,
                                        "name": "MappingMainType",
                                        "exprType": "AttributeReference",
                                        "text": "MappingMainType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": []
                                    }]
                                }, {
                                    "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                    "exprType": "EqualNullSafe",
                                    "symbol": "<=>",
                                    "text": "(ProductSubType#35 <=> MappingSubType#86)",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                        "attributeId": 35,
                                        "name": "ProductSubType",
                                        "exprType": "AttributeReference",
                                        "text": "ProductSubType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": []
                                    }, {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                        "attributeId": 86,
                                        "name": "MappingSubType",
                                        "exprType": "AttributeReference",
                                        "text": "MappingSubType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": []
                                    }]
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                "exprType": "EqualNullSafe",
                                "symbol": "<=>",
                                "text": "(UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71))",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                    "name": "toLower",
                                    "exprType": "UserDefinedFunction",
                                    "text": "UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName))",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                        "name": "replaceNullsWithNotApplicable",
                                        "exprType": "UserDefinedFunction",
                                        "text": "UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                            "exprType": "GetStructField",
                                            "text": "TradeStatic#1.InsTypeOverrideName",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                            "children": [{
                                                "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                                "attributeId": 1,
                                                "name": "TradeStatic",
                                                "exprType": "AttributeReference",
                                                "text": "TradeStatic",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                    "fields": [{
                                                        "name": "AcquireDate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "AcquirerName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "AcquirerNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "AgriSiloLocation",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "AgriStatus",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "AgriTransportDifferential",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ApproximateLoadDescription",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ApproximateLoadIndicator",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ApproximateLoadPrice",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ApproximateLoadQuantity",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "BrokerBIC",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "BrokerName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "BrokerStatus",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "BuySell",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ClientFundName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ClsStatus",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ConnectedTradeNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ContractTradeNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CorrectionTradeNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CounterpartyName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CounterpartyNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CounterPortfolioName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CounterPortfolioNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CountryPortfolio",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CreateDateTime",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CurrencyName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "DiscountType",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "DiscountingTypeChoiceListEntry",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ExecutionDateTime",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ExternalId",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "FundingInsType",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "FullyFunded",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "FxSubType",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "InsTypeOverrideName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "IsInternalSettlement",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "LastModifiedUserID",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "MaturityDate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "MentisProjectNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "MirrorTradeNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "MmInstrumentType",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "PortfolioName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "PortfolioNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "Price",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "Quantity",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "RelationshipPartyName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "RwaCounterpartyName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "SourceCounterpartyName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "SourceCounterpartyNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "SourceCounterpartySystem",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "SourceTradeId",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "SourceTradeType",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ShadowRevenueType",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "SwiftMessageStatus",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TerminatedTradeNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TradeDateTime",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TradeKey2ChoiceListEntry",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TradeNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TradePhase",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TradeType",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TraderABNo",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TraderName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TraderNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TradeStatus",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "TransactionTradeNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "UpdateUserABNo",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "UpdateUserName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "UpdateDateTime",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ValueDate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "VersionId",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "VolatilityStrike",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "XtpJseRef",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "XtpTradeTypeValue",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "YourRef",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ReferencePrice",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ClearedTrade",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ClrClearingBroker",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ClrBrokerTradeId",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ClearingMemberCode",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "ClearingHouseId",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CentralCounterparty",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CcpStatus",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CcpClearingStatus",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CcpClearingHouseId",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "OriginalMarkitWireTradeId",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "OriginalCounterparty",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "MarkitWireTradeId",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }, {
                                                        "name": "CounterpartySdsId",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }],
                                                    "nullable": true
                                                },
                                                "children": []
                                            }]
                                        }]
                                    }]
                                }, {
                                    "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                    "name": "toLower",
                                    "exprType": "UserDefinedFunction",
                                    "text": "UDF:toLower(AdditionalInstrumentOverride#71)",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                        "attributeId": 71,
                                        "name": "AdditionalInstrumentOverride",
                                        "exprType": "AttributeReference",
                                        "text": "AdditionalInstrumentOverride",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": []
                                    }]
                                }]
                            }]
                        }, {
                            "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                            "exprType": "EqualNullSafe",
                            "symbol": "<=>",
                            "text": "(UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)) <=> UDF:toLower(FundingInstrumentType#72))",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                "name": "toLower",
                                "exprType": "UserDefinedFunction",
                                "text": "UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType))",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                    "name": "replaceNullsWithNotApplicable",
                                    "exprType": "UserDefinedFunction",
                                    "text": "UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                        "exprType": "GetStructField",
                                        "text": "TradeStatic#1.FundingInsType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                            "attributeId": 1,
                                            "name": "TradeStatic",
                                            "exprType": "AttributeReference",
                                            "text": "TradeStatic",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                "fields": [{
                                                    "name": "AcquireDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "AcquirerName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "AcquirerNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "AgriSiloLocation",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "AgriStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "AgriTransportDifferential",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ApproximateLoadDescription",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ApproximateLoadIndicator",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ApproximateLoadPrice",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ApproximateLoadQuantity",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BrokerBIC",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BrokerName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BrokerStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BuySell",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClientFundName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClsStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ConnectedTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ContractTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CorrectionTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CounterpartyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CounterpartyNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CounterPortfolioName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CounterPortfolioNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CountryPortfolio",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CreateDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CurrencyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "DiscountType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "DiscountingTypeChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExecutionDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExternalId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "FundingInsType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "FullyFunded",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "FxSubType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "InsTypeOverrideName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "IsInternalSettlement",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "LastModifiedUserID",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MaturityDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MentisProjectNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MirrorTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MmInstrumentType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "PortfolioName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "PortfolioNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Price",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Quantity",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "RelationshipPartyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "RwaCounterpartyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SourceCounterpartyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SourceCounterpartyNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SourceCounterpartySystem",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SourceTradeId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SourceTradeType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ShadowRevenueType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SwiftMessageStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TerminatedTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradeDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradeKey2ChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradePhase",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradeType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TraderABNo",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TraderName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TraderNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradeStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TransactionTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "UpdateUserABNo",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "UpdateUserName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "UpdateDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ValueDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "VersionId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "VolatilityStrike",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "XtpJseRef",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "XtpTradeTypeValue",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "YourRef",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ReferencePrice",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClearedTrade",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClrClearingBroker",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClrBrokerTradeId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClearingMemberCode",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClearingHouseId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CentralCounterparty",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CcpStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CcpClearingStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CcpClearingHouseId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "OriginalMarkitWireTradeId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "OriginalCounterparty",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MarkitWireTradeId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CounterpartySdsId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }],
                                                "nullable": true
                                            },
                                            "children": []
                                        }]
                                    }]
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                "name": "toLower",
                                "exprType": "UserDefinedFunction",
                                "text": "UDF:toLower(FundingInstrumentType#72)",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                    "attributeId": 72,
                                    "name": "FundingInstrumentType",
                                    "exprType": "AttributeReference",
                                    "text": "FundingInstrumentType",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": []
                                }]
                            }]
                        }]
                    },
                    "joinType": "LeftOuter"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-13",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias main",
                        "inputs": ["ds-uuid-13"],
                        "output": "ds-uuid-12"
                    },
                    "alias": "main"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-14",
                        "name": "Project",
                        "rawString": "Project [TradeScalar#0, TradeStatic#1, Instrument#2, Moneyflows#3, SalesCredits#4, Feed#5, IsEoD#6, ReportDate#7, ProductMainType#34, ProductSubType#35]",
                        "inputs": ["ds-uuid-14"],
                        "output": "ds-uuid-13"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- SourceSubType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 49,
                            "name": "SourceSubType",
                            "exprType": "AttributeReference",
                            "text": "SourceSubType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-15",
                        "name": "Project",
                        "rawString": "Project [TradeScalar#0, TradeStatic#1, Instrument#2, Moneyflows#3, SalesCredits#4, Feed#5, IsEoD#6, ReportDate#7, SourceSubType#49, ProductMainType#34, ProductSubType#35]",
                        "inputs": ["ds-uuid-15"],
                        "output": "ds-uuid-14"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- SourceMainType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 32,
                            "name": "SourceMainType",
                            "exprType": "AttributeReference",
                            "text": "SourceMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-16",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias SourceData",
                        "inputs": ["ds-uuid-16"],
                        "output": "ds-uuid-15"
                    },
                    "alias": "SourceData"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Join",
                    "mainProps": {
                        "id": "op-uuid-17",
                        "name": "Join",
                        "rawString": "Join LeftOuter, ((UDF:toLower(Instrument#2.InstrumentType) <=> UDF:toLower(SourceMainType#32)) && (UDF:toLower(UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType)) <=> UDF:toLower(SourceSubType#49)))",
                        "inputs": ["ds-uuid-17", "ds-uuid-20"],
                        "output": "ds-uuid-16"
                    },
                    "condition": {
                        "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                        "exprType": "And",
                        "symbol": "&&",
                        "text": "((UDF:toLower(Instrument#2.InstrumentType) <=> UDF:toLower(SourceMainType#32)) && (UDF:toLower(UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType)) <=> UDF:toLower(SourceSubType#49)))",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                            "exprType": "EqualNullSafe",
                            "symbol": "<=>",
                            "text": "(UDF:toLower(Instrument#2.InstrumentType) <=> UDF:toLower(SourceMainType#32))",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                "name": "toLower",
                                "exprType": "UserDefinedFunction",
                                "text": "UDF:toLower(Instrument#2.InstrumentType)",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                    "exprType": "GetStructField",
                                    "text": "Instrument#2.InstrumentType",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                        "attributeId": 2,
                                        "name": "Instrument",
                                        "exprType": "AttributeReference",
                                        "text": "Instrument",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                            "fields": [{
                                                "name": "Barrier",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "BarrierEndDate",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "BarrierMonitoring",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "BarrierOptionType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "BarrierStartDate",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "CallPut",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ContractSize",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "CommodityDeliverableChoiceListEntry",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "CommodityDescriptionChoiceListEntry",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "CommodityLabelChoiceListEntry",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "CommoditySubAssetsChoiceListEntry",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "CurrencyName",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "Digital",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "DomesticCurrencyName",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "DoubleBarrier",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "EndDateTime",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ExoticBarrierRebateOnExpiry",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ExoticDigitalBarrierType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ExoticRebateName",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ExoticRebateNumber",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ExpiryDate",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ExpiryTime",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ExternalId1",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ForeignCurrencyName",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "FxOptionType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "InstrumentAddress",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "InstrumentExoticBarrierCrossedStatus",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "InstrumentName",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "InstrumentType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "IsCurrency",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "IsExpired",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "Isin",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "IssuerName",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "IssuerNumber",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "Legs",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                                    "elementDataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                        "fields": [{
                                                            "name": "AccruedInterestTxnCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "AccruedInterestRepCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "AccruedDiscountBalanceTxnCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "AccruedDiscountBalanceRepCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "CashTxnCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "CashRepCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "Carry",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "CleanConsideration",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "CurrencyName",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "CurrentRate",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "CurrentSpread",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "DayCountMethod",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "EndDate",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "FaceValueTxnCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "FaceValueRepCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "FixedRate",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "FloatRateReferenceName",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "FloatRateSpread",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "IsPayLeg",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "LastResetDate",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "LegFloatRateFactor",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "LegNumber",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "LegStartDate",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "LegType",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "NominalRepCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "NominalTxnCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "Price",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "PvTxnCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "PvRepCcy",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "RepoRate",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "RollingPeriod",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }],
                                                        "nullable": true
                                                    },
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "MmInstrumentType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "OpenLinkUnitChoiceListEntry",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "OptionExerciseType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "OptionExoticType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "Otc",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "PayDayOffset",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "PayOffsetMethod",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "PayType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "QuoteType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "Rate",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "RealDividendValue",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "RefValue",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "Rebate",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ReferencePrice",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "SettlementType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "SettlementDateTime",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "SpotBankingDayOffset",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "StartDate",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "StrikeCurrencyName",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "StrikeCurrencyNumber",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "TxnMaturityPeriod",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "UnderlyingInstrumentType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "UnderlyingInstruments",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                                    "elementDataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                        "fields": [{
                                                            "name": "EndDate",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "ExpiryDate",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "ExpiryTime",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "Isin",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "InstrumentAddress",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "InstrumentName",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "InstrumentType",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "IssuerName",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "IssuerNumber",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }, {
                                                            "name": "ParentInstrumentAddress",
                                                            "dataType": {
                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                "name": "string",
                                                                "nullable": true
                                                            }
                                                        }],
                                                        "nullable": true
                                                    },
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "ValuationGroupName",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "FixingSourceName",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "Seniority",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "VersionId",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                }
                                            }],
                                            "nullable": true
                                        },
                                        "children": []
                                    }]
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                "name": "toLower",
                                "exprType": "UserDefinedFunction",
                                "text": "UDF:toLower(SourceMainType#32)",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                    "attributeId": 32,
                                    "name": "SourceMainType",
                                    "exprType": "AttributeReference",
                                    "text": "SourceMainType",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": []
                                }]
                            }]
                        }, {
                            "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                            "exprType": "EqualNullSafe",
                            "symbol": "<=>",
                            "text": "(UDF:toLower(UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType)) <=> UDF:toLower(SourceSubType#49))",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                "name": "toLower",
                                "exprType": "UserDefinedFunction",
                                "text": "UDF:toLower(UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType))",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                    "name": "selectSubtype",
                                    "exprType": "UserDefinedFunction",
                                    "text": "UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType)",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                        "exprType": "GetStructField",
                                        "text": "Instrument#2.InstrumentType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                            "attributeId": 2,
                                            "name": "Instrument",
                                            "exprType": "AttributeReference",
                                            "text": "Instrument",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                "fields": [{
                                                    "name": "Barrier",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BarrierEndDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BarrierMonitoring",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BarrierOptionType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BarrierStartDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CallPut",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ContractSize",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CommodityDeliverableChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CommodityDescriptionChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CommodityLabelChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CommoditySubAssetsChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CurrencyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Digital",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "DomesticCurrencyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "DoubleBarrier",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "EndDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExoticBarrierRebateOnExpiry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExoticDigitalBarrierType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExoticRebateName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExoticRebateNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExpiryDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExpiryTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExternalId1",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ForeignCurrencyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "FxOptionType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "InstrumentAddress",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "InstrumentExoticBarrierCrossedStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "InstrumentName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "InstrumentType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "IsCurrency",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "IsExpired",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Isin",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "IssuerName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "IssuerNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Legs",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                                        "elementDataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                            "fields": [{
                                                                "name": "AccruedInterestTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "AccruedInterestRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "AccruedDiscountBalanceTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "AccruedDiscountBalanceRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CashTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CashRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "Carry",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CleanConsideration",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CurrencyName",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CurrentRate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CurrentSpread",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "DayCountMethod",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "EndDate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "FaceValueTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "FaceValueRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "FixedRate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "FloatRateReferenceName",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "FloatRateSpread",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "IsPayLeg",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "LastResetDate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "LegFloatRateFactor",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "LegNumber",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "LegStartDate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "LegType",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "NominalRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "NominalTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "Price",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "PvTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "PvRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "RepoRate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "RollingPeriod",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }],
                                                            "nullable": true
                                                        },
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MmInstrumentType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "OpenLinkUnitChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "OptionExerciseType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "OptionExoticType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Otc",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "PayDayOffset",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "PayOffsetMethod",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "PayType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "QuoteType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Rate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "RealDividendValue",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "RefValue",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Rebate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ReferencePrice",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SettlementType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SettlementDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SpotBankingDayOffset",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "StartDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "StrikeCurrencyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "StrikeCurrencyNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TxnMaturityPeriod",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "UnderlyingInstrumentType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "UnderlyingInstruments",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                                        "elementDataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                            "fields": [{
                                                                "name": "EndDate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "ExpiryDate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "ExpiryTime",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "Isin",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "InstrumentAddress",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "InstrumentName",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "InstrumentType",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "IssuerName",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "IssuerNumber",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "ParentInstrumentAddress",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }],
                                                            "nullable": true
                                                        },
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ValuationGroupName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "FixingSourceName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Seniority",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "VersionId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }],
                                                "nullable": true
                                            },
                                            "children": []
                                        }]
                                    }, {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                        "exprType": "GetStructField",
                                        "text": "TradeStatic#1.FxSubType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                            "attributeId": 1,
                                            "name": "TradeStatic",
                                            "exprType": "AttributeReference",
                                            "text": "TradeStatic",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                "fields": [{
                                                    "name": "AcquireDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "AcquirerName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "AcquirerNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "AgriSiloLocation",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "AgriStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "AgriTransportDifferential",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ApproximateLoadDescription",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ApproximateLoadIndicator",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ApproximateLoadPrice",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ApproximateLoadQuantity",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BrokerBIC",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BrokerName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BrokerStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BuySell",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClientFundName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClsStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ConnectedTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ContractTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CorrectionTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CounterpartyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CounterpartyNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CounterPortfolioName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CounterPortfolioNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CountryPortfolio",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CreateDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CurrencyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "DiscountType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "DiscountingTypeChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExecutionDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExternalId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "FundingInsType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "FullyFunded",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "FxSubType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "InsTypeOverrideName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "IsInternalSettlement",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "LastModifiedUserID",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MaturityDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MentisProjectNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MirrorTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MmInstrumentType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "PortfolioName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "PortfolioNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Price",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Quantity",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "RelationshipPartyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "RwaCounterpartyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SourceCounterpartyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SourceCounterpartyNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SourceCounterpartySystem",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SourceTradeId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SourceTradeType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ShadowRevenueType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SwiftMessageStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TerminatedTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradeDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradeKey2ChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradePhase",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradeType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TraderABNo",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TraderName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TraderNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TradeStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TransactionTradeNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "UpdateUserABNo",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "UpdateUserName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "UpdateDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ValueDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "VersionId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "VolatilityStrike",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "XtpJseRef",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "XtpTradeTypeValue",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "YourRef",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ReferencePrice",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClearedTrade",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClrClearingBroker",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClrBrokerTradeId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClearingMemberCode",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ClearingHouseId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CentralCounterparty",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CcpStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CcpClearingStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CcpClearingHouseId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "OriginalMarkitWireTradeId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "OriginalCounterparty",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MarkitWireTradeId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CounterpartySdsId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }],
                                                "nullable": true
                                            },
                                            "children": []
                                        }]
                                    }, {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                        "exprType": "GetStructField",
                                        "text": "Instrument#2.UnderlyingInstrumentType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                            "attributeId": 2,
                                            "name": "Instrument",
                                            "exprType": "AttributeReference",
                                            "text": "Instrument",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                "fields": [{
                                                    "name": "Barrier",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BarrierEndDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BarrierMonitoring",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BarrierOptionType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "BarrierStartDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CallPut",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ContractSize",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CommodityDeliverableChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CommodityDescriptionChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CommodityLabelChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CommoditySubAssetsChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "CurrencyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Digital",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "DomesticCurrencyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "DoubleBarrier",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "EndDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExoticBarrierRebateOnExpiry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExoticDigitalBarrierType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExoticRebateName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExoticRebateNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExpiryDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExpiryTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ExternalId1",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ForeignCurrencyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "FxOptionType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "InstrumentAddress",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "InstrumentExoticBarrierCrossedStatus",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "InstrumentName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "InstrumentType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "IsCurrency",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "IsExpired",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Isin",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "IssuerName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "IssuerNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Legs",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                                        "elementDataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                            "fields": [{
                                                                "name": "AccruedInterestTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "AccruedInterestRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "AccruedDiscountBalanceTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "AccruedDiscountBalanceRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CashTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CashRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "Carry",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CleanConsideration",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CurrencyName",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CurrentRate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "CurrentSpread",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "DayCountMethod",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "EndDate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "FaceValueTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "FaceValueRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "FixedRate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "FloatRateReferenceName",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "FloatRateSpread",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "IsPayLeg",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "LastResetDate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "LegFloatRateFactor",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "LegNumber",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "LegStartDate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "LegType",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "NominalRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "NominalTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "Price",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "PvTxnCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "PvRepCcy",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "RepoRate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "RollingPeriod",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }],
                                                            "nullable": true
                                                        },
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "MmInstrumentType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "OpenLinkUnitChoiceListEntry",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "OptionExerciseType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "OptionExoticType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Otc",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "PayDayOffset",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "PayOffsetMethod",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "PayType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "QuoteType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Rate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "RealDividendValue",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "RefValue",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Rebate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ReferencePrice",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SettlementType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SettlementDateTime",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "SpotBankingDayOffset",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "StartDate",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "StrikeCurrencyName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "StrikeCurrencyNumber",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "TxnMaturityPeriod",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "UnderlyingInstrumentType",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "UnderlyingInstruments",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                                        "elementDataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                            "fields": [{
                                                                "name": "EndDate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "ExpiryDate",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "ExpiryTime",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "Isin",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "InstrumentAddress",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "InstrumentName",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "InstrumentType",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "IssuerName",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "IssuerNumber",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }, {
                                                                "name": "ParentInstrumentAddress",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                    "name": "string",
                                                                    "nullable": true
                                                                }
                                                            }],
                                                            "nullable": true
                                                        },
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "ValuationGroupName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "FixingSourceName",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "Seniority",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }, {
                                                    "name": "VersionId",
                                                    "dataType": {
                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    }
                                                }],
                                                "nullable": true
                                            },
                                            "children": []
                                        }]
                                    }]
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                "name": "toLower",
                                "exprType": "UserDefinedFunction",
                                "text": "UDF:toLower(SourceSubType#49)",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                    "attributeId": 49,
                                    "name": "SourceSubType",
                                    "exprType": "AttributeReference",
                                    "text": "SourceSubType",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": []
                                }]
                            }]
                        }]
                    },
                    "joinType": "LeftOuter"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-19",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias main",
                        "inputs": ["ds-uuid-18"],
                        "output": "ds-uuid-17"
                    },
                    "alias": "main"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-20",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias SourceData",
                        "inputs": ["ds-uuid-19"],
                        "output": "ds-uuid-18"
                    },
                    "alias": "SourceData"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Read",
                    "mainProps": {
                        "id": "op-uuid-21",
                        "name": "LogicalRelation",
                        "rawString": "Relation[TradeScalar#0,TradeStatic#1,Instrument#2,Moneyflows#3,SalesCredits#4,Feed#5,IsEoD#6,ReportDate#7] parquet",
                        "inputs": [],
                        "output": "ds-uuid-19"
                    },
                    "sourceType": "Parquet",
                    "sources": [{"path": "file:/C:/git/lineage/sample/data/Conformance/SourceData"}]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-22",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias ms",
                        "inputs": ["ds-uuid-21"],
                        "output": "ds-uuid-20"
                    },
                    "alias": "ms"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-23",
                        "name": "Project",
                        "rawString": "Project [SourceMainType#32, UDF:removeEmptyStrings(SourceSubType#33) AS SourceSubType#49, ProductMainType#34, ProductSubType#35]",
                        "inputs": ["ds-uuid-22"],
                        "output": "ds-uuid-21"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                        "exprType": "Alias",
                        "text": "UDF:removeEmptyStrings(SourceSubType#33) AS SourceSubType#49",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                            "name": "removeEmptyStrings",
                            "exprType": "UserDefinedFunction",
                            "text": "UDF:removeEmptyStrings(SourceSubType#33)",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                "attributeId": 33,
                                "name": "SourceSubType",
                                "exprType": "AttributeReference",
                                "text": "SourceSubType",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": []
                            }]
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- SourceSubType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 33,
                            "name": "SourceSubType",
                            "exprType": "AttributeReference",
                            "text": "SourceSubType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-24",
                        "name": "Project",
                        "rawString": "Project [SourceMainType#32, SourceSubType#33, ProductMainType#34, ProductSubType#35]",
                        "inputs": ["ds-uuid-23"],
                        "output": "ds-uuid-22"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- ProductMainSubTypeMappingId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 30,
                            "name": "ProductMainSubTypeMappingId",
                            "exprType": "AttributeReference",
                            "text": "ProductMainSubTypeMappingId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- SourceSystem",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 31,
                            "name": "SourceSystem",
                            "exprType": "AttributeReference",
                            "text": "SourceSystem",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-25",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias MainSubTypeMapping",
                        "inputs": ["ds-uuid-24"],
                        "output": "ds-uuid-23"
                    },
                    "alias": "MainSubTypeMapping"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Read",
                    "mainProps": {
                        "id": "op-uuid-26",
                        "name": "LogicalRelation",
                        "rawString": "Relation[ProductMainSubTypeMappingId#30,SourceSystem#31,SourceMainType#32,SourceSubType#33,ProductMainType#34,ProductSubType#35] csv",
                        "inputs": [],
                        "output": "ds-uuid-24"
                    },
                    "sourceType": "CSV",
                    "sources": [{"path": "file:/C:/git/lineage/sample/data/Conformance/ProductMainSubTypeMapping.txt"}]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-27",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias ep",
                        "inputs": ["ds-uuid-26"],
                        "output": "ds-uuid-25"
                    },
                    "alias": "ep"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-28",
                        "name": "Project",
                        "rawString": "Project [ProductMainType#68 AS MappingMainType#85, ProductSubType#69 AS MappingSubType#86, AdditionalInstrumentOverride#71, FundingInstrumentType#72, EnterpriseProduct#74]",
                        "inputs": ["ds-uuid-27"],
                        "output": "ds-uuid-26"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                        "exprType": "Alias",
                        "text": "ProductMainType#68 AS MappingMainType#85",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 68,
                            "name": "ProductMainType",
                            "exprType": "AttributeReference",
                            "text": "ProductMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                        "exprType": "Alias",
                        "text": "ProductSubType#69 AS MappingSubType#86",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 69,
                            "name": "ProductSubType",
                            "exprType": "AttributeReference",
                            "text": "ProductSubType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- EnterpriseProductMappingId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 67,
                            "name": "EnterpriseProductMappingId",
                            "exprType": "AttributeReference",
                            "text": "EnterpriseProductMappingId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- ProductMainType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 68,
                            "name": "ProductMainType",
                            "exprType": "AttributeReference",
                            "text": "ProductMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- ProductSubType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 69,
                            "name": "ProductSubType",
                            "exprType": "AttributeReference",
                            "text": "ProductSubType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- MoneyMarketInstrumentType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 70,
                            "name": "MoneyMarketInstrumentType",
                            "exprType": "AttributeReference",
                            "text": "MoneyMarketInstrumentType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- OTCOverride",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 73,
                            "name": "OTCOverride",
                            "exprType": "AttributeReference",
                            "text": "OTCOverride",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-29",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias EnterpriseProductMapping",
                        "inputs": ["ds-uuid-28"],
                        "output": "ds-uuid-27"
                    },
                    "alias": "EnterpriseProductMapping"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Read",
                    "mainProps": {
                        "id": "op-uuid-30",
                        "name": "LogicalRelation",
                        "rawString": "Relation[EnterpriseProductMappingId#67,ProductMainType#68,ProductSubType#69,MoneyMarketInstrumentType#70,AdditionalInstrumentOverride#71,FundingInstrumentType#72,OTCOverride#73,EnterpriseProduct#74] csv",
                        "inputs": [],
                        "output": "ds-uuid-28"
                    },
                    "sourceType": "CSV",
                    "sources": [{"path": "file:/C:/git/lineage/sample/data/Conformance/EnterpriseProductMapping.txt"}]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-31",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias pc",
                        "inputs": ["ds-uuid-30"],
                        "output": "ds-uuid-29"
                    },
                    "alias": "pc"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Projection",
                    "mainProps": {
                        "id": "op-uuid-32",
                        "name": "Project",
                        "rawString": "Project [MainType#105 AS MappingMainType#111, ProductCategory#106]",
                        "inputs": ["ds-uuid-31"],
                        "output": "ds-uuid-30"
                    },
                    "transformations": [{
                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                        "exprType": "Alias",
                        "text": "MainType#105 AS MappingMainType#111",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 105,
                            "name": "MainType",
                            "exprType": "AttributeReference",
                            "text": "MainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "exprType": "AttributeRemoval",
                        "text": "- MainType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 105,
                            "name": "MainType",
                            "exprType": "AttributeReference",
                            "text": "MainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }]
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Alias",
                    "mainProps": {
                        "id": "op-uuid-33",
                        "name": "SubqueryAlias",
                        "rawString": "SubqueryAlias CategoryMapping",
                        "inputs": ["ds-uuid-34"],
                        "output": "ds-uuid-31"
                    },
                    "alias": "CategoryMapping"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Filter",
                    "mainProps": {
                        "id": "op-uuid-18",
                        "name": "Filter",
                        "inputs": ["ds-uuid-8"],
                        "output": "ds-uuid-32"
                    },
                    "condition": {
                        "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                        "exprType": "EqualNullSafe",
                        "symbol": "<=>",
                        "text": "(ProductMainType#34 <=> MappingMainType#111)",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 34,
                            "name": "ProductMainType",
                            "exprType": "AttributeReference",
                            "text": "ProductMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }, {
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                            "attributeId": 111,
                            "name": "MappingMainType",
                            "exprType": "AttributeReference",
                            "text": "MappingMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
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
                            "_typeHint": "za.co.absa.spline.model.expr.AttributeReference",
                            "refId": "bbf488a0-9ea0-43f6-8d7a-7eda9d4a6151",
                            "name": "beer_consumption",
                            "text": "beer_consumption",
                            "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
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
                        "_typeHint": "za.co.absa.spline.model.expr.AttributeReference",
                        "refId": "bed05b03-276f-4861-99d9-0970c0936079",
                        "name": "id",
                        "text": "id",
                        "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "long", "nullable": false}
                    }, {
                        "_typeHint": "za.co.absa.spline.model.expr.AttributeReference",
                        "refId": "5cada60b-10d0-45c8-8590-957cca18c53e",
                        "name": "title",
                        "text": "title",
                        "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                    }],
                    "aggregations": {
                        "id": {
                            "_typeHint": "za.co.absa.spline.model.expr.AttributeReference",
                            "refId": "bed05b03-276f-4861-99d9-0970c0936079",
                            "name": "id",
                            "text": "id",
                            "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "long", "nullable": false}
                        },
                        "title": {
                            "_typeHint": "za.co.absa.spline.model.expr.AttributeReference",
                            "refId": "5cada60b-10d0-45c8-8590-957cca18c53e",
                            "name": "title",
                            "text": "title",
                            "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                        },
                        "authors": {
                            "_typeHint": "za.co.absa.spline.model.expr.Alias",
                            "alias": "authors",
                            "text": "collect_list(author#134, 0, 0) AS authors#146",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.model.dt.Array",
                                "elementDataType": {
                                    "_typeHint": "za.co.absa.spline.model.dt.Struct",
                                    "fields": [{
                                        "name": "initial",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.model.dt.Array",
                                            "elementDataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true},
                                            "nullable": true
                                        }
                                    }, {
                                        "name": "lastName",
                                        "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                                    }],
                                    "nullable": true
                                },
                                "nullable": true
                            },
                            "children": [{
                                "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                "exprType": "AggregateExpression",
                                "text": "collect_list(author#134, 0, 0)",
                                "dataType": {
                                    "_typeHint": "za.co.absa.spline.model.dt.Array",
                                    "elementDataType": {
                                        "_typeHint": "za.co.absa.spline.model.dt.Struct",
                                        "fields": [{
                                            "name": "initial",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.model.dt.Array",
                                                "elementDataType": {
                                                    "_typeHint": "za.co.absa.spline.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                },
                                                "nullable": true
                                            }
                                        }, {
                                            "name": "lastName",
                                            "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                                        }],
                                        "nullable": true
                                    },
                                    "nullable": true
                                },
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.model.expr.Generic",
                                    "exprType": "CollectList",
                                    "text": "collect_list(author#134, 0, 0)",
                                    "dataType": {
                                        "_typeHint": "za.co.absa.spline.model.dt.Array",
                                        "elementDataType": {
                                            "_typeHint": "za.co.absa.spline.model.dt.Struct",
                                            "fields": [{
                                                "name": "initial",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.model.dt.Array",
                                                    "elementDataType": {
                                                        "_typeHint": "za.co.absa.spline.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    },
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "lastName",
                                                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                                            }],
                                            "nullable": true
                                        },
                                        "nullable": true
                                    },
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.model.expr.AttributeReference",
                                        "refId": "53ec6b8f-20f4-48fb-9935-25971cedd009",
                                        "name": "author",
                                        "text": "author",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.model.dt.Struct",
                                            "fields": [{
                                                "name": "initial",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.model.dt.Array",
                                                    "elementDataType": {
                                                        "_typeHint": "za.co.absa.spline.model.dt.Simple",
                                                        "name": "string",
                                                        "nullable": true
                                                    },
                                                    "nullable": true
                                                }
                                            }, {
                                                "name": "lastName",
                                                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                                            }],
                                            "nullable": false
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }]
            },
            {
                "id": "ln_ds-uuid-28",
                "appId": "ln_ds-uuid-28",
                appName: "Foo Bar Application",
                attributes: [{
                    "id": "attr-uuid-67",
                    "name": "EnterpriseProductMappingId",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-68",
                    "name": "ProductMainType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-69",
                    "name": "ProductSubType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-70",
                    "name": "MoneyMarketInstrumentType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-73",
                    "name": "OTCOverride",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-71",
                    "name": "AdditionalInstrumentOverride",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-72",
                    "name": "FundingInstrumentType",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }, {
                    "id": "attr-uuid-74",
                    "name": "EnterpriseProduct",
                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                }],
                datasets: [{
                    "id": "ds-uuid-28",
                    "schema": {"attrs": ["attr-uuid-67", "attr-uuid-68", "attr-uuid-69", "attr-uuid-70", "attr-uuid-71", "attr-uuid-72", "attr-uuid-73", "attr-uuid-74"]}
                }],
                operations: [{
                    "_typeHint": "za.co.absa.spline.core.model.op.Write",
                    "mainProps": {
                        "id": "op-uuid-1-a4",
                        "name": "SaveIntoDataSourceCommand",
                        "rawString": "SaveIntoDataSourceCommand parquet, Map(path -> data/foo/bar, Overwrite",
                        "inputs": ["ds-uuid-28"],
                        "output": "ds-uuid-28"
                    },
                    "destinationType": "parquet",
                    "path": "data/Conformance/ConformedData"
                }, {
                    "_typeHint": "za.co.absa.spline.core.model.op.Read",
                    "mainProps": {
                        "id": "op-uuid-30-a4",
                        "name": "LogicalRelation",
                        "rawString": "Relation[EnterpriseProductMappingId#67,ProductMainType#68,ProductSubType#69,MoneyMarketInstrumentType#70,AdditionalInstrumentOverride#71,FundingInstrumentType#72,OTCOverride#73,EnterpriseProduct#74] csv",
                        "inputs": [],
                        "output": "ds-uuid-28"
                    },
                    "sourceType": "CSV",
                    "sources": [{"path": "file:/C:/git/lineage/sample/data/Conformance/EnterpriseProductMapping.txt"}]
                }]
            }
        ],

        "_dataset-lineage-overview": [{
            "id": "e96f2ceb-86b1-4d21-861c-4eb213229838",
            "appId": "appId",
            "appName": "appName",
            "timestamp": 0,
            "operations": [
                {
                    "_typeHint": "za.co.absa.spline.model.op.Composite",
                    "mainProps": {
                        "id": "e96f2ceb-86b1-4d21-861c-4eb213229838",
                        "name": "Jan's Beer Job",
                        "inputs": [],
                        "output": "e96f2ceb-86b1-4d21-861c-4eb213229838"
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
                        "datasetsIds": ["e96f2ceb-86b1-4d21-861c-4eb213229838"]
                    },
                    "timestamp": 1520353917390,
                    "appId": "local-1520353907603",
                    "appName": "Jan's Beer Job"
                },
                {
                    "_typeHint": "za.co.absa.spline.model.op.Composite",
                    "mainProps": {
                        "id": "65d61ba6-ae1e-4f11-8772-bbfae12df877",
                        "name": "Crazy Job",
                        "inputs": ["0c94f53e-bca1-4331-8ab9-f876a86b4844", "e939187e-2269-4081-b98d-4037e03e7934", "91faeeba-a893-4a8e-b126-9cad0d17cb84", "9e159943-0216-4638-a0b6-f81efce1b197"],
                        "output": "65d61ba6-ae1e-4f11-8772-bbfae12df877"
                    },
                    "sources": [{
                        "type": "Parquet",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                        "datasetsIds": ["0c94f53e-bca1-4331-8ab9-f876a86b4844", "e939187e-2269-4081-b98d-4037e03e7934", "91faeeba-a893-4a8e-b126-9cad0d17cb84"]
                    }, {
                        "type": "Parquet",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/gdpPerCapitaUSD",
                        "datasetsIds": ["9e159943-0216-4638-a0b6-f81efce1b197"]
                    }],
                    "destination": {
                        "type": "parquet",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/crazyJobResults",
                        "datasetsIds": ["65d61ba6-ae1e-4f11-8772-bbfae12df877"]
                    },
                    "timestamp": 1520429877832,
                    "appId": "local-1520429863662",
                    "appName": "Crazy Job"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Composite",
                    "mainProps": {
                        "id": "0c94f53e-bca1-4331-8ab9-f876a86b4844",
                        "name": "Jan's Beer Job",
                        "inputs": [],
                        "output": "0c94f53e-bca1-4331-8ab9-f876a86b4844"
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
                        "datasetsIds": ["0c94f53e-bca1-4331-8ab9-f876a86b4844"]
                    },
                    "timestamp": 1520429838452,
                    "appId": "local-1520429826113",
                    "appName": "Jan's Beer Job"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Composite",
                    "mainProps": {
                        "id": "9e159943-0216-4638-a0b6-f81efce1b197",
                        "name": "Marek's Job",
                        "inputs": ["e96f2ceb-86b1-4d21-861c-4eb213229838", "33c1faf0-7daa-4157-b546-8c23ce0a8858", "2c2f3d59-e34e-4b48-b145-68fa1be84df4"],
                        "output": "9e159943-0216-4638-a0b6-f81efce1b197"
                    },
                    "sources": [{
                        "type": "Parquet",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                        "datasetsIds": ["e96f2ceb-86b1-4d21-861c-4eb213229838", "33c1faf0-7daa-4157-b546-8c23ce0a8858", "2c2f3d59-e34e-4b48-b145-68fa1be84df4"]
                    }, {
                        "type": "CSV",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/input/batchWithDependencies/devIndicators.csv",
                        "datasetsIds": []
                    }],
                    "destination": {
                        "type": "parquet",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/gdpPerCapitaUSD",
                        "datasetsIds": ["9e159943-0216-4638-a0b6-f81efce1b197"]
                    },
                    "timestamp": 1520354925057,
                    "appId": "local-1520354914082",
                    "appName": "Marek's Job"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Composite",
                    "mainProps": {
                        "id": "54ad0b07-486a-437a-b00a-151def694008",
                        "name": "Crazy Job",
                        "inputs": ["e939187e-2269-4081-b98d-4037e03e7934", "91faeeba-a893-4a8e-b126-9cad0d17cb84", "9e159943-0216-4638-a0b6-f81efce1b197"],
                        "output": "54ad0b07-486a-437a-b00a-151def694008"
                    },
                    "sources": [{
                        "type": "Parquet",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                        "datasetsIds": ["e939187e-2269-4081-b98d-4037e03e7934", "91faeeba-a893-4a8e-b126-9cad0d17cb84"]
                    }, {
                        "type": "Parquet",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/gdpPerCapitaUSD",
                        "datasetsIds": ["9e159943-0216-4638-a0b6-f81efce1b197"]
                    }],
                    "destination": {
                        "type": "parquet",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/crazyJobResults",
                        "datasetsIds": ["54ad0b07-486a-437a-b00a-151def694008"]
                    },
                    "timestamp": 1520418845178,
                    "appId": "local-1520418832051",
                    "appName": "Crazy Job"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Composite",
                    "mainProps": {
                        "id": "7d9d5108-269c-4194-99ac-fcef3857338c",
                        "name": "Other Job",
                        "inputs": ["e96f2ceb-86b1-4d21-861c-4eb213229838", "33c1faf0-7daa-4157-b546-8c23ce0a8858", "2c2f3d59-e34e-4b48-b145-68fa1be84df4"],
                        "output": "7d9d5108-269c-4194-99ac-fcef3857338c"
                    },
                    "sources": [{
                        "type": "Parquet",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/beerConsCtl",
                        "datasetsIds": ["e96f2ceb-86b1-4d21-861c-4eb213229838", "33c1faf0-7daa-4157-b546-8c23ce0a8858", "2c2f3d59-e34e-4b48-b145-68fa1be84df4"]
                    }],
                    "destination": {
                        "type": "parquet",
                        "path": "file:/C:/work/bacibbd/spline/sample/data/results/batchWithDependencies/otherJobResults",
                        "datasetsIds": ["7d9d5108-269c-4194-99ac-fcef3857338c"]
                    },
                    "timestamp": 1520355415704,
                    "appId": "local-1520355405249",
                    "appName": "Other Job"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Composite",
                    "mainProps": {
                        "id": "2c2f3d59-e34e-4b48-b145-68fa1be84df4",
                        "name": "Jan's Beer Job",
                        "inputs": [],
                        "output": "2c2f3d59-e34e-4b48-b145-68fa1be84df4"
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
                        "datasetsIds": ["2c2f3d59-e34e-4b48-b145-68fa1be84df4"]
                    },
                    "timestamp": 1520353804927,
                    "appId": "local-1520353795392",
                    "appName": "Jan's Beer Job"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Composite",
                    "mainProps": {
                        "id": "33c1faf0-7daa-4157-b546-8c23ce0a8858",
                        "name": "Jan's Beer Job",
                        "inputs": [],
                        "output": "33c1faf0-7daa-4157-b546-8c23ce0a8858"
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
                        "datasetsIds": ["33c1faf0-7daa-4157-b546-8c23ce0a8858"]
                    },
                    "timestamp": 1520353897231,
                    "appId": "local-1520353887192",
                    "appName": "Jan's Beer Job"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Composite",
                    "mainProps": {
                        "id": "91faeeba-a893-4a8e-b126-9cad0d17cb84",
                        "name": "Jan's Beer Job",
                        "inputs": [],
                        "output": "91faeeba-a893-4a8e-b126-9cad0d17cb84"
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
                        "datasetsIds": ["91faeeba-a893-4a8e-b126-9cad0d17cb84"]
                    },
                    "timestamp": 1520418301725,
                    "appId": "local-1520418290515",
                    "appName": "Jan's Beer Job"
                }, {
                    "_typeHint": "za.co.absa.spline.model.op.Composite",
                    "mainProps": {
                        "id": "e939187e-2269-4081-b98d-4037e03e7934",
                        "name": "Jan's Beer Job",
                        "inputs": [],
                        "output": "e939187e-2269-4081-b98d-4037e03e7934"
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
                        "datasetsIds": ["e939187e-2269-4081-b98d-4037e03e7934"]
                    },
                    "timestamp": 1520418376121,
                    "appId": "local-1520418365380",
                    "appName": "Jan's Beer Job"
                }],
            "datasets": [{
                "id": "0c94f53e-bca1-4331-8ab9-f876a86b4844",
                "schema": {"attrs": ["9809a38a-3a25-492b-b01d-6439fb888a1b", "b5fd59bf-3db2-47ab-bb94-10e5fe1a8125", "505799a6-608f-47e3-8b9e-8c0a9f412fda", "1b909a70-5177-4287-ad8e-fbb4c9b2f1b3", "3c05fbe1-fc1b-4fc5-b39d-5f3f3565583b", "aeb7e8e7-55eb-43cd-ab0c-be79e7ce6e47", "37450825-1057-4223-9448-5f6743b2106d", "64ffc681-02d3-43cb-894b-3f1c4cffdb8c", "b282ab14-48f1-4edc-b63d-293228770450", "98d88590-1653-4942-886f-7d67c44d965a", "90281b4f-6474-4596-930c-50bab39c8ad6"]}
            }, {
                "id": "2c2f3d59-e34e-4b48-b145-68fa1be84df4",
                "schema": {"attrs": ["e35999a4-ebf6-4d13-84dc-bb34d4c6f3fa", "dd54ec04-443a-4b20-9dcf-e23bbf1a5e50", "1273ea9f-5068-413c-94e1-0b27b9cd6857", "711e1149-2e7a-4675-963d-c3672b2bfd93", "588ef968-3308-4977-a4e0-4b60dae19a75", "d74295c1-8584-4a1e-a98e-c9b4a7260623", "7818a27a-9106-4ded-88eb-36f706650730", "046180a5-de46-4752-a495-537b33a0af27", "6abc6ec8-3b36-487c-a6e7-528420ae86f6", "c7f0187d-5b8d-4e37-9af1-bd591bf32093", "ea721f5c-1df6-4e08-9bbf-d5e615e2ffb6"]}
            }, {
                "id": "7d9d5108-269c-4194-99ac-fcef3857338c",
                "schema": {"attrs": ["15354047-9f06-465f-ac21-06c1a8b2db35", "565f635e-6296-4a9d-b02f-8cb875a1f8a3", "6c858dd1-7700-483a-b875-5df7e4f161c8"]}
            }, {
                "id": "65d61ba6-ae1e-4f11-8772-bbfae12df877",
                "schema": {"attrs": ["91683ae6-831f-4d39-9cd0-74a31fe99673", "8ee25cf9-6bfe-4cf9-a2f9-33a4524209e0"]}
            }, {
                "id": "33c1faf0-7daa-4157-b546-8c23ce0a8858",
                "schema": {"attrs": ["26408ff1-772d-406a-a6bf-30b81b93a91a", "1939a81e-13c3-43ef-b4d7-2cfe9293d3c6", "29e6bdb0-1913-46ff-85d8-7d0d085db2c4", "8295ebcd-406c-4832-bb0b-9e7d83530093", "dfeba578-72ac-4468-9244-64a61d81c41c", "65d4d484-4dd9-45e0-998b-0e2a1149d714", "8f506759-dc65-435c-a69f-b7995f1ebc57", "1de7fb05-6f8b-4b73-bea3-0a7ec3d27c22", "25896db8-5a9d-477f-9268-4d1cfe08cb28", "23af1ad8-67fb-4dc8-b657-65e8d90a2e94", "0d5e981d-0c55-4a31-8a3e-a4490213fe4c"]}
            }, {
                "id": "54ad0b07-486a-437a-b00a-151def694008",
                "schema": {"attrs": ["3acb1896-c6a9-4ae9-9c8e-8711d1a611c4", "29f57b14-98ab-4d3f-999a-a38be8a73f63"]}
            }, {
                "id": "91faeeba-a893-4a8e-b126-9cad0d17cb84",
                "schema": {"attrs": ["6a09e4e7-c925-4265-b35d-a9b2a8b9a587", "b8578133-febc-4fdf-900d-6be5011dd5f5", "087a65d2-c4f7-4256-ba42-599190f2fca4", "1694c563-e7ca-4d38-a4a7-fc4fc7101f0d", "fa5fba7c-78e8-4b0e-bc7a-fa691ec45ae9", "511120e3-88ff-4367-8f75-0974256fc6cc", "1cb26df8-5e9d-4ea6-8f1a-3bc3dd6c9cb5", "039e9eee-bd8f-484d-baf5-4bc7a5c019e8", "f984f2e0-bb48-4e52-9140-03a0de4d68a4", "06ca454a-df92-4b17-adf6-94c2c99bb29f", "c2ef9157-8b61-481e-81bc-9b02914ba0a2"]}
            }, {
                "id": "e96f2ceb-86b1-4d21-861c-4eb213229838",
                "schema": {"attrs": ["c24e0a51-11f9-431f-8cf1-1468f9772c49", "a1f0c1c5-da15-4c2a-8b43-ac138dd103fd", "7b4813b7-007f-4729-bf9b-362a647f8c37", "dee79c18-6432-455b-9f16-2a9c4423bdb6", "7a44f470-6006-47eb-b861-98cdf37068e3", "8501de3c-40f7-4d27-9f7c-12d8d9604927", "5a19aabb-f02b-4fea-86d1-31cfd7b5b79e", "458a4bea-3ae9-4999-851d-e74e47a92b1d", "7a748fc4-a49f-444b-a752-94163fae8dda", "ac7040a9-160a-41a8-a6cc-601deb13ee3b", "c9579865-edf0-4056-8270-9922fe6116dc"]}
            }, {
                "id": "e939187e-2269-4081-b98d-4037e03e7934",
                "schema": {"attrs": ["8b41ca4e-5c43-407a-a1b5-a7ac5c998016", "79d93619-bd71-4ec6-8fcb-312251ee87b0", "3e46419b-0d19-4522-b638-e0471dbb42c6", "99f7e14c-f6a1-468d-99aa-ce02b3f68f4c", "b402637b-b89b-42a7-8723-339ba8716716", "e392386e-18d3-46c1-9c53-3434ad3a4835", "779bc299-e7a8-4f0d-8049-851f45aba22c", "6929b950-0e05-4c98-a9a8-affba125a08e", "d83e63e5-20b6-4243-83d1-d309fa0c7c34", "97172275-7023-48b7-a271-de85a36b26a0", "5744994a-dd5e-4cdd-99c8-aaae5419ad83"]}
            }, {
                "id": "9e159943-0216-4638-a0b6-f81efce1b197",
                "schema": {"attrs": ["b873f7a5-eaaf-4bdb-9a69-f57f6e1727fe", "c3fb9137-d86c-46b5-899a-090b54dd3a06", "9b19f87a-fda7-4251-82fe-17d0d2f5351f"]}
            }],
            "attributes": [{
                "id": "b8578133-febc-4fdf-900d-6be5011dd5f5",
                "name": "Code",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "97172275-7023-48b7-a271-de85a36b26a0",
                "name": "Year2010",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "fa5fba7c-78e8-4b0e-bc7a-fa691ec45ae9",
                "name": "Year2005",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "25896db8-5a9d-477f-9268-4d1cfe08cb28",
                "name": "Year2009",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "b402637b-b89b-42a7-8723-339ba8716716",
                "name": "Year2005",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "6c858dd1-7700-483a-b875-5df7e4f161c8",
                "name": "BeerConsumption2011",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "b873f7a5-eaaf-4bdb-9a69-f57f6e1727fe",
                "name": "country_name",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "e392386e-18d3-46c1-9c53-3434ad3a4835",
                "name": "Year2006",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "c7f0187d-5b8d-4e37-9af1-bd591bf32093",
                "name": "Year2010",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "9809a38a-3a25-492b-b01d-6439fb888a1b",
                "name": "Country",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "37450825-1057-4223-9448-5f6743b2106d",
                "name": "Year2007",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "505799a6-608f-47e3-8b9e-8c0a9f412fda",
                "name": "Year2003",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "b282ab14-48f1-4edc-b63d-293228770450",
                "name": "Year2009",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "8295ebcd-406c-4832-bb0b-9e7d83530093",
                "name": "Year2004",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "c3fb9137-d86c-46b5-899a-090b54dd3a06",
                "name": "beer_consumption",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "565f635e-6296-4a9d-b02f-8cb875a1f8a3",
                "name": "Code",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "7818a27a-9106-4ded-88eb-36f706650730",
                "name": "Year2007",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "511120e3-88ff-4367-8f75-0974256fc6cc",
                "name": "Year2006",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "779bc299-e7a8-4f0d-8049-851f45aba22c",
                "name": "Year2007",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "3c05fbe1-fc1b-4fc5-b39d-5f3f3565583b",
                "name": "Year2005",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "79d93619-bd71-4ec6-8fcb-312251ee87b0",
                "name": "Code",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "7b4813b7-007f-4729-bf9b-362a647f8c37",
                "name": "Year2003",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "8f506759-dc65-435c-a69f-b7995f1ebc57",
                "name": "Year2007",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "5744994a-dd5e-4cdd-99c8-aaae5419ad83",
                "name": "Year2011",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "c2ef9157-8b61-481e-81bc-9b02914ba0a2",
                "name": "Year2011",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "c9579865-edf0-4056-8270-9922fe6116dc",
                "name": "Year2011",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "65d4d484-4dd9-45e0-998b-0e2a1149d714",
                "name": "Year2006",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "7a748fc4-a49f-444b-a752-94163fae8dda",
                "name": "Year2009",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "06ca454a-df92-4b17-adf6-94c2c99bb29f",
                "name": "Year2010",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "1b909a70-5177-4287-ad8e-fbb4c9b2f1b3",
                "name": "Year2004",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "9b19f87a-fda7-4251-82fe-17d0d2f5351f",
                "name": "gdp_per_capita",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "5a19aabb-f02b-4fea-86d1-31cfd7b5b79e",
                "name": "Year2007",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "3e46419b-0d19-4522-b638-e0471dbb42c6",
                "name": "Year2003",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "6a09e4e7-c925-4265-b35d-a9b2a8b9a587",
                "name": "Country",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "dd54ec04-443a-4b20-9dcf-e23bbf1a5e50",
                "name": "Code",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "1694c563-e7ca-4d38-a4a7-fc4fc7101f0d",
                "name": "Year2004",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "6abc6ec8-3b36-487c-a6e7-528420ae86f6",
                "name": "Year2009",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "dee79c18-6432-455b-9f16-2a9c4423bdb6",
                "name": "Year2004",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "711e1149-2e7a-4675-963d-c3672b2bfd93",
                "name": "Year2004",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "d74295c1-8584-4a1e-a98e-c9b4a7260623",
                "name": "Year2006",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "a1f0c1c5-da15-4c2a-8b43-ac138dd103fd",
                "name": "Code",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "8ee25cf9-6bfe-4cf9-a2f9-33a4524209e0",
                "name": "BeerConsumption2011",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "dfeba578-72ac-4468-9244-64a61d81c41c",
                "name": "Year2005",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "15354047-9f06-465f-ac21-06c1a8b2db35",
                "name": "Country",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "b5fd59bf-3db2-47ab-bb94-10e5fe1a8125",
                "name": "Code",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "087a65d2-c4f7-4256-ba42-599190f2fca4",
                "name": "Year2003",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "046180a5-de46-4752-a495-537b33a0af27",
                "name": "Year2008",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "1cb26df8-5e9d-4ea6-8f1a-3bc3dd6c9cb5",
                "name": "Year2007",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "8501de3c-40f7-4d27-9f7c-12d8d9604927",
                "name": "Year2006",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "8b41ca4e-5c43-407a-a1b5-a7ac5c998016",
                "name": "Country",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "aeb7e8e7-55eb-43cd-ab0c-be79e7ce6e47",
                "name": "Year2006",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "f984f2e0-bb48-4e52-9140-03a0de4d68a4",
                "name": "Year2009",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "64ffc681-02d3-43cb-894b-3f1c4cffdb8c",
                "name": "Year2008",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "3acb1896-c6a9-4ae9-9c8e-8711d1a611c4",
                "name": "Country",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "6929b950-0e05-4c98-a9a8-affba125a08e",
                "name": "Year2008",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "29f57b14-98ab-4d3f-999a-a38be8a73f63",
                "name": "BeerConsumption2011",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "91683ae6-831f-4d39-9cd0-74a31fe99673",
                "name": "Country",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "0d5e981d-0c55-4a31-8a3e-a4490213fe4c",
                "name": "Year2011",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "26408ff1-772d-406a-a6bf-30b81b93a91a",
                "name": "Country",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "1939a81e-13c3-43ef-b4d7-2cfe9293d3c6",
                "name": "Code",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "c24e0a51-11f9-431f-8cf1-1468f9772c49",
                "name": "Country",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "98d88590-1653-4942-886f-7d67c44d965a",
                "name": "Year2010",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "ac7040a9-160a-41a8-a6cc-601deb13ee3b",
                "name": "Year2010",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "90281b4f-6474-4596-930c-50bab39c8ad6",
                "name": "Year2011",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "1de7fb05-6f8b-4b73-bea3-0a7ec3d27c22",
                "name": "Year2008",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "588ef968-3308-4977-a4e0-4b60dae19a75",
                "name": "Year2005",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "458a4bea-3ae9-4999-851d-e74e47a92b1d",
                "name": "Year2008",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "29e6bdb0-1913-46ff-85d8-7d0d085db2c4",
                "name": "Year2003",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "d83e63e5-20b6-4243-83d1-d309fa0c7c34",
                "name": "Year2009",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "23af1ad8-67fb-4dc8-b657-65e8d90a2e94",
                "name": "Year2010",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "039e9eee-bd8f-484d-baf5-4bc7a5c019e8",
                "name": "Year2008",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "ea721f5c-1df6-4e08-9bbf-d5e615e2ffb6",
                "name": "Year2011",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "7a44f470-6006-47eb-b861-98cdf37068e3",
                "name": "Year2005",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "99f7e14c-f6a1-468d-99aa-ce02b3f68f4c",
                "name": "Year2004",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "1273ea9f-5068-413c-94e1-0b27b9cd6857",
                "name": "Year2003",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
            }, {
                "id": "e35999a4-ebf6-4d13-84dc-bb34d4c6f3fa",
                "name": "Country",
                "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
            }
            ]
        },
            {
            id: "ds-uuid-1",
            operations: [
                {
                    "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                    "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                    "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                    "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                    "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                "dataType": {
                    "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                    "fields": [{
                        "name": "AccruedDiscountBalanceRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "AccruedDiscountBalanceTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "decimal(38,10)", "nullable": true}
                    }, {
                        "name": "AccruedInterestRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "decimal(38,10)", "nullable": true}
                    }, {
                        "name": "AccruedInterestTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "decimal(38,10)", "nullable": true}
                    }, {
                        "name": "BaseCostDirty",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BrokerFeesSettledRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BrokerFeesSettledTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BrokerFeesUnsettledRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BrokerFeesUnsettledTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BrokerageNonVatable",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BrokerageVatable",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CallAccruedInterestRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CallAccruedInterestTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CashBalanceRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CashBalanceTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CashPerCurrencyZAR",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CashRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CashTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CashflowRealDivRepCcyAmt",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "DailyExecutionFee",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "DailyExecutionFeeNoVAT",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "DailyVAT",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "DealAmount",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "DividendDivPayDay",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Dividends",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "EndCash",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ExecutionCost",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "FaceValueRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "FaceValueTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Fees",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "FeesSettled",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "FeesUnsettled",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Interest",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "InvestorProtectionLevy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "IsMidasSettlement",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ManufacturedDividendValue",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "NetConsideration",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "NominalRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "NominalTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Premium",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "PriceEndDate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "PvRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "PvTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "PvUnsettledDividends",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "RealDividendValue",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "RegulatoryNotional",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SecurityTransferTax",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SettledDividends",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "StartCash",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "StrikePrice",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "StrikeRate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SweepingPosition",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TotalLastDividendAmount",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TotalProfitLoss",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TradedCleanPrice",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TradedDirtyPrice",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TradedInterestInRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TradedInterestInTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "UnderlyingForwardPrice",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "UnsettledPremiumRepCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "UnsettledPremiumTxnCcy",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Vat",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "YieldToMaturity",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SecuritiesTransferTax",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }],
                    "nullable": true
                }
            }, {
                "id": "attr-uuid-1",
                "name": "TradeStatic",
                "dataType": {
                    "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                    "fields": [{
                        "name": "AcquireDate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "AcquirerName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "AcquirerNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "AgriSiloLocation",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "AgriStatus",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "AgriTransportDifferential",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ApproximateLoadDescription",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ApproximateLoadIndicator",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ApproximateLoadPrice",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ApproximateLoadQuantity",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BrokerBIC",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BrokerName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BrokerStatus",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BuySell",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ClientFundName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ClsStatus",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ConnectedTradeNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ContractTradeNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CorrectionTradeNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CounterpartyName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CounterpartyNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CounterPortfolioName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CounterPortfolioNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CountryPortfolio",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CreateDateTime",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CurrencyName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "DiscountType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "DiscountingTypeChoiceListEntry",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ExecutionDateTime",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ExternalId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "FundingInsType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "FullyFunded",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "FxSubType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "InsTypeOverrideName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "IsInternalSettlement",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "LastModifiedUserID",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "MaturityDate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "MentisProjectNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "MirrorTradeNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "MmInstrumentType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "PortfolioName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "PortfolioNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Price",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Quantity",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "RelationshipPartyName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "RwaCounterpartyName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SourceCounterpartyName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SourceCounterpartyNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SourceCounterpartySystem",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SourceTradeId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SourceTradeType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ShadowRevenueType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SwiftMessageStatus",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TerminatedTradeNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TradeDateTime",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TradeKey2ChoiceListEntry",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TradeNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TradePhase",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TradeType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TraderABNo",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TraderName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TraderNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TradeStatus",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TransactionTradeNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "UpdateUserABNo",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "UpdateUserName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "UpdateDateTime",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ValueDate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "VersionId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "VolatilityStrike",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "XtpJseRef",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "XtpTradeTypeValue",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "YourRef",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ReferencePrice",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ClearedTrade",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ClrClearingBroker",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ClrBrokerTradeId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ClearingMemberCode",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ClearingHouseId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CentralCounterparty",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CcpStatus",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CcpClearingStatus",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CcpClearingHouseId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "OriginalMarkitWireTradeId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "OriginalCounterparty",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "MarkitWireTradeId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CounterpartySdsId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }],
                    "nullable": true
                }
            }, {
                "id": "attr-uuid-2",
                "name": "Instrument",
                "dataType": {
                    "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                    "fields": [{
                        "name": "Barrier",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BarrierEndDate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BarrierMonitoring",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BarrierOptionType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "BarrierStartDate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CallPut",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ContractSize",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CommodityDeliverableChoiceListEntry",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CommodityDescriptionChoiceListEntry",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CommodityLabelChoiceListEntry",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CommoditySubAssetsChoiceListEntry",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "CurrencyName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Digital",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "DomesticCurrencyName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "DoubleBarrier",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "EndDateTime",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ExoticBarrierRebateOnExpiry",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ExoticDigitalBarrierType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ExoticRebateName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ExoticRebateNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ExpiryDate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ExpiryTime",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ExternalId1",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ForeignCurrencyName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "FxOptionType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "InstrumentAddress",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "InstrumentExoticBarrierCrossedStatus",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "InstrumentName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "InstrumentType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "IsCurrency",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "IsExpired",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Isin",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "IssuerName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "IssuerNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Legs",
                        "dataType": {
                            "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                            "elementDataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                "fields": [{
                                    "name": "AccruedInterestTxnCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "AccruedInterestRepCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "AccruedDiscountBalanceTxnCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "AccruedDiscountBalanceRepCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "CashTxnCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "CashRepCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "Carry",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "CleanConsideration",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "CurrencyName",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "CurrentRate",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "CurrentSpread",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "DayCountMethod",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "EndDate",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "FaceValueTxnCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "FaceValueRepCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "FixedRate",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "FloatRateReferenceName",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "FloatRateSpread",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "IsPayLeg",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "LastResetDate",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "LegFloatRateFactor",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "LegNumber",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "LegStartDate",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "LegType",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "NominalRepCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "NominalTxnCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "Price",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "PvTxnCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "PvRepCcy",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "RepoRate",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "RollingPeriod",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }],
                                "nullable": true
                            },
                            "nullable": true
                        }
                    }, {
                        "name": "MmInstrumentType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "OpenLinkUnitChoiceListEntry",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "OptionExerciseType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "OptionExoticType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Otc",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "PayDayOffset",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "PayOffsetMethod",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "PayType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "QuoteType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Rate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "RealDividendValue",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "RefValue",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Rebate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "ReferencePrice",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SettlementType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SettlementDateTime",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "SpotBankingDayOffset",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "StartDate",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "StrikeCurrencyName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "StrikeCurrencyNumber",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "TxnMaturityPeriod",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "UnderlyingInstrumentType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "UnderlyingInstruments",
                        "dataType": {
                            "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                            "elementDataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                "fields": [{
                                    "name": "EndDate",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "ExpiryDate",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "ExpiryTime",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "Isin",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "InstrumentAddress",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "InstrumentName",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "InstrumentType",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "IssuerName",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "IssuerNumber",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }, {
                                    "name": "ParentInstrumentAddress",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                                }],
                                "nullable": true
                            },
                            "nullable": true
                        }
                    }, {
                        "name": "ValuationGroupName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "FixingSourceName",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "Seniority",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "name": "VersionId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }],
                    "nullable": true
                }
            }, {
                "id": "attr-uuid-3",
                "name": "Moneyflows",
                "dataType": {
                    "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                    "elementDataType": {
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{
                            "name": "CreateDateTime",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CashflowNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CounterpartyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CounterpartyNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CurrencyName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "CurrencyNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "EndDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "FixedRate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ForwardRate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "LegNumber",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "NominalFactor",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PayDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ProjectedTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "ProjectedRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PvTxnCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "PvRepCcy",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SourceObjectUpdateUserName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "StartDate",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Text",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "Type",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "UpdateTime",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "UpdateUserName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }],
                        "nullable": true
                    },
                    "nullable": true
                }
            }, {
                "id": "attr-uuid-4",
                "name": "SalesCredits",
                "dataType": {
                    "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                    "elementDataType": {
                        "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                        "fields": [{
                            "name": "SalesCreditSubTeamName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "SalesPersonName",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "StandardSalesCredit",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }, {
                            "name": "TotalValueAddSalesCredit",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                        }],
                        "nullable": true
                    },
                    "nullable": true
                }
            }, {
                "id": "attr-uuid-5",
                "name": "Feed",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-6",
                "name": "IsEoD",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": true}
            }, {
                "id": "attr-uuid-7",
                "name": "ReportDate",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-34",
                "name": "ProductMainType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-35",
                "name": "ProductSubType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-74",
                "name": "EnterpriseProduct",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-106",
                "name": "ProductCategory",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-352",
                "name": "Balance",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-111",
                "name": "MappingMainType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-72",
                "name": "FundingInstrumentType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-71",
                "name": "AdditionalInstrumentOverride",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-86",
                "name": "MappingSubType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-85",
                "name": "MappingMainType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-49",
                "name": "SourceSubType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-32",
                "name": "SourceMainType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-33",
                "name": "SourceSubType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-30",
                "name": "ProductMainSubTypeMappingId",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-31",
                "name": "SourceSystem",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-67",
                "name": "EnterpriseProductMappingId",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-68",
                "name": "ProductMainType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-69",
                "name": "ProductSubType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-70",
                "name": "MoneyMarketInstrumentType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-73",
                "name": "OTCOverride",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }, {
                "id": "attr-uuid-105",
                "name": "MainType",
                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
            }]
        },
            {
                id: "ds-uuid-28",
                operations: [
                    {
                        "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                        "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                        "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                        "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                        "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                        "_typeHint": "za.co.absa.spline.core.model.op.Composite",
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
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "id": "attr-uuid-2",
                        "name": "attribute 2",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "id": "attr-uuid-3",
                        "name": "attribute 3",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "id": "attr-uuid-4",
                        "name": "attribute 4",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "id": "attr-uuid-5",
                        "name": "attribute 5",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "id": "attr-uuid-6",
                        "name": "attribute 6",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "id": "attr-uuid-7",
                        "name": "attribute 7",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "id": "attr-uuid-8",
                        "name": "attribute 8",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }, {
                        "id": "attr-uuid-9",
                        "name": "attribute 9",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true}
                    }
                ]
            }],

        "_persisted-dataset-descriptors": [{
            id: "e96f2ceb-86b1-4d21-861c-4eb213229838",
            datasetId: "e96f2ceb-86b1-4d21-861c-4eb213229838",
            appId: "APPENDS",
            appName: "APPENDS",
            path: "hdfs://APPENDS",
            timestamp: 1506696404000
        }, {
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