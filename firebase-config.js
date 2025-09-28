// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ⚠️ Copia tu configuración de Firebase aquí
const firebaseConfig = {
  apiKey: "AIzaSyDSpeFHjt5Mqytow2Ct_yYJ-4YiRL4ydPo",
  authDomain: "mi-tienda-7a97a.firebaseapp.com",
  projectId: "mi-tienda-7a97a",
  storageBucket: "mi-tienda-7a97a.firebasestorage.app",
  messagingSenderId: "380330280917",
  appId: "1:380330280917:web:03b0dbb445d1c53dfa9f5c"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
