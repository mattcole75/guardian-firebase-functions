const disruptive = require('../controller/disruptive');
const authController = require('../controller/auth');

module.exports = (app) => {

    app.post('/disruptive', (req, res) => {

        //check that the user is logged in
        authController.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {
                // who can use this end point?
                const rules = {
                    roles: ['planner']
                }
                //check user is authorised to use this end point
                authController.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        disruptive.plannerCreateDisruptive(req, (err, disruptive) => {
                            res.set('Content-Type', 'application/json');
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(disruptive.status).send(disruptive);
                        });
                    }
                });
            }
        });
    });

    app.get('/disruptives', (req, res) => {
        
       //check that the user is logged in
       authController.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {
                // who can use this end point?
                const rules = {
                    roles: ['user']
                }
                //check user is authorised to use this end point
                authController.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if(err)
                        res.status(err.status).send(err);
                    else {
                        disruptive.userGetDisruptives(req, (err, disruptive) => {
                            res.set('Content-Type', 'application/json');
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(disruptive.status).send(disruptive);
                        });
                    }
                });
            }
        });
    });

    app.patch('/disruptive', (req, res) => {

        // test the user is logged in
        authController.isAuthenticated(req, (err, authenticated) => {
            if(err)
                res.status(err.status).send(err);
            else {
                // who can use this endpoint api?
                const rules = {
                    roles: ['planner']
                }

                // check this user is authorised to use this end point
                authController.isAuthorised(req, authenticated, rules, (err, authorised) => {
                    if (err)
                        res.status(err.status).send(err);
                    else {
                        disruptive.plannerPatchDisruptive(req, (err, disruptive) => {
                            if(err)
                                res.status(err.status).send(err);
                            else
                                res.status(disruptive.status).send(disruptive);
                        });
                    }
                });
            }
        });
    });
};