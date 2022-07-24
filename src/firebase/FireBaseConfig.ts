// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKgHfskaeQmKZ8_BvEcjL2sRLTYXlZFBE",
  authDomain: "bingo-44388.firebaseapp.com",
  projectId: "bingo-44388",
  storageBucket: "bingo-44388.appspot.com",
  messagingSenderId: "997579282902",
  appId: "1:997579282902:web:a44a252f129c92a655ec77",
  measurementId: "G-7C58DSN8X5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, analytics, auth, firestore };
