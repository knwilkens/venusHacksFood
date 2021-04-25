// firebase
const functions = require("firebase-functions");
// app
const express = require('express'),
app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// front end link
app.set('view engine', 'ejs');
app.set('views', '../public'); // for render 

// handlers
const { getAllPosts, makeOnePost } = require('./handlers/posts');

app.get('/home', (req, res) => {
  res.render('index');
})
app.get('/view-posts', getAllPosts);
app.get('/post', (req, res) => {
  res.render('make-post');
})
app.post('/post', makeOnePost);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(app);
