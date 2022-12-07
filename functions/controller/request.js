const request = require('../repository/request');

const userCreateRequest = (req, next) => {

    request.userCreateRequest(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const userPatchRequest = (req, next) => {
    request.userPatchRequest(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const userGetRequests = (req, next) => {
    request.userGetRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const userGetRequest = (req, next) => {
    request.userGetRequest(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const coordinatorGetRequests = (req, next) => {
    request.coordinatorGetRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const plannerGetRequests = (req, next) => {
    request.plannerGetRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const disruptionAuthorityGetRequests = (req, next) => {
    request.disruptionAuthorityGetRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

const publicGetRequests = (req, next) => {
    request.publicGetRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else {
            next(null, res);
        }
    });
}

module.exports = {
    userCreateRequest: userCreateRequest,
    userPatchRequest: userPatchRequest,
    userGetRequests: userGetRequests,
    userGetRequest: userGetRequest,
    coordinatorGetRequests: coordinatorGetRequests,
    plannerGetRequests: plannerGetRequests,
    disruptionAuthorityGetRequests: disruptionAuthorityGetRequests,
    publicGetRequests: publicGetRequests
}