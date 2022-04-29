import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDLIyncht15lvhvbvLyNxX9DcQp7n95sSg",
  authDomain: "dhun-b0a6b.firebaseapp.com",
  projectId: "dhun-b0a6b",
  storageBucket: "dhun-b0a6b.appspot.com",
  messagingSenderId: "51724701090",
  appId: "1:51724701090:web:7526636e3f1eee9d6036fb",
  measurementId: "G-8R5PL12Y4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth, db };
