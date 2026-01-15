import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0lW3Q19S26wOmXCwz5EPL8XMauKKdt7w",
  authDomain: "ashbourne-hotel.firebaseapp.com",
  projectId: "ashbourne-hotel",
  storageBucket: "ashbourne-hotel.firebasestorage.app",
  messagingSenderId: "377176746108",
  appId: "1:377176746108:web:a6c6965bd37f7d287b41f9",
  measurementId: "G-F3M1MQDP7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth instances to be used in other parts of your app
export const db = getFirestore(app);
export const auth = getAuth(app);

// Note: The user creation logic that was here has been removed.
// That code should be placed inside a function that is triggered by a user action,
// such as submitting a sign-up form in one of your React components.