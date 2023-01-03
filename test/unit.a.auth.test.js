const { endPoint, login } = require('./endPoint/endPoint');
const users = require('./data/user.data');
let queriedUsers = null;

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

    it('should login an administrator', async () => {
        await login.post('')
            .send({
                email: users.find(usr => usr.displayName === 'Matt Cole').email,
                password: users.find(usr => usr.displayName === 'Matt Cole').password,
                returnSecureToken: true
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toBeDefined();
                expect(res.body.displayName).toBe(users.find(usr => usr.displayName === 'Matt Cole').displayName);
                expect(res.body.email).toBe(users.find(usr => usr.displayName === 'Matt Cole').email);
                users.find(usr => usr.displayName === 'Matt Cole').localId = res.body.localId;
                users.find(usr => usr.displayName === 'Matt Cole').idToken = res.body.idToken;
            })
    });

    it('should, return a list of users that were created in the earlier test', async () => {
        await endPoint.get('/users')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Matt Cole').idToken,
                localId: users.find(usr => usr.displayName === 'Matt Cole').localId
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toBeDefined();
                queriedUsers = res.body.data;                
            });
     });

    users.forEach(user => {
        it('should, as an administrator, enable all accounts and set their roles: ' + user.displayName, async () => {
            await endPoint.patch('/adminuser')
                .set('Accept', 'application/json')
                .set({
                    idToken: users.find(usr => usr.displayName === 'Matt Cole').idToken,
                    localId: users.find(usr => usr.displayName === 'Matt Cole').localId
                })
                .send({
                    localId: queriedUsers.find(usr => usr.displayName === user.displayName).uid,
                    roles: user.roles,
                    disabled: user.disabled
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    user.roles = res.body.data.roles;
                });
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

        it('should deny access to user admin functions as a non-administrator role: ' + user.displayName, async () => {
            await endPoint.patch('/adminuser')
                .set('Accept', 'application/json')
                .set({
                    idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                    localId: users.find(usr => usr.displayName === 'Rand Althor').localId
                })
                .send({
                    
                    localId: user.localId,
                    roles: user.roles,
                    disabled: user.disabled
                })
                .expect('Content-Type', /json/)
                .expect(403)
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
                    // displayName: user.displayName,
                    email: user.email,
                    // password: user.password,
                    // phoneNumber: user.phoneNumber,
                    // organisation: user.organisation
                })
                .expect('Content-Type', /json/)
                .expect(200)
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
        
        it('should, return a user given the local id can be used by the specific user', async () => {
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
                        expect(res.body.status).toBe(200);
                    } else {
                        expect(res.body.status).toBe(403);
                    }
                })
        });
    });
});