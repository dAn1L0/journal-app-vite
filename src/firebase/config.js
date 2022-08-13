import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyCEz1CQAyWQ4oXBzf07izE_I-EB-V7OtIk",
  authDomain: "react-vite-f118e.firebaseapp.com",
  projectId: "react-vite-f118e",
  storageBucket: "react-vite-f118e.appspot.com",
  messagingSenderId: "319906918372",
  appId: "1:319906918372:web:4f009e3005b5997aa621f1"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )
