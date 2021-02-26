import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firebase-firestore"

import { firebaseConfig } from "../firebaseConfig"

let app, auth, db;

// Initialize Firebase
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);

  db = {
    users: app.firestore().collection("users")
  }
  auth = app.auth();
}



export { db, auth }