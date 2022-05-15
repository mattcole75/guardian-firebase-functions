// Description: Test the Delete functionality
// Developer: Matt Cole
// Date created: 2022-05-11
// Change history:
//  1. 

const { endPoint, login } = require('./endPoint/endPoint');
let users = require('./data/user.data');

// auth tests
describe('Test the delete functions for auth', () => {

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
