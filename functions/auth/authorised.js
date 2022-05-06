const authorise = (req, authenticated, rules, next) => {

    const { localid } = req.headers;
    const { role, email, uid } = authenticated.data;
    const { roles, allowSameUser } = rules;

    console.log('allowSameUser', allowSameUser);
    console.log('localId', localid);
    console.log('uid', uid);

    if (email === 'mcole.uk@gmail.com') {
        console.log('mca');
        return next(null, { status: 200, message: 'OK' });
    }
    
    if (allowSameUser && localid && uid === localid) {
        console.log('mcb');
        return next(null, { status: 200, message: 'OK' });
    }
         
    if (!role) {
        console.log('mcc', authenticated);
        return next({ status: 403, message: 'Forbidden' }, null);
    }
         
    if (roles.includes(role)) {
        console.log('mcd')
        return next(null, { status: 200, message: 'OK'});
    }
    
    console.log('mce');
    return next( { status: 403, message: 'Forbidden' }, null);
}

module.exports = authorise;