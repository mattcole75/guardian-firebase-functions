const { endPoint, login } = require('./endPoint/endPoint');
let users = require('./data/user.data');

describe('Test the create read update functions for auth', () => {

    it('should, confirm the server is up and ready', async () => {
        await endPoint.get('')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.message).toBe('Server is up!');
            })
    });

    it('should, fail to create a user given an incorrectly formed email address', async () => {
        await endPoint.post('/user')
            .send({
                displayName: "Administrator",
                email: 'adminsystem.com',
                phoneNumber: '+441514960452',
                organisation: 'Bing Town Traders',
                password: 'letmein'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(res => {
                // console.log(res);
                expect(res.body.message).toContain('The email address is improperly formatted');
            })
    });

    it('should, fail to create a user given an incorrectly formed email address', async () => {
        await endPoint.post('/user')
            .send({
                displayName: "Administrator",
                email: 'admin@systemcom',
                phoneNumber: '+441514960452',
                organisation: 'Bing Town Traders',
                password: 'letmein'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(res => {
                expect(res.body.message).toContain('The email address is improperly formatted');
            })
    });

    it('should, fail to create a user given an incorrectly formed phone number', async () => {
        await endPoint.post('/user')
            .send({
                displayName: "Administrator",
                email: 'admin@system.com',
                phoneNumber: '07890123456',
                organisation: 'Bing Town Traders',
                password: 'letmein'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(res => {
                expect(res.body.message).toContain('The phone number must be a non-empty E.164 standard compliant');
            })
    });

    users.forEach(user => {

        it('should, create a user given the correct credentials for: ' + user.displayName, async () => {
            await endPoint.post('/user')
                .send({
                    displayName: user.displayName,
                    email: user.emailTemp,
                    phoneNumber: user.phoneNumber,
                    organisation: user.organisation,
                    password: user.password
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
        });

    });

    users.forEach(user => {

        it('should login, and return the user details and token given correct login credentials for: ' + user.displayName, async () => {
            await login.post('')
                .send({
                    email: user.emailTemp,
                    password: user.password,
                    returnSecureToken: true
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    expect(res.body).toBeDefined();
                    expect(res.body.displayName).toBe(user.displayName);
                    expect(res.body.email).toBe(user.emailTemp);
                    user.localId = res.body.localId;
                    user.idToken = res.body.idToken;
                })
        });
    });

    users.forEach(user => {

        it('should allow a user to update their own account: ' + user.displayName, async () => {
            await endPoint.patch('/user')
                .set('Accept', 'application/json')
                .set({
                    idToken: user.idToken,
                    localId: user.localId
                })
                .send({
                    displayName: user.displayName,
                    email: user.email,
                    password: user.password,
                    phoneNumber: user.phoneNumber,
                    organisation: user.organisation
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    // user.role = res.body.data.role;
                })
        });
    });

    users.forEach(user => {

        it('should update the user: ' + user.displayName, async () => {
            await endPoint.patch('/adminuser')
                .set('Accept', 'application/json')
                .set({
                    idToken: users.find(usr => usr.displayName === 'sysadmin').idToken,
                    localId: users.find(usr => usr.displayName === 'sysadmin').localId
                })
                .send({
                    displayName: user.displayName,
                    localId: user.localId,
                    email: user.email,
                    password: user.password,
                    roles: user.roles,
                    phoneNumber: user.phoneNumber,
                    organisation: user.organisation
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    user.roles = res.body.data.roles;
                })
        });

    });

    users.forEach(user => {

        it('should login, and refresh the credentials for: ' + user.displayName, async () => {
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

    users.forEach(user => {

        it('should deny access to user admin functions as a non-administrator role: ' + user.displayName, async () => {
            await endPoint.patch('/adminuser')
                .set('Accept', 'application/json')
                .set({
                    idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                    localId: users.find(usr => usr.displayName === 'Rand Althor').localId
                })
                .send({
                    displayName: user.displayName,
                    localId: user.localId,
                    email: user.email,
                    password: user.password,
                    roles: user.roles,
                    phoneNumber: user.phoneNumber,
                    organisation: user.organisation
                })
                .expect('Content-Type', /json/)
                .expect(403)
        });

    });

    users.forEach(user => {
        
        it('should, return a user given the local id can be used by the specific user and administrator role', async () => {
            await endPoint.get('/user')
                .set('Accept', 'application/json')
                .set({
                    idToken: user.idToken,
                    localId: user.localId
                })
                .expect('Content-Type', /json/)
                .then(res => {
                    user.localId = res.body.data.uid,
                    user.email = res.body.data.email,
                    user.phoneNumber = res.body.data.phoneNumber,
                    user.displayName = res.body.data.displayName,
                    user.roles = res.body.data.roles,
                    user.organisation = res.body.data.organisation
                })
        });
    });

    users.forEach(user => {
        
        it('should, return the full list of users for a use with the administrator role', async () => {
            await endPoint.get('/users')
                .set('Accept', 'application/json')
                .set({
                    idToken: user.idToken,
                    localId: user.localId
                })
                .expect('Content-Type', /json/)
                .then(res => {
                    if(user.roles.includes('administrator')){
                        // console.log(res.body);
                        expect(res.body.status).toBe(200);
                    } else {
                        expect(res.body.status).toBe(403);
                    }
                })
        });
    });
});