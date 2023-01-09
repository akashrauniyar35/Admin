import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBcQW_2ZuwfwwNaovO9JJ09fHrkFJDGGX4",
    authDomain: "wedocleaning-a6143.firebaseapp.com",
    projectId: "wedocleaning-a6143",
    storageBucket: "wedocleaning-a6143.appspot.com",
    messagingSenderId: "995959522578",
    appId: "1:995959522578:web:d62c4c0c0167cb8ca15fcb",
    measurementId: "G-7KNEX6HPX2"
  };
  
// Firebase storage reference
export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;