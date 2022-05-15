// Description: Provides the data functions for requests
// Developer: Matt Cole
// Date created: 2022-05-03
// Change history:
//  1. 

const request = require('../repository/request');
// const authenticate = require('../auth/authenticated');
// const authorise = require('../auth/authorised');

const create = (req, next) => {

    // let params;
    
    // if (req.body.email === adminEmail)
    //     params = {...req.body, role: ['administrator'], disabled: false };
    // else
    //     params = {...req.body, role: ['user'], disabled: false }; // disabled: true for production

    request.create(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const patch = (req, next) => {
    request.patch(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const get = (req, next) => {
    request.get(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

module.exports = {
    create: create,
    patch: patch,
    get: get
}