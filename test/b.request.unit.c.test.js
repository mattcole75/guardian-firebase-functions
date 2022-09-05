const { endPoint, login } = require('./endPoint/endPoint');
const requests = require('./data/request.data');

let users = require('./data/user.data');
let requestId;

describe('Test the create read update functions for requests', () => {

    it('should login a user, and return the user details and token given correct login credentials for: ' + users[0].displayName, async () => {
        await login.post('')
            .send({
                email: users[0].email,
                password: users[0].password,
                returnSecureToken: true
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toBeDefined();
                expect(res.body.displayName).toBe(users[0].displayName);
                expect(res.body.email).toBe(users[0].email);
                users[0].localId = res.body.localId;
                users[0].idToken = res.body.idToken;
            })
    });

    requests.forEach(req => {

        it('should register each request in the test array', async () => {
            await endPoint.post('/request')
                .set('Accept', 'application/json')
                .set({
                    idToken: users[0].idToken,
                    localId: users[0].localId
                })
                .send({ ...req, localId: users[0].localId } )
                .expect('Content-Type', /json/)
                .expect(201)
        });
    });

    it('should, return a list of requests for the user who created the requests', async () => {
        await endPoint.get('/requests')
            .set('Accept', 'application/json')
            .set({
                idToken: users[0].idToken,
                localId: users[0].localId
            })
            .expect('Content-Type', /json/)
            .then(res => {
                expect(Object.keys(res.body.result).length).toEqual(2);
            })
    });

    it('should login a different user, and return the user details and token given correct login credentials for: ' + users[1].displayName, async () => {
        await login.post('')
            .send({
                email: users[1].email,
                password: users[1].password,
                returnSecureToken: true
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toBeDefined();
                expect(res.body.displayName).toBe(users[1].displayName);
                expect(res.body.email).toBe(users[1].email);
                users[1].localId = res.body.localId;
                users[1].idToken = res.body.idToken;
            })
    });

    it('should, return no requests for this user who has created no requests', async () => {
        await endPoint.get('/requests')
            .set('Accept', 'application/json')
            .set({
                idToken: users[1].idToken,
                localId: users[1].localId
            })
            .expect('Content-Type', /json/)
            .then(res => {
                expect(Object.keys(res.body.result).length).toEqual(0);
            })
    });


    it('should, Step 1 - create a part record mimiking the use flow', async () => {
        await endPoint.post('/request')
        .set('Accept', 'application/json')
        .set({
            idToken: users[1].idToken,
            localId: users[1].localId
        })
        .send(
            { 
                localId: users[1].localId,
                requestorName: users[1].displayName,
                requestorPhoneNumber: users[1].phoneNumber,
                requestorEmail: users[1].email,
                requestorOrganisation: users[0].organisation
            })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
            requestId = res.body.result.id;
            console.log(requestId);
        })
    });

    it('should, Step 2 - Add Summary Details', async () => {
        await endPoint.patch('/request')
        .set('Accept', 'application/json')
        .set({
            idToken: users[1].idToken,
            localId: users[1].localId,
            param: requestId
        })
        .send(
            { 
                accessRequestTitle: 'MKT09M Repair',
                accessRequestDescription: 'Replace the drive motor',
                accessRequestCompetentPerson: 'Scott Jibson',
                accessRequestCompetentPersonPhoneNumber: '+447450854789',
                associatedWithProject: false
            })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should, Step 3 - Add location limit', async () => {
        await endPoint.patch('/request')
        .set('Accept', 'application/json')
        .set({
            idToken: users[1].idToken,
            localId: users[1].localId,
            param: requestId
        })
        .send(
            {
                locationLimitItems: [{
                    locationLimitStartDate: '2022-10-03',
                    locationLimitStartTime: '01:00',
                    locationLimitEndDate: '2022-10-03',
                    locationLimitEndTime: '04:00',
                    locationLimitStatus: 'Pending',
                    locationLimitAccessType: 'Maintenance',
                    locationSelect: 'Market Street',
                    locations: [
                        'Market Street'
                    ],
                    nearestHospital: 'Salford Royal, Stott Lane, Salford, M6 8HD',
                    electricalIsolationRequired: false,
                    testTramsRequired: false,
                    signallingResourceRequired: false
                }]
            })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should, Step 4 - Add hazard details', async () => {
        await endPoint.patch('/request')
        .set('Accept', 'application/json')
        .set({
            idToken: users[1].idToken,
            localId: users[1].localId,
            param: requestId
        })
        .send(
            {
                hazards: [
                    'withinHazardZone',
                    'manualHandling',
                    'poweredAccessEquipment',
                ]
            })
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should, return all request that are not in draft status', async () => {
        await endPoint.get('/publicrequests')
            .set('Accept', 'application/json')
            .set({
                
            })
            .expect('Content-Type', /json/)
            .then(res => {
                console.log(res);
                // expect(Object.keys(res.body.result).length).toEqual(0);
            })
    });

});