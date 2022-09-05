const functions = require('firebase-functions');
//const admin = require('firebase-admin');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const express = require('./configuration/express');
const serviceAccount = require('./configuration/guardian.json');

// for production
// initializeApp({
//     credential: applicationDefault()
// });

// for development
initializeApp({
    credential: cert(serviceAccount)
});

const api = express();

exports.api = functions.https.onRequest(api);