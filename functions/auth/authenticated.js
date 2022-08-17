const admin = require('firebase-admin');

const authenticate = async (req, next) => {

    const { idtoken } = req.headers;

    if (!idtoken)
        next({ status: 401, message: 'Unauthorised' }, null);

    try {
        const decodedToken = await admin.auth().verifyIdToken(idtoken);
        const res = { uid: decodedToken.uid, roles: decodedToken.roles, email: decodedToken.email };
        next(null, {status: 200, data: res });
    }
    catch (err) {
        next({ status: 401, message: 'Unauthorised' }, null);
    }
}

module.exports = authenticate;