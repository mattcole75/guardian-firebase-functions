// Description: Provides the routes for the auth functionality
// Developer: Matt Cole
// Date created: 2022-05-03
// Change history:
//  1. 

const auth = require('../controller/auth');

module.exports = (app) => {

    app.post('/user', (req, res) => {
        auth.create(req, (err, user) => {
            res.set('Content-Type', 'application/json');
            if(err)
                res.status(err.status).send(err);
            else
                res.status(user.status).send(user);
        });
    });

    app.get('/users', (req, res) => {
        
        auth.isAuthenticated(req, (err, authenticated) => {
            if (err)
                res.status(err.status).send(err);
            else {
                rules = {
                    roles: ['administrator']
                }
                
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if (err)
                        res.status(err.status).send(err);
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

    app.get('/user', (req, res) => {

        auth.isAuthenticated(req, (err, authenticated) => {
            if (err)
                res.status(err.status).send(err);
            else {

                rules = {
                    roles: ['administrator'],
                    allowSameUser: true
                }
                
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if (err)
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

    app.patch('/user', (req, res) => {

        auth.isAuthenticated(req, (err, authenticated) => {
            if (err)
                res.status(err.status).send(err);
            else {

                rules = {
                    roles: ['administrator'],
                    allowSameUser: true
                }
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if (err)
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

    app.delete('/user', (req, res) => {

        auth.isAuthenticated(req, (err, authenticated) => {
            if (err)
                res.status(err.status).send(err);
            else {

                rules = {
                    roles: ['administrator'],
                    allowSameUser: true
                }
                
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if (err)
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
}