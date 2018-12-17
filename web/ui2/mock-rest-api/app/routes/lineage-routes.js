module.exports = (app) => {
    const lineage = require('../controllers/lineage.controller.js');

    // Retrieves lineage with datasource and timestamp given in parameters
    app.get('/lineage/:datasourceId/:timestamp', lineage.findOne);
}