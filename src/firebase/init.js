// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvfKvOaBdheR7IkNSQgsn4jDc0HqHZzJM",
  authDomain: "fire-base-tutorial-63430.firebaseapp.com",
  projectId: "fire-base-tutorial-63430",
  storageBucket: "fire-base-tutorial-63430.appspot.com",
  messagingSenderId: "172616768366",
  appId: "1:172616768366:web:c11a7390a3d864c05d3f7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();