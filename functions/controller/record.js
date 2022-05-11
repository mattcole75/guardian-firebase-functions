// Description: Provides the entry point for the firebase functions
// Developer: Matt Cole
// Date created: 2022-05-03
// Change history:
//  1. 

const record = require('../repository/record');
// const authenticate = require('../auth/authenticated');
// const authorise = require('../auth/authorised');

const create = (req, next) => {

    // let params;
    
    // if (req.body.email === adminEmail)
    //     params = {...req.body, role: ['administrator'], disabled: false };
    // else
    //     params = {...req.body, role: ['user'], disabled: false }; // disabled: true for production

    record.create(req.body, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

module.exports = {
    create: create
}