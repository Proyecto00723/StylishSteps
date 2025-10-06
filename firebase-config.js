// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSpeFHjt5Mqytow2Ct_yYJ-4YiRL4ydPo",
  authDomain: "mi-tienda-7a97a.firebaseapp.com",
  projectId: "mi-tienda-7a97a",
  storageBucket: "mi-tienda-7a97a.firebasestorage.app",
  messagingSenderId: "380330280917",
  appId: "1:380330280917:web:c0d248b5bde09997fa9f5c"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
