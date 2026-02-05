// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpUX-bHM7tO6azpEPj2-56k9QfZhkttkw",
  authDomain: "stylishsteps-b67e8.firebaseapp.com",
  projectId: "stylishsteps-b67e8",
  storageBucket: "stylishsteps-b67e8.firebasestorage.app",
  messagingSenderId: "855401239447",
  appId: "1:855401239447:web:a0d9ca75fec39f3a21ead2",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
