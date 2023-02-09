import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    measurementId: import.meta.env.VITE_measurementId,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const users = collection(db, "Users");
export const auth = getAuth(app);

