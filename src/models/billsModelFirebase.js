import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc
} from "firebase/firestore"
import { db } from "../fbConfig/firebase.js"

export class BillsModelFirebase {
  static async getAll({ paid, date }) {
    let querySnapshot
    if (paid !== undefined) {
      const billsRef = collection(db, "bills")
      querySnapshot = await getDocs(
        query(billsRef, where("paid", "==", paid === "true"))
      )
    } else if (date !== undefined) {
      const billsRef = collection(db, "bills")
      querySnapshot = await getDocs(query(billsRef, where("date", "==", date)))
    } else {
      querySnapshot = await getDocs(collection(db, "bills"))
    }

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } else {
      return []
    }
  }

  static async getById({ id }) {
    const billsRef = collection(db, "bills")
    const querySnapshot = await getDocs(query(billsRef, where("id", "==", id)))

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    } else {
      return null
    }
  }

  static async create({ input }) {
    try {
      const docRef = await addDoc(collection(db, "bills"), input)
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
      const billsRef = collection(db, "bills")
      const querySnapshot = await getDocs(
        query(billsRef, where("id", "==", id))
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
      const billsRef = collection(db, "bills")
      const querySnapshot = await getDocs(
        query(billsRef, where("id", "==", id))
      )

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref

        await updateDoc(docRef, input)

        return { data: { id, ...input }, message: "updated correctly" }
      } else {
        return null
      }
    } catch (error) {
      console.error("Error updating document: ", error)
      throw error
    }
  }
}
