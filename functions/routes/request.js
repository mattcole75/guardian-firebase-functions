// Description: Provides the routes for the planning & access requests
// Developer: Matt Cole
// Date created: 2022-05-06
// Change history:
//  1. 

const request = require('../controller/request');

module.exports = (app) => {
    
    app.post('/request', (req, res) => {
        request.create(req, (err, request) => {
            res.set('Content-Type', 'application/json');
            if(err)
                res.status(err.status).send(err);
            else
                res.status(request.status).send(request);
        });
    });

    app.patch('/request', (req, res) => {
        request.patch(req, (err, request) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(request.status).send(request);
        });
    });

    app.get('/requests', (req, res) => {
        request.get(req, (err, request) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(request.status).send(request);
        });
    });
};