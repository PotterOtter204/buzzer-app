// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANuxrQw0GvtgRCMYn0ObQHpZuQBaOHqWw",
  authDomain: "data-9f121.firebaseapp.com",
  projectId: "data-9f121",
  storageBucket: "data-9f121.firebasestorage.app",
  messagingSenderId: "696203495762",
  appId: "1:696203495762:web:c2200b7e7770617269928b",
  measurementId: "G-WT52FFE56W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);