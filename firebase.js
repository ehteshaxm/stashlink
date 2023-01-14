// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDUfCg44PPgK-Ajun5BFU6vdpQqqlaBTNY',
  authDomain: 'stash-75824.firebaseapp.com',
  projectId: 'stash-75824',
  storageBucket: 'stash-75824.appspot.com',
  messagingSenderId: '507317121915',
  appId: '1:507317121915:web:fc53353cee05aaf00243de',
  measurementId: 'G-EHPYXPTDF1',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);
