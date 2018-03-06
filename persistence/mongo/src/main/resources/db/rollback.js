db.lineages.aggregate(
    [
        {
            $project: {
                rootDataset: 0,
                rootOperation: 0
            }
        },
        {
            "$out": "lineages"
        }
    ]
)