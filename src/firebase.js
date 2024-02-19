// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmPdR2G103-N2FcCZjE5qJNz3Jm7X6pJ8",
  authDomain: "picstore-8c2e7.firebaseapp.com",
  projectId: "picstore-8c2e7",
  storageBucket: "picstore-8c2e7.appspot.com",
  messagingSenderId: "733852735776",
  appId: "1:733852735776:web:7b2901bd579f62e761df45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
