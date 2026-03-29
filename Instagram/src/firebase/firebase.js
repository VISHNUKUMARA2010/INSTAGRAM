import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const env = import.meta.env;

const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY || "demo-api-key",
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
    projectId: env.VITE_FIREBASE_PROJECT_ID || "demo-project",
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
    appId: env.VITE_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000000000",
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-0000000000",
};

if (!env.VITE_FIREBASE_API_KEY) {
    console.warn("Firebase env vars are missing. Running with demo config until .env is set.");
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };