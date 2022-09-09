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

    const { startdate, enddate, statusfilter, plannerfilter } = req.headers;

    console.log('status', statusfilter);

    // declare the date filters
    let startDate = Date.parse(moment().startOf('day'));
    let endDate = Date.parse(moment().add(10, 'years').startOf('day'));
    let statusFilter = ['Submitted', 'Under Review', 'Granted', 'Denied'];

    // check the date filters are set
    if(startdate !== 'null' && enddate !== 'null') {
        startDate = Date.parse(startdate);
        endDate = Date.parse(enddate);
    }

    if(statusfilter !== '') {
        statusFilter = [statusfilter];
    }
    
    let result = [];

    try {
        let requests = db.collection('requests').where('status', 'in', statusFilter);

        if(plannerfilter !== '')
            requests = db.collection('requests').where('status', 'in', statusFilter).where('assignedPlanner', '==', plannerfilter);

        await requests
            .get()
            .then(res => {
                res.forEach((doc) => {

                    let locationLimitItems = doc.data().locationLimitItems;

                    locationLimitItems.forEach((lli) => {
                        if(Date.parse(lli.locationLimitStartDate) >= startDate && Date.parse(lli.locationLimitStartDate) < endDate) {
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
            });;

    } catch (err) {
        return next({ status: 500, message: `${err.code}} - ${err.message}` }, null);
    }
}

const publicGetRequests  = async (req, next) => {

    const { startdate, enddate } = req.headers;
    const start = Date.parse(startdate);
    const end = Date.parse(enddate);

    let result = [];

    try {
        const requests = db.collection('requests');
        await requests
            .where('status', 'in', ['Submitted', 'Under Review', 'Granted', 'Denied'])
            .get()
            .then(res => {
                res.forEach((doc) => {
                    let locationLimitItems = doc.data().locationLimitItems;

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