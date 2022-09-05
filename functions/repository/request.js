// const admin = require('firebase-admin');
const moment = require('moment');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const db = getFirestore();

const userCreateRequest = async (req, next) => {

    try {
        await db.collection('requests')
            .add({ ...req.body, localId: req.headers.localid, status: 'Draft', edited: moment().format(), created: moment().format() })
            .then(res => { 
                return next(null, { status: 201, result: { id: res.id } });
            });
    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const userPatchRequest = async (req, next) => {

    const { param } = req.headers;

    try {
        await db.collection('requests').doc(param)
            .set({ ...req.body, edited: moment().format() }, { merge: true })
            .then(res => {
                return next(null, { status: 200, result: 'OK' });
            });
        
    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const userGetRequests = async (req, next) => {

    const { localid } = req.headers;
    let result = [];

    try {
        const requests = db.collection('requests');
        await requests.where('localId', '==', localid).get()
            .then(res => {
                res.forEach((doc) => {
                    result.push({ [doc.id]: doc.data() });
                })
            })
            .then(() => {
                return next(null, { status: 200, result: result });
            });;

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const coordinatorGetRequests  = async (req, next) => {

    const { localid } = req.headers;
    let result = [];

    try {
        const requests = db.collection('requests');
        await requests.where('status', '==', 'Submitted').get()
            .then(res => {
                res.forEach((doc) => {
                    result.push({ [doc.id]: doc.data() });
                })
            })
            .then(() => {
                return next(null, { status: 200, result: result });
            });;

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const plannerGetRequests  = async (req, next) => {

    const { localid } = req.headers;
    let result = [];

    try {
        const requests = db.collection('requests');
        await requests
            .where('status', 'in', ['Submitted', 'Under Review'])
            .get()
            .then(res => {
                res.forEach((doc) => {
                    result.push({ [doc.id]: doc.data() });
                })
            })
            .then(() => {
                return next(null, { status: 200, result: result });
            });;

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const publicGetRequests  = async (req, next) => {

    const { localid } = req.headers;
    let result = [];

    try {
        const requests = db.collection('requests');
        await requests
            .where('status', 'in', ['Submitted', 'Under Review', 'Granted', 'Denied'])
            .get()
            .then(res => {
                res.forEach((doc) => {
                    result.push({ [doc.id]: doc.data() });
                })
            })
            .then(() => {
                return next(null, { status: 200, result: result });
            });;

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
    userCreateRequest: userCreateRequest,
    userPatchRequest: userPatchRequest,
    userGetRequests: userGetRequests,
    coordinatorGetRequests: coordinatorGetRequests,
    plannerGetRequests: plannerGetRequests,
    publicGetRequests: publicGetRequests
}