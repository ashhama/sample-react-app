// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyC2jNdBX2npCpYivKu40sbuioE-5NfwZys",

  authDomain: "mysce-demo-app.firebaseapp.com",

  databaseURL: "https://mysce-demo-app-default-rtdb.firebaseio.com",

  projectId: "mysce-demo-app",

  storageBucket: "mysce-demo-app.appspot.com",

  messagingSenderId: "285888068833",

  appId: "1:285888068833:web:fd8a5c25821dd659a50ba0",

  measurementId: "G-4TMKSG2KX9"

};


// Initialize and export Firebase DB
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;


