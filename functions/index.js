const functions = require("firebase-functions");
const express = require('express')
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const app = express();

exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
 });

// lets POST a raw card to DB from endpoint

exports.makeCard = functions.https.onRequest(async (req, res) => {
	const title = req.rawBody;
	//const writeResult = await admin.firestore().collection('posts').add({title: title});
	//res.json({ response: title });
	console.log(title)
});

 
