// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyApVw6JtZcEYkC1qcExd2W9cU35Hd8hTVM",
    authDomain: "tset-esp32.firebaseapp.com",
    databaseURL: "https://tset-esp32-default-rtdb.firebaseio.com",
    projectId: "tset-esp32",
    storageBucket: "tset-esp32.firebasestorage.app",
    messagingSenderId: "425043465200",
    appId: "1:425043465200:web:89ee51eaa4a649c0248335",
    measurementId: "G-H1T5DHVTET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };