const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const router = require('express').Router();
const postsDB = admin.firestore().collection('posts');

router.get('/post', (res, req) => {
  const newPost = {
    postUser: 'randomUser',
    receiveUser: 'randomUser2',
    status: 'Incomplete',
    title: 'Carrots',
    description: 'carrots',
  }
  postsDB
    .add(newPost)
    .then((post) => {
      res.json({message: `${post.title} created successfully`});
    })
    .catch((err) => {
      res.status(500).json({error: "something bad happened..."});
      console.error(err);
    });
})

exports = router;
