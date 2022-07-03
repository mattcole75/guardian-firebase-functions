const { adminEmail } = require('../configuration/config');

const authorise = (req, authenticated, rules, next) => {

    const { localid } = req.headers;
    const { role, email, uid } = authenticated.data;
    const { roles, allowSameUser } = rules;

    if (email === adminEmail)
        return next(null, { status: 200, message: 'OK' });
    
    if (allowSameUser && localid && uid === localid)
        return next(null, { status: 200, message: 'OK' });
         
    if (!role)
        return next({ status: 403, message: 'Forbidden' }, null);
         
    if(role.every(r => roles.includes(r)))
        return next(null, { status: 200, message: 'OK'});

    return next( { status: 403, message: 'Forbidden' }, null);
}

module.exports = authorise;