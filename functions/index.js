const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('./configuration/express');

admin.initializeApp();
const api = express();

exports.api = functions.https.onRequest(api);