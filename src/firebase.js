import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC0xxGjr-LxRewMkljHS8GbHfyVWtV4OA0",
  authDomain: "authentication-c555b.firebaseapp.com",
  projectId: "authentication-c555b",
  storageBucket: "authentication-c555b.appspot.com",
  messagingSenderId: "644129430604",
  appId: "1:644129430604:web:284207755a31a0f144e8e9",
  measurementId: "G-Y3Q1WWD5Y6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;