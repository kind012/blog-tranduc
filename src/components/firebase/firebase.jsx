import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF09dt2pPM2d7A2144cNjWgrwBq-IG0nw",
  authDomain: "react-blog-app-a805d.firebaseapp.com",
  projectId: "react-blog-app-a805d",
  storageBucket: "react-blog-app-a805d.appspot.com",
  messagingSenderId: "97977315532",
  appId: "1:97977315532:web:8cb5d0c38a1c5d4caa9269",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
