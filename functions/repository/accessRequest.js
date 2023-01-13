// const admin = require('firebase-admin');
const moment = require('moment');
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

const userCreateRequest = async (req, next) => {

    await db.collection('accessRequests')
        .add({
            ...req.body,
            status: 'Draft',
            inuse: true,
            updated: moment().format(),
            created: moment().format()
        })
        .then(res => {
            return next(null, { status: 201, result: { id: res.id } });
        })
        .catch(err => {
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

const userPatchRequest = async (req, next) => {
    const { param } = req.headers;
    await db.collection('accessRequests').doc(param)
        .set({ ...req.body, updated: moment().format() }, { merge: true })
        .then(() => {
            return next(null, { status: 200, result: 'OK' });
        })
        .catch(err => {
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

const userGetRequests = async (req, next) => {

    const { localid } = req.headers;
    let result = [];

    const requests = db.collection('accessRequests');
    await requests
    .where('requestor.localId', '==', localid)
    .where('inuse', '==', true)
    .get()
        .then(res => {
            res.forEach((doc) => {
                result.push({ [doc.id]: doc.data() });
            })
        })
        .then(() => {
            return next(null, { status: 200, result: result });
        })
        .catch(err => {
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

const userGetRequest = async (req, next) => {

    const { uid } = req.headers;

    await db.collection('accessRequests').doc(uid)
        .get()
        .then(doc => {
            return next(null, { status: 200, result: { [doc.id]: doc.data() }})
        })
        .catch(err => {
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

const coordinatorGetRequests  = async (req, next) => {

    let result = [];
    const accessRequests = db.collection('accessRequests');

    await accessRequests
        .where('status', '==', 'Submitted')
        .where('inuse', '==', true)
        .get()
        .then(res => {
            res.forEach((doc) => {
                result.push({ [doc.id]: doc.data() });
            })
        })
        .then(() => {
            return next(null, { status: 200, result: result });
        })
        .catch(err => {
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

const plannerGetRequests  = async (req, next) => {

    const { startdate, enddate, statusfilter, plannerfilter } = req.headers;

    // declare the date filters
    let startDate = Date.parse(moment().add(-7, 'days').startOf('day'));
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
    let accessRequests = db.collection('accessRequests').where('status', 'in', statusFilter).where('inuse', '==', true);

    if(plannerfilter !== '')
        accessRequests = db.collection('accessRequests').where('status', 'in', statusFilter).where('administration.assignedPlanner', '==', plannerfilter).where('inuse', '==', true);

    await accessRequests
        .get()
        .then(res => {
            res.forEach((doc) => {

                let locationLimitItems = doc.data().locationLimitItems;

                locationLimitItems.forEach((lli) => {
                    if(Date.parse(lli.locationLimitStartDate) >= startDate && Date.parse(lli.locationLimitStartDate) < endDate) {
                        if(result.some(ele => Object.keys(ele)[0] === doc.id)) {
                            // exists do nothing
                            console.log('should not be here');
                        } else {
                            result.push({ [doc.id]: doc.data() });
                        }        
                    }
                });
            })
        })
        .then(() => {
            return next(null, { status: 200, result: result });
        })
        .catch(err => {
            console.log(err);
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

const disruptionAuthorityGetRequests  = async (req, next) => {

    let result = [];
    const accessRequests = db.collection('accessRequests');

    await accessRequests
        .where('disruptiveStatus', '==', 'Submitted')
        .where('status', 'in', ['Submitted', 'Under Review'])
        .where('inuse', '==', true)
        .get()
        .then(res => {
            res.forEach((doc) => {
                result.push({ [doc.id]: doc.data() });
            })
        })
        .then(() => {
            return next(null, { status: 200, result: result });
        })
        .catch(err => {
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

const plannerGetClosedRequests = async (req, next) => {

    let result = [];

    const requests = db.collection('accessRequests');
    await requests
    .where('summary.accessLastDay', '<', moment().format('YYYY-MM-DD'))
    .where('inuse', '==', true)
    .where('status', '==', 'Granted')
    .get()
        .then(res => {
            res.forEach((doc) => {
                result.push({ [doc.id]: doc.data() });
            })
        })
        .then(() => {
            return next(null, { status: 200, result: result });
        })
        .catch(err => {
            console.log('date query error', err);
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

const publicGetRequests  = async (req, next) => {

    const { startdate, enddate } = req.headers;
    const start = Date.parse(startdate);
    const end = Date.parse(enddate);

    let result = [];

    const accessRequests = db.collection('accessRequests');
    await accessRequests
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
            });
        })
        .then(() => {
            return next(null, { status: 200, result: result });
        })
        .catch(err => {
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

module.exports = {
    userCreateRequest: userCreateRequest,
    userPatchRequest: userPatchRequest,
    userGetRequests: userGetRequests,
    userGetRequest: userGetRequest,
    coordinatorGetRequests: coordinatorGetRequests,
    plannerGetRequests: plannerGetRequests,
    disruptionAuthorityGetRequests: disruptionAuthorityGetRequests,
    plannerGetClosedRequests: plannerGetClosedRequests,
    publicGetRequests: publicGetRequests
}