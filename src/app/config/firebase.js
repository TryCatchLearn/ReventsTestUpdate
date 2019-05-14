import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDCKvi4r4YrB77Y1Kjf1z6m1u1OzEg4fQ8",
    authDomain: "revents3-85377.firebaseapp.com",
    databaseURL: "https://revents3-85377.firebaseio.com",
    projectId: "revents3-85377",
    storageBucket: "revents3-85377.appspot.com",
    messagingSenderId: "934975168331",
    appId: "1:934975168331:web:6cb644ea1f45c282"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;