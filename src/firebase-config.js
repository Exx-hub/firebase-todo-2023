import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMqKV-LEW74f4LQefyTaY5z0ZaoJmTJks",
  authDomain: "fir-todo-2023.firebaseapp.com",
  projectId: "fir-todo-2023",
  storageBucket: "fir-todo-2023.appspot.com",
  messagingSenderId: "1024346465128",
  appId: "1:1024346465128:web:1f972934ba383c19e76cdd",
  measurementId: "G-5S0SKZYLCF",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
