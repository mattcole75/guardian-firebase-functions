// const admin = require('firebase-admin');
const moment = require('moment');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { ResultStorage } = require('firebase-functions/v1/testLab');
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

    const { startdate, enddate } = req.headers;
    let start = Date.parse(startdate);
    let end = Date.parse(enddate);

    let result = [];

    try {
        const requests = db.collection('requests');
        await requests
            .where('status', 'in', ['Submitted', 'Under Review', 'Granted', 'Denied'])
            .get()
            .then(res => {
                res.forEach((doc) => {
                    let locationLimitItems = doc.data().locationLimitItems;

                    // todo: order array by start date here

                    locationLimitItems.forEach((lli) => {
                        if(Date.parse(lli.locationLimitStartDate) >= start && Date.parse(lli.locationLimitStartDate) < end) {
                            if(result.some(ele => Object.keys(ele)[0] === doc.id)) {
                                // exists do nothing
                            } else {
                                result.push({ [doc.id]: doc.data() });
                            }        
                        }
                    });
                })
            })
            .then(() => {
                return next(null, { status: 200, result: result });
            });

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

module.exports = {
    userCreateRequest: userCreateRequest,
    userPatchRequest: userPatchRequest,
    userGetRequests: userGetRequests,
    coordinatorGetRequests: coordinatorGetRequests,
    plannerGetRequests: plannerGetRequests,
    publicGetRequests: publicGetRequests
}