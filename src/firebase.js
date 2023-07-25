// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAY0WeFgPNEuNi9Zl8X2QFAB4cjBfHvbms",
    authDomain: "social-network-8069e.firebaseapp.com",
    projectId: "social-network-8069e",
    storageBucket: "social-network-8069e.appspot.com",
    messagingSenderId: "536529598414",
    appId: "1:536529598414:web:f5adc9b6b1445e6289dd9f",
    measurementId: "G-05VR29MMZV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);