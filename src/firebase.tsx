// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteField,
  getDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvG81M3iNZhjOxkusEUmOiVqlCDU0UE-c",
  authDomain: "free2play-9fb98.firebaseapp.com",
  projectId: "free2play-9fb98",
  storageBucket: "free2play-9fb98.appspot.com",
  messagingSenderId: "795499264185",
  appId: "1:795499264185:web:c35350dabbb52b4f0dc368"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// Initialize Firebase Firestore and get a reference to the service
export const firestore = getFirestore(app);
export { collection, doc, setDoc, updateDoc, deleteField, getDoc };
