import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider,getAuth} from 'firebase/auth';
import {getStorage} from "firebase/storage"
import {getDatabase} from "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyD6Gx4LTIe-G92_eQaqA-M1ANf9drlm7Ho",
  authDomain: "avenuerealty-fba11.firebaseapp.com",
  projectId: "avenuerealty-fba11",
  storageBucket: "avenuerealty-fba11.appspot.com",
  messagingSenderId: "91261862038",
  appId: "1:91261862038:web:860ef2c738830206f5c2b7"
};

  const app = initializeApp(firebaseConfig);
  
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const storage = getStorage(app);
  const db = getDatabase();

  export {auth,app,provider,db,storage}