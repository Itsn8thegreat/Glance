// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY7u5Z_oTXemGnI4khg35JuGkpNR9CQVo",
  authDomain: "glance-app-3847b.firebaseapp.com",
  projectId: "glance-app-3847b",
  storageBucket: "glance-app-3847b.appspot.com",
  messagingSenderId: "169366524800",
  appId: "1:169366524800:web:a1186e17b311b36a35e765"
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
const auth = getAuth(app);