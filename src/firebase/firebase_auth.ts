import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCNIeIHdQp62ZajR47JLe5cSJFlncw_RX8",
    authDomain: "pokeapp-jg.firebaseapp.com",
    projectId: "pokeapp-jg",
    storageBucket: "pokeapp-jg.appspot.com",
    messagingSenderId: "510909312633",
    appId: "1:510909312633:web:c28c45f9e375c21506eea8",
    measurementId: "G-LW909888QQ",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const users = collection(db, "Users");
export const auth = getAuth(app);

