const admin = require('firebase-admin');

const authenticate = async (req, next) => {

    const { idtoken } = req.headers;
    
    if (!idtoken)
        return next({ status: 401, message: 'Unauthorised' }, null);

    try {
        const decodedToken = await admin.auth().verifyIdToken(idtoken);
        const authenticated = { uid: decodedToken.uid, roles: decodedToken.roles, email: decodedToken.email };
        next(null, { status: 200, data: authenticated });
    }
    catch(err) {
        console.log('is auth error', err);
        next({ status: 401, message: 'Unauthorised' }, null);
    }
}

module.exports = authenticate;