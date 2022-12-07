const request = require('../controller/request');
const auth = require('../controller/auth');

module.exports = (app) => {
    
    app.post('/request', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {
                // who can use this end point api?
                const rules = {
                    roles: ['user']
                }

                // check user is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        request.userCreateRequest(req, (err, request) => {
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

    // update the request
    app.patch('/request', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {
                // who can use this endpoint api?
                const rules = {
                    allowSameUser: true
                }

                // check this user is authorised to use this end point
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if (err)
                        res.status(err.status).send(err);
                    else {
                        request.userPatchRequest(req, (err, request) => {
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
    app.get('/requests', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                const rules = {
                    allowSameUser: true
                }

                // check user is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                         request.userGetRequests(req, (err, request) => {
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
    app.get('/request', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                const rules = {
                    allowSameUser: true,
                    roles: ['coordinator', 'planner'],
                }

                // check user is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                         request.userGetRequest(req, (err, doc) => {
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

     // get requests for a coordinator
     app.get('/coordinatorrequests', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                rules = {
                    roles: ['coordinator'],
                }

                // check user is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                         request.coordinatorGetRequests(req, (err, request) => {
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
    app.get('/plannerrequests', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                const rules = {
                    roles: ['planner'],
                }

                // check user is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                         request.plannerGetRequests(req, (err, request) => {
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

    // get requests for a disruption authority role
    app.get('/disruptionauthorityrequests', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                const rules = {
                    roles: ['disruptionAuthority'],
                }

                // check user is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                         request.disruptionAuthorityGetRequests(req, (err, request) => {
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

        request.publicGetRequests(req, (err, request) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(request.status).send(request);
        });    
    });
};