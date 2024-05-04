// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvxGoSK_M7-X37_q8TpAbf_g3PcUia5-Y",
  authDomain: "ethlancew3.firebaseapp.com",
  projectId: "ethlancew3",
  storageBucket: "ethlancew3.appspot.com",
  messagingSenderId: "924978019367",
  appId: "1:924978019367:web:c6fdafac7c704b6fc5e202",
  measurementId: "G-3623HXG7ST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, db };
