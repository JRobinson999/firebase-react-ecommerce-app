import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOyOlFD4Yjo0UORVggjMjOjsKoNs9e2vo",
  authDomain: "fir-react-ecommerce-334df.firebaseapp.com",
  projectId: "fir-react-ecommerce-334df",
  storageBucket: "fir-react-ecommerce-334df.firebasestorage.app",
  messagingSenderId: "1020420315564",
  appId: "1:1020420315564:web:26f9d877b546ce5aca0209",
  measurementId: "G-3NM856YKNJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
