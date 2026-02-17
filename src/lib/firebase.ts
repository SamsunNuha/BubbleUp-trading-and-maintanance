import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyANBo2xgA_B-CjoxPLfDmu6S2-uL43zFT4",
    authDomain: "bubbleapptrading.firebaseapp.com",
    projectId: "bubbleapptrading",
    storageBucket: "bubbleapptrading.firebasestorage.app",
    messagingSenderId: "575008101599",
    appId: "1:575008101599:web:087214c947a33d5f4ac56a",
    measurementId: "G-VLEMZS1F65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
