// firebase
const functions = require("firebase-functions");
// app
const express = require('express'),
app = express();
// render html files
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors')({origin: true});

// front end link
app.set('view engine', 'ejs');
app.set('views', '../public'); // for render 

// Router
const { getAllPosts, makeOnePost, getPosts, updatePostStatusById } = require('./handlers/posts');

app.get('/home', getAllPosts);


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname+'/../public/log-in.html'));
})


//API to request all posts
// endpoint --> http://localhost:5001/venushacksfood/us-central1/api/view-all-posts
app.get('/view-all-posts', getAllPosts);

// Requests posts where limit equals the number of posts requested
// endpoint --> http://localhost:5001/venushacksfood/us-central1/api/view-posts/:limit
// example --> /view-posts/10 --> returns 10 posts
app.get('/view-posts/:limit', getPosts);

// Requests posts where limit equals the number of posts requested
// endpoint --> http://localhost:5001/venushacksfood/us-central1/api/update-status-by-id/:id
// example --> /update-status-by-id/128SDAWhas18A --> updates status of post
app.get('/update-status-by-id/:id/:user', updatePostStatusById);

// Landpage for making a single post
app.get('/post', (req, res) => {
  res.render('make-post');
})

// Make a single post and send to DB
// endpoint --> http://localhost:5001/venushacksfood/us-central1/api/post
app.post('/post', makeOnePost);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(app);
