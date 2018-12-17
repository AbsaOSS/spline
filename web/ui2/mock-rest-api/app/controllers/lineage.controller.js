// Find a lineage with a datasourceId and a timestamp
exports.findOne = (req, res) => {
    //TODO : Implements responses for wrong dataSource and/or wrong timestamp to handle these cases on the ui

    let datasourceId = req.params.datasourceId;
    let timestamp = req.params.timestamp;


    data = {
        nodes: [
            { data: { id: "op-uuid-1", name: "op-uuid-1", icon: 'f15b' } },
            { data: { id: "op-uuid-2", name: "op-uuid-2", icon: 'f15b' } },
            { data: { id: "op-uuid-3", name: "op-uuid-3", icon: 'f15b' } },
            { data: { id: "op-uuid-5", name: "op-uuid-5", icon: 'f15b' } },
            { data: { id: "op-uuid-7", name: "op-uuid-7", icon: 'f15b' } },
            { data: { id: "op-uuid-8", name: "op-uuid-8", icon: 'f15b' } },
            { data: { id: "op-uuid-9", name: "op-uuid-9", icon: 'f15b' } },
            { data: { id: "op-uuid-10", name: "op-uuid-10", icon: 'f15b' } },
            { data: { id: "op-uuid-12", name: "op-uuid-12", icon: 'F085', color: 'orange' } },
            { data: { id: "op-uuid-14", name: "op-uuid-14", icon: 'f15b' } },
            { data: { id: "op-uuid-15", name: "op-uuid-15", icon: 'f15b' } },
            { data: { id: "op-uuid-17", name: "op-uuid-17", icon: 'f15b' } },
            { data: { id: "op-uuid-21", name: "op-uuid-21", icon: 'f15b', nativeRoot: "true" } },
            { data: { id: "op-uuid-23", name: "op-uuid-23", icon: 'f15b' } },
            { data: { id: "op-uuid-24", name: "op-uuid-24", icon: 'f15b' } },
            { data: { id: "op-uuid-26", name: "op-uuid-26", icon: 'f15b', nativeRoot: "true" } },
            { data: { id: "op-uuid-28", name: "op-uuid-28", icon: 'f15b' } },
            { data: { id: "op-uuid-30", name: "op-uuid-30", icon: 'f15b', nativeRoot: "true" } },
            { data: { id: "op-uuid-32", name: "op-uuid-32", icon: 'f15b' } },
            { data: { id: "op-uuid-18", name: "op-uuid-18", icon: 'f15b' } },
            { data: { id: "57767d87-909b-49dd-9800-e7dc59e95340", name: "57767d87-909b-49dd-9800-e7dc59e95340", icon: 'f15b' } },
            { data: { id: "c0ec33fd-aaaa-41f6-8aa2-e610e899fb75", name: "c0ec33fd-aaaa-41f6-8aa2-e610e899fb75", icon: 'f15b' } },
        ],
        edges: [
            { data: { source: "op-uuid-2", target: "op-uuid-1" } },
            { data: { source: "op-uuid-3", target: "op-uuid-2" } },
            { data: { source: "op-uuid-5", target: "op-uuid-3" } },
            { data: { source: "op-uuid-7", target: "op-uuid-5" } },
            { data: { source: "op-uuid-32", target: "op-uuid-5" } },
            { data: { source: "op-uuid-8", target: "op-uuid-7" } },
            { data: { source: "op-uuid-9", target: "op-uuid-8" } },
            { data: { source: "op-uuid-9", target: "op-uuid-18" } },
            { data: { source: "op-uuid-10", target: "op-uuid-9" } },
            { data: { source: "op-uuid-12", target: "op-uuid-10" } },
            { data: { source: "op-uuid-14", target: "op-uuid-12" } },
            { data: { source: "op-uuid-28", target: "op-uuid-12" } },
            { data: { source: "op-uuid-15", target: "op-uuid-14" } },
            { data: { source: "op-uuid-17", target: "op-uuid-15" } },
            { data: { source: "op-uuid-21", target: "op-uuid-17" } },
            { data: { source: "op-uuid-23", target: "op-uuid-17" } },
            { data: { source: "op-uuid-24", target: "op-uuid-23" } },
            { data: { source: "op-uuid-26", target: "op-uuid-24" } },
            { data: { source: "op-uuid-30", target: "op-uuid-28" } },
            { data: { source: "c0ec33fd-aaaa-41f6-8aa2-e610e899fb75", target: "op-uuid-32" } },
            { data: { source: "op-uuid-18", target: "57767d87-909b-49dd-9800-e7dc59e95340" } },
            { data: { source: "57767d87-909b-49dd-9800-e7dc59e95340", target: "c0ec33fd-aaaa-41f6-8aa2-e610e899fb75" } }
        ]
    }

    res.send(data);
};