import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCsf72_u_tNx5HmPD3ADUEGcCWd8opaeMM",
  authDomain: "fridgeease-838ee.firebaseapp.com",
  projectId: "fridgeease-838ee",
  storageBucket: "fridgeease-838ee.appspot.com",
  messagingSenderId: "691175536892",
  appId: "1:691175536892:web:49dfbf9f24195d9a3a3f79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;