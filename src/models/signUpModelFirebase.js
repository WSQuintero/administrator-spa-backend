import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where
} from "firebase/firestore"
import { db } from "../fbConfig/firebase.js"

export class SignUpModelFirebase {
  static async createUser({ input }) {
    try {
      const usersRef = collection(db, "users")
      const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", input.email))
      )

      if (!querySnapshot.empty) {
        return "Email is already registered"
      }

      const docRef = await addDoc(usersRef, input)
      console.log("Document written with ID: ", docRef.id)

      await updateDoc(docRef, {
        id: docRef.id
      })

      return {
        data: {
          id: docRef.id,
          ...input
        },
        message: "User created correctly"
      }
    } catch (error) {
      throw error
    }
  }
}
