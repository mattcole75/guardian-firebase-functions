// Description: Provides the entry point for the firebase functions
// Developer: Matt Cole
// Date created: 2022-05-03
// Change history:
//  1. 

const admin = require('firebase-admin');

const create = async (req, next) => {

    try {

        // const { displayName, email, password, disabled, role } = req;

        // if (!displayName || !email || !password || !role) {
        //     return next({ status: 400, message: 'Missing fields' }, null);
        // }

        const ref = admin.database().ref('records');

        const newPostRef = ref.push();;
        
        await newPostRef.set({
            author: 'gracehop',
            title: 'Announcing COBOL, a New Programming Language'
        });

        return next(null, { status: 201, message: 'created' });

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

module.exports = {
    create: create
}