import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../fbConfig/firebase.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

export class LoginModelFirebase {
  static async login({ input }) {
    try {
      const usersRef = collection(db, "users")
      const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", input.email))
      )

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data()
        const isAutenticated = await bcrypt.compare(
          input.password,
          userDoc.password
        )
        if (isAutenticated) {
          const token = jwt.sign(
            {
              sub: String(userDoc.id),
              name: String(userDoc.name)
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "24h"
            }
          )

          return {
            isAuthenticated: true,
            token,
            data: { email: userDoc.email }
          }
        } else {
          return { isAuthenticated: false, token: null, data: null }
        }
      } else {
        return { message: "user not found" }
      }
    } catch (error) {
      throw error
    }
  }
}
