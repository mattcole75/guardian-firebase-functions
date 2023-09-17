const con = require('../controller/speedRestriction');
const auth = require('../controller/auth');

module.exports = (app) => {
    app.post('/speedrestriction', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {
                // who can use this end point api?
                const rules = {
                    roles: ['speedRestrictor']
                }

                // check user is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        con.userCreateSpeedRestriction(req, (err, request) => {
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

    app.get('/speedrestrictions', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                const rules = {
                    roles: ['speedRestrictor']
                }

                // check user is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {                        
                        con.userGetSpeedRestrictions(req, (err, request) => {
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

    app.get('/speedrestriction', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {

                // who can use this endpoint API?
                const rules = {
                    roles: ['speedRestrictor']
                }

                // check user is authorised to use this endpoint api
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        con.userGetSpeedRestriction(req, (err, doc) => {
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

    app.patch('/speedrestriction', (req, res) => {

        // test the user is logged in
        auth.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {
                // who can use this endpoint api?
                const rules = {
                    roles: ['speedRestrictor']
                }

                // check this user is authorised to use this end point
                auth.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if (err)
                        res.status(err.status).send(err);
                    else {
                        con.userPatchSpeedRestriction(req, (err, request) => {
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
}