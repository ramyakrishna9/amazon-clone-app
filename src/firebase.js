import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyClsXvpifYcS3Q3p63lKc6oGSAeP5YRtDA",
    authDomain: "clone-f09f0.firebaseapp.com",
    databaseURL: "https://clone-f09f0.firebaseio.com",
    projectId: "clone-f09f0",
    storageBucket: "clone-f09f0.appspot.com",
    messagingSenderId: "234632695560",
    appId: "1:234632695560:web:39365e976fee60d7ed66bd",
    measurementId: "G-LJRKQ5GE3Y"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };  