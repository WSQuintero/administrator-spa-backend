import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const {
  API_KEY,
  APP_ID,
  MESSAGING_SENDER_ID,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET
} = process.env

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { app, db }
