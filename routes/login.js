import { Router } from "express"
import { LoginController } from "../controllers/loginController.js"

export const createLoginRouter = ({ LoginModel }) => {
  const loginRouter = Router()
  const loginController = new LoginController({ LoginModel })

  loginRouter.post("/", loginController.login)
  loginRouter.get("/validation", loginController.validateToken)

  return loginRouter
}
