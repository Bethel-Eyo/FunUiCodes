import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDSfj6tUbdDHIrQ8hEPLupUX-GD5mu52SE",
  authDomain: "funlife-fae67.firebaseapp.com",
  databaseURL: "https://funlife-fae67.firebaseio.com",
  storageBucket: "funlife-fae67.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
