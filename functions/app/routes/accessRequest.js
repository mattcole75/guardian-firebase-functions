const accessRequestController = require('../controller/accessRequest');
const authController = require('../controller/auth');

module.exports = (app) => {
    
    app.post('/accessrequest', (req, res) => {

        // test the user is logged in
        authController.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {
                // who can use this end point api?
                const rules = {
                    roles: ['user']
                }

                console.log('POST');

                // check user is authorised to use this endpoint api
                authController.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        accessRequestController.userCreateRequest(req, (err, request) => {
                            res.set('Content-Type', 'application/json');
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(request.status).send(request);
                        });
                    }
                });
            }
        });
    });

    // // update the request
    app.patch('/accessrequest', (req, res) => {

        // test the user is logged in
        authController.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {
                // who can use this endpoint api?
                const rules = {
                    allowSameUser: true
                }

                console.log('PATCH');

                // check this user is authorised to use this end point
                authController.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if (err)
                        res.status(err.status).send(err);
                    else {
                        accessRequestController.userPatchRequest(req, (err, request) => {
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(request.status).send(request);
                        });
                    }
                });
            }
        });
    });

    // get requests for a user
    app.get('/accessrequests', (req, res) => {

        // test the user is logged in
        authController.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                const rules = {
                    allowSameUser: true
                }

                console.log('GET Requests');

                // check user is authorised to use this endpoint api
                authController.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {                        
                        accessRequestController.userGetRequests(req, (err, request) => {
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(request.status).send(request);
                        });
                    }
                });
            }
        });
    });

    // get a single specific request for a user, coordinator, planner
    app.get('/accessrequest', (req, res) => {

        // test the user is logged in
        authController.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                const rules = {
                    allowSameUser: true,
                    roles: ['planner']
                }

                console.log('GET Request');

                // check user is authorised to use this endpoint api
                authController.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        accessRequestController.userGetRequest(req, (err, doc) => {
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(doc.status).send(doc);
                        });
                    }
                });
            }
        });
    });

    // get requests for a planner
    app.get('/planneraccessrequests', (req, res) => {

        // test the user is logged in
        authController.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                const rules = {
                    roles: ['planner']
                }

                console.log('GET Planner ARs');

                // check user is authorised to use this endpoint api
                authController.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {                        
                        accessRequestController.plannerGetRequests(req, authenticated.data.roles, (err, request) => {
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(request.status).send(request);
                        });
                    }
                });
            }
        });
    });

     // get requests for a user
     app.get('/dailysummary', (req, res) => {

        // test the user is logged in
        authController.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                const rules = {
                    allowSameUser: true
                }

                console.log('GET daily');

                // check user is authorised to use this endpoint api
                authController.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {                        
                        accessRequestController.plannerGetDailySummary(req, (err, request) => {
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(request.status).send(request);
                        });
                    }
                });
            }
        });
    });

    // get requests for a planner
    app.get('/publicview', (req, res) => {

        accessRequestController.publicGetRequests(req, (err, request) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(request.status).send(request);
        });    
    });
};