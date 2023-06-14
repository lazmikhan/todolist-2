// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  "firebase/auth";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6wBKnTB_gO2a5qxF7j-UsCcRdRRmqv30",
  authDomain: "to-do-list-c71ad.firebaseapp.com",
  projectId: "to-do-list-c71ad",
  storageBucket: "to-do-list-c71ad.appspot.com",
  messagingSenderId: "617674396453",
  appId: "1:617674396453:web:450446a1f55daf784640cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export {app,db }