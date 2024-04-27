import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  deleteDoc
} from "firebase/firestore"
import { db } from "../fbConfig/firebase.js"

export class LoginModelFirebase {
  static async login({ paid, date }) {
    const querySnapshot = await getDocs(collection(db, "sales"))

    if (paid) {
      const salesRef = collection(db, "sales")

      const querySnapshot = await getDocs(
        query(salesRef, where("paid", "==", paid === "true"))
      )

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        return { id: doc.id, ...doc.data() }
      } else {
        return []
      }
    } else if (date) {
      const salesRef = collection(db, "sales")

      const querySnapshot = await getDocs(
        query(salesRef, where("date", "==", date))
      )

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        return { id: doc.id, ...doc.data() }
      } else {
        return []
      }
    } else {
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    }
  }

  static async validateToken({ id }) {
    const salesRef = collection(db, "sales")

    const querySnapshot = await getDocs(query(salesRef, where("id", "==", id)))

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    } else {
      return []
    }
  }

  static async create({ input }) {
    try {
      const docRef = await addDoc(collection(db, "sales"), input)
      console.log("Document written with ID: ", docRef.id)

      // Actualizar el documento recién creado con su ID
      await updateDoc(docRef, {
        id: docRef.id
      })

      return {
        data: {
          id: docRef.id,
          ...input
        },
        message: "Created correctly"
      }
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  static async delete({ id }) {
    try {
      const salesRef = collection(db, "sales")
      const querySnapshot = await getDocs(
        query(salesRef, where("id", "==", id))
      )

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref
        await deleteDoc(docRef)

        return { message: `document with id: ${id}, deleted` }
      } else {
        return { message: `No document found with that ID.` }
      }
    } catch (error) {
      return { message: `Error deleting document` }
    }
  }

  static async update({ id, input }) {
    try {
      const salesRef = collection(db, "sales")
      const querySnapshot = await getDocs(
        query(salesRef, where("id", "==", id))
      )

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref

        await updateDoc(docRef, input)

        return { data: { id, ...input }, message: "Updated correctly" }
      } else {
        return null
      }
    } catch (error) {
      console.error("Error updating document: ", error)
      throw error
    }
  }
}
