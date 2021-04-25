// firebase
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express'),
app = express();
const postsDB = admin.firestore().collection('posts');
// routes = require("./routes");

// app.use(routes);

app.get('/view-posts', (req, res) => {
  postsDB
    //.orderBy('createdAt', 'desc')  
    .get()
    .then((allPosts) => {
      let posts = [];
      allPosts.forEach(doc => {
        console.log("one doc");
        posts.push({
          title: doc.data().title,
        });
      });
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({error: 'could not retrieve posts...'});
    });
})

app.post('/post', (req, res) => {
  const newPost = {
    postUser: 'randomUser',
    receiveUser: 'randomUser2',
    status: 'Incomplete',
    title: 'Onions',
    description: 'carrots',
  };
  postsDB
    .add(newPost)
    .then((post) => {
      res.json({message: `${post.title} created successfully`});
    })
    .catch((err) => {
      res.json({error: 'something bad happened...'});
      //console.error(err);
    });
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.api = functions.https.onRequest(app);
