const auth = require('../repository/auth');
const authenticate = require('../auth/authenticated');
const authorise = require('../auth/authorised');
const { adminEmail } = require('../configuration/config');

const create = (req, next) => {

    let params;
    
    if (req.body.email === adminEmail)
        params = {...req.body, role: ['administrator'], disabled: false };
    else
        params = {...req.body, role: ['user'], disabled: false }; // disabled: true for production

    auth.create(params, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const isAuthenticated = (req, next) => {
    authenticate(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const isAuthorised = (req, authenticated, rules, next) => {
    authorise(req, authenticated, rules, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const all = (req, next) => {
    auth.all(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });  
}

const get = (req, next) => {
    auth.get(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });  
}

const patch = (req, next) => {
    auth.patch(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });  
}

const adminPatch = (req, next) => {
    auth.adminPatch(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });  
}

const remove = (req, next) => {
    auth.remove(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });  
}

module.exports = {
    create: create,
    isAuthenticated: isAuthenticated,
    isAuthorised: isAuthorised,
    all: all,
    get: get,
    patch: patch,
    adminPatch: adminPatch,
    remove: remove
}
