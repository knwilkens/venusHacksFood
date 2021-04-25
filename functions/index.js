// firebase
const functions = require("firebase-functions");
// app
const express = require('express'),
app = express();

// handlers
const { getAllPosts, makeOnePost } = require('./handlers/posts');

app.get('/view-posts', getAllPosts);
app.post('/post', makeOnePost);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(app);
