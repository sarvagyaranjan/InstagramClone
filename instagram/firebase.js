// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWidVOwpVgUEJX22v03mT6vOOEWIFAnK4",
    authDomain: "instagram-34258.firebaseapp.com",
    projectId: "instagram-34258",
    storageBucket: "instagram-34258.appspot.com",
    messagingSenderId: "635694382694",
    appId: "1:635694382694:web:10fe54d38ed20011df37a7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()
// const auth = getAuth()

export { app, db, storage };