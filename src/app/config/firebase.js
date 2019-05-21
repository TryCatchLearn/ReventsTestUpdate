import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDTz7PhEojER4iyERzBNm32nz0pwKM3qDA",
  authDomain: "revents-1077d.firebaseapp.com",
  databaseURL: "https://revents-1077d.firebaseio.com",
  projectId: "revents-1077d",
  storageBucket: "revents-1077d.appspot.com",
  messagingSenderId: "631636745857",
  appId: "1:631636745857:web:9b91055bf8af2106"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;