let _ = require('lodash')

let getDetails = function (data, nodeId) {
    return _.find(data, function (details) { return details.mainProps.id === nodeId })
}

module.exports = { getDetails }