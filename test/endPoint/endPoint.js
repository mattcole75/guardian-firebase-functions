const supertest = require('supertest');
const { apiKey } = require('../../functions/configuration/config');

// const baseUrl = 'http://localhost:5001/guardian-d746f/us-central1/api';
const baseUrl = 'https://europe-west1-guardian-d746f.cloudfunctions.net/api';
const firebaseLoginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;

const endPoint = supertest(baseUrl);
const login = supertest(firebaseLoginUrl);

module.exports = {
    endPoint: endPoint,
    login: login
}