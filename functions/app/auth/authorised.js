const { adminEmail } = require('../../configuration/config');

const authorise = (req, authenticated, rules, next) => {
    const { localid } = req.headers;
    const { roles, email, uid } = authenticated.data;
    const { allowSameUser } = rules;

    // authorise if this is the pre configured administrator account
    if (email === adminEmail)
        return next(null, { status: 200, message: 'OK' });
    
    // authorise if the allow same user flag is true and the id's match
    if ((allowSameUser && localid) && (uid === localid))
        return next(null, { status: 200, message: 'OK' });

    // check the user has a least one role
    if (!roles)
        return next({ status: 403, message: 'Forbidden' }, null);
    
    // authorise if the user has the correct roll allocated to their account 
    if(roles.some(el => rules.roles.includes(el)))
        return next(null, { status: 200, message: 'OK'});

    return next( { status: 403, message: 'Forbidden' }, null);
}

module.exports = authorise;