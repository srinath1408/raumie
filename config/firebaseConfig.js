// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr7jhTvtUPdhqDnJzYIcyoR2U9k2tS-10",
  authDomain: "raumie-e817e.firebaseapp.com",
  projectId: "raumie-e817e",
  storageBucket: "raumie-e817e.firebasestorage.app",
  messagingSenderId: "123576611739",
  appId: "1:123576611739:web:51b75fedfeba062a3ca73e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);