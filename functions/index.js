// firebase
const functions = require("firebase-functions");
// app
const express = require('express'),
app = express();
// render html files
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// front end link
app.set('view engine', 'ejs');
app.set('views', '../public'); // for render 

// handlers
const { getAllPosts, makeOnePost } = require('./handlers/posts');

app.get('/home', getAllPosts);
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname+'/../public/log-in.html'));
})
app.get('/view-posts', getAllPosts);
app.get('/post', (req, res) => {
  res.render('make-post');
})
app.post('/post', makeOnePost);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(app);
