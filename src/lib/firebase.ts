import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  "projectId": "streamverse-b0rbk",
  "appId": "1:172200467998:web:de53a07b79ed3cb2a7980f",
  "storageBucket": "streamverse-b0rbk.firebasestorage.app",
  "apiKey": "AIzaSyA722kJdJBIb1GG_aAa2sZ21m0pGewxnzU",
  "authDomain": "streamverse-b0rbk.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "172200467998"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
