import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzLwI67oDb6DgXwPBi7gMjorLmtvZVhVM",
  authDomain: "reactlinks-77119.firebaseapp.com",
  projectId: "reactlinks-77119",
  storageBucket: "reactlinks-77119.appspot.com",
  messagingSenderId: "557120116069",
  appId: "1:557120116069:web:299196bec4d2ae09b33d8c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
