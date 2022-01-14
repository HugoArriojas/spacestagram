// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// Initialize Firebase
const config = {
  apiKey: "AIzaSyCPOHDeU6lUobtCim0UwTEdUWuPOWAK6QI",
  authDomain: "spacestagram-cc5b2.firebaseapp.com",
  databaseURL: "https://spacestagram-cc5b2-default-rtdb.firebaseio.com",
  projectId: "spacestagram-cc5b2",
  storageBucket: "spacestagram-cc5b2.appspot.com",
  messagingSenderId: "958104422892",
  appId: "1:958104422892:web:12e6a984e5dcff0c7718c9"
};


// setting a var that initializes the application
const firebase = initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;