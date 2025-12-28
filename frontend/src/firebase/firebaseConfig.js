import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyB8kQ5vX3Bem5wDfBV8KRrRR3HY3c46lR4",
  authDomain: "annapurna-4c547.firebaseapp.com",
  projectId: "annapurna-4c547",
  storageBucket: "annapurna-4c547.firebasestorage.app",
  messagingSenderId: "523926608092",
  appId: "1:523926608092:web:1ab6e0b2cdb3ef1cd1fc19",
  measurementId: "G-NGY0PD781D"
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore for the rest of your app
export const auth = getAuth(app);
export const db = getFirestore(app);

 export default app;