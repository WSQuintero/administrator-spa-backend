import { Router } from "express"
import { SignUpController } from "../controllers/signUpController.js"

export const createSignUpRouter = ({ SignUpModel }) => {
  const signUpRouter = Router()
  const signUpController = new SignUpController({ SignUpModel })

  signUpRouter.post("/", signUpController.createUser)

  return signUpRouter
}
