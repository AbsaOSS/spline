db.lineages.aggregate(
    [
        {
            $addFields: {
                rootDataset: {
                    $arrayElemAt: [
                        "$datasets",
                        0
                    ]
                },
                rootOperation: {
                    $arrayElemAt: [
                        "$operations",
                        0
                    ]
                }
            }
        },
        {
            "$out": "lineages"
        }
    ]
)