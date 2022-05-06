// const { application } = require("express");
const { create, all, get, patch, remove } = require('./controller');
const isAuthenticated = require('../auth/authenticated');
const isAuthorised = require('../auth/authorised');

const routesConfig = ( app ) => {

    app.get('/api', (req, res) => {
        const date = new Date();
        const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
        res.json({bongs: 'BONG '.repeat(hours)});
      });

    // app.post('/users', [
    //     // isAuthenticated,
    //     // isAuthorised({ hasRole: ['admin', 'manager'] }),
    //     create 
    // ]);

    // // lists all users
    // app.get('/users', [
    //     isAuthenticated,
    //     isAuthorised({ hasRole: ['admin', 'manager'] }),
    //     all
    // ]);
    // // get :id user
    // app.get('/users/:id', [
    //     isAuthenticated,
    //     isAuthorised({ hasRole: ['admin', 'manager'], allowSameUser: true }),
    //     get
    // ]);
    // // updates :id user
    // app.patch('/users/:id', [
    //     isAuthenticated,
    //     isAuthorised({ hasRole: ['admin', 'manager'], allowSameUser: true }),
    //     patch
    // ]);
    // // deletes :id user
    // app.delete('/users/:id', [
    //     isAuthenticated,
    //     isAuthorised({ hasRole: ['admin', 'manager'] }),
    //     remove
    // ]);

};

module.exports = routesConfig;
