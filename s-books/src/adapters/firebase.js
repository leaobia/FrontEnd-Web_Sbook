// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxEVLB3ofUCsnARDazO5m-fi_e36xdgFs",
  authDomain: "fir-book-2c7e5.firebaseapp.com",
  projectId: "fir-book-2c7e5",
  storageBucket: "fir-book-2c7e5.appspot.com",
  messagingSenderId: "753587106542",
  appId: "1:753587106542:web:ed16485178593f6fc579ff",
  measurementId: "G-5TPTMD2K9F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)