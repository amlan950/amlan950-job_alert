// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmOLhEWlX___86aii_8pWkDmb9kzfbzS8",
    authDomain: "vite-contact-89dd4.firebaseapp.com",
    projectId: "vite-contact-89dd4",
    storageBucket: "vite-contact-89dd4.firebasestorage.app",
    messagingSenderId: "689400936979",
    appId: "1:689400936979:web:eed69e8e8e9bba848b9de6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);