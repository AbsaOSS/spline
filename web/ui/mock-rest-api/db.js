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
                        "inputs": ["ds-uuid-32"],
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
            id: "ds-uuid-1",
            operations: [
                {
                    "_typeHint": "za.co.absa.spline.core.model.op.Composite",
                    appName: "App A",
                    appId: "my.app.a",
                    timestamp: 1506696404000,
                    destination: {
                        datasetId: "ds-uuid-a",
                        path: "/some/path/a",
                        type: "parquet"
                    },
                    sources: [{
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
                        datasetId: "ds-uuid-b",
                        path: "/some/path/b",
                        type: "parquet"
                    },
                    sources: [{path: "/some/path/data.csv", type: "CSV"}],
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
                        datasetId: "ds-uuid-c",
                        path: "/some/path/c",
                        type: "parquet"
                    },
                    sources: [{
                        datasetId: "ds-uuid-a",
                        path: "/some/path/a",
                        type: "Parquet"
                    }, {
                        datasetId: "ds-uuid-b",
                        path: "/some/path/b",
                        type: "Parquet"
                    }, {
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
                        datasetId: "ds-uuid-d",
                        path: "/some/path/d",
                        type: "parquet"
                    },
                    sources: [{
                        datasetId: "ds-uuid-a",
                        path: "/some/path/a",
                        type: "Parquet"
                    }, {
                        datasetId: "ds-uuid-b",
                        path: "/some/path/b",
                        type: "Parquet"
                    }, {
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
                        datasetId: "ds-uuid-1",
                        path: "/some/path/e",
                        type: "parquet"
                    },
                    sources: [{
                        datasetId: "ds-uuid-c",
                        path: "/some/path/c",
                        type: "Parquet"
                    }, {
                        datasetId: "ds-uuid-d",
                        path: "/some/path/d",
                        type: "Parquet"
                    }, {
                        path: "/some/path/e.csv",
                        type: "CSV"
                    }, {
                        path: "/some/path/e.json",
                        type: "JSON"
                    }, {
                        path: "/some/path/e.txt",
                        type: "Text"
                    }, {
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
                            datasetId: "ds-uuid-a",
                            path: "/some/path/a",
                            type: "parquet"
                        },
                        sources: [{
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
                            datasetId: "ds-uuid-b",
                            path: "/some/path/b",
                            type: "parquet"
                        },
                        sources: [{path: "/some/path/data.csv", type: "CSV"}],
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
                            datasetId: "ds-uuid-c",
                            path: "/some/path/c",
                            type: "parquet"
                        },
                        sources: [{
                            datasetId: "ds-uuid-a",
                            path: "/some/path/a",
                            type: "Parquet"
                        }, {
                            datasetId: "ds-uuid-b",
                            path: "/some/path/b",
                            type: "Parquet"
                        }, {
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
                            datasetId: "ds-uuid-d",
                            path: "/some/path/d",
                            type: "parquet"
                        },
                        sources: [{
                            datasetId: "ds-uuid-a",
                            path: "/some/path/a",
                            type: "Parquet"
                        }, {
                            datasetId: "ds-uuid-b",
                            path: "/some/path/b",
                            type: "Parquet"
                        }, {
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
                            datasetId: "ds-uuid-1",
                            path: "/some/path/e",
                            type: "parquet"
                        },
                        sources: [{
                            datasetId: "ds-uuid-c",
                            path: "/some/path/c",
                            type: "Parquet"
                        }, {
                            datasetId: "ds-uuid-d",
                            path: "/some/path/d",
                            type: "Parquet"
                        }, {
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
                            datasetId: "ds-uuid-28",
                            path: "/some/path/f",
                            type: "parquet"
                        },
                        sources: [{
                            datasetId: "ds-uuid-1",
                            path: "/some/path/1",
                            type: "Parquet"
                        }, {
                            datasetId: "ds-uuid-d",
                            path: "/some/path/d",
                            type: "Parquet"
                        }, {
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