import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyCC4PSi6pVRx6GMeQ2d6z4_ZnJy3TS3GXw",
    authDomain: "cabbookingapp-53cf4.firebaseapp.com",
    projectId: "cabbookingapp-53cf4",
    storageBucket: "cabbookingapp-53cf4.appspot.com",
    messagingSenderId: "974401830722",
    appId: "1:974401830722:web:4497a709288971f0ff52db"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
