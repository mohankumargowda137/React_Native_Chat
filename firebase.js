import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBIs2ivC04p3gsHXSj534nli8K6V68wFdk",
  authDomain: "highon-c9636.firebaseapp.com",
  databaseURL:
    "https://highon-c9636-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "highon-c9636",
  storageBucket: "highon-c9636.appspot.com",
  messagingSenderId: "173224929022",
  appId: "1:173224929022:web:9cd2a9c05863ab2e22a7af",
  measurementId: "G-D8CPBJ6BWR"
};

firebase.initializeApp(firebaseConfig);
const db = getDatabase();
export { db };