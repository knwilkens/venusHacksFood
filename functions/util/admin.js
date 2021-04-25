const admin = require('firebase-admin');
admin.initializeApp(); // maybe use config
const db = admin.firestore();

module.exports = { admin, db }
