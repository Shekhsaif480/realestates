import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider,getAuth} from 'firebase/auth';
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyB3kEP-KSbinIZlE4u9wkDPhkHm37A_3bI",
  authDomain: "realestate-9712b.firebaseapp.com",
  projectId: "realestate-9712b",
  storageBucket: "realestate-9712b.appspot.com",
  messagingSenderId: "200747641563",
  appId: "1:200747641563:web:8608a5598e164c35d3fafe",
  measurementId: "G-P10W497BD1"
};
  const app = initializeApp(firebaseConfig);
  
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const imgDB = getStorage(app)
  const txtDB = getFirestore(app)

  export {auth,app,provider,imgDB,txtDB}