module.exports = (app) => {
    const lineage = require('../controllers/lineage.controller.js')

    // Retrieves lineage with datasource and timestamp given in parameters
    app.get('/lineage/:datasourceId/:timestamp', lineage.findOne)

    // Retrieves lineage with datasource and timestamp with a focus on a node and a max depth given in parameters
    app.get('/lineage/:datasourceId/:timestamp/:nodeFocus/:depth', lineage.findOne)

    //Get the details of an operation
    app.get('/details/:operationId', lineage.details)
}