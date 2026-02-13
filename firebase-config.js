// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCDSrE_hWvYYgjNwTX85leeU3vHBLBJsY",
  authDomain: "stylishsteps-10fc4.firebaseapp.com",
  databaseURL: "https://stylishsteps-10fc4-default-rtdb.firebaseio.com",
  projectId: "stylishsteps-10fc4",
  storageBucket: "stylishsteps-10fc4.firebasestorage.app",
  messagingSenderId: "32645603346",
  appId: "1:32645603346:web:ae022c525a85aaf7ad38cb",
  measurementId: "G-369VZP753G"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
