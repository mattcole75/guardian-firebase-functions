const repo = require('../repository/speedRestriction');

const userCreateSpeedRestriction = (req, next) => {

    repo.userCreateSpeedRestriction(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

const userGetSpeedRestrictions = (req, next) => {

    repo.userGetSpeedRestrictions(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });

}

const userGetSpeedRestriction = (req, next) => {
    repo.userGetSpeedRestriction(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

const userPatchSpeedRestriction = (req, next) => {
    repo.userPatchSpeedRestriction(req, (err, res) => {
        if(err)
            next(err, null);
        else
            next(null, res);
    });
}

module.exports = {
    userCreateSpeedRestriction: userCreateSpeedRestriction,
    userGetSpeedRestrictions: userGetSpeedRestrictions,
    userGetSpeedRestriction: userGetSpeedRestriction,
    userPatchSpeedRestriction: userPatchSpeedRestriction
}