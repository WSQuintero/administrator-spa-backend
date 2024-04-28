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
      // Check if the email is already registered
      const usersRef = collection(db, "users") // Ensure db is defined and "users" is a valid collection path
      const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", input.email))
      )

      if (!querySnapshot.empty) {
        return "Email is already registered"
      }

      // If email is not registered, proceed with user creation
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
      console.error("Error creating user: ", error)
      throw error
    }
  }
}
