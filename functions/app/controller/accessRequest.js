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

const plannerGetRequests = (req, roles, next) => {

    accessRequestRepo.plannerGetRequests(req, roles, (err, res) => {
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
    plannerGetRequests: plannerGetRequests,
    publicGetRequests: publicGetRequests
}