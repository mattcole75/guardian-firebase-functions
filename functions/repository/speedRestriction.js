const moment = require('moment');
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

const userCreateSpeedRestriction = async (req, next) => {
    await db.collection('speedRestrictions')
        .add({
            ...req.body,
            inuse: true,
            updated: moment().format(),
            created: moment().format()
        })
        .then(res => {
            return next(null, { status: 201, result: { id: res.id } });
        })
        .catch(err => {
            return next({ status: 500, message: `${ err.code } - ${ err.message }` }, null);
        });
}

const userGetSpeedRestrictions  = async (req, next) => {

    const { localid, params } = req.headers;
    const parameters = params.split(',');
    const type = parameters[0];
    const location =  parameters[1];
    const status =  parameters[2];

    let typeFilter = ['Temporary', 'Permanent'];
    if(type !== '')
        typeFilter = [type];

    let locationFilter = []
    if(location !== '')
        locationFilter = [location];

    let statusFilter = ['New', 'Reviewed'];
    if(status !== '')
        statusFilter = [status];
    
    let result = [];
    let speedRestrictions = db.collection('speedRestrictions').where('inuse', '==', true);

    if(type !== '' && location !== '' && status !== '') {
        speedRestrictions = db.collection('speedRestrictions')
            .where('type', 'in', typeFilter)
            .where('location', 'in', locationFilter)
            .where('status', 'in', statusFilter)
            .where('inuse', '==', true);
    } else if (type !== '' && location !== '' && status === '') {
        speedRestrictions = db.collection('speedRestrictions')
            .where('type', 'in', typeFilter)
            .where('location', 'in', locationFilter)
            .where('inuse', '==', true);
    } else if (type !== '' && location === '' && status === '') {
        speedRestrictions = db.collection('speedRestrictions')
            .where('type', 'in', typeFilter)
            .where('inuse', '==', true);
    } else if (type !== '' && location === '' && status !== '') {
        speedRestrictions = db.collection('speedRestrictions')
            .where('type', 'in', typeFilter)
            .where('status', 'in', statusFilter)
            .where('inuse', '==', true);
    } else if (type === '' && location !== '' && status !== '') {
        speedRestrictions = db.collection('speedRestrictions')
            .where('location', 'in', locationFilter)
            .where('status', 'in', statusFilter)
            .where('inuse', '==', true);
    } else if(type !== '' && location !== '' && status === '') {
        speedRestrictions = db.collection('speedRestrictions')
            .where('type', '==', typeFilter)
            .where('location', 'in', locationFilter)
            .where('inuse', '==', true);
    }

    // let accessRequests = db.collection('accessRequests').where('status', 'in', statusFilter).where('inuse', '==', true);

    // if(plannerfilter !== '')
    //     accessRequests = db.collection('accessRequests').where('status', 'in', statusFilter).where('administration.assignedPlanner', '==', plannerfilter).where('inuse', '==', true);

    await speedRestrictions
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
            console.log(err);
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });

}

const userGetSpeedRestriction = async (req, next) => {

    const { uid } = req.headers;

    await db.collection('speedRestrictions').doc(uid)
        .get()
        .then(doc => {
            return next(null, { status: 200, result: { [doc.id]: doc.data() }})
        })
        .catch(err => {
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

const userPatchSpeedRestriction = async (req, next) => {
    const { uid } = req.headers;
    await db.collection('speedRestrictions').doc(uid)
        .set({ ...req.body, updated: moment().format() }, { merge: true })
        .then(() => {
            return next(null, { status: 200, result: 'OK' });
        })
        .catch(err => {
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

module.exports = {
    userCreateSpeedRestriction: userCreateSpeedRestriction,
    userGetSpeedRestrictions: userGetSpeedRestrictions,
    userGetSpeedRestriction: userGetSpeedRestriction,
    userPatchSpeedRestriction: userPatchSpeedRestriction
}