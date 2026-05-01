import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3mJR7ZlBdgXKvRba6f_-n-9Is2MvxD1M",
  authDomain: "somativa-dev-web.firebaseapp.com",
  projectId: "somativa-dev-web",
  storageBucket: "somativa-dev-web.firebasestorage.app",
  messagingSenderId: "212104221962",
  appId: "1:212104221962:web:a0439a17d820cce52b96f3",
  measurementId: "G-V7ZD052GV9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
