const admin = require('firebase-admin');

// post new user to the repository
const create = async (req, next) => {

    try {

        const { displayName, email, password, disabled, roles, phoneNumber, organisation } = req;

        if (!displayName || !email || !password || !roles || !phoneNumber || !organisation) {
            return next({ status: 400, message: 'Missing fields' }, null);
        }

        // create new users
        const { uid } = await admin.auth().createUser({
            displayName, email, phoneNumber, password, disabled
        });

        // set their customer claims
        await admin.auth().setCustomUserClaims(uid, { roles, organisation });
        return next(null, { status: 201, message: 'created' });

    } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
    }
}

// map user details for specified output function
const mapUser = (user) => {

    const customClaims = (user.customClaims || { roles: '', organisation: '' });
    const roles = customClaims.roles ? customClaims.roles : '';
    const organisation = customClaims.organisation ? customClaims.organisation : '';

    // there is more user data here, this function only returns the specified details below
    return {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        organisation,
        roles,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime,
        disabled: user.disabled
    };
}

// query repository and return all users
const all = async (req, next) => {

    try {
        const listUsers = await admin.auth().listUsers();
        const users = listUsers.users.map(mapUser);

        next(null, { status: 200, data: users })

    } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
    }
}

// query repository and return a specified user
const get = async (req, next) => {
    try {
        const { localid } = req.headers;
        const user = await admin.auth().getUser(localid);
        return next(null, { status: 200, data: mapUser(user) });

    } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
    }
}

// update the repository for a specified user
const patch = async (req, next) => {
    try {
        let { localid } = req.headers;
        let displayName = req.body.displayName;
        let email = req.body.email;
        let phoneNumber = req.body.phoneNumber;
        let organisation = req.body.organisation;

        if (!localid && (!displayName || !email || !phoneNumber || !organisation))
            return next({ status: 400, message: 'Missing fields' }, null);

        // get the user user details in order to preserve the role allocation.
        // if you don't preserve the role the custom claims will be overwritten and lost

        let user = await admin.auth().getUser(localid);

        // roles can only be set by an administrator so copy before update
        const roles = user.customClaims.roles;

        // copy values if that are not changing
        if(!displayName)
            displayName = user.displayName;
        if(!email)
            email = user.email;
        if(!phoneNumber)
            phoneNumber = user.phoneNumber;
        if(!organisation)
            organisation = user.customClaims.organisation;

        // first update the users standard details
        await admin.auth().updateUser(localid, { displayName, email, phoneNumber });
        // second update the custom claims details
        await admin.auth().setCustomUserClaims(localid, { organisation, roles });
        // get the updated user record
        user = await admin.auth().getUser(localid);

        return next(null, { status: 200, data: mapUser(user) });

    } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
    }
}

// update the repository for a specified user including roles
const adminPatch = async (req, next) => {

    try {
        const { localId, roles, disabled } = req.body;

        let displayName;
        let email;
        let phoneNumber;
        let organisation;

        if (!localId && !roles && !disabled)
            return next({ status: 400, message: 'Missing fields' }, null);
        
        let user = await admin.auth().getUser(localId);

        // copy user values for no data loss
        displayName = user.displayName;
        email = user.email;
        phoneNumber = user.phoneNumber;
        organisation = user.customClaims.organisation;

        // first update the users standard details
        await admin.auth().updateUser(localId, { displayName, email, phoneNumber, disabled });
        // second update the custom claims details
        await admin.auth().setCustomUserClaims(localId, { organisation, roles });
        // get the updated user record
        user = await admin.auth().getUser(localId);

        return next(null, { status: 200, data: mapUser(user) });

    } catch (err) {
        return next({ status: 500, message: `${ err.code } } - ${ err.message }` }, null);
    }
}

// delete user from the repository
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
