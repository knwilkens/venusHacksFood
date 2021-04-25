// firebase
const functions = require("firebase-functions");
// app
const express = require('express'),
app = express(),
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// handlers
const { getAllPosts, makeOnePost } = require('./handlers/posts');

app.get('/view-posts', getAllPosts);
app.post('/post', makeOnePost);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(app);
