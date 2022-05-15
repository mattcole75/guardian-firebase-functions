// Description: Provides the entry point for the firebase functions
// Developer: Matt Cole
// Date created: 2022-05-03
// Change history:
//  1. 

const admin = require('firebase-admin');

const create = async (req, next) => {

    try {

        const ref = admin.database().ref('requests');

        const newPostRef = ref.push();;
        
        await newPostRef.set(req.body);

        return next(null, { status: 201, message: 'created' });

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const patch = async (req, next) => {

    try {

        const requestRef = ref.child('requests');

        const ref = requestRef.child(req.headers.id);

        await ref.update(req.body);

        return next(null, { status: 201, message: 'created' });

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const get = async (req, next) => {

    try {

        const ref = admin.database().ref('requests');

        let res;

        await ref.orderByChild('completed').equalTo(null).once('value', (snapshot) => {
            res = snapshot.val();
        });

        return next(null, { status: 200, data: res });

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

// const fetchPlaces = (regionId) => {
//     return database.ref(apiUris.places)
//      .orderByChild('regionId')
//      .equalTo(parseInt(regionId))
//      .once('value')
//      .then((snapshot) => {
//       return snapshot.val() || [];
//      })
//    }

module.exports = {
    create: create,
    patch: patch,
    get: get
}