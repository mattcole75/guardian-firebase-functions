// Description: Test the Create and Update functionality
// Developer: Matt Cole
// Date created: 2022-05-06
// Change history:
//  1. 

const { endPoint, login } = require('./endPoint');
let users = require('./data/user.data');

// auth tests
describe('POST / GET / PATCH / DELETE auth requests', () => {

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
                password: 'letmein'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(res => {
                expect(res.body.message).toContain('The email address is improperly formatted');
            })
    });

    it('should, fail to create a user given an incorrectly formed email address', async () => {
        await endPoint.post('/user')
            .send({
                displayName: "Administrator",
                email: 'admin@systemcom',
                password: 'letmein'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(res => {
                expect(res.body.message).toContain('The email address is improperly formatted');
            })
    });

    users.forEach(user => {

        it('should, create a user given the correct credentials for: ' + user.displayName, async () => {
            await endPoint.post('/user')
                .send({
                    displayName: user.displayName,
                    email: user.email,
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

        it('should update the user: ' + user.displayName, async () => {
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
                    role: user.role
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    user.role = res.body.data.role;
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
        
        it('should, return the full list of users for a use with the administrator role', async () => {
            await endPoint.get('./user')
                .set('Accept', 'application/json')
                .set({
                    idToken: user.idToken,
                    localId: user.localId
                })
                .expect('Content-Type', /json/)
                .then(res => {
                    user.localId = res.body.data.uid,
                    user.email = res.body.data.email,
                    user.displayName = res.body.data.displayName,
                    user.role = res.body.data.role
                })
        });
    });

    it('should, update the Display Name for Rand', async () => {
        
        let user = users.find(element => element.displayName == 'Rand Al');
        let index = users.indexOf(user);

        await endPoint.patch('/user')
            .set('Accept', 'application/json')
            .set({
                idToken: user.idToken,
                localId: user.localId
            })
            .send({
                displayName: 'Rand Al\'thor',
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                users[index].displayName = res.body.data.displayName;
                console.log('users', users);
            })
    });

    it('should, update the email for Rand', async () => {
        
        let user = users.find(element => element.displayName == 'Rand Al\'thor');
        let index = users.indexOf(user);

        await endPoint.patch('/user')
            .set('Accept', 'application/json')
            .set({
                idToken: user.idToken,
                localId: user.localId
            })
            .send({
                email: 'rand.althor@system.com',
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                users[index].email = res.body.data.email;
                console.log('users', users);
            })
    });

    it('should, update the email for Rand', async () => {
        
        let user = users.find(element => element.displayName == 'Rand Al\'thor');
        let index = users.indexOf(user);

        await endPoint.patch('/user')
            .set('Accept', 'application/json')
            .set({
                idToken: user.idToken,
                localId: user.localId
            })
            .send({
                email: 'rand.althor@system.com',
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                users[index].email = res.body.data.email;
            })
    });

    it('should, update the password for Rand', async () => {
        
        let user = users.find(element => element.displayName == 'Rand Al\'thor');
        let index = users.indexOf(user);

        await endPoint.patch('/user')
            .set('Accept', 'application/json')
            .set({
                idToken: user.idToken,
                localId: user.localId
            })
            .send({
                password: 'letmein2',
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                users[index].password = 'letmein2';
            })
    });

    users.forEach(user => {
        
        it('should, return the full list of users for a use with the administrator role', async () => {
            await endPoint.get('./users')
                .set('Accept', 'application/json')
                .set({
                    idToken: user.idToken,
                    localId: user.localId
                })
                .expect('Content-Type', /json/)
                .then(res => {
                    if(user.role.includes('administrator')){
                        console.log(res.body);
                        expect(res.body.status).toBe(200);
                    } else {
                        expect(res.body.status).toBe(403);
                    }
                })
        });
    });

    users.forEach(user => {

        it('should delete the user: ' + user.displayName, async() => {
            await endPoint.delete('/user')
                .set('Accept', 'application/json')
                .set({
                    idToken: user.idToken,
                    localId: user.localId,
                })
                .send({
                    localId: user.localId
                })
                .expect('Content-Type', /json/)
                .expect(200)
        });
    });
});

// POST / PATCH / GET / DELETE records test
describe('Record CRUD tests', () => {
    it('should, create new records', async () => {
        await endPoint.post('/record')
            .send({
                displayName: "Administrator",
                email: 'admin@system.com',
                password: 'letmein'
            })
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(201)
    });
});
