// Description: Provides the routes for the planning & access records
// Developer: Matt Cole
// Date created: 2022-05-06
// Change history:
//  1. 

const record = require('../controller/record');

module.exports = (app) => {
    
    app.post('/record', (req, res) => {
        record.create(req, (err, record) => {
            res.set('Content-Type', 'application/json');
            if(err)
                res.status(err.status).send(err);
            else
                res.status(record.status).send(record);
        });
    });
};