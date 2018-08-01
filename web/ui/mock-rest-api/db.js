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
                        "text": "UDF:selectBalance(ProductCategory#106, TradeScalar#0.NominalRepCcy, TradeScalar#0.CashBalanceRepCcy) AS Balance#352",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                            "name": "selectBalance",
                            "text": "UDF:selectBalance(ProductCategory#106, TradeScalar#0.NominalRepCcy, TradeScalar#0.CashBalanceRepCcy)",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                "attributeId": 106,
                                "name": "ProductCategory",
                                "text": "ProductCategory",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": []
                            }, {
                                "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                "exprType": "GetStructField",
                                "text": "TradeScalar#0.NominalRepCcy",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                    "attributeId": 0,
                                    "name": "TradeScalar",
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
                                    "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                    "attributeId": 0,
                                    "name": "TradeScalar",
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
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 111,
                            "name": "MappingMainType",
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
                        "symbol": "<=>",
                        "text": "(ProductMainType#34 <=> MappingMainType#111)",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 34,
                            "name": "ProductMainType",
                            "text": "ProductMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }, {
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 111,
                            "name": "MappingMainType",
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
                        "text": "- FundingInstrumentType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 72,
                            "name": "FundingInstrumentType",
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
                        "text": "- AdditionalInstrumentOverride",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 71,
                            "name": "AdditionalInstrumentOverride",
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
                        "text": "- MappingSubType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 86,
                            "name": "MappingSubType",
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
                        "text": "- MappingMainType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 85,
                            "name": "MappingMainType",
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
                        "symbol": "&&",
                        "text": "((((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86)) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71))) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)) <=> UDF:toLower(FundingInstrumentType#72)))",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                            "symbol": "&&",
                            "text": "(((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86)) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71)))",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                "symbol": "&&",
                                "text": "((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86))",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                    "symbol": "<=>",
                                    "text": "(ProductMainType#34 <=> MappingMainType#85)",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                        "attributeId": 34,
                                        "name": "ProductMainType",
                                        "text": "ProductMainType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": []
                                    }, {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                        "attributeId": 85,
                                        "name": "MappingMainType",
                                        "text": "MappingMainType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": []
                                    }]
                                }, {
                                    "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                    "symbol": "<=>",
                                    "text": "(ProductSubType#35 <=> MappingSubType#86)",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                        "attributeId": 35,
                                        "name": "ProductSubType",
                                        "text": "ProductSubType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": []
                                    }, {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                        "attributeId": 86,
                                        "name": "MappingSubType",
                                        "text": "MappingSubType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": []
                                    }]
                                }]
                            }, {
                                "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                "symbol": "<=>",
                                "text": "(UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71))",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                    "name": "toLower",
                                    "text": "UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName))",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                        "name": "replaceNullsWithNotApplicable",
                                        "text": "UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                            "exprType": "GetStructField",
                                            "text": "TradeStatic#1.InsTypeOverrideName",
                                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                            "children": [{
                                                "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                                "attributeId": 1,
                                                "name": "TradeStatic",
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
                                    "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                    "name": "toLower",
                                    "text": "UDF:toLower(AdditionalInstrumentOverride#71)",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                        "attributeId": 71,
                                        "name": "AdditionalInstrumentOverride",
                                        "text": "AdditionalInstrumentOverride",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": []
                                    }]
                                }]
                            }]
                        }, {
                            "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                            "symbol": "<=>",
                            "text": "(UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)) <=> UDF:toLower(FundingInstrumentType#72))",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                "name": "toLower",
                                "text": "UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType))",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                    "name": "replaceNullsWithNotApplicable",
                                    "text": "UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                        "exprType": "GetStructField",
                                        "text": "TradeStatic#1.FundingInsType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                            "attributeId": 1,
                                            "name": "TradeStatic",
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
                                "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                "name": "toLower",
                                "text": "UDF:toLower(FundingInstrumentType#72)",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                    "attributeId": 72,
                                    "name": "FundingInstrumentType",
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
                        "text": "- SourceSubType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 49,
                            "name": "SourceSubType",
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
                        "text": "- SourceMainType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 32,
                            "name": "SourceMainType",
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
                        "symbol": "&&",
                        "text": "((UDF:toLower(Instrument#2.InstrumentType) <=> UDF:toLower(SourceMainType#32)) && (UDF:toLower(UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType)) <=> UDF:toLower(SourceSubType#49)))",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                            "symbol": "<=>",
                            "text": "(UDF:toLower(Instrument#2.InstrumentType) <=> UDF:toLower(SourceMainType#32))",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                "name": "toLower",
                                "text": "UDF:toLower(Instrument#2.InstrumentType)",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                    "exprType": "GetStructField",
                                    "text": "Instrument#2.InstrumentType",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                        "attributeId": 2,
                                        "name": "Instrument",
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
                                "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                "name": "toLower",
                                "text": "UDF:toLower(SourceMainType#32)",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                    "attributeId": 32,
                                    "name": "SourceMainType",
                                    "text": "SourceMainType",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": []
                                }]
                            }]
                        }, {
                            "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                            "symbol": "<=>",
                            "text": "(UDF:toLower(UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType)) <=> UDF:toLower(SourceSubType#49))",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                "name": "toLower",
                                "text": "UDF:toLower(UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType))",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                    "name": "selectSubtype",
                                    "text": "UDF:selectSubtype(Instrument#2.InstrumentType, TradeStatic#1.FxSubType, Instrument#2.UnderlyingInstrumentType)",
                                    "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                    "children": [{
                                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                        "exprType": "GetStructField",
                                        "text": "Instrument#2.InstrumentType",
                                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                        "children": [{
                                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                            "attributeId": 2,
                                            "name": "Instrument",
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
                                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                            "attributeId": 1,
                                            "name": "TradeStatic",
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
                                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                            "attributeId": 2,
                                            "name": "Instrument",
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
                                "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                                "name": "toLower",
                                "text": "UDF:toLower(SourceSubType#49)",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": [{
                                    "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                    "attributeId": 49,
                                    "name": "SourceSubType",
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
                        "_typeHint": "za.co.absa.spline.core.model.expr.Alias",
                        "text": "UDF:removeEmptyStrings(SourceSubType#33) AS SourceSubType#49",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.UDF",
                            "name": "removeEmptyStrings",
                            "text": "UDF:removeEmptyStrings(SourceSubType#33)",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": [{
                                "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                                "attributeId": 33,
                                "name": "SourceSubType",
                                "text": "SourceSubType",
                                "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                                "children": []
                            }]
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "text": "- SourceSubType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 33,
                            "name": "SourceSubType",
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
                        "text": "- ProductMainSubTypeMappingId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 30,
                            "name": "ProductMainSubTypeMappingId",
                            "text": "ProductMainSubTypeMappingId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "text": "- SourceSystem",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 31,
                            "name": "SourceSystem",
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
                        "_typeHint": "za.co.absa.spline.core.model.expr.Alias",
                        "text": "ProductMainType#68 AS MappingMainType#85",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 68,
                            "name": "ProductMainType",
                            "text": "ProductMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.Alias",
                        "text": "ProductSubType#69 AS MappingSubType#86",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 69,
                            "name": "ProductSubType",
                            "text": "ProductSubType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "text": "- EnterpriseProductMappingId",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 67,
                            "name": "EnterpriseProductMappingId",
                            "text": "EnterpriseProductMappingId",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "text": "- ProductMainType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 68,
                            "name": "ProductMainType",
                            "text": "ProductMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "text": "- ProductSubType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 69,
                            "name": "ProductSubType",
                            "text": "ProductSubType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "text": "- MoneyMarketInstrumentType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 70,
                            "name": "MoneyMarketInstrumentType",
                            "text": "MoneyMarketInstrumentType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "text": "- OTCOverride",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 73,
                            "name": "OTCOverride",
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
                        "_typeHint": "za.co.absa.spline.core.model.expr.Alias",
                        "text": "MainType#105 AS MappingMainType#111",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 105,
                            "name": "MainType",
                            "text": "MainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }]
                    }, {
                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeRemoval",
                        "text": "- MainType",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 105,
                            "name": "MainType",
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
                        "symbol": "<=>",
                        "text": "(ProductMainType#34 <=> MappingMainType#111)",
                        "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "boolean", "nullable": false},
                        "children": [{
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 34,
                            "name": "ProductMainType",
                            "text": "ProductMainType",
                            "dataType": {"_typeHint": "za.co.absa.spline.core.model.dt.Simple", "name": "string", "nullable": true},
                            "children": []
                        }, {
                            "_typeHint": "za.co.absa.spline.core.model.expr.AttrRef",
                            "attributeId": 111,
                            "name": "MappingMainType",
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
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
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
                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                        "refId": "bed05b03-276f-4861-99d9-0970c0936079",
                        "name": "id",
                        "text": "id",
                        "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "long", "nullable": false}
                    }, {
                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                        "refId": "5cada60b-10d0-45c8-8590-957cca18c53e",
                        "name": "title",
                        "text": "title",
                        "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                    }],
                    "aggregations": {
                        "id": {
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "bed05b03-276f-4861-99d9-0970c0936079",
                            "name": "id",
                            "text": "id",
                            "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "long", "nullable": false}
                        },
                        "title": {
                            "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
                            "refId": "5cada60b-10d0-45c8-8590-957cca18c53e",
                            "name": "title",
                            "text": "title",
                            "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                        },
                        "authors": {
                            "_typeHint": "za.co.absa.spline.model.expr.Alias",
                            "alias": "authors",
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
                                        "_typeHint": "za.co.absa.spline.model.expr.AttrRef",
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
            "id": "a38e44ec-bfea-4048-bf21-a9060dbbbb25",
            "appId": "appId",
            "appName": "appName",
            "timestamp": 0,
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
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "e9fac386-5ebb-4ef0-9645-d90dd91c5abd",
                    "name": "Country",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "b44aa868-b04b-48aa-8a27-4fee5f80baa2",
                    "name": "Year2008",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "87d906bd-fe80-4119-a88a-2fe84add729d",
                    "name": "Year2010",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "174d87bf-dbc9-4cae-8764-728c009e5bd7",
                    "name": "Year2009",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "284ab060-dc88-41b7-a376-ce49fc9ac36e",
                    "name": "Year2010",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "9b962f2e-c627-4800-a4c5-9eef7ab4ea0f",
                    "name": "Year2007",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "0571f1c9-6d5d-4036-9b95-0e9a9deb4ccd",
                    "name": "Year2005",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "a08d35d0-7223-4fb2-a15c-005355433299",
                    "name": "Code",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "49cc3f95-d7ea-4928-a7d0-736b3a0fd6e0",
                    "name": "Year2004",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "c8bd501a-1789-473c-8b8d-84ed3ad59711",
                    "name": "Year2003",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "e7314dea-5383-491b-bdee-2323d9721e35",
                    "name": "Year2006",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "6fd56356-1673-4ec2-9803-12f2c2a28c9c",
                    "name": "Year2011",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "d862aae5-516f-4a26-a7a6-3ba58d7abdc4",
                    "name": "Code",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "91826bf9-676f-45da-aa2e-495f0b53e064",
                    "name": "country_name",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "199565d4-7bb3-424d-97f2-57cf5efe58c6",
                    "name": "Year2003",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "0b89ed15-3edd-4e58-8ada-ad8ac94018e3",
                    "name": "Year2008",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "df0e200b-7fbe-4864-8e3d-3c6582397dc7",
                    "name": "Year2011",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "6d2ce22f-d65c-4d81-98de-3cbf3fa6a20a",
                    "name": "Year2007",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "bb0fc532-8df9-403c-ba9f-79e96c617de5",
                    "name": "Year2006",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "589d5edc-6633-45fa-af33-a6f7bdf22e13",
                    "name": "Year2006",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "7efc76c2-b9ff-4317-a774-884d67d19a1d",
                    "name": "Year2004",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "6bc3da76-11b1-4848-9b0e-b88bb7e0f19b",
                    "name": "Year2009",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "cc01482f-eede-4105-9e7a-154dcd916c2e",
                    "name": "Year2004",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "bcd11947-2050-41ef-b94b-03ba9c73be7d",
                    "name": "Year2005",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "4894fc0d-6293-4e61-9363-a7f5e0b4b353",
                    "name": "Year2010",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "feca15b7-2f13-4f33-bb93-8a7832b4dc4b",
                    "name": "Year2007",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "0f81a9c5-286c-4183-b749-bd5ec3acc91f",
                    "name": "Year2003",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "b7ebc914-bd03-4e2d-8ca5-e28c85c16c58",
                    "name": "Year2011",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "94db3e82-eadd-46f3-a2ab-a3ef5bcf166a",
                    "name": "gdp_per_capita",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "b4ba24d7-bd89-483a-8423-d14a50b589da",
                    "name": "Code",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "13c4236a-171c-4ae5-aca7-6ea260c301ea",
                    "name": "Year2011",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "a8679379-1a3b-4855-8b19-2aba9f7c9ad6",
                    "name": "Country",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "80e2b551-a00e-49f9-aeb9-5f833ea3e371",
                    "name": "Year2009",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "bc0a9dbc-16e8-4a05-9f96-49f5f061b6f5",
                    "name": "Year2004",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "4f3fd2d8-5fb2-46e0-88be-bf80761e9fc2",
                    "name": "Year2007",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "c89499ed-32e9-4397-b5c3-1f0662541586",
                    "name": "Year2009",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "714c09c4-95d5-4096-a5ce-187533038df9",
                    "name": "Country",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "c2f83cff-dde5-43b7-8a75-2c5f074571e4",
                    "name": "Country",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "c66dfea6-b57a-4b33-9aaa-9869f9075107",
                    "name": "beer_consumption",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "e1fca62a-7d66-46b8-ab1a-70fd6ac4b28d",
                    "name": "Year2009",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "6b13f128-08d1-4baf-8cee-79e4bbbbf6d7",
                    "name": "BeerConsumption2011",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "a735eedc-7c05-485d-8bc3-4d3832e7b39e",
                    "name": "Year2008",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "ebee3c8a-8ec2-4388-be06-6f410c22aa39",
                    "name": "Year2007",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "7a7e36a6-b33d-4ce9-96cd-4cde130bf29b",
                    "name": "Year2010",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "224ae7ac-50f4-4d59-8e0e-431e4c857d91",
                    "name": "Country",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "5f50782f-e228-4ff3-a887-f42e60f50ba4",
                    "name": "Year2003",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "ccfbc1c8-e25f-4f7a-a4da-bb86e3fb0cb9",
                    "name": "Year2011",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "05d2415a-39b8-4857-8b35-265f9502a759",
                    "name": "Year2005",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "5080e23c-8815-4154-8c14-71ffe6dc8eea",
                    "name": "Year2006",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "6253012b-16fb-417d-b35b-6ef35140f8c1",
                    "name": "Year2005",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "5f368b7a-cfdf-4948-b70c-ad29a8196040",
                    "name": "Year2004",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "ea076a99-5375-4053-a14a-f6c69443d17f",
                    "name": "Code",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "1a53028b-faf2-4015-8f80-b425d68ddb0c",
                    "name": "Year2006",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "6f5e4334-a8aa-4328-bf2a-856373bb9bc6",
                    "name": "Year2008",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "8999badb-abbb-4d54-bc25-b69494245536",
                    "name": "Country",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "6ee059d0-3d43-4d2a-989b-071a8797548a",
                    "name": "Year2010",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "2475916b-3389-4b74-8819-565971aaf8ba",
                    "name": "Year2005",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "66ca6862-f0ef-478b-b458-29515e9bd3be",
                    "name": "Country",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "string", "nullable": true}
                },
                {
                    "id": "e18badb8-b1d4-4bbf-bc92-9775e344e6d9",
                    "name": "Year2008",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "eec00683-4f45-48a9-9e7c-b13b5ba3b85c",
                    "name": "BeerConsumption2011",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
                },
                {
                    "id": "2c87271a-072a-4590-a49c-9e46f464a259",
                    "name": "Year2003",
                    "dataType": {"_typeHint": "za.co.absa.spline.model.dt.Simple", "name": "double", "nullable": true}
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