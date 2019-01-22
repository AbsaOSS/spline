const graph = {
    nodes: [
        { data: { id: 'op-uuid-1', name: 'op-uuid-1', } },
        { data: { id: 'op-uuid-2', name: 'op-uuid-2', operationType: 'Alias' } },
        { data: { id: 'op-uuid-3', name: 'op-uuid-3', operationType: 'Projection' } },
        { data: { id: 'op-uuid-5', name: 'op-uuid-5', operationType: 'Projection' } },
        { data: { id: 'op-uuid-7', name: 'op-uuid-7', operationType: 'Projection' } },
        { data: { id: 'op-uuid-8', name: 'op-uuid-8', operationType: 'Projection' } },
        { data: { id: 'op-uuid-9', name: 'op-uuid-9', operationType: 'Join' } },
        { data: { id: 'op-uuid-10', name: 'op-uuid-10', operationType: 'Projection' } },
        { data: { id: 'op-uuid-12', name: 'op-uuid-12', operationType: 'Join' } },
        { data: { id: 'op-uuid-14', name: 'op-uuid-14', operationType: 'Projection' } },
        { data: { id: 'op-uuid-15', name: 'op-uuid-15', operationType: 'Projection' } },
        { data: { id: 'op-uuid-17', name: 'op-uuid-17', operationType: 'Join' } },
        { data: { id: 'op-uuid-21', name: 'op-uuid-21', nativeRoot: 'true' } },
        { data: { id: 'op-uuid-23', name: 'op-uuid-23', operationType: 'Projection' } },
        { data: { id: 'op-uuid-24', name: 'op-uuid-24', operationType: 'Projection' } },
        { data: { id: 'op-uuid-26', name: 'op-uuid-26', nativeRoot: 'true' } },
        { data: { id: 'op-uuid-28', name: 'op-uuid-28', operationType: 'Projection' } },
        { data: { id: 'op-uuid-30', name: 'op-uuid-30', nativeRoot: 'true' } },
        { data: { id: 'op-uuid-32', name: 'op-uuid-32', operationType: 'Aggregate' } },
        { data: { id: 'op-uuid-18', name: 'op-uuid-18', operationType: 'Projection' } },
        { data: { id: '57767d87-909b-49dd-9800-e7dc59e95340', name: '57767d87-909b-49dd-9800-e7dc59e95340', operationType: 'Filter' } },
        { data: { id: 'c0ec33fd-aaaa-41f6-8aa2-e610e899fb75', name: 'c0ec33fd-aaaa-41f6-8aa2-e610e899fb75', operationType: 'Sort' } }
    ],
    edges: [
        { data: { source: 'op-uuid-2', target: 'op-uuid-1' } },
        { data: { source: 'op-uuid-3', target: 'op-uuid-2' } },
        { data: { source: 'op-uuid-5', target: 'op-uuid-3' } },
        { data: { source: 'op-uuid-7', target: 'op-uuid-5' } },
        { data: { source: 'op-uuid-32', target: 'op-uuid-5' } },
        { data: { source: 'op-uuid-8', target: 'op-uuid-7' } },
        { data: { source: 'op-uuid-9', target: 'op-uuid-8' } },
        { data: { source: 'op-uuid-9', target: 'op-uuid-18' } },
        { data: { source: 'op-uuid-10', target: 'op-uuid-9' } },
        { data: { source: 'op-uuid-12', target: 'op-uuid-10' } },
        { data: { source: 'op-uuid-14', target: 'op-uuid-12' } },
        { data: { source: 'op-uuid-28', target: 'op-uuid-12' } },
        { data: { source: 'op-uuid-15', target: 'op-uuid-14' } },
        { data: { source: 'op-uuid-17', target: 'op-uuid-15' } },
        { data: { source: 'op-uuid-21', target: 'op-uuid-17' } },
        { data: { source: 'op-uuid-23', target: 'op-uuid-17' } },
        { data: { source: 'op-uuid-24', target: 'op-uuid-23' } },
        { data: { source: 'op-uuid-26', target: 'op-uuid-24' } },
        { data: { source: 'op-uuid-30', target: 'op-uuid-28' } },
        { data: { source: 'c0ec33fd-aaaa-41f6-8aa2-e610e899fb75', target: 'op-uuid-32' } },
        { data: { source: 'op-uuid-18', target: '57767d87-909b-49dd-9800-e7dc59e95340' } },
        { data: { source: '57767d87-909b-49dd-9800-e7dc59e95340', target: 'c0ec33fd-aaaa-41f6-8aa2-e610e899fb75' } }
    ]
}


