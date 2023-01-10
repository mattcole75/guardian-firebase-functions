const accessRequestRepo = require('../repository/accessRequest');

const userCreateRequest = (req, next) => {

    accessRequestRepo.userCreateRequest(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

const userPatchRequest = (req, next) => {
    accessRequestRepo.userPatchRequest(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

const userGetRequests = (req, next) => {
    accessRequestRepo.userGetRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

const userGetRequest = (req, next) => {
    accessRequestRepo.userGetRequest(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

const coordinatorGetRequests = (req, next) => {
    accessRequestRepo.coordinatorGetRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

const plannerGetRequests = (req, next) => {
    accessRequestRepo.plannerGetRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

const disruptionAuthorityGetRequests = (req, next) => {
    accessRequestRepo.disruptionAuthorityGetRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

const plannerGetClosedRequests = (req, next) => {
    accessRequestRepo.plannerGetClosedRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

const publicGetRequests = (req, next) => {
    accessRequestRepo.publicGetRequests(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
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
    plannerGetClosedRequests: plannerGetClosedRequests,
    publicGetRequests: publicGetRequests
}