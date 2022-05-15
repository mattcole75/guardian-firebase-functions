// Description: Setup configuration for supertest
// Developer: Matt Cole
// Date created: 2022-05-06
// Change history:
//  1. 

const supertest = require('supertest');
const { apiKey } = require('../../functions/configuration/config');

const baseUrl = 'http://localhost:5001/breeze-49c1c/us-central1/api/';
const firebaseLoginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey;

const endPoint = supertest(baseUrl);
const login = supertest(firebaseLoginUrl);

module.exports = {
    endPoint: endPoint,
    login: login
}