const { endPoint, login } = require('./endPoint/endPoint');
let users = require('./data/user.data');

describe('Test the return of users with the planner role', () => {

    // Fitz Farseer -- planner
    // Tony Ezekiel -- coordinator


    it('should login the coordinator role user ', async () => {
        await login.post('')
            .send({
                email: users.find(usr => usr.displayName === 'Tony Ezekiel').email,
                password: users.find(usr => usr.displayName === 'Tony Ezekiel').password,
                returnSecureToken: true
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                users.find(usr => usr.displayName === 'Tony Ezekiel').localId = res.body.localId;
                users.find(usr => usr.displayName === 'Tony Ezekiel').idToken = res.body.idToken;
            })
    });

    it('should, return all enabled users with the planner role for a coordinator', async () => {
        await endPoint.get('/planners')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Tony Ezekiel').idToken,
                localId: users.find(usr => usr.displayName === 'Tony Ezekiel').localId
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body.planners.length).toEqual(1);
                // console.log(res.body.data.length);
            })
    });

    it('should login the planner role user ', async () => {
        await login.post('')
            .send({
                email: users.find(usr => usr.displayName === 'Fitz Farseer').email,
                password: users.find(usr => usr.displayName === 'Fitz Farseer').password,
                returnSecureToken: true
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                users.find(usr => usr.displayName === 'Fitz Farseer').localId = res.body.localId;
                users.find(usr => usr.displayName === 'Fitz Farseer').idToken = res.body.idToken;
            })
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
                expect(res.body.planners.length).toEqual(1);
            })
    });

    it('should login a standard user ', async () => {
        await login.post('')
            .send({
                email: users.find(usr => usr.displayName === 'Rand Althor').email,
                password: users.find(usr => usr.displayName === 'Rand Althor').password,
                returnSecureToken: true
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                users.find(usr => usr.displayName === 'Rand Althor').localId = res.body.localId;
                users.find(usr => usr.displayName === 'Rand Althor').idToken = res.body.idToken;
            })
    });

    it('should, return all enabled users with the planner role for a coordinator', async () => {
        await endPoint.get('/planners')
            .set('Accept', 'application/json')
            .set({
                idToken: users.find(usr => usr.displayName === 'Rand Althor').idToken,
                localId: users.find(usr => usr.displayName === 'Rand Althor').localId
            })
            .expect('Content-Type', /json/)
            .expect(403)
    });
});