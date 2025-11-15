// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr7jhTvtUPdhqDnJzYIcyoR2U9k2tS-10",
  authDomain: "raumie-e817e.firebaseapp.com",
  projectId: "raumie-e817e",
  storageBucket: "raumie-e817e.firebasestorage.app",
  messagingSenderId: "123576611739",
  appId: "1:123576611739:web:51b75fedfeba062a3ca73e"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
