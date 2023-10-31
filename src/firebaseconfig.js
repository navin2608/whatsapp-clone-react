// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBfmZEc4SKqhzwO-1U94x-8FUGyeK6w3AI",
    authDomain: "whatsapp-clone-ac8bf.firebaseapp.com",
    projectId: "whatsapp-clone-ac8bf",
    storageBucket: "whatsapp-clone-ac8bf.appspot.com",
    messagingSenderId: "728211216900",
    appId: "1:728211216900:web:bf368b439db1bff11c7351",
    measurementId: "G-D6ZYNT91PL"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  let db = firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  export {auth,provider};
  export default db;