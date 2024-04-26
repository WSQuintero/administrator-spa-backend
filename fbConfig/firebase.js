import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const { API_KEY, APP_ID } = process.env

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "spa-proyect.firebaseapp.com",
  projectId: "spa-proyect",
  storageBucket: "spa-proyect.appspot.com",
  messagingSenderId: "266188464362",
  appId: APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { app, db }
