const data = require('../data/data.js')
const graphOperations = require('../lib/graph-operations.js')
const detailsOperations = require('../lib/details-operations.js')

const defaultDepth = 30

// Find a lineage with a datasourceId and a timestamp
exports.findOne = (req, res) => {
    //TODO : Implements responses for wrong dataSource and/or wrong timestamp to handle these cases on the ui

    let datasourceId = req.params.datasourceId
    let timestamp = req.params.timestamp
    let nodeFocus = req.params.nodeFocus || 'op-uuid-26'
    let depth = req.params.depth || defaultDepth

    res.send(graphOperations.cutGraph(data.graph, nodeFocus, depth))
}

exports.details = (req, res) => {
    let datasourceId = req.params.operationId
    res.send(detailsOperations.getDetails(data.details, datasourceId))
}


