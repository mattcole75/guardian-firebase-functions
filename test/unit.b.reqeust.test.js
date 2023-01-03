const { endPoint, login } = require('./endPoint/endPoint');
const moment = require('moment');

let users = require('./data/user.data');
let requestId;
let disruptiveId;

describe('Create and approve access request without disruptive', () => {

    // login the users
    users.forEach(user => {

        it('should login, and return the user details and token given correct login credentials for: ' + user.displayName, async () => {
            await login.post('')
                .send({
                    email: user.email,
                    password: user.password,
                    returnSecureToken: true
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    expect(res.body).toBeDefined();
                    expect(res.body.displayName).toBe(user.displayName);
                    expect(res.body.email).toBe(user.email);
                    user.localId = res.body.localId;
                    user.idToken = res.body.idToken;
                })
        });
    });

    it('should register a new access request: summary information', async () => {
        await endPoint.post('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId
            })
            .send({
                requestor: {
                    requestorName: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                    requestorPhoneNumber: users.find(usr => usr.displayName === 'Rand Althor').phoneNumber,
                    requestorEmail: users.find(usr => usr.displayName === 'Rand Althor').email,
                    requestorOrganisation: users.find(usr => usr.displayName === 'Rand Althor').organisation,
                    localId: users.find(usr => usr.displayName === 'Rand Althor').localId
                },
                summary: {
                    accessRequestTitle: 'Newton Heath & Moston Temp Sensor Installation',
                    accessRequestDescription: 'The installation of the UPS Battery Temperature Sensor',
                    accessRequestCompetentPerson: 'Dewy Decimal',
                    accessRequestCompetentPersonPhoneNumber: '07890123456',
                    isDisruptive: false,
                    associatedWithProject: true,
                    projectTitle: 'Remote Condition Monitoring',
                    projectOrganisation: 'KAM',
                    projectRAMs: 'Approved by KAM'
                },
                eventLog: [{
                    user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                    logged: moment().format(),
                    event: 'Access Request Created'
                }]
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then(res => {
                accessRequestId = res.body.result.id;
            })
    });

    it('should add hazard data to the new access request', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId,
                param: accessRequestId
            })
            .send({
                    hazards: {
                        hazardList: [
                            'withinHazardZone',
                            'hotWorks',
                            'withinSER'
                        ]
                    }
                })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should add additional hazard information', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId,
                param: accessRequestId
            })
            .send({
                    hazards: {
                        additionalHazards: true,
                        additionalHazardsDescription: 'New super tool to be deployed'
                    }
                })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, add a comment to the request', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId,
                param: accessRequestId
            })
            .send(
                {
                    comments: [{
                        commentator: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                        logged: moment().format(),
                        comment: 'Submitting this access request I don\'t believe it is a disruptive' 
                    }]
                })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, add a location limit to the access request', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId,
                param: accessRequestId
            })
            .send({
                    locationLimitItems: [{
                        locationSelect: 'Newton Heath and Moston',
                        locationLimitAccessType: 'Possession',
                        locationLimitStartDate: moment().add(3, 'days').format('YYYY-MM-DD'),
                        locationLimitStartTime: '01:00',
                        locationLimitEndDate: moment().add(6, 'days').format('YYYY-MM-DD'),
                        locationLimitEndTime: '04:00',
                        colocate: 'Worksite can be co-located',
                        electricalIsolationRequired: false,
                        signallingResourceRequired: false,
                        testTramsRequired: false,
                        nearestHospital: 'Royal Oldham Hospital, Rochdale Road, Oldham, OL1 2JH',
                        locations: ['Newton Heath and Moston'],
                        locationLimitStatus: 'Pending'
                    }],
                    eventLog: [
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Created'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Not compliant to 6 week notice requirement'
                        }
                    ]
                })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, change the status of the access request when submitted', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId,
                param: accessRequestId
            })
            .send({
                    status: 'Submitted',
                    eventLog: [
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Created'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Not compliant to 6 week notice requirement'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Submitted'
                        }
                    ]
            })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, return a list with one or more items for the user who created it', async () => {
        await endPoint.get('/accessrequests')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId
            })
            .expect('Content-Type', /json/)
            .then(res => {
                expect(Object.keys(res.body.result).length).toBeGreaterThan(0);
            })
    });

    it('should, return a list with zero items for the user who has no requests', async () => {
        await endPoint.get('/accessrequests')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Chade Fallstar').idToken,
                localId: users.find(usr => usr.displayName === 'Chade Fallstar').localId
            })
            .expect('Content-Type', /json/)
            .then(res => {
                expect(Object.keys(res.body.result).length).toEqual(0);
            })
    });

    it('should, return 403 forbidden for a user making a coordinator request ', async () => {
        await endPoint.get('/coordinatoraccessrequests')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId
            })
            .expect('Content-Type', /json/)
            .expect(403)
    });

    it('should, return 403 forbidden for a user making a planner request ', async () => {
        await endPoint.get('/planneraccessrequests')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId
            })
            .expect('Content-Type', /json/)
            .expect(403)
    });

    it('should, return a list with one or more items items for a coordinator', async () => {
        await endPoint.get('/coordinatoraccessrequests')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Tony Ezekiel').idToken,
                localId: users.find(usr => usr.displayName === 'Tony Ezekiel').localId
            })
            .expect('Content-Type', /json/)
            .then(res => {
                expect(Object.keys(res.body.result).length).toBeGreaterThan(0);
            })
    });

    it('should, return a list with one or more items items for a planner', async () => {
        await endPoint.get('/planneraccessrequests')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
                startDate: null,
                endDate: null,
                statusfilter: '',
                plannerfilter: '',
            })
            .expect('Content-Type', /json/)
            .then(res => {
                expect(Object.keys(res.body.result).length).toBeGreaterThan(0);
            })
    });

    it('should, return a public list with one or more items items for anonymous user', async () => {
        await endPoint.get('/publicview')
            .set('Accept', 'application/json')
            .set({
                startDate: moment().add(3, 'days').format('YYYY-MM-DD'),
                endDate: moment().add(6, 'days').format('YYYY-MM-DD')
            })
            .expect('Content-Type', /json/)
            .then(res => {
                expect(Object.keys(res.body.result).length).toBeGreaterThan(0);
            })
    });

    it('should, allow a coordinator to asign a planner to the request', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Tony Ezekiel').idToken,
                localId: users.find(usr => usr.displayName === 'Tony Ezekiel').localId,
                param: accessRequestId
            })
            .send({
                administration: {
                    assignedPlanner: users.find(usr => usr.displayName === 'Fitz Farseer').displayName
                },
                status: 'Under Review',
                eventLog: [
                    {
                        user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                        logged: moment().format(),
                        event: 'Access Request Created'
                    },
                    {
                        user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                        logged: moment().format(),
                        event: 'Not compliant to 6 week notice requirement'
                    },
                    {
                        user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                        logged: moment().format(),
                        event: 'Access Request Submitted'
                    },
                    {
                        user: users.find(usr => usr.displayName === 'Tony Ezekiel').displayName,
                        logged: moment().format(),
                        event: 'Planner (' + users.find(usr => usr.displayName === 'Fitz Farseer').displayName + ') assigned to Access Request'
                    }
                ]
            })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, return all enabled users with the planner role for a Planner', async () => {
        await endPoint.get('/planners')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.planners.length).toBeGreaterThan(0);
            })
    });

    it('should, allow a coordinator to make a planner comment', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Tony Ezekiel').idToken,
                localId: users.find(usr => usr.displayName === 'Tony Ezekiel').localId,
                param: accessRequestId
            })
            .send(
                {
                    administration: { 
                        comments: [{
                            commentator: users.find(usr => usr.displayName === 'Tony Ezekiel').displayName,
                            logged: moment().format(),
                            comment: 'Assigned to Fitz' 
                        }]
                    }
                })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, allow a planner to confirm a location that has been requested', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId,
                param: accessRequestId
            })
            .send({
                    locationLimitItems: [{
                        locationSelect: 'Newton Heath and Moston',
                        locationLimitAccessType: 'Possession',
                        locationLimitStartDate: moment().add(3, 'days').format('YYYY-MM-DD'),
                        locationLimitStartTime: '01:00',
                        locationLimitEndDate: moment().add(6, 'days').format('YYYY-MM-DD'),
                        locationLimitEndTime: '04:00',
                        colocate: 'Worksite can be co-located',
                        electricalIsolationRequired: false,
                        signallingResourceRequired: false,
                        testTramsRequired: false,
                        nearestHospital: 'Royal Oldham Hospital, Rochdale Road, Oldham, OL1 2JH',
                        locations: ['Newton Heath and Moston'],
                        locationLimitStatus: 'Confirmed'
                    }],
                    eventLog: [
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Created'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Not compliant to 6 week notice requirement'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Submitted'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Tony Ezekiel').displayName,
                            logged: moment().format(),
                            event: 'Planner (' + users.find(usr => usr.displayName === 'Fitz Farseer').displayName + ') assigned to Access Request'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Location Limits for (Newton Heath and Moston) is confirmed'
                        }
                    ]
                })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, grant access for the access request', async () => {
        await endPoint.patch('/accessrequest')
        .set('Accept', 'application/json')
        .set({
            idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
            localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
            param: accessRequestId
        })
        .send({
            status: 'Granted',
            updated: moment().format(),
                    eventLog: [
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Created'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Not compliant to 6 week notice requirement'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Submitted'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Tony Ezekiel').displayName,
                            logged: moment().format(),
                            event: 'Planner (' + users.find(usr => usr.displayName === 'Fitz Farseer').displayName + ') assigned to Access Request'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Location Limits for (Newton Heath and Moston) is confirmed'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Access Request Granted'
                        }
                    ]
        })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should, return the newly created access request', async () => {
        await endPoint.get('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
                uid: accessRequestId
            })
            .expect('Content-Type', /json/)
            .then(res => {
                const key = Object.keys(res.body.result)[0]
                const accessRequest = res.body.result[key];

                //administration
                expect(accessRequest.administration.assignedPlanner).toBe('Fitz Farseer');
                expect(accessRequest.administration.comments).toHaveLength(1);
                //requestor
                expect(accessRequest.requestor.requestorName).toBe('Rand Althor');
                expect(accessRequest.requestor.requestorEmail).toBe('rand.althor@btt.com');
                expect(accessRequest.requestor.requestorPhoneNumber).toBe('+441514960453');
                expect(accessRequest.requestor.requestorOrganisation).toBe('Bing Town Traders');
                //summary section
                expect(accessRequest.summary.accessRequestTitle).toBe('Newton Heath & Moston Temp Sensor Installation');
                expect(accessRequest.summary.projectOrganisation).toBe('KAM');
                expect(accessRequest.summary.accessRequestDescription).toBe('The installation of the UPS Battery Temperature Sensor');
                expect(accessRequest.summary.accessRequestCompetentPerson).toBe('Dewy Decimal');
                expect(accessRequest.summary.accessRequestCompetentPersonPhoneNumber).toBe('07890123456');
                expect(accessRequest.summary.projectRAMs).toBe('Approved by KAM');
                expect(accessRequest.summary.isDisruptive).toEqual(false);
                expect(accessRequest.summary.associatedWithProject).toEqual(true);
                expect(accessRequest.summary.projectTitle).toBe('Remote Condition Monitoring');
                //location limit section
                expect(accessRequest.locationLimitItems).toHaveLength(1);
                expect(accessRequest.locationLimitItems[0].locationSelect).toBe('Newton Heath and Moston');
                expect(accessRequest.locationLimitItems[0].locations).toHaveLength(1);
                expect(accessRequest.locationLimitItems[0].locations).toEqual(expect.arrayContaining(['Newton Heath and Moston']));
                expect(moment(accessRequest.locationLimitItems[0].locationLimitStartDate).isValid()).toEqual(true);
                expect(accessRequest.locationLimitItems[0].locationLimitStartTime).toBe('01:00');
                expect(moment(accessRequest.locationLimitItems[0].locationLimitEndDate).isValid()).toEqual(true);
                expect(accessRequest.locationLimitItems[0].locationLimitEndTime).toBe('04:00');
                expect(accessRequest.locationLimitItems[0].colocate).toBe('Worksite can be co-located');
                expect(accessRequest.locationLimitItems[0].nearestHospital).toBe('Royal Oldham Hospital, Rochdale Road, Oldham, OL1 2JH');
                expect(accessRequest.locationLimitItems[0].locationLimitAccessType).toBe('Possession');
                expect(accessRequest.locationLimitItems[0].electricalIsolationRequired).toEqual(false);
                expect(accessRequest.locationLimitItems[0].signallingResourceRequired).toEqual(false);
                expect(accessRequest.locationLimitItems[0].testTramsRequired).toEqual(false);
                expect(accessRequest.locationLimitItems[0].locationLimitStatus).toBe('Confirmed');
                // event log
                expect(accessRequest.eventLog).toHaveLength(6);
                // hazards
                expect(accessRequest.hazards.additionalHazards).toEqual(true);
                expect(accessRequest.hazards.additionalHazardsDescription).toBe('New super tool to be deployed');
                expect(accessRequest.hazards.hazardList).toEqual(expect.arrayContaining(['withinHazardZone', 'hotWorks', 'withinSER']));
                // comments
                expect(accessRequest.comments).toHaveLength(1);
                // general
                expect(moment(accessRequest.updated).isValid()).toEqual(true);
                expect(moment(accessRequest.created).isValid()).toEqual(true);
                expect(accessRequest.inuse).toEqual(true);
                expect(accessRequest.status).toBe('Granted');
            });
    });

    // the disruptive process
    it('should, add a comment to the request stating it need to be a disruptive', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
                param: accessRequestId
            })
            .send(
                {
                    comments: [
                        {
                            commentator: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            comment: 'Submitting this access request I don\'t believe it is a disruptive' 
                        },
                        {
                            commentator: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            comment: 'Declining access at this will be a disruptive access request' 
                        }
                    ]
                })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, decline access for the access request', async () => {
        await endPoint.patch('/accessrequest')
        .set('Accept', 'application/json')
        .set({
            idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
            localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
            param: accessRequestId
        })
        .send({
            status: 'Declined',
            updated: moment().format(),
                    eventLog: [
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Created'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Not compliant to 6 week notice requirement'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Submitted'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Tony Ezekiel').displayName,
                            logged: moment().format(),
                            event: 'Planner (' + users.find(usr => usr.displayName === 'Fitz Farseer').displayName + ') assigned to Access Request'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Location Limits for (Newton Heath and Moston) is confirmed'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Access Request Granted'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Access Request Declined'
                        }
                    ]
        })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should update the summary information setting the request to disruptive', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId,
                param: accessRequestId
            })
            .send({
                summary: {
                    accessRequestTitle: 'Newton Heath & Moston Temp Sensor Installation',
                    accessRequestDescription: 'The installation of the UPS Battery Temperature Sensor',
                    accessRequestCompetentPerson: 'Dewy Decimal',
                    accessRequestCompetentPersonPhoneNumber: '07890123456',
                    isDisruptive: true,
                    associatedWithProject: true,
                    projectTitle: 'Remote Condition Monitoring',
                    projectOrganisation: 'KAM',
                    projectRAMs: 'Approved by KAM'
                }
            })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, add a comment to the request stating that the user has changed the request to a disruptive', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId,
                param: accessRequestId
            })
            .send(
                {
                    comments: [
                        {
                            commentator: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            comment: 'Submitting this access request I don\'t believe it is a disruptive' 
                        },
                        {
                            commentator: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            comment: 'Declining access at this will be a disruptive access request' 
                        },
                        {
                            commentator: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            comment: 'Updated to a disruptive... resubmitting' 
                        }
                    ]
                })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, resubmit the access', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId,
                param: accessRequestId
            })
            .send({
                    status: 'Submitted',
                    eventLog: [
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Created'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Not compliant to 6 week notice requirement'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Submitted'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Tony Ezekiel').displayName,
                            logged: moment().format(),
                            event: 'Planner (' + users.find(usr => usr.displayName === 'Fitz Farseer').displayName + ') assigned to Access Request'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Location Limits for (Newton Heath and Moston) is confirmed'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Access Request Granted'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Access Request Declined'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Submitted'
                        },
                    ]
            })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, fail to create a new disruptive document for a non-planner', async () => {
        await endPoint.post('/disruptive')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId
            })
            .send({
                accessRequestId: accessRequestId,
                disruptiveImpact: {
                    tramPatternDisrupt: false
                }
            })
            .expect('Content-Type', /json/)
            .expect(403)
    });

    it('should, create a new disruptive document in the disruption collection', async () => {
        await endPoint.post('/disruptive')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId
            })
            .send({
                accessRequestId: accessRequestId,
                createdBy: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                status: 'Draft',
                summary: {
                    disruptiveTitle: 'ORL Closure',
                    disruptiveStartDate: moment().add(3, 'days').format('YYYY-MM-DD'),
                    disruptiveEndDate: moment().add(6, 'days').format('YYYY-MM-DD')
                }
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then(res => {
                disruptiveId = res.body.result.id;
            })
    });

    it('should, update the disruptive with tram service impact items', async () => {
        await endPoint.patch('/disruptive')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
                param: disruptiveId
            })
            .send({
                tramImpactItems: [
                    {
                        timetableDisrupted: false,
                        routeDisrupted: 'Bury / Altrincham',
                        busReplacement: false,
                        peakServiceDisrupted: true,
                        frequency: 12
                    },
                    {
                        timetableDisrupted: true,
                        routeDisrupted: 'Bury / Piccadilly',
                        busReplacement: true,
                        peakServiceDisrupted: false,
                        frequency: 6
                    }
                ]
            })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should, update the disruptive with operational impact items', async () => {
        await endPoint.patch('/disruptive')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
                param: disruptiveId
            })
            .send({
                operationImpactItems: [
                    {
                        stopDisrupted: 'Bury',
                        numberOfStaff: '2',
                        wellfareRequired: false,
                        securityRequired: true
                    },
                    {
                        stopDisrupted: 'Piccadilly',
                        numberOfStaff: '2',
                        wellfareRequired: true,
                        securityRequired: false
                    }
                ]
            })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should, update the disruptive with additional communication items', async () => {
        await endPoint.patch('/disruptive')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
                param: disruptiveId
            })
            .send({
                additionalCommunication: {
                    additionalSignage: true,
                    additionalCustomerComms: false,
                    additionalDriverComms: true,
                    additionalCSRComms: false,
                    additionalEngineeringComms: true
                }
            })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should, update the disruptive with additional communication items', async () => {
        await endPoint.patch('/disruptive')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
                param: disruptiveId
            })
            .send({
                systemDisruption: {
                    signallingDisruption: true,
                    telecomsDisruption: false,
                    tvmDisruption: true,
                    cctvDisruption: false,
                    paDisruption: true,
                    pidsDisruption: false,
                    lightingDisruption: true,
                    utcDisruption: false
                }
            })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should, update the disruptive with additional considerations', async () => {
        await endPoint.patch('/disruptive')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
                param: disruptiveId
            })
            .send({
                operationalConsiderations: {
                    specialEventType: 'Sporting',
                    specialEvent: 'Some sporting event',
                    depotAccessEgressDetails: 'No access or egress issues',
                    railReplacementDetails: 'There are rail replacement considerations',
                    speedRestrictionDetails: 'There are no additional speed restrictions',
                    additionalConsiderations: 'There are no additional considerations'
                }
            })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should, submit the disruptive for approval', async () => {
        await endPoint.patch('/disruptive')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
                param: disruptiveId
            })
            .send({
                status: 'Submitted'
            })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should, return the newly created disruptive', async () => {
        await endPoint.get('/disruptives')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Fitz Farseer').idToken,
                localId: users.find(usr => usr.displayName === 'Fitz Farseer').localId,
                uid: accessRequestId // this is correct... don't want the disruptive id
            })
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should, add the distruptive submit event', async () => {
        await endPoint.patch('/accessrequest')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId,
                param: accessRequestId
            })
            .send({
                    eventLog: [
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Created'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Not compliant to 6 week notice requirement'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Submitted'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Tony Ezekiel').displayName,
                            logged: moment().format(),
                            event: 'Planner (' + users.find(usr => usr.displayName === 'Fitz Farseer').displayName + ') assigned to Access Request'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Location Limits for (Newton Heath and Moston) is confirmed'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Access Request Granted'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'Access Request Declined'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Rand Althor').displayName,
                            logged: moment().format(),
                            event: 'Access Request Submitted'
                        },
                        {
                            user: users.find(usr => usr.displayName === 'Fitz Farseer').displayName,
                            logged: moment().format(),
                            event: 'ORL Closure disruptive Submitted for approval'
                        },
                    ]
            })
            .expect('Content-Type', /json/)
            .expect(200)
    });
});