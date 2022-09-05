const auth = require('../controller/auth');

module.exports = (app) => {

    // post new user endpoint api
    app.post('/user', (req, res) => {
        auth.create(req, (err, user) => {
            res.set('Content-Type', 'application/json');

            if(err)
                res.status(err.status).send(err);
            else
                res.status(user.status).send(user);
        });
    });

    // return all users endpoint api
    app.get('/users', (req, res) => {
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint api?
                rules = {
                    roles: ['administrator']
                }
                
                // check person is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if (err) {
                        res.status(err.status).send(err);
                    }
                    else {
                        auth.all(req, (err, user) => {
                            res.set('Content-Type', 'application/json');
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(user.status).send(user);
                        });
                    }
                }); 
            }
        })
    });

    // return single users data endpoint api
    app.get('/user', (req, res) => {

        // test the requesting users credentials
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint api?
                rules = {
                    roles: ['administrator'],
                    allowSameUser: true
                }
                
                // check person is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        auth.get(req, (err, user) => {
                            res.set('Content-Type', 'application/json');
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(user.status).send(user);
                        });
                    }
                }); 
            }
        })
    });

    // update a users details (exept roles) endpoint api
    app.patch('/user', (req, res) => {

        // test the requesting users credentials
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint api?
                rules = {
                    allowSameUser: true
                }

                // check person is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        auth.patch(req, (err, user) => {
                            res.set('Content-Type', 'application/json');
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(user.status).send(user);
                        });
                    }
                }); 
            }
        })
    });

    // admin update a users details including roles endpoint api
    app.patch('/adminuser', (req, res) => {

        // test the requesting users credentials
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint api?
                rules = {
                    roles: ['administrator'],
                }

                // check person is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        auth.adminPatch(req, (err, user) => {
                            res.set('Content-Type', 'application/json');
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(user.status).send(user);
                        });
                    }
                }); 
            }
        })
    });

    // delete existing user endpoint api
    app.delete('/user', (req, res) => {

        // test the requesting users credentials
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint api?
                rules = {
                    roles: ['administrator'],
                    allowSameUser: true
                }
                
                // check person is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        auth.remove(req, (err, user) => {
                            res.set('Content-Type', 'application/json');
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(user.status).send(user);
                        });
                    }
                }); 
            }
        })
    });

    app.get('/planners', (req, res) => {
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint api?
                rules = {
                    roles: ['coordinator', 'planner']
                }
                
                // check person is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if (err) {
                        res.status(err.status).send(err);
                    }
                    else {
                        auth.getPlanners(req, (err, data) => {
                            res.set('Content-Type', 'application/json');
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(data.status).send(data);
                        });
                    }
                }); 
            }
        })
    });
}