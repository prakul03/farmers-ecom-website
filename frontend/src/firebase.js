import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAobdH__c16rr-MnLhGZnH-VzNVmK24YSo",
  authDomain: "vvce-hack-13ce6.firebaseapp.com",
  projectId: "vvce-hack-13ce6",
  storageBucket: "vvce-hack-13ce6.firebasestorage.app",
  messagingSenderId: "472467934944",
  appId: "1:472467934944:web:830b722a0306771efe8a85",
  measurementId: "G-8WM5Q2THZ4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
