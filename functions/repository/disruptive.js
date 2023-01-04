const moment = require('moment');
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

const plannerCreateDisruptive = async (req, next) => {

    await db.collection('disruptives')
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
            console.log(err);
            return next({ status: 500, message: `${err.code} - ${err.message}` } ,null);
        })
};

const plannerPatchDisruptive = async (req, next) => {
    const { param } = req.headers;
    await db.collection('disruptives').doc(param)
        .set({ ...req.body, updated: moment().format() }, { merge: true })
        .then(() => {
            return next(null, { status: 200, result: 'OK' });
        })
        .catch(err => {
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

const userGetDisruptives = async (req, next) => {

    const { uid } = req.headers;
    let result = [];

    const requests = db.collection('disruptives').where('accessRequestId', '==', uid);
    await requests
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

const disruptionAuthorityGetDisruptives = async (req, next) => {

    let result = [];

    // const disruptives = db.collection('disruptives').where('status', '==', 'Submitted');
    const disruptives = db.collection('disruptives');
    await disruptives
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


module.exports = {
    plannerCreateDisruptive: plannerCreateDisruptive,
    plannerPatchDisruptive: plannerPatchDisruptive,
    userGetDisruptives: userGetDisruptives,
    disruptionAuthorityGetDisruptives: disruptionAuthorityGetDisruptives
}