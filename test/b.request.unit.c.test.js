const { endPoint, login } = require('./endPoint/endPoint');
const { requestFull } = require('./data/request.data');

let users = require('./data/user.data');

describe('Test the create read update functions for requests', () => {

    it('should, create new records', async () => {
        await endPoint.post('/request')
            .send(requestFull)
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(201)
    });

    it('should, return a list of requests', async () => {
        await endPoint.get('./requests')
            .set('Accept', 'application/json')
            .set({
                // idToken: user.idToken,
                // localId: user.localId
            })
            .expect('Content-Type', /json/)
            .then(res => {
                // console.log(res.body);
            })
    });

});