const details =
    [
        {
            "_typeHint": "za.co.absa.spline.core.model.op.Join",
            "mainProps": {
                "id": "op-uuid-12",
                "name": "Join",
                "rawString": "Join LeftOuter, ((((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86)) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71))) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)) <=> UDF:toLower(FundingInstrumentType#72)))",
                "schemas": [
                    [
                        {
                            "id": "attr-uuid-0",
                            "name": "TradeScalar",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                "fields": [
                                    {
                                        "name": "AccruedDiscountBalanceRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "AccruedDiscountBalanceTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "decimal(38,10)",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "AccruedInterestRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "decimal(38,10)",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "AccruedInterestTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "decimal(38,10)",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BaseCostDirty",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BrokerFeesSettledRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BrokerFeesSettledTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BrokerFeesUnsettledRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BrokerFeesUnsettledTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BrokerageNonVatable",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BrokerageVatable",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CallAccruedInterestRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CallAccruedInterestTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CashBalanceRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CashBalanceTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CashPerCurrencyZAR",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CashRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CashTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CashflowRealDivRepCcyAmt",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "DailyExecutionFee",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "DailyExecutionFeeNoVAT",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "DailyVAT",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "DealAmount",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "DividendDivPayDay",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Dividends",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "EndCash",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ExecutionCost",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "FaceValueRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "FaceValueTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Fees",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "FeesSettled",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "FeesUnsettled",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Interest",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "InvestorProtectionLevy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "IsMidasSettlement",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ManufacturedDividendValue",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "NetConsideration",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "NominalRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "NominalTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Premium",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "PriceEndDate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "PvRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "PvTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "PvUnsettledDividends",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "RealDividendValue",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "RegulatoryNotional",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SecurityTransferTax",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SettledDividends",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "StartCash",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "StrikePrice",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "StrikeRate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SweepingPosition",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TotalLastDividendAmount",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TotalProfitLoss",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TradedCleanPrice",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TradedDirtyPrice",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TradedInterestInRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TradedInterestInTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "UnderlyingForwardPrice",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "UnsettledPremiumRepCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "UnsettledPremiumTxnCcy",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Vat",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "YieldToMaturity",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SecuritiesTransferTax",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    }
                                ],
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-1",
                            "name": "TradeStatic",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                "fields": [
                                    {
                                        "name": "AcquireDate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "AcquirerName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "AcquirerNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "AgriSiloLocation",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "AgriStatus",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "AgriTransportDifferential",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ApproximateLoadDescription",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ApproximateLoadIndicator",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ApproximateLoadPrice",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ApproximateLoadQuantity",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BrokerBIC",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BrokerName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BrokerStatus",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BuySell",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ClientFundName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ClsStatus",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ConnectedTradeNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ContractTradeNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CorrectionTradeNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CounterpartyName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CounterpartyNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CounterPortfolioName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CounterPortfolioNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CountryPortfolio",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CreateDateTime",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CurrencyName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "DiscountType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "DiscountingTypeChoiceListEntry",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ExecutionDateTime",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ExternalId",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "FundingInsType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "FullyFunded",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "FxSubType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "InsTypeOverrideName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "IsInternalSettlement",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "LastModifiedUserID",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "MaturityDate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "MentisProjectNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "MirrorTradeNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "MmInstrumentType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "PortfolioName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "PortfolioNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Price",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Quantity",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "RelationshipPartyName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "RwaCounterpartyName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SourceCounterpartyName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SourceCounterpartyNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SourceCounterpartySystem",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SourceTradeId",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SourceTradeType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ShadowRevenueType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SwiftMessageStatus",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TerminatedTradeNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TradeDateTime",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TradeKey2ChoiceListEntry",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TradeNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TradePhase",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TradeType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TraderABNo",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TraderName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TraderNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TradeStatus",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TransactionTradeNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "UpdateUserABNo",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "UpdateUserName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "UpdateDateTime",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ValueDate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "VersionId",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "VolatilityStrike",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "XtpJseRef",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "XtpTradeTypeValue",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "YourRef",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ReferencePrice",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ClearedTrade",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ClrClearingBroker",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ClrBrokerTradeId",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ClearingMemberCode",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ClearingHouseId",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CentralCounterparty",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CcpStatus",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CcpClearingStatus",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CcpClearingHouseId",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "OriginalMarkitWireTradeId",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "OriginalCounterparty",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "MarkitWireTradeId",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CounterpartySdsId",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    }
                                ],
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-2",
                            "name": "Instrument",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                "fields": [
                                    {
                                        "name": "Barrier",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BarrierEndDate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BarrierMonitoring",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BarrierOptionType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "BarrierStartDate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CallPut",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ContractSize",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CommodityDeliverableChoiceListEntry",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CommodityDescriptionChoiceListEntry",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CommodityLabelChoiceListEntry",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CommoditySubAssetsChoiceListEntry",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "CurrencyName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Digital",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "DomesticCurrencyName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "DoubleBarrier",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "EndDateTime",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ExoticBarrierRebateOnExpiry",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ExoticDigitalBarrierType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ExoticRebateName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ExoticRebateNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ExpiryDate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ExpiryTime",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ExternalId1",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ForeignCurrencyName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "FxOptionType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "InstrumentAddress",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "InstrumentExoticBarrierCrossedStatus",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "InstrumentName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "InstrumentType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "IsCurrency",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "IsExpired",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Isin",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "IssuerName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "IssuerNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Legs",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                            "elementDataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                "fields": [
                                                    {
                                                        "name": "AccruedInterestTxnCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "AccruedInterestRepCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "AccruedDiscountBalanceTxnCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "AccruedDiscountBalanceRepCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "CashTxnCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "CashRepCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "Carry",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "CleanConsideration",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "CurrencyName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "CurrentRate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "CurrentSpread",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "DayCountMethod",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "EndDate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "FaceValueTxnCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "FaceValueRepCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "FixedRate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "FloatRateReferenceName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "FloatRateSpread",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "IsPayLeg",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "LastResetDate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "LegFloatRateFactor",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "LegNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "LegStartDate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "LegType",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "NominalRepCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "NominalTxnCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "Price",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "PvTxnCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "PvRepCcy",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "RepoRate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "RollingPeriod",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }
                                                ],
                                                "nullable": true
                                            },
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "MmInstrumentType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "OpenLinkUnitChoiceListEntry",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "OptionExerciseType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "OptionExoticType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Otc",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "PayDayOffset",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "PayOffsetMethod",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "PayType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "QuoteType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Rate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "RealDividendValue",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "RefValue",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Rebate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ReferencePrice",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SettlementType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SettlementDateTime",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "SpotBankingDayOffset",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "StartDate",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "StrikeCurrencyName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "StrikeCurrencyNumber",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "TxnMaturityPeriod",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "UnderlyingInstrumentType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "UnderlyingInstruments",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                            "elementDataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                "fields": [
                                                    {
                                                        "name": "EndDate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "ExpiryDate",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "ExpiryTime",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "Isin",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "InstrumentAddress",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "InstrumentName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "InstrumentType",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "IssuerName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "IssuerNumber",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    },
                                                    {
                                                        "name": "ParentInstrumentAddress",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        }
                                                    }
                                                ],
                                                "nullable": true
                                            },
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "ValuationGroupName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "FixingSourceName",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "Seniority",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    },
                                    {
                                        "name": "VersionId",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        }
                                    }
                                ],
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-3",
                            "name": "Moneyflows",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                "elementDataType": {
                                    "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                    "fields": [
                                        {
                                            "name": "CreateDateTime",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "CashflowNumber",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "CounterpartyName",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "CounterpartyNumber",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "CurrencyName",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "CurrencyNumber",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "EndDate",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "FixedRate",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "ForwardRate",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "LegNumber",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "NominalFactor",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "PayDate",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "ProjectedTxnCcy",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "ProjectedRepCcy",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "PvTxnCcy",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "PvRepCcy",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "SourceObjectUpdateUserName",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "StartDate",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "Text",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "Type",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "UpdateTime",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "UpdateUserName",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        }
                                    ],
                                    "nullable": true
                                },
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-4",
                            "name": "SalesCredits",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Array",
                                "elementDataType": {
                                    "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                    "fields": [
                                        {
                                            "name": "SalesCreditSubTeamName",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "SalesPersonName",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "StandardSalesCredit",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        },
                                        {
                                            "name": "TotalValueAddSalesCredit",
                                            "dataType": {
                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                "name": "string",
                                                "nullable": true
                                            }
                                        }
                                    ],
                                    "nullable": true
                                },
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-5",
                            "name": "Feed",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                "name": "string",
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-6",
                            "name": "IsEoD",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                "name": "boolean",
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-7",
                            "name": "ReportDate",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                "name": "string",
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-34",
                            "name": "ProductMainType",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                "name": "string",
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-35",
                            "name": "ProductSubType",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                "name": "string",
                                "nullable": true
                            }
                        }
                    ],
                    [
                        {
                            "id": "attr-uuid-85",
                            "name": "MappingMainType",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                "name": "string",
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-86",
                            "name": "MappingSubType",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                "name": "string",
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-71",
                            "name": "AdditionalInstrumentOverride",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                "name": "string",
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-72",
                            "name": "FundingInstrumentType",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                "name": "string",
                                "nullable": true
                            }
                        },
                        {
                            "id": "attr-uuid-74",
                            "name": "EnterpriseProduct",
                            "dataType": {
                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                "name": "string",
                                "nullable": true
                            }
                        }
                    ]
                ],
                "inputs": [
                    "0",
                    "1"
                ],
                "output": "0"
            },
            "condition": {
                "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                "exprType": "And",
                "symbol": "&&",
                "text": "((((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86)) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71))) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)) <=> UDF:toLower(FundingInstrumentType#72)))",
                "dataType": {
                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                    "name": "boolean",
                    "nullable": false
                },
                "children": [
                    {
                        "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                        "exprType": "And",
                        "symbol": "&&",
                        "text": "(((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86)) && (UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71)))",
                        "dataType": {
                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                            "name": "boolean",
                            "nullable": false
                        },
                        "children": [
                            {
                                "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                "exprType": "And",
                                "symbol": "&&",
                                "text": "((ProductMainType#34 <=> MappingMainType#85) && (ProductSubType#35 <=> MappingSubType#86))",
                                "dataType": {
                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                    "name": "boolean",
                                    "nullable": false
                                },
                                "children": [
                                    {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                        "exprType": "EqualNullSafe",
                                        "symbol": "<=>",
                                        "text": "(ProductMainType#34 <=> MappingMainType#85)",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "boolean",
                                            "nullable": false
                                        },
                                        "children": [
                                            {
                                                "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                                "attributeId": 34,
                                                "name": "ProductMainType",
                                                "exprType": "AttributeReference",
                                                "text": "ProductMainType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                },
                                                "children": []
                                            },
                                            {
                                                "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                                "attributeId": 85,
                                                "name": "MappingMainType",
                                                "exprType": "AttributeReference",
                                                "text": "MappingMainType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                },
                                                "children": []
                                            }
                                        ]
                                    },
                                    {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                        "exprType": "EqualNullSafe",
                                        "symbol": "<=>",
                                        "text": "(ProductSubType#35 <=> MappingSubType#86)",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "boolean",
                                            "nullable": false
                                        },
                                        "children": [
                                            {
                                                "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                                "attributeId": 35,
                                                "name": "ProductSubType",
                                                "exprType": "AttributeReference",
                                                "text": "ProductSubType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                },
                                                "children": []
                                            },
                                            {
                                                "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                                "attributeId": 86,
                                                "name": "MappingSubType",
                                                "exprType": "AttributeReference",
                                                "text": "MappingSubType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                },
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                                "exprType": "EqualNullSafe",
                                "symbol": "<=>",
                                "text": "(UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)) <=> UDF:toLower(AdditionalInstrumentOverride#71))",
                                "dataType": {
                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                    "name": "boolean",
                                    "nullable": false
                                },
                                "children": [
                                    {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                        "name": "toLower",
                                        "exprType": "UserDefinedFunction",
                                        "text": "UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName))",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        },
                                        "children": [
                                            {
                                                "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                                "name": "replaceNullsWithNotApplicable",
                                                "exprType": "UserDefinedFunction",
                                                "text": "UDF:replaceNullsWithNotApplicable(TradeStatic#1.InsTypeOverrideName)",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                },
                                                "children": [
                                                    {
                                                        "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                                        "exprType": "GetStructField",
                                                        "text": "TradeStatic#1.InsTypeOverrideName",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                            "name": "string",
                                                            "nullable": true
                                                        },
                                                        "children": [
                                                            {
                                                                "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                                                "attributeId": 1,
                                                                "name": "TradeStatic",
                                                                "exprType": "AttributeReference",
                                                                "text": "TradeStatic",
                                                                "dataType": {
                                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                                    "fields": [
                                                                        {
                                                                            "name": "AcquireDate",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "AcquirerName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "AcquirerNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "AgriSiloLocation",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "AgriStatus",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "AgriTransportDifferential",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ApproximateLoadDescription",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ApproximateLoadIndicator",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ApproximateLoadPrice",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ApproximateLoadQuantity",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "BrokerBIC",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "BrokerName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "BrokerStatus",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "BuySell",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ClientFundName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ClsStatus",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ConnectedTradeNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ContractTradeNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CorrectionTradeNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CounterpartyName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CounterpartyNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CounterPortfolioName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CounterPortfolioNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CountryPortfolio",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CreateDateTime",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CurrencyName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "DiscountType",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "DiscountingTypeChoiceListEntry",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ExecutionDateTime",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ExternalId",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "FundingInsType",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "FullyFunded",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "FxSubType",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "InsTypeOverrideName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "IsInternalSettlement",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "LastModifiedUserID",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "MaturityDate",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "MentisProjectNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "MirrorTradeNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "MmInstrumentType",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "PortfolioName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "PortfolioNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "Price",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "Quantity",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "RelationshipPartyName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "RwaCounterpartyName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "SourceCounterpartyName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "SourceCounterpartyNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "SourceCounterpartySystem",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "SourceTradeId",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "SourceTradeType",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ShadowRevenueType",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "SwiftMessageStatus",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TerminatedTradeNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TradeDateTime",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TradeKey2ChoiceListEntry",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TradeNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TradePhase",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TradeType",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TraderABNo",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TraderName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TraderNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TradeStatus",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "TransactionTradeNumber",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "UpdateUserABNo",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "UpdateUserName",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "UpdateDateTime",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ValueDate",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "VersionId",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "VolatilityStrike",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "XtpJseRef",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "XtpTradeTypeValue",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "YourRef",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ReferencePrice",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ClearedTrade",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ClrClearingBroker",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ClrBrokerTradeId",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ClearingMemberCode",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "ClearingHouseId",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CentralCounterparty",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CcpStatus",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CcpClearingStatus",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CcpClearingHouseId",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "OriginalMarkitWireTradeId",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "OriginalCounterparty",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "MarkitWireTradeId",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        },
                                                                        {
                                                                            "name": "CounterpartySdsId",
                                                                            "dataType": {
                                                                                "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                                "name": "string",
                                                                                "nullable": true
                                                                            }
                                                                        }
                                                                    ],
                                                                    "nullable": true
                                                                },
                                                                "children": []
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                        "name": "toLower",
                                        "exprType": "UserDefinedFunction",
                                        "text": "UDF:toLower(AdditionalInstrumentOverride#71)",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        },
                                        "children": [
                                            {
                                                "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                                "attributeId": 71,
                                                "name": "AdditionalInstrumentOverride",
                                                "exprType": "AttributeReference",
                                                "text": "AdditionalInstrumentOverride",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                },
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "_typeHint": "za.co.absa.spline.core.model.expr.Binary",
                        "exprType": "EqualNullSafe",
                        "symbol": "<=>",
                        "text": "(UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)) <=> UDF:toLower(FundingInstrumentType#72))",
                        "dataType": {
                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                            "name": "boolean",
                            "nullable": false
                        },
                        "children": [
                            {
                                "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                "name": "toLower",
                                "exprType": "UserDefinedFunction",
                                "text": "UDF:toLower(UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType))",
                                "dataType": {
                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                    "name": "string",
                                    "nullable": true
                                },
                                "children": [
                                    {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                        "name": "replaceNullsWithNotApplicable",
                                        "exprType": "UserDefinedFunction",
                                        "text": "UDF:replaceNullsWithNotApplicable(TradeStatic#1.FundingInsType)",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        },
                                        "children": [
                                            {
                                                "_typeHint": "za.co.absa.spline.core.model.expr.Generic",
                                                "exprType": "GetStructField",
                                                "text": "TradeStatic#1.FundingInsType",
                                                "dataType": {
                                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                    "name": "string",
                                                    "nullable": true
                                                },
                                                "children": [
                                                    {
                                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                                        "attributeId": 1,
                                                        "name": "TradeStatic",
                                                        "exprType": "AttributeReference",
                                                        "text": "TradeStatic",
                                                        "dataType": {
                                                            "_typeHint": "za.co.absa.spline.core.model.dt.Struct",
                                                            "fields": [
                                                                {
                                                                    "name": "AcquireDate",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "AcquirerName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "AcquirerNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "AgriSiloLocation",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "AgriStatus",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "AgriTransportDifferential",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ApproximateLoadDescription",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ApproximateLoadIndicator",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ApproximateLoadPrice",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ApproximateLoadQuantity",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "BrokerBIC",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "BrokerName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "BrokerStatus",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "BuySell",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ClientFundName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ClsStatus",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ConnectedTradeNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ContractTradeNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CorrectionTradeNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CounterpartyName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CounterpartyNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CounterPortfolioName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CounterPortfolioNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CountryPortfolio",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CreateDateTime",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CurrencyName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "DiscountType",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "DiscountingTypeChoiceListEntry",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ExecutionDateTime",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ExternalId",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "FundingInsType",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "FullyFunded",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "FxSubType",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "InsTypeOverrideName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "IsInternalSettlement",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "LastModifiedUserID",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "MaturityDate",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "MentisProjectNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "MirrorTradeNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "MmInstrumentType",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "PortfolioName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "PortfolioNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "Price",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "Quantity",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "RelationshipPartyName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "RwaCounterpartyName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "SourceCounterpartyName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "SourceCounterpartyNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "SourceCounterpartySystem",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "SourceTradeId",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "SourceTradeType",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ShadowRevenueType",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "SwiftMessageStatus",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TerminatedTradeNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TradeDateTime",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TradeKey2ChoiceListEntry",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TradeNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TradePhase",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TradeType",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TraderABNo",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TraderName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TraderNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TradeStatus",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "TransactionTradeNumber",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "UpdateUserABNo",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "UpdateUserName",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "UpdateDateTime",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ValueDate",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "VersionId",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "VolatilityStrike",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "XtpJseRef",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "XtpTradeTypeValue",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "YourRef",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ReferencePrice",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ClearedTrade",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ClrClearingBroker",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ClrBrokerTradeId",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ClearingMemberCode",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "ClearingHouseId",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CentralCounterparty",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CcpStatus",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CcpClearingStatus",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CcpClearingHouseId",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "OriginalMarkitWireTradeId",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "OriginalCounterparty",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "MarkitWireTradeId",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                },
                                                                {
                                                                    "name": "CounterpartySdsId",
                                                                    "dataType": {
                                                                        "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                                                        "name": "string",
                                                                        "nullable": true
                                                                    }
                                                                }
                                                            ],
                                                            "nullable": true
                                                        },
                                                        "children": []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "_typeHint": "za.co.absa.spline.core.model.expr.UserDefinedFunction",
                                "name": "toLower",
                                "exprType": "UserDefinedFunction",
                                "text": "UDF:toLower(FundingInstrumentType#72)",
                                "dataType": {
                                    "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                    "name": "string",
                                    "nullable": true
                                },
                                "children": [
                                    {
                                        "_typeHint": "za.co.absa.spline.core.model.expr.AttributeReference",
                                        "attributeId": 72,
                                        "name": "FundingInstrumentType",
                                        "exprType": "AttributeReference",
                                        "text": "FundingInstrumentType",
                                        "dataType": {
                                            "_typeHint": "za.co.absa.spline.core.model.dt.Simple",
                                            "name": "string",
                                            "nullable": true
                                        },
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "joinType": "LeftOuter"
        }
    ]


module.exports = { graph, details }

