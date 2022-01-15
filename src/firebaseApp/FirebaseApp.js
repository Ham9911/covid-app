import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, getDocs, query,where,updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDwq1MDW99dlLKaPof49oeFObm3G79fbv0",
    authDomain: "covid-app-9bf0d.firebaseapp.com",
    projectId: "covid-app-9bf0d",
    storageBucket: "covid-app-9bf0d.appspot.com",
    messagingSenderId: "329356414896",
    appId: "1:329356414896:web:e3282c6b8d05aaddc4d075"
  });

const auth = getAuth();
const db = getFirestore(firebaseApp);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);



export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    storage,
    storageRef,
   updateDoc,
   deleteDoc,

    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where
};