import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFvsHAd9oLZEJV1lte9VULdg_g797KZQQ",
  authDomain: "capstone-piano-tracker.firebaseapp.com",
  databaseURL: "https://capstone-piano-tracker.firebaseio.com",
  projectId: "capstone-piano-tracker",
  storageBucket: "capstone-piano-tracker.appspot.com",
  messagingSenderId: "996950331033",
  appId: "1:996950331033:web:e5413143bf710eef64f208",
  measurementId: "G-F6CQTFZKNQ",
};
// Initialize Firebase

const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};

export default initializeFirebase;
