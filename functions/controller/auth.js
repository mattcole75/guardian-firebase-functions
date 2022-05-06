const auth = require('../repository/auth');
const authenticate = require('../auth/authenticated');
const authorise = require('../auth/authorised');

const post = (req, next) => {
    
    const params = {...req.body, disabled: false }; // disabled: true for production

    auth.post(params, (err, res) => {
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
    post: post,
    // create: create,
    isAuthenticated: isAuthenticated,
    isAuthorised: isAuthorised,
    all: all,
    get: get,
    patch: patch,
    remove: remove
}
