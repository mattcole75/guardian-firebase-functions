// Description: Provides the entry point for the firebase functions
// Developer: Matt Cole
// Date created: 2022-05-03
// Change history:
//  1. 

const admin = require('firebase-admin');

const create = async (req, next) => {

    try {

        const { displayName, email, password, disabled, role } = req;

        if (!displayName || !email || !password || !role) {
            return next({ status: 400, message: 'Missing fields' }, null);
        }

        const { uid } = await admin.auth().createUser({
            displayName, email, password, disabled
        });

        await admin.auth().setCustomUserClaims(uid, { role });
        return next(null, { status: 201, message: 'created' });

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const mapUser = (user) => {

    const customClaims = (user.customClaims || { role: '' });
    const role = customClaims.role ? customClaims.role : ''
    return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        role,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
    };
}

const all = async (req, next) => {

    try {
        const listUsers = await admin.auth().listUsers();
        const users = listUsers.users.map(mapUser);

        next(null, { status: 200, data: users })

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const get = async (req, next) => {
    try {
        const { localid } = req.headers;
        const user = await admin.auth().getUser(localid);
        return next(null, { status: 200, data: mapUser(user) });

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const patch = async (req, next) => {
    try {
        const { localid } = req.headers;
        const { displayName, password, email, role } = req.body

        // if (!localid || !displayName || !password || !email || !role)
        if (!localid)
            return next({ status: 400, message: 'Missing fields' }, null);

        if (displayName || password || email)
            await admin.auth().updateUser(localid, { displayName, password, email });

        if (role)
            await admin.auth().setCustomUserClaims(localid, { role });
        
        const user = await admin.auth().getUser(localid);

        return next(null, { status: 200, data: mapUser(user) });

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const remove = async (req, next) => {
   try {
       const { localId } = req.body
       await admin.auth().deleteUser(localId)
       return next(null, { status: 200, message: 'ok'});
   } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
   }
}

module.exports = {
    create: create,
    all: all,
    get: get,
    patch: patch,
    remove: remove
}
