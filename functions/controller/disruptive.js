const disruptive = require('../repository/disruptive');

const plannerCreateDisruptive = (req, next) => {
    disruptive.plannerCreateDisruptive(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
};

const userGetDisruptives = (req, next) => {
    disruptive.userGetDisruptives(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
};

const disruptionAuthorityGetDisruptives = (req, next) => {
    disruptive.disruptionAuthorityGetDisruptives(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
};

const plannerPatchDisruptive = (req, next) => {
    disruptive.plannerPatchDisruptive(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
};

module.exports = {
    plannerCreateDisruptive: plannerCreateDisruptive,
    userGetDisruptives: userGetDisruptives,
    disruptionAuthorityGetDisruptives: disruptionAuthorityGetDisruptives,
    plannerPatchDisruptive: plannerPatchDisruptive
}