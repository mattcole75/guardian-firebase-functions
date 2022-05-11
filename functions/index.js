// Description: Provides the entry point for the firebase functions
// Developer: Matt Cole
// Date created: 2022-05-03
// Change history:
//  1. 

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('./configuration/express');

admin.initializeApp();
const api = express();

exports.api = functions.https.onRequest(api);
