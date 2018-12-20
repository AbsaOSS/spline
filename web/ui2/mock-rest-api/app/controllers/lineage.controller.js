
var _ = require('lodash');

const maxDepth = 100;
const defaultDepth = 30;

let data = {
    nodes: [
        { data: { id: "op-uuid-1", name: "op-uuid-1", icon: 'f15b', color: 'grey' } },
        { data: { id: "op-uuid-2", name: "op-uuid-2", icon: 'f13a' } },
        { data: { id: "op-uuid-3", name: "op-uuid-3", icon: 'f13a' } },
        { data: { id: "op-uuid-5", name: "op-uuid-5", icon: 'f13a' } },
        { data: { id: "op-uuid-7", name: "op-uuid-7", icon: 'f13a' } },
        { data: { id: "op-uuid-8", name: "op-uuid-8", icon: 'f13a' } },
        { data: { id: "op-uuid-9", name: "op-uuid-9", icon: 'f126', color: 'orange' } },
        { data: { id: "op-uuid-10", name: "op-uuid-10", icon: 'f13a' } },
        { data: { id: "op-uuid-12", name: "op-uuid-12", icon: 'f126', color: 'orange' } },
        { data: { id: "op-uuid-14", name: "op-uuid-14", icon: 'f13a' } },
        { data: { id: "op-uuid-15", name: "op-uuid-15", icon: 'f13a' } },
        { data: { id: "op-uuid-17", name: "op-uuid-17", icon: 'f126', color: 'orange' } },
        { data: { id: "op-uuid-21", name: "op-uuid-21", icon: 'f15b', color: 'grey', nativeRoot: "true" } },
        { data: { id: "op-uuid-23", name: "op-uuid-23", icon: 'f13a' } },
        { data: { id: "op-uuid-24", name: "op-uuid-24", icon: 'f13a' } },
        { data: { id: "op-uuid-26", name: "op-uuid-26", icon: 'f15b', color: 'grey', nativeRoot: "true" } },
        { data: { id: "op-uuid-28", name: "op-uuid-28", icon: 'f13a' } },
        { data: { id: "op-uuid-30", name: "op-uuid-30", icon: 'f15b', color: 'grey', nativeRoot: "true" } },
        { data: { id: "op-uuid-32", name: "op-uuid-32", icon: 'f0e8', color: 'green' } },
        { data: { id: "op-uuid-18", name: "op-uuid-18", icon: 'f13a' } },
        { data: { id: "57767d87-909b-49dd-9800-e7dc59e95340", name: "57767d87-909b-49dd-9800-e7dc59e95340", icon: 'f0b0', color: '#F04100' } },
        { data: { id: "c0ec33fd-aaaa-41f6-8aa2-e610e899fb75", name: "c0ec33fd-aaaa-41f6-8aa2-e610e899fb75", icon: 'f161', color: '#E0E719' } },
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

let getNode = function (data, nodeId) {
    return _.find(data.nodes, function (node) { return node.data['id'] == nodeId });
}

let getChildren = function (data, originNode, children, depth) {
    depth = depth - 1;
    _.each(data.edges, function (edge) {
        if (edge.data['source'] == originNode.data['id']) {
            let targetNode = getNode(data, edge.data['target']);
            children.push(targetNode);
            if (depth > 0) {
                getChildren(data, targetNode, children, depth);
            }
        }
    });
    return children;
}

let getAncestors = function (data, originNode, ancestors, depth) {
    depth = depth - 1;
    _.each(data.edges, function (edge) {
        if (edge.data['target'] == originNode.data['id']) {
            let sourceNode = getNode(data, edge.data['source']);
            ancestors.push(sourceNode);
            if (depth > 0) {
                getAncestors(data, sourceNode, ancestors, depth);
            }
        }
    });
    return ancestors;
}

let filterEdges = function (edges, nodes) {
    let finalEdges = new Set()
    _.each(edges, function (edge) {
        let nodeFound = 0;
        _.each(nodes, function (node) {
            if (edge.data['source'] == node.data['id'] || edge.data['target'] == node.data['id']) {
                nodeFound++;
                if (nodeFound == 2) {
                    finalEdges.add(edge)
                    return false
                }

            }
        });
    });
    return Array.from(finalEdges)
}

let cutGraph = function (data, nodeId, depth) {

    depth = depth <= maxDepth ? depth : maxDepth

    let originNode = getNode(data, nodeId)

    let finalNodes = new Set();
    finalNodes.add(originNode)

    let children = getChildren(data, originNode, [], depth)

    children.forEach(finalNodes.add, finalNodes)

    let ancestors = getAncestors(data, originNode, [], depth)
    ancestors.forEach(finalNodes.add, finalNodes)

    _.each(children, function (child) {
        let siblings = getAncestors(data, child, [], depth - 1)
        siblings.forEach(finalNodes.add, finalNodes)
    })

    let res = {
        nodes: Array.from(finalNodes),
        edges: filterEdges(data.edges, Array.from(finalNodes))
    }

    return res
}




// Find a lineage with a datasourceId and a timestamp
exports.findOne = (req, res) => {
    //TODO : Implements responses for wrong dataSource and/or wrong timestamp to handle these cases on the ui

    let datasourceId = req.params.datasourceId;
    let timestamp = req.params.timestamp;
    let nodeFocus = req.params.nodeFocus || "op-uuid-26";
    let depth = req.params.depth || defaultDepth;


    res.send(cutGraph(data, nodeFocus, depth))
};


