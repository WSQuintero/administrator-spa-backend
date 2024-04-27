import { Router } from "express"
import { LoginController } from "../controllers/LoginController.js"

export const createloginRouter = ({ LoginModel }) => {
  const loginRouter = Router()

  const loginController = new LoginController({ LoginModel })

  loginRouter.post("/", loginController.login)

  return loginRouter
}
