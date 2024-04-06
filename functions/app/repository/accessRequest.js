// const admin = require('firebase-admin');
const moment = require('moment');
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();
const template = require('../../configuration/schema/accessRequestSchema');

const userCreateRequest = async (req, next) => {

    await db.collection('accessRequests')
        .add({
            ...template,
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

const userGetRequests  = async (req, next) => {

    const { startdate, enddate, localid } = req.headers;

    // declare the date filters
    let startDate = Date.parse(moment().add(-6, 'months').startOf('day'));
    let endDate = Date.parse(moment().add(10, 'years').endOf('day'));

    // check the date filters are set
    if(startdate !== 'null' && enddate !== 'null') {
        startDate = Date.parse(moment(startdate).startOf('day'));
        endDate = Date.parse(moment(enddate).endOf('day'));
    }
    
    let result = [];
    let accessRequests = db.collection('accessRequests').where('inuse', '==', true).where('status', '!=', 'Deleted');

    await accessRequests
        .get()
        .then(res => {
            res.forEach((doc) => {

                // apply date filter and build result array
                let locations = doc.data().locations;

                if(locations.length > 0) { // apply date filter if dates are set
                    locations.forEach((locationItem) => {
                        if((Date.parse(locationItem.startDate) >= startDate && Date.parse(locationItem.startDate) < endDate) || (Date.parse(locationItem.endDate) >= startDate && Date.parse(locationItem.endDate) < endDate)) {

                            if(result.some(ele => Object.keys(ele)[0] === doc.id)) {
                                // exists do nothing
                            } else {
                                result.push({ [doc.id]: doc.data() });
                            }
                        }
                    });
                } else {
                    result.push({ [doc.id]: doc.data() });
                }

                // only return users access requests
                result = result.filter(ar => {
                    return ar[Object.keys(ar)].requester.localId === localid; // return their own access requests
                })
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

const plannerGetRequests  = async (req, roles, next) => {

    const { localid, startdate, enddate, statusfilter, categoryfilter, picopfilter, picfilter, organisationfilter, linefilter, isolationfilter, safetyresourcefilter, testtramsfilter, signallingresourcefilter, electricalresourcefilter } = req.headers;

    // declare the date filters
    let startDate = Date.parse(moment().add(-6, 'months').startOf('day'));
    let endDate = Date.parse(moment().add(10, 'years').endOf('day'));

    // check the date filters are set
    if(startdate !== 'null' && enddate !== 'null') {
        startDate = Date.parse(moment(startdate).startOf('day'));
        endDate = Date.parse(moment(enddate).endOf('day'));
    }
    
    let result = [];

    // let accessRequests = db.collection('accessRequests').where('status', 'in', statusFilter).where('inuse', '==', true);
    let accessRequests = db.collection('accessRequests')
        .where('inuse', '==', true)
        .orderBy('planningInformation.possessionDetails', 'asc')
        .orderBy('siteDetails.accessFirstDay', 'asc');

    // if(plannerfilter !== '')
    //     accessRequests = db.collection('accessRequests').where('status', 'in', statusFilter).where('administration.assignedPlanner', '==', plannerfilter).where('inuse', '==', true);

    await accessRequests
        .get()
        .then(res => {
            res.forEach((doc) => {

                // apply date filter and build result array
                let locations = doc.data().locations;

                if(locations.length > 0) { // apply date filter if dates are set
                    locations.forEach((locationItem) => {
                        if((Date.parse(locationItem.startDate) >= startDate && Date.parse(locationItem.startDate) < endDate) || (Date.parse(locationItem.endDate) >= startDate && Date.parse(locationItem.endDate) < endDate)) {

                            if(result.some(ele => Object.keys(ele)[0] === doc.id)) {
                                // exists do nothing
                            } else {
                                result.push({ [doc.id]: doc.data() });
                            }
                        }
                    });
                } else {
                    result.push({ [doc.id]: doc.data() });
                }

                // filter array based on status
                if(statusfilter !== '') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].status === statusfilter
                    });
                }
                // filter array based on category
                if(categoryfilter !== '') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].planningInformation.possessionCategory === categoryfilter
                    });
                }
                // filter array based on picop
                if(picopfilter !== '') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].planningInformation.picop === picopfilter
                    });
                }
                // filter array based on pic
                if(picfilter !== '') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].planningInformation.pic === picfilter
                    });
                }
                // filter array based on organisation
                if(organisationfilter !== '') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].planningInformation.organisation === organisationfilter
                    });
                }
                // filter array based on line
                if(linefilter !== '') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].planningInformation.line === linefilter
                    });
                }
                // filter array based on isolation type
                if(isolationfilter !== '') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].planningInformation.isolationType === isolationfilter
                    });
                }
                // filter array based on safety resource required
                if(safetyresourcefilter === 'true') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].planningInformation.safetyResourceRequired === true
                    });
                }
                // filter array based on safety test trams required
                if(testtramsfilter === 'true') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].siteDetails.testTramsRequired === true
                    });
                }
                // filter array based on safety test signalling resource required
                if(signallingresourcefilter === 'true') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].siteDetails.signallingResourceRequired === true
                    });
                }
                // filter array based on safety test electrical resource required
                if(electricalresourcefilter === 'true') {
                    result = result.filter(ar => {
                        return ar[Object.keys(ar)].siteDetails.electricalResourceRequired === true
                    });
                }

                // filter array based on users role
                result = result.filter(ar => {
                    return ar[Object.keys(ar)].status !== 'Draft' || ar[Object.keys(ar)].requester.localId === localid; // planners get everything exept everyone elses drafts, but must get their own drafts
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

const plannerGetDailySummary  = async (req, next) => {

    const { day } = req.headers;

    // declare the date filters
    let startDate = Date.parse(moment(day).startOf('day'));
    let endDate = Date.parse(moment(day).endOf('day'));

    
    let result = [];
    let accessRequests = db.collection('accessRequests')
        .where('inuse', '==', true)
        .where('status', 'in', ['Submitted', 'Under Review', 'Granted', 'Complete', 'Cancelled'])
        .orderBy('planningInformation.picop');

    await accessRequests
        .get()
        .then(res => {
            res.forEach((doc) => {
    
                // apply date filter and build result array
                let locations = doc.data().locations;
                
                if(locations.length > 0) { // apply date filter if dates are set
                    locations.forEach((locationItem) => {
                        if((Date.parse(locationItem.startDate) >= startDate && Date.parse(locationItem.startDate) < endDate) || (Date.parse(locationItem.endDate) >= startDate && Date.parse(locationItem.endDate) < endDate)) {
                            
                            if(result.some(ele => Object.keys(ele)[0] === doc.id)) {
                                // exists do nothing
                            } else {
                                result.push({ [doc.id]: doc.data() });
                            }
                        }
                    });
                }
            });
            })
            .then(() => {
                return next(null, { status: 200, result: result });
            })
            .catch(err => {
                return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
            });
}


const publicGetRequests  = async (req, next) => {

    const { startdate, enddate } = req.headers;
    const startDate = Date.parse(moment(startdate).startOf('day'));
    const endDate = Date.parse(moment(enddate).endOf('day'));

    let result = [];

    // let accessRequests = db.collection('accessRequests').where('inuse', '==', true).where('status', 'in', ['Submitted', 'Under Review', 'Granted']);
    let accessRequests = db.collection('accessRequests')
        .where('inuse', '==', true)
        .where('status', 'in', ['Submitted', 'Under Review', 'Granted', 'Complete']);

    await accessRequests
    .get()
    .then(res => {
        res.forEach((doc) => {

            // apply date filter and build result array
            let locations = doc.data().locations;
            
            if(locations.length > 0) { // apply date filter if dates are set
                locations.forEach((locationItem) => {
                    if((Date.parse(locationItem.startDate) >= startDate && Date.parse(locationItem.startDate) < endDate) || (Date.parse(locationItem.endDate) >= startDate && Date.parse(locationItem.endDate) < endDate)) {
                        
                        if(result.some(ele => Object.keys(ele)[0] !== doc.id)) {
                            result.push({ [doc.id]: doc.data() });
                        } 
                    }
                });
            }
        });
        })
        .then(() => {
            return next(null, { status: 200, result: result });
        })
        .catch(err => {
            console.log(err);
            return next({ status: 500, message: `${err.code} - ${err.message}` }, null);
        });
}

module.exports = {
    userCreateRequest: userCreateRequest,
    userPatchRequest: userPatchRequest,
    userGetRequests: userGetRequests,
    userGetRequest: userGetRequest,
    plannerGetRequests: plannerGetRequests,
    plannerGetDailySummary: plannerGetDailySummary,
    publicGetRequests: publicGetRequests
}