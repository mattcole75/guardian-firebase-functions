// Description: Provides the entry point for the firebase functions
// Developer: Matt Cole
// Date created: 2022-05-03
// Change history:
//  1. 

const admin = require('firebase-admin');

const authenticate = async (req, next) => {

    const { idtoken } = req.headers

    if (!idtoken)
        next({ status: 401, message: 'Unauthorised' }, null);

    try {
        const decodedToken = await admin.auth().verifyIdToken(idtoken);
        const res = { uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email };
        
        next(null, {status: 200, data: res });
    }
    catch (err) {
        console.error(`${err.code} -  ${err.message}`)
        next({ status: 401, message: 'Unauthorised' }, null);
    }
}

module.exports = authenticate;