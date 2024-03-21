import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvRkx9K8CSWWpRMnfzD_oDct9HeO7Yj1I",
  authDomain: "bddaypal.firebaseapp.com",
  projectId: "bddaypal",
  storageBucket: "bddaypal.appspot.com",
  messagingSenderId: "434292080553",
  appId: "1:434292080553:web:f6cf30b94f844b60ae4eb8",
  measurementId: "G-BHQD9TXL8Z",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserSessionPersistence);
