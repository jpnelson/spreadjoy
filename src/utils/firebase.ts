// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/database";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuTamr6KR4mypac9T4KrAA-w7UHBfB1hk",
  authDomain: "spreadjoyapp.firebaseapp.com",
  databaseURL: "https://spreadjoyapp.firebaseio.com",
  projectId: "spreadjoyapp",
  storageBucket: "spreadjoyapp.appspot.com",
  messagingSenderId: "265178178260",
  appId: "1:265178178260:web:b369a9b8778f26d7469141",
  measurementId: "G-2RCD4RJX2E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
