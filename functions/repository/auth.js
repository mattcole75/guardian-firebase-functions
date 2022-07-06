const admin = require('firebase-admin');

const create = async (req, next) => {

    try {

        const { displayName, email, password, disabled, role, phoneNumber, organisation } = req;

        if (!displayName || !email || !password || !role || !phoneNumber || !organisation) {
            return next({ status: 400, message: 'Missing fields' }, null);
        }

        const { uid } = await admin.auth().createUser({
            displayName, email, phoneNumber, password, disabled
        });

        await admin.auth().setCustomUserClaims(uid, { role, organisation });
        return next(null, { status: 201, message: 'created' });

    } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
    }
}

const mapUser = (user) => {

    // console.log('MCa', user);
    const customClaims = (user.customClaims || { role: '', organisation: '' });
    const role = customClaims.role ? customClaims.role : '';
    const organisation = customClaims.organisation ? customClaims.organisation : '';

    return {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        role,
        organisation,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime,
        disabled: user.disabled
    };
}

const all = async (req, next) => {

    try {
        const listUsers = await admin.auth().listUsers();
        const users = listUsers.users.map(mapUser);

        next(null, { status: 200, data: users })

    } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
    }
}

const get = async (req, next) => {
    try {
        const { localid } = req.headers;
        const user = await admin.auth().getUser(localid);
        return next(null, { status: 200, data: mapUser(user) });

    } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
    }
}

const patch = async (req, next) => {

    try {
        const { localid } = req.headers;
        const { displayName, password, email, phoneNumber, organisation } = req.body

        if (!localid || !displayName || !password || !email || !phoneNumber || !organisation)
            return next({ status: 400, message: 'Missing fields' }, null);

        // get the user user details in order to preserve the role allocation.
        // if you don't preserve the role the custom claims will be overwritten and lost

        let user = await admin.auth().getUser(localid);
        const role = user.customClaims.role;

        await admin.auth().updateUser(localid, { displayName, email, phoneNumber, password });
        await admin.auth().setCustomUserClaims(localid, { organisation, role });
        
        user = await admin.auth().getUser(localid);

        return next(null, { status: 200, data: mapUser(user) });

    } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
    }
}

const adminPatch = async (req, next) => {

    try {
        // const { localid } = req.headers;
        const { displayName, localId, password, email, role, phoneNumber, organisation } = req.body

        if (!localId || !displayName || !password || !email || !role || !phoneNumber || !organisation)
            return next({ status: 400, message: 'Missing fields' }, null);

        await admin.auth().updateUser(localId, { displayName, email, phoneNumber, password });
        await admin.auth().setCustomUserClaims(localId, { organisation, role });
        
        const user = await admin.auth().getUser(localId);

        return next(null, { status: 200, data: mapUser(user) });

    } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
    }
}

const remove = async (req, next) => {
   try {
       const { localId } = req.body
       await admin.auth().deleteUser(localId)
       return next(null, { status: 200, message: 'ok' });
   } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
   }
}

module.exports = {
    create: create,
    all: all,
    get: get,
    patch: patch,
    adminPatch: adminPatch,
    remove: remove
}